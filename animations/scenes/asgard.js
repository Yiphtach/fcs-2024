import * as THREE from 'three';

export function createAsgardScene() {
  const scene = new THREE.Scene();

  // Load background texture (Asgard landscape)
  const loader = new THREE.TextureLoader();
  const backgroundTexture = loader.load('/animations/assets/backgrounds/asgard.jpg');
  scene.background = backgroundTexture;

  // Add mystical golden ambient light
  const ambientLight = new THREE.AmbientLight(0xffd700, 1.8);  // Golden light
  scene.add(ambientLight);

  // Add spotlights to simulate magical Asgardian energy
  const magicLight1 = new THREE.SpotLight(0x00ffcc, 1.5);
  magicLight1.position.set(10, 20, 10);
  magicLight1.angle = Math.PI / 6;
  magicLight1.penumbra = 0.5;
  scene.add(magicLight1);

  const magicLight2 = new THREE.SpotLight(0xff00ff, 1.5);
  magicLight2.position.set(-10, 20, 10);
  magicLight2.angle = Math.PI / 6;
  magicLight2.penumbra = 0.5;
  scene.add(magicLight2);

  // Optional: Add floating platforms or structures
  const platformGeometry = new THREE.CircleGeometry(5, 32);
  const platformMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide });
  const platform = new THREE.Mesh(platformGeometry, platformMaterial);
  platform.position.set(0, 10, -20);
  platform.rotation.x = Math.PI / 2;
  scene.add(platform);

  return scene;
}
