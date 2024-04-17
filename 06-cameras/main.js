import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector('.webgl');

const cursor = {
	x: 0,
	y: 0,
};

const sizes = {
	width: innerWidth,
	height: innerHeight,
};

// Cursor
window.addEventListener('mousemove', (e) => {
	cursor.x = e.clientX / sizes.width - 0.5;
	cursor.y = -(e.clientY / sizes.height - 0.5);
});

const scene = new THREE.Scene();

const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
const aspectRatio = sizes.width / sizes.height;
// console.log(aspectRatio);
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
camera.position.set(0, 0, 5);
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

const animateMesh = () => {
	const elapsedTime = clock.getElapsedTime();
	// Update camera
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
	// camera.position.y = cursor.y * 5;
	// camera.lookAt(mesh.position);
	// mesh.rotation.y = elapsedTime * Math.PI * 0.25;
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animateMesh);
};

animateMesh();
