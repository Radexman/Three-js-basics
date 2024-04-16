import * as THREE from 'three';

const canvas = document.querySelector('.webgl');

const generateRandomRGB = () => {
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);

	const rgbColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';

	console.log(rgbColor);
	return rgbColor;
};

const color = generateRandomRGB();

// Creating scene
const scene = new THREE.Scene();

// Create geometry and material for the mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: color });

// Create mesh with geometry and material
const mesh = new THREE.Mesh(geometry, material);

// Adding mesh to the scene
scene.add(mesh);

// Window width and height for the camera
const sizes = {
	width: innerWidth,
	height: innerHeight,
};

// Creating camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(-0.8, 0.8, 3.5);

// Adding camera to the scene
scene.add(camera);

// Createing renderer
const renderer = new THREE.WebGLRenderer({
	canvas,
});

// Set renderer size
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
