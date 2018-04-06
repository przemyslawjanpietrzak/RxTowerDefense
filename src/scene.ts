import * as THREE from 'three';

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

controls.minDistance = 0;
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
cube.position.x = 0;
cube.position.y = 2;
cube.position.z = 0;
scene.add( cube );

const meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 100, 100),
    new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: true }),
);
meshFloor.rotation.x -= Math.PI / 2;
meshFloor.position.x = 50;
meshFloor.position.z = 50;
scene.add(meshFloor);

camera.position.x = 50;
camera.position.y = 25;
camera.position.z = 50;
controls.update();

var targetList = [];
var	projector = new THREE.Projector();
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var particleMaterial = new THREE.SpriteCanvasMaterial( {
    color: 0x000000,
    program: function ( context ) {
        context.beginPath();
        context.arc( 0, 0, 0.5, 0, Math.PI / 2, true );
        context.fill();
    }
} );
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
function onDocumentMouseDown( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( [ meshFloor ] );

    if (intersects.length > 0) {
        console.log(intersects[0].point.x);
        console.log(intersects[0].point.y);
        console.log(intersects[0].point.z);
    }
}

export { scene, cube, controls, renderer, camera };
