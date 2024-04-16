import * as THREE from 'three';
import gsap from 'gsap';

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

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

// Animations
const tick = () => {
	// Click
	// const elapsedTime = clock.getElapsedTime();

	// Update objects
	// mesh.rotation.y = elapsedTime * Math.PI * 0.5;
	// camera.position.y = Math.sin(elapsedTime);
	// camera.position.x = Math.cos(elapsedTime);
	// camera.lookAt(mesh.position);

	// Render
	renderer.render(scene, camera);

	requestAnimationFrame(tick);
};

tick();
