import * as THREE from 'three';

export function createOuterSpaceScene() {
  const scene = new THREE.Scene();

  // Load starry background
  const loader = new THREE.TextureLoader();
  const spaceTexture = loader.load('/animations/assets/backgrounds/space.jpg');
  scene.background = spaceTexture;

  // Add distant galaxy-like lighting
  const pointLight1 = new THREE.PointLight(0x8888ff, 1, 500);
  pointLight1.position.set(200, 200, 200);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff88ff, 0.8, 500);
  pointLight2.position.set(-200, 100, -100);
  scene.add(pointLight2);

  // Add planets or asteroids
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(50, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: false })
  );
  planet.position.set(0, 0, -100);
  scene.add(planet);

  return scene;
}
