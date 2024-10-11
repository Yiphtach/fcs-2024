import * as THREE from 'three';

export function createMetropolisScene() {
  const scene = new THREE.Scene();

  // Load background texture (Metropolis skyline)
  const loader = new THREE.TextureLoader();
  const backgroundTexture = loader.load('/animations/assets/backgrounds/metropolis.jpg');
  scene.background = backgroundTexture;

  // Add bright ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  // Add a directional light to simulate sunlight
  const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
  sunLight.position.set(100, 100, 100);
  scene.add(sunLight);

  // Optional: Add Metropolis-style futuristic buildings
  const buildingGeometry = new THREE.BoxGeometry(4, 12, 4);
  const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0xCCCCCC });
  const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
  building.position.set(-3, 6, -15);
  scene.add(building);

  const building2 = new THREE.Mesh(buildingGeometry, buildingMaterial);
  building2.position.set(3, 6, -20);
  scene.add(building2);

  return scene;
}
