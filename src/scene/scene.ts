import {
    AmbientLight,
    BasicShadowMap,
    DirectionalLight,
    DirectionalLightHelper,
    Mesh,
    MeshPhongMaterial,
    OrbitControls,
    PerspectiveCamera,
    PlaneGeometry,
    Raycaster,
    Scene,
    Vector2,
    WebGLRenderer,
} from 'three';

import { path } from './path';
import { sceneClick$ } from './sinks';

import {
    FLOOR_COLOR,
    FLOOR_SIZE,
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
controls.maxDistance = FLOOR_SIZE;
controls.maxPolarAngle = Math.PI / 2;

// light
const ambientLight = new AmbientLight(LIGHT_COLOR, 0.2);
scene.add(ambientLight);

const hemiLight = new DirectionalLight(0xffffff, 0.42);
const helper = new DirectionalLightHelper(hemiLight, 5);
hemiLight.position.set(FLOOR_SIZE / 2, FLOOR_SIZE / 2, FLOOR_SIZE / 2);
scene.add(hemiLight);
scene.add(helper);

// Floor
const meshFloor = new Mesh(
    new PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE, FLOOR_SIZE, FLOOR_SIZE),
    new MeshPhongMaterial({ color: MESH_FLOOR_COLOR, wireframe: true }),
);
meshFloor.rotation.x -= Math.PI / 2;
meshFloor.position.x = FLOOR_SIZE / 2;
meshFloor.position.z = FLOOR_SIZE / 2;
scene.add(meshFloor);

camera.position.x = FLOOR_SIZE / 2;
camera.position.y = FLOOR_SIZE / 4;
camera.position.z = FLOOR_SIZE / 2;
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
        const { point } = intersects[0];
        sceneClick$.next(point);
    }
};
document.addEventListener('mousedown', onDocumentMouseDown, false);

scene.add(path);

const animate = () => {
    controls.update();

    requestAnimationFrame( animate );
    renderer.render(scene, camera);
};

animate();

export { scene };
