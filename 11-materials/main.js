import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import gsap from 'gsap';

const canvas = document.querySelector('.webgl');

const sizes = {
	width: innerWidth,
	height: innerHeight,
};

const gui = new GUI({
	width: 300,
	title: 'Debug UI',
	closeFolders: true,
});

const debugObject = {
	color: '#4dc819',
	subdivision: 2,
};

window.addEventListener('keydown', (e) => {
	if (e.key === 'g') {
		gui.show(gui._hidden);
	}
});

// Handle Toggling Full Screen
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
	sizes.width = innerWidth;
	sizes.height = innerHeight;

	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	renderer.setSize(sizes.width, sizes.height);
});

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

// Alpha Texture
const alphaTexture = textureLoader.load('static/textures/door/alpha.jpg');

// Ambient Occlusion Texture
const ambientOcclusionTexture = textureLoader.load('static/textures/door/ambientOcclusion.jpg');

// Color / Albedo Texture
const colorTexture = textureLoader.load('static/textures/door/color.jpg');
colorTexture.colorSpace = THREE.SRGBColorSpace;

// Height / Displacement Texture
const heightTexture = textureLoader.load('static/textures/door/height.jpg');

// Metalness Texture
const metalnessTexture = textureLoader.load('static/textures/door/metalness.jpg');

// Normal Texture
const normalTexture = textureLoader.load('static/textures/door/normal.jpg');

// Roughness Texture
const roughnessTexture = textureLoader.load('static/textures/door/roughness.jpg');

// Matcaps
const matcapOne = textureLoader.load('static/textures/matcaps/1.png');
matcapOne.colorSpace = THREE.SRGBColorSpace;

// Gradients
const gradientOne = textureLoader.load('static/textures/gradients/3.jpg');

const scene = new THREE.Scene();

const material = new THREE.MeshBasicMaterial({ map: colorTexture });

// Create Sphere Mesh
const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), material);
sphereMesh.position.set(-10, 0, 0);

// Crete Plane Mesh
const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), material);

// Create Torus Mesh
const torusMesh = new THREE.Mesh(new THREE.TorusGeometry(3, 1, 16, 100), material);
torusMesh.position.set(10, 0, 0);

scene.add(sphereMesh, planeMesh, torusMesh);

debugObject.spin = () => {
	gsap.to(sphereMesh.rotation, { y: sphereMesh.rotation.y + Math.PI * 2, duration: 2 });
};

gui.add(sphereMesh.position, 'x').name('x axis').min(-3).max(3).step(0.01);
gui.add(sphereMesh.position, 'y').name('y axis').min(-3).max(3).step(0.01);
gui.add(sphereMesh.position, 'z').name('z axis').min(-3).max(3).step(0.01);
gui.add(sphereMesh.material, 'wireframe');
gui.addColor(debugObject, 'color').onChange(() => {
	sphereMesh.material.color.set(debugObject.color);
});
gui.add(debugObject, 'subdivision')
	.min(1)
	.max(10)
	.step(1)
	.name('Subdivision')
	.onFinishChange(() => {
		sphereMesh.geometry.dispose();
		sphereMesh.geometry = new THREE.BoxGeometry(
			1,
			1,
			1,
			debugObject.subdivision,
			debugObject.subdivision,
			debugObject.subdivision
		);
	});
gui.add(debugObject, 'spin').name('Spin');

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.lookAt(planeMesh.position);
camera.position.set(1, 1, 30);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

const animate = () => {
	const elapsedTime = clock.getElapsedTime();
	sphereMesh.rotation.y = Math.PI * elapsedTime * 0.1;
	sphereMesh.rotation.x = Math.PI * elapsedTime * -0.15;
	planeMesh.rotation.y = Math.PI * elapsedTime * 0.1;
	planeMesh.rotation.x = Math.PI * elapsedTime * -0.15;
	torusMesh.rotation.y = Math.PI * elapsedTime * 0.1;
	torusMesh.rotation.x = Math.PI * elapsedTime * -0.15;

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

animate();
