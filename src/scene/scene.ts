import {
    AmbientLight,
    BasicShadowMap,
    BoxGeometry,
    HorizontalPanning,
    Mesh,
    MeshPhongMaterial,
    OrbitControls,
    PointLight,
    PerspectiveCamera,
    PlaneGeometry,
    Projector,
    Raycaster,
    Scene,
    SpriteCanvasMaterial,
    Vector2,
    WebGLRenderer,
} from 'three';

import { path } from './path';
import { sceneClick$ } from './sinks';

import {
    LIGHT_COLOR,
    FLOOR_COLOR,
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
controls.panningMode = HorizontalPanning; // default is ScreenSpacePanning
controls.minDistance = 0;
controls.maxDistance = 100
controls.maxPolarAngle = Math.PI / 2;

// light
let ambientLight = new AmbientLight(LIGHT_COLOR, 0.2);
scene.add(ambientLight);

const light = ambientLight = new PointLight(LIGHT_COLOR, 0.8, 18);
light.position.set(-3, 6, -3);
light.castShadow = true;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 25;
scene.add(light);

const cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshPhongMaterial({ color: FLOOR_COLOR })
);
cube.position.x = 0;
cube.position.y = 2;
cube.position.z = 0;
scene.add( cube );

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

// var	projector = new Projector();
var mouse = new Vector2();
var raycaster = new Raycaster();

document.addEventListener( 'mousedown', onDocumentMouseDown, false );
function onDocumentMouseDown(event) {

    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( [ meshFloor ] );

    if (intersects.length > 0) {
        sceneClick$.next({
            x: intersects[0].point.x,
            y: intersects[0].point.y,
            z: intersects[0].point.z,
        });
    }
}

scene.add(path);

const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    controls.update();

    requestAnimationFrame( animate );
    renderer.render(scene, camera);
};

animate();

export { scene, cube, controls, renderer, camera };
