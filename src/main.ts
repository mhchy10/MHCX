import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SceneDebugger } from './utils/debug/debugger';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer setup
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Add a simple cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x3080ff,
  roughness: 0.4,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Initialize debugging tools
const sceneDebugger = new SceneDebugger(scene);
sceneDebugger.addAxesHelper(5);
sceneDebugger.addTransformControls(cube, 'Cube');
sceneDebugger.addMaterialControls(material, 'Cube Material');
sceneDebugger.addLightControls(pointLight, 'Point Light');

// Handle window resize
window.addEventListener('resize', () => {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Begin measuring performance
  sceneDebugger.beginPerformance();

  // Update controls
  controls.update();

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render
  renderer.render(scene, camera);

  // End measuring performance
  sceneDebugger.endPerformance();
}

animate();
