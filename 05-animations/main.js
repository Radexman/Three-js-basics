import * as THREE from 'three';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
mesh.position.set(0, 0, 0);
scene.add(mesh);

const sizes = {
	width: innerWidth,
	height: innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 3);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

// Animations
const tick = () => {
	// Click
	const elapsedTime = clock.getElapsedTime();
	console.log(elapsedTime);

	// Update objects
	mesh.rotation.y = elapsedTime;

	// Render
	renderer.render(scene, camera);

	requestAnimationFrame(tick);
};

tick();
