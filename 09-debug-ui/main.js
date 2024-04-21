import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import GUI from 'lil-gui';

const canvas = document.querySelector('.webgl');
const gui = new GUI();

const sizes = {
	width: innerWidth,
	height: innerHeight,
};

window.addEventListener('dblclick', () => {
	const fullscreenElement = document.fullscreenElement || document.webkitFullScreenElement;
	if (!fullscreenElement) {
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		} else if (canvas.webkitRequestFullScreen) {
			canvas.webkitRequestFullScreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullScreen) {
			document.webkitExitFullScreen();
		}
	}
});

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = innerWidth;
	sizes.height = innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const scene = new THREE.Scene();

const mesh = new THREE.Mesh(new THREE.SphereGeometry(15, 32, 16), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
scene.add(mesh);

gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('y axis');
gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('x axis');
gui.addColor(mesh.material, 'color');
gui.add(mesh, 'visible').name('is visible');
gui.add(mesh.material, 'wireframe');

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 40);
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const animate = () => {
	const elapsedTime = clock.getElapsedTime();
	mesh.rotation.y = elapsedTime * Math.PI * 0.25;
	// camera.position.z = Math.cos(elapsedTime);
	// camera.position.y = coursor.y * 5;
	// camera.lookAt(mesh.position);
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

animate();
