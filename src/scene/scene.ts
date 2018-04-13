import {
    AmbientLight,
    BasicShadowMap,
    BoxGeometry,
    HemisphereLight,
    HemisphereLightHelper,
    Mesh,
    MeshPhongMaterial,
    OrbitControls,
    PerspectiveCamera,
    PlaneGeometry,
    PointLight,
    Projector,
    Raycaster,
    Scene,
    SpriteCanvasMaterial,
    Vector2,
    WebGLRenderer,
    DirectionalLight,
    DirectionalLightHelper,
} from 'three';

import { path } from './path';
import { sceneClick$ } from './sinks';

import {
    FLOOR_COLOR,
    LIGHT_COLOR,
    MESH_FLOOR_COLOR,
} from './settings';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer
const renderer = new WebGLRenderer();
renderer.shadowMap.type = BasicShadowMap;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// controlls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.minDistance = 0;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2;

// light
const ambientLight = new AmbientLight(LIGHT_COLOR, 0.2);
scene.add(ambientLight);

const hemiLight = new DirectionalLight(0xffffff, 0.42);
const helper = new DirectionalLightHelper(hemiLight, 5);
hemiLight.position.set(50, 50, 50);
scene.add(hemiLight );
scene.add(helper);

// Floor
const meshFloor = new Mesh(
    new PlaneGeometry(100, 100, 100, 100),
    new MeshPhongMaterial({ color: MESH_FLOOR_COLOR, wireframe: true }),
);
meshFloor.rotation.x -= Math.PI / 2;
meshFloor.position.x = 50;
meshFloor.position.z = 50;
scene.add(meshFloor);

camera.position.x = 50;
camera.position.y = 25;
camera.position.z = 50;
controls.update();

const mouse = new Vector2();
const raycaster = new Raycaster();

const onDocumentMouseDown = (event) => {

    event.preventDefault();

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObjects([ meshFloor ]);

    if (intersects.length > 0) {
        sceneClick$.next({
            x: intersects[0].point.x,
            y: intersects[0].point.y,
            z: intersects[0].point.z,
        });
    }
}
document.addEventListener( 'mousedown', onDocumentMouseDown, false );

scene.add(path);

const animate = () => {
    controls.update();

    requestAnimationFrame( animate );
    renderer.render(scene, camera);
};

animate();

export { scene };
