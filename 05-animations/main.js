import * as THREE from 'three';
import gsap from 'gsap';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
mesh.scale.set(2, 0.3, 1);
scene.add(mesh);

const sizes = {
	width: innerWidth,
	height: innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 4);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);

// Anomations

gsap.to(mesh.position, { duration: 3, x: 1 });
gsap.to(mesh.position, { delay: 6, duration: 5, y: 2 });
gsap.to(mesh.position, { delay: 11, duration: 3, x: -1 });
gsap.to(mesh.position, { delay: 14, duration: 5, x: -1, y: 0 });
gsap.to(mesh.position, { delay: 19, duration: 1, x: 0, y: 0 });

const clock = new THREE.Clock();

const animateMesh = () => {
	const elapsedTime = clock.getElapsedTime();
	mesh.rotation.x = elapsedTime * Math.PI * 0.5;
	// mesh.position.x = Math.sin(elapsedTime);
	// mesh.position.y = Math.cos(elapsedTime);
	// camera.position.y = Math.cos(elapsedTime);
	// camera.lookAt(mesh.position);
	renderer.render(scene, camera);
	requestAnimationFrame(animateMesh);
};

animateMesh();
