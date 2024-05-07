import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import GUI from 'lil-gui';

// Textures, Texture Loader and Loading Manager
const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
// 	console.log('On Start');
// };
// loadingManager.onLoad = () => {
// 	console.log('On Load');
// };

// loadingManager.onProgress = () => {
// 	console.log('On Progress');
// };

// loadingManager.onError = () => {
// 	console.log('On Error');
// };

const textureLoader = new THREE.TextureLoader(loadingManager);

// Color / Albedo Texture
const colorTexture = textureLoader.load('/textures/minecraft.png');
colorTexture.colorSpace = THREE.SRGBColorSpace;

// Alpha Texture
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
alphaTexture.colorSpace = THREE.SRGBColorSpace;

// Height / Displacement Texture
const heightTexture = textureLoader.load('textures/door/height.jpg');
heightTexture.colorSpace = THREE.SRGBColorSpace;

// Normal Texture
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
normalTexture.colorSpace = THREE.SRGBColorSpace;

// Ambient Occlusion Texture
const ambientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg');
ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;

// Metalness Texture
const metalnessTexture = textureLoader.load('textures/door/metalness.jpg');
metalnessTexture.colorSpace = THREE.SRGBColorSpace;

// Roughness Texture
const roughnessTexture = textureLoader.load('textures/door/roughness.jpg');
roughnessTexture.colorSpace = THREE.SRGBColorSpace;

// Modifying Texture Vector2 Transformations
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;

// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI * 0.25;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// Filtering and Mipmapping
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

// Canvas HTML Element
const canvas = document.querySelector('.webgl');

// Scene & Camera Sizes
const sizes = {
	width: innerWidth,
	height: innerHeight,
};

// Create GUI
const gui = new GUI({
	width: 300,
	title: 'Debug UI',
	closeFolders: true,
});

const debugObject = {
	color: '#4dc819',
};

// Handle Toggle Show GUI
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

// Resize Event Handler
window.addEventListener('resize', () => {
	// Get Current Sizes
	sizes.width = innerWidth;
	sizes.height = innerHeight;

	// Update Camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update Renderer
	renderer.setSize(sizes.width, sizes.height);
});

// New Scene
const scene = new THREE.Scene();

// Create New Mesh
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: colorTexture }));
scene.add(mesh);

// Spin Animation Tweak
debugObject.spin = () => {
	gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2, duration: 2 });
};

debugObject.subdivision = 2;

// GUI Tweaks
gui.add(mesh.position, 'y').min(-5).max(5).step(0.01).name('Y Axis');
gui.add(mesh.position, 'x').min(-5).max(5).step(0.01).name('X Axis');
gui.add(mesh.position, 'z').min(-2).max(2).step(0.01).name('Z Axis');
gui.add(mesh.material, 'wireframe');
gui.addColor(debugObject, 'color').onChange(() => {
	mesh.material.color.set(debugObject.color);
});
gui.add(debugObject, 'spin');
gui.add(debugObject, 'subdivision')
	.min(1)
	.max(20)
	.step(1)
	.name('Subdivision')
	.onFinishChange(() => {
		mesh.geometry.dispose(),
			(mesh.geometry = new THREE.BoxGeometry(
				1,
				1,
				1,
				debugObject.subdivision,
				debugObject.subdivision,
				debugObject.subdivision
			));
	});

// Create Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.lookAt(mesh.position);
camera.position.set(1, 1, 4);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Create Renderer
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Adding Animations
const clock = new THREE.Clock();

const animate = () => {
	const elapsedTime = clock.getElapsedTime();
	// mesh.rotation.y = (Math.PI * elapsedTime) / 4;
	mesh.position.y = Math.cos(Math.PI * elapsedTime * 0.25);
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

animate();
