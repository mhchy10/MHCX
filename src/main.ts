import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene setup
const scene = new THREE.Scene();
/* mhcx — Dimension state */
document.body.classList.remove('dimension-active');
let inDimension = false;
let transitionProgress = 0;
scene.background = new THREE.Color(0x05070d);
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

/* mhcx — Exploration controls */
controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.enablePan = false;

controls.minDistance = 3;
controls.maxDistance = 14;

controls.rotateSpeed = 0.7;
controls.zoomSpeed = 0.8;

// mhcx — Touch exploration
controls.touches.ONE = THREE.TOUCH.ROTATE;
controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;

controls.enableDamping = true;


/* mhcx — Crystalline Core */
const coreGroup = new THREE.Group();
scene.add(coreGroup);


/* mhcx — Atmospheric Halo */
const haloGeometry = new THREE.SphereGeometry(1.45, 32, 32);

const haloMaterial = new THREE.MeshBasicMaterial({
  color: 0x6d28d9,
  transparent: true,
  opacity: 0.07,
  side: THREE.BackSide,
  depthWrite: false,
});

const halo = new THREE.Mesh(haloGeometry, haloMaterial);
scene.add(halo);


const coreGeometry = new THREE.IcosahedronGeometry(0.9, 1);


const coreMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x8b5cf6,
  emissive: 0x2e1065,
  emissiveIntensity: 0.35,
  metalness: 0.55,
  roughness: 0.16,
  transmission: 0.08,
  thickness: 1.2,
  clearcoat: 1,
  clearcoatRoughness: 0.12,
  flatShading: true,
});


const core = new THREE.Mesh(coreGeometry, coreMaterial);
coreGroup.add(core);

/* mhcx — Crystal interaction detector */
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

renderer.domElement.style.cursor = 'pointer';


/* mhcx — Crystal Wireframe */
const wireGeometry = new THREE.IcosahedronGeometry(0.94, 1);

const wireMaterial = new THREE.MeshBasicMaterial({
  color: 0x38bdf8,
  wireframe: true,
  transparent: true,
  opacity: 0.22,
});

const wireframe = new THREE.Mesh(wireGeometry, wireMaterial);
coreGroup.add(wireframe);


// Inner energy point
const coreLight = new THREE.PointLight(0x8b5cf6, 3, 5);
coreGroup.add(coreLight);


/* mhcx — Starfield */
const starGeometry = new THREE.BufferGeometry();
const starCount = 1500;
const starPositions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i += 3) {
  starPositions[i] = (Math.random() - 0.5) * 100;
  starPositions[i + 1] = (Math.random() - 0.5) * 100;
  starPositions[i + 2] = (Math.random() - 0.5) * 100;
}

starGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(starPositions, 3)
);

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.12,
  sizeAttenuation: true,
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);


/* mhcx — Orbital Ring */
const ringGeometry = new THREE.TorusGeometry(1.25, 0.018, 12, 120);

const ringMaterial = new THREE.MeshStandardMaterial({
  color: 0x38bdf8,
  emissive: 0x075985,
  emissiveIntensity: 2,
  metalness: 0.6,
  roughness: 0.25,
});

const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = 1.1;
ring.rotation.y = 0.3;
scene.add(ring);

/* mhcx — First exploration portal */
const portalGeometry = new THREE.TorusGeometry(0.55, 0.06, 16, 80);

const portalMaterial = new THREE.MeshStandardMaterial({
  color: 0x22d3ee,
  emissive: 0x0891b2,
  emissiveIntensity: 3,
  metalness: 0.4,
  roughness: 0.2,
});

const portal = new THREE.Mesh(portalGeometry, portalMaterial);

portal.position.set(2.5, 0.3, 0);
portal.rotation.y = -0.35;

scene.add(portal);


/* mhcx — The Void dimension */
const voidWorld = new THREE.Group();
voidWorld.visible = false;
scene.add(voidWorld);

// Strange alien planet
const planetGeometry = new THREE.IcosahedronGeometry(1.4, 2);
const planetMaterial = new THREE.MeshStandardMaterial({
  color: 0x312e81,
  emissive: 0x4c1d95,
  emissiveIntensity: 0.8,
  metalness: 0.7,
  roughness: 0.35,
  flatShading: true,
});

const voidPlanet = new THREE.Mesh(planetGeometry, planetMaterial);

// mhcx — Gradual planetary materialization
voidPlanet.material.transparent = true;
voidPlanet.material.opacity = 0;

voidWorld.add(voidPlanet);
// Glowing planetary ring
const voidRingGeometry = new THREE.TorusGeometry(2, 0.025, 12, 120);

const voidRingMaterial = new THREE.MeshBasicMaterial({
  color: 0xa78bfa,
  transparent: true,
  opacity: 0,
});

const voidRing = new THREE.Mesh(voidRingGeometry, voidRingMaterial);

voidRing.rotation.x = 1.1;
voidWorld.add(voidRing);

const shardMaterial = new THREE.MeshStandardMaterial({
  color: 0x22d3ee,
  emissive: 0x0891b2,
  emissiveIntensity: 1.5,
  metalness: 0.5,
  roughness: 0.2,
  transparent: true,
  opacity: 0,
});

const voidShards: THREE.Mesh[] = [];

// mhcx — Track discovered crystals
const discoveredShards = new Set<THREE.Object3D>();
const discoveredCount = document.getElementById('discovered-count');

for (let i = 0; i < 7; i++) {
  const shard = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.18 + Math.random() * 0.18),
    shardMaterial
  );

 
const angle = (i / 7) * Math.PI * 2;
const distance = 3.5 + Math.random() * 1.8;

shard.position.set(
  Math.cos(angle) * distance,
  Math.sin(angle) * (2 + Math.random() * 1.5),
  (Math.random() - 0.5) * 4
);


  voidWorld.add(shard);
  voidShards.push(shard);
}




// Add light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);


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

  
  // mhcx — Breathing energy halo
  const pulse = 1 + Math.sin(performance.now() * 0.001) * 0.035;
  halo.scale.setScalar(pulse);


  // Update controls
  controls.update();

  
  // Core rotation
  core.rotation.x += 0.003;
  core.rotation.y += 0.006;

  // Smooth mouse-driven tilt
  const targetX = mouseY * 0.22;
  const targetY = mouseX * 0.22;

  coreGroup.rotation.x +=
    (targetX - coreGroup.rotation.x) * 0.035;

  coreGroup.rotation.y +=
    (targetY - coreGroup.rotation.y) * 0.035;

  coreGroup.rotation.x += 
  (targetX - coreGroup.rotation.x) * 0.035;

  coreGroup.rotation.y +=
    (targetY - coreGroup.rotation.y) * 0.035;

  stars.rotation.y += 0.0003;
  stars.rotation.x += 0.0001;

  
  // mhcx — Void world animation
  if (inDimension) {
    voidPlanet.material.opacity = Math.min(
  voidPlanet.material.opacity + 0.003,
  1
);

voidRingMaterial.opacity = Math.min(
  voidRingMaterial.opacity + 0.002,
  1
);

    voidPlanet.rotation.y += 0.003;
    voidPlanet.rotation.x += 0.001;
    voidRing.rotation.z += 0.004;

    voidShards.forEach((shard, i) => {
      shardMaterial.opacity = Math.min(
  shardMaterial.opacity + 0.002,
  1
);
      shard.rotation.x += 0.01;
      shard.rotation.y += 0.015;
      shard.position.y += Math.sin(performance.now() * 0.001 + i) * 0.001;
    });
  }

  ring.rotation.z += 0.002;
  ring.rotation.x += 0.0005;

  // mhcx — Portal animation
portal.rotation.z += 0.008;

const portalPulse = 1 + Math.sin(performance.now() * 0.002) * 0.08;
portal.scale.setScalar(portalPulse);
portalMaterial.emissiveIntensity =
  2.5 + Math.sin(performance.now() * 0.003) * 1.5;

  
if (transitionProgress > 0 && !inDimension) {
  transitionProgress = Math.min(transitionProgress + 0.008, 1);

  // Accelerating portal flight
  const flight = transitionProgress * transitionProgress;
  const zoom = 1 + flight * 5;

  camera.position.z = 5 / zoom;

  renderer.domElement.style.filter =
    `brightness(${1 - flight * 0.85})`;

  if (transitionProgress >= 1) {
    const transitionOverlay =
      document.getElementById('dimension-transition');

    // Switch worlds while the screen is covered
    coreGroup.visible = false;
    halo.visible = false;
    ring.visible = false;
    portal.visible = false;
    stars.visible = false;

    voidWorld.visible = true;
    document.body.classList.add('dimension-active'); 

    // Frame the complete Void environment
controls.target.set(0, 0, 0);
camera.position.set(0, 1, 9);
camera.lookAt(0, 0, 0);
controls.update();

    renderer.domElement.style.filter = 'none';

    // Hold the darkness before revealing the destination
    window.setTimeout(() => {
      inDimension = true;
      transitionProgress = 0;
      transitionOverlay?.classList.remove('active');
    }, 900);
  }
}


  // Render
  renderer.render(scene, camera);

}


/* mhcx — Mouse interaction */
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = (event.clientY / window.innerHeight) * 2 - 1;

    const cursorGlow = document.getElementById('cursor-glow');

  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }
});


/* mhcx — Discover the crystal */
const discoveryPanel = document.getElementById('discovery-panel');
const closeDiscovery = document.getElementById('close-discovery');

renderer.domElement.addEventListener('click', (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

 const coreHits = raycaster.intersectObject(core, false);
const portalHits = raycaster.intersectObject(portal, false);

if (coreHits.length > 0) {
  discoveryPanel?.classList.add('visible');
}

if (portalHits.length > 0) {
  document.getElementById('portal-panel')?.classList.add('visible');
}

// mhcx — Interact with the Void planet
if (inDimension && voidWorld.visible) {
  const planetHits = raycaster.intersectObject(voidPlanet, false);

  if (planetHits.length > 0) {
    voidPlanet.scale.setScalar(1.15);

    window.setTimeout(() => {
      voidPlanet.scale.setScalar(1);
    }, 500);
  }
}


// mhcx — Interact with alien crystals
if (inDimension && voidWorld.visible) {
  const shardHits = raycaster.intersectObjects(voidShards, false);

 if (shardHits.length > 0) {
  const selectedShard = shardHits[0].object;

  // Count each crystal only once
  if (!discoveredShards.has(selectedShard)) {
    discoveredShards.add(selectedShard);

    if (discoveredShards.size === voidShards.length) {
  document
    .getElementById('exploration-tracker')
    ?.classList.add('completed');
}

    if (discoveredCount) {
      discoveredCount.textContent =
        String(discoveredShards.size).padStart(2, '0');
    }
  }

  // Keep the existing click reaction
  selectedShard.scale.setScalar(1.8);

  window.setTimeout(() => {
    selectedShard.scale.setScalar(1);
  }, 500);
}
}

});

closeDiscovery?.addEventListener('click', () => {
  discoveryPanel?.classList.remove('visible');
});

/* mhcx — Close portal panel */
const portalPanel = document.getElementById('portal-panel');
const closePortal = document.getElementById('close-portal');

closePortal?.addEventListener('click', () => {
  portalPanel?.classList.remove('visible');
});

/* mhcx — Enter the dimension */
const enterPortal = document.getElementById('enter-portal');

enterPortal?.addEventListener('click', () => {
  portalPanel?.classList.remove('visible');
  document.body.classList.add('experience-active');

  const transitionOverlay =
    document.getElementById('dimension-transition');

  transitionOverlay?.classList.add('active');

  transitionProgress = 0.001;
});


/* mhcx — Return from the Void */
window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !inDimension) return;

  const transitionOverlay =
    document.getElementById('dimension-transition');

  transitionOverlay?.classList.add('active');

  window.setTimeout(() => {
    // Restore the original world
    inDimension = false;
    voidWorld.visible = false;

    coreGroup.visible = true;
    halo.visible = true;
    ring.visible = true;
    portal.visible = true;
    stars.visible = true;

    
controls.target.set(0, 0, 0);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);
controls.update();


    renderer.domElement.style.filter = 'none';

    document.body.classList.remove('experience-active');

    const enterButton =
      document.getElementById('enter-button');

    if (enterButton instanceof HTMLButtonElement) {
      enterButton.querySelector('span')!.textContent =
        'ENTER EXPERIENCE';
    }

    transitionOverlay?.classList.remove('active');
  }, 900);
});



animate();


/* mhcx — Enter experience */
const enterButton = document.getElementById('enter-button');

enterButton?.addEventListener('click', () => {
  const active = document.body.classList.toggle('experience-active');

  if (enterButton instanceof HTMLButtonElement) {
    enterButton.querySelector('span')!.textContent =
      active ? 'EXIT EXPERIENCE' : 'ENTER EXPERIENCE';
  }
});

// mhcx — Explore navigation
const exploreNav = document.getElementById('nav-explore');

exploreNav?.addEventListener('click', () => {
  enterButton?.click();
});


/* mhcx — About navigation */
const aboutNav = document.getElementById('nav-about');
const aboutPanel = document.getElementById('about-panel');
const closeAbout = document.getElementById('close-about');

aboutNav?.addEventListener('click', () => {
  aboutPanel?.classList.add('visible');
});

closeAbout?.addEventListener('click', () => {
  aboutPanel?.classList.remove('visible');
});


/* mhcx — Unknown transmission navigation */
const contactNav = document.getElementById('nav-contact');
const contactPanel = document.getElementById('contact-panel');
const closeContact = document.getElementById('close-contact');

contactNav?.addEventListener('click', () => {
  contactPanel?.classList.add('visible');
});

closeContact?.addEventListener('click', () => {
  contactPanel?.classList.remove('visible');
});
