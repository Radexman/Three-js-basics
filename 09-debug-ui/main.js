import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import GUI from 'lil-gui';
import { log } from 'three/examples/jsm/nodes/Nodes.js';

const canvas = document.querySelector('.webgl');
const gui = new GUI({
	width: 300,
	title: 'Debug UI',
	closeFolders: false,
});

// gui.close();
// gui.hide();
const debugObject = {};

window.addEventListener('keydown', (e) => {
	if (e.key === 'h') {
		gui.show(gui._hidden);
	}
});

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

debugObject.color = '#4dc819';

const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
);
scene.add(mesh);

debugObject.spin = () => {
	gsap.to(mesh.rotation, { duration: 2, y: mesh.rotation.y + Math.PI * 2 });
};

debugObject.subdivision = 2;
const cubeTweaks = gui.addFolder('Cube');

cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('y axis');
cubeTweaks.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('x axis');
cubeTweaks.add(mesh, 'visible').name('is visible');
cubeTweaks.add(mesh.material, 'wireframe');
cubeTweaks.addColor(debugObject, 'color').onChange(() => {
	mesh.material.color.set(debugObject.color);
});
cubeTweaks.add(debugObject, 'spin');
cubeTweaks
	.add(debugObject, 'subdivision')
	.min(1)
	.max(20)
	.step(1)
	.onFinishChange(() => {
		mesh.geometry.dispose();
		mesh.geometry = new THREE.BoxGeometry(
			1,
			1,
			1,
			debugObject.subdivision,
			debugObject.subdivision,
			debugObject.subdivision
		);
	});

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
	// mesh.rotation.y = elapsedTime * Math.PI * 0.25;
	// camera.position.z = Math.cos(elapsedTime);
	// camera.position.y = coursor.y * 5;
	// camera.lookAt(mesh.position);
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

animate();
