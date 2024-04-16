import * as THREE from 'three';

const canvas = document.querySelector('.webgl');

// Creating scene
const scene = new THREE.Scene();

// Creating cube mesh
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
mesh.position.set(1, 0, 3);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

// Creating camera
const sizes = {
	width: innerWidth,
	height: innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(1, 2, 7);

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
