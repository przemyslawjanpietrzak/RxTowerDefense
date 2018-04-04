import * as THREE from 'three';

const USE_WIREFRAME = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;

controls.panningMode = THREE.HorizontalPanning; // default is THREE.ScreenSpacePanning

controls.minDistance = 10;
controls.maxDistance = 100

controls.maxPolarAngle = Math.PI / 2;

let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const light = ambientLight = new THREE.PointLight(0xffffff, 0.8, 18);
light.position.set(-3, 6, -3);
light.castShadow = true;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 25;
scene.add(light);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh( geometry, material );
cube.position.y = 2;
scene.add( cube );

const meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 100, 100),
    new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: USE_WIREFRAME }),
);
meshFloor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
scene.add(meshFloor);

camera.position.y = 10;
controls.update();

export { scene, cube, controls, renderer, camera };
