import * as THREE from 'three';

export function createGothamScene() {
  const scene = new THREE.Scene();

  // Load background texture (image of Gotham skyline)
  const loader = new THREE.TextureLoader();
  const backgroundTexture = loader.load('/animations/assets/backgrounds/gotham.jpg');
  scene.background = backgroundTexture;

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040, 1.5);  // Soft light
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 1.5);
  spotLight.position.set(100, 1000, 100);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 2000;
  scene.add(spotLight);

  // Add specific Gotham props (e.g., bat signal, rooftops, buildings)
  const batSignal = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 2, 32),
    new THREE.MeshBasicMaterial({ color: 0x111111 })
  );
  batSignal.position.set(0, 10, -10);
  scene.add(batSignal);

  return scene;
}
