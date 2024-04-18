import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector('.webgl');

const sizes = {
	width: innerWidth,
	height: innerHeight,
};

const coursor = {
	x: 0,
	y: 0,
};

window.addEventListener('mousemove', (e) => {
	coursor.x = e.clientX / sizes.width - 0.5;
	coursor.y = -(e.clientY / sizes.height - 0.5);
});

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
});

const scene = new THREE.Scene();

const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 5);
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
	// camera.position.x = Math.sin(coursor.x * Math.PI * 2) * 3;
	// camera.position.z = Math.cos(coursor.x * Math.PI * 2) * 3;
	// camera.position.y = coursor.y * 5;
	// camera.lookAt(mesh.position);
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

animate();
