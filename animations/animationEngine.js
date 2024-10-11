import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';

// Import scenes for different locations
import { createNewYorkCityScene } from './scenes/newYorkCity.js';
import { createMetropolisScene } from './scenes/metropolis.js';
import { createAsgardScene } from './scenes/asgard.js';

export function runFightAnimation(winner, loser, moveType, location) {
  const clock = new THREE.Clock();  // For handling animation updates
  let winnerMixer, loserMixer;  // Animation mixers for managing animations

  // Dynamically load the scene based on the location
  let scene;
  switch (location) {
    case 'New York City':
      scene = createNewYorkCityScene();
      break;
    case 'Metropolis':
      scene = createMetropolisScene();
      break;
    case 'Asgard':
      scene = createAsgardScene();
      break;
    default:
      scene = new THREE.Scene();  // Fallback to a default empty scene
  }

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Handle window resize
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  // Add lights (specific lights for each scene are already in their respective scene files)
  const pointLight = new THREE.PointLight(0xffffff, 0.8);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // Create post-processing composer
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
  outlinePass.edgeStrength = 3.0;
  outlinePass.edgeGlow = 0.0;
  outlinePass.edgeThickness = 1.0;
  outlinePass.pulsePeriod = 0;
  outlinePass.visibleEdgeColor.set('#ffffff');  // White outline
  outlinePass.hiddenEdgeColor.set('#000000');  // Hidden edges in black
  composer.addPass(outlinePass);

  // Load models and animations using GLTFLoader
  const loader = new GLTFLoader();

  // Load the winner's model and play animation
  loader.load('/animations/assets/winnerModel.glb', (gltf) => {
    const winnerModel = gltf.scene;
    winnerModel.position.set(-1, 0, 0);
    winnerModel.scale.set(0.5, 0.5, 0.5);
    scene.add(winnerModel);
    outlinePass.selectedObjects.push(winnerModel);

    winnerMixer = new THREE.AnimationMixer(winnerModel);
    const punchClip = THREE.AnimationClip.findByName(gltf.animations, 'punch');
    const punchAction = winnerMixer.clipAction(punchClip);
    punchAction.play();

  }, undefined, (error) => {
    console.error('Error loading winner model:', error);
  });

  // Load the loser's model and play animation
  loader.load('/animations/assets/loserModel.glb', (gltf) => {
    const loserModel = gltf.scene;
    loserModel.position.set(1, 0, 0);
    loserModel.scale.set(0.5, 0.5, 0.5);
    scene.add(loserModel);
    outlinePass.selectedObjects.push(loserModel);

    loserMixer = new THREE.AnimationMixer(loserModel);
    const dodgeClip = THREE.AnimationClip.findByName(gltf.animations, 'dodge');
    const dodgeAction = loserMixer.clipAction(dodgeClip);
    dodgeAction.play();

  }, undefined, (error) => {
    console.error('Error loading loser model:', error);
  });

  // Function to play specific attack animation based on move type
  function playAttackAnimation(attackerModel, moveType) {
    if (moveType === 'Critical Hit') {
      const criticalHitAction = winnerMixer.clipAction(THREE.AnimationClip.findByName(attackerModel.animations, 'powerPunch'));
      criticalHitAction.play();
    } else {
      const normalAttackAction = winnerMixer.clipAction(THREE.AnimationClip.findByName(attackerModel.animations, 'punch'));
      normalAttackAction.play();
    }
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();  // Update the clock

    if (winnerMixer) winnerMixer.update(delta);
    if (loserMixer) loserMixer.update(delta);

    composer.render();  // Use composer for post-processing
  }

  animate();
}
