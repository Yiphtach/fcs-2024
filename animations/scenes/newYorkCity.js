import * as THREE from 'three';

export function createNewYorkCityScene() {
  const scene = new THREE.Scene();

  // Load background texture (image of NYC skyline)
  const loader = new THREE.TextureLoader();
  const backgroundTexture = loader.load('/animations/assets/backgrounds/newYorkCity.jpg');
  scene.background = backgroundTexture;

  // Add ambient light for the city
  const ambientLight = new THREE.AmbientLight(0x404040, 2);  // Soft city glow
  scene.add(ambientLight);

  // Add point lights to simulate streetlights
  const streetLight1 = new THREE.PointLight(0xffe6b3, 1, 100);
  streetLight1.position.set(5, 10, 5);
  scene.add(streetLight1);

  const streetLight2 = new THREE.PointLight(0xffe6b3, 1, 100);
  streetLight2.position.set(-5, 10, 5);
  scene.add(streetLight2);

  // Optional: Add a basic building or skyscraper mesh
  const buildingGeometry = new THREE.BoxGeometry(3, 10, 3);
  const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
  const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
  building.position.set(0, 5, -10);
  scene.add(building);

  return scene;
}
