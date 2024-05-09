import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import gsap from 'gsap';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

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
const matcapTwo = textureLoader.load('static/textures/matcaps/2.png');
const matcapThree = textureLoader.load('static/textures/matcaps/3.png');
const matcapFour = textureLoader.load('static/textures/matcaps/4.png');
const matcapFive = textureLoader.load('static/textures/matcaps/5.png');
const matcapSix = textureLoader.load('static/textures/matcaps/6.png');
const matcapSeven = textureLoader.load('static/textures/matcaps/7.png');
const matcapEight = textureLoader.load('static/textures/matcaps/8.png');
matcapOne.colorSpace = THREE.SRGBColorSpace;
matcapTwo.colorSpace = THREE.SRGBColorSpace;
matcapThree.colorSpace = THREE.SRGBColorSpace;
matcapFour.colorSpace = THREE.SRGBColorSpace;
matcapFive.colorSpace = THREE.SRGBColorSpace;
matcapSix.colorSpace = THREE.SRGBColorSpace;
matcapSeven.colorSpace = THREE.SRGBColorSpace;
matcapEight.colorSpace = THREE.SRGBColorSpace;

// Gradients
const gradientOne = textureLoader.load('static/textures/gradients/5.jpg');

const scene = new THREE.Scene();

// Environment Map
const rgbeLoader = new RGBELoader();
rgbeLoader.load('static/textures/environmentMap/2k.hdr', (environmentMap) => {
	environmentMap.mapping = THREE.EquirectangularReflectionMapping;
	scene.background = environmentMap;
	scene.environment = environmentMap;
});

// const material = new THREE.MeshStandardMaterial();
// material.side = THREE.DoubleSide;
// material.map = colorTexture;
// material.aoMap = ambientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = heightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = alphaTexture;

// Mesh Phisical Material
const material = new THREE.MeshPhysicalMaterial();
material.roughness = 0;
material.metalness = 0;
// material.side = THREE.DoubleSide;
// material.map = colorTexture;
// material.aoMap = ambientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = heightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = alphaTexture;

// Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// Sheen
material.sheen = 1;
material.sheenRoughness = 0.25;
material.sheenColor.set(1, 1, 1);

// Iridescence
material.iridescence = 1;
material.iridescenceIOR = 1;
material.iridescenceThicknessRange = [100, 800];

// Transmissions
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

gui.add(material, 'transmission').min(0).max(1).step(0.0001);
gui.add(material, 'ior').name('ior').min(1).max(10).step(0.0001);
gui.add(material, 'thickness').name('thickness').min(0).max(1).step(0.0001);

gui.add(material, 'iridescence').name('iridescence').min(0).max(1).step(0.001);
gui.add(material, 'iridescenceIOR').name('iridescenceIOR').min(0).max(2.333).step(0.001);
gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1);
gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1);

gui.add(material, 'sheen').name('sheen').min(0).max(1).step(0.001);
gui.add(material, 'sheenRoughness').name('sheen roughness').min(0).max(1).step(0.001);
gui.addColor(material, 'sheenColor');

gui.add(material, 'clearcoat').name('clearcoat').min(0).max(1).step(0.001);
gui.add(material, 'clearcoatRoughness').name('clearcoat roughness').min(0).max(1).step(0.001);

// Create Sphere Mesh
const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphereMesh.position.set(-2, 0, 0);

// Crete Plane Mesh
const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

// Create Torus Mesh
const torusMesh = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material);
torusMesh.position.set(2, 0, 0);

scene.add(sphereMesh, planeMesh, torusMesh);

debugObject.spin = () => {
	gsap.to(sphereMesh.rotation, { y: sphereMesh.rotation.y + Math.PI * 2, duration: 2 });
};

gui.add(material, 'roughness').name('roughness').min(0).max(1).step(0.0001);
gui.add(material, 'metalness').name('metalness').min(0).max(1).step(0.0001);
gui.add(material, 'side').name('side').min(1).max(2).step(1);
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
	.name('subdivision')
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
camera.position.set(1, 1, 8);
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
	sphereMesh.rotation.y = Math.PI * elapsedTime * 0.05;
	sphereMesh.rotation.x = Math.PI * elapsedTime * -0.01;
	planeMesh.rotation.y = Math.PI * elapsedTime * 0.05;
	planeMesh.rotation.x = Math.PI * elapsedTime * -0.01;
	torusMesh.rotation.y = Math.PI * elapsedTime * 0.05;
	torusMesh.rotation.x = Math.PI * elapsedTime * -0.01;

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

animate();
