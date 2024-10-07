import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';

export function runFightAnimation(winner, loser) {
  const clock = new THREE.Clock();  // For handling animation updates
  let mixer;  // Animation mixer for managing animations

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

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
  
  loader.load('/animations/assets/winnerModel.glb', (gltf) => {
    const winnerModel = gltf.scene;
    winnerModel.position.set(-1, 0, 0);
    winnerModel.scale.set(0.5, 0.5, 0.5);
    scene.add(winnerModel);

    // Add model to outline pass
    outlinePass.selectedObjects.push(winnerModel);

    // Add animations for the winner
    mixer = new THREE.AnimationMixer(winnerModel);
    const punchClip = THREE.AnimationClip.findByName(gltf.animations, 'punch');  // Assume the model has a "punch" animation
    const punchAction = mixer.clipAction(punchClip);
    punchAction.play();  // Play punch animation
  });

  loader.load('/animations/assets/loserModel.glb', (gltf) => {
    const loserModel = gltf.scene;
    loserModel.position.set(1, 0, 0);
    loserModel.scale.set(0.5, 0.5, 0.5);
    scene.add(loserModel);

    // Add model to outline pass
    outlinePass.selectedObjects.push(loserModel);

    // Add animations for the loser
    const loserMixer = new THREE.AnimationMixer(loserModel);
    const dodgeClip = THREE.AnimationClip.findByName(gltf.animations, 'dodge');  // Assume the model has a "dodge" animation
    const dodgeAction = loserMixer.clipAction(dodgeClip);
    dodgeAction.play();  // Play dodge animation
  });


function playAttackAnimation(attackerModel, moveType) {
    if (moveType === 'Critical Hit') {
      // Trigger a special attack animation, e.g., a powerful punch
      const criticalHitAction = mixer.clipAction(THREE.AnimationClip.findByName(attackerModel.animations, 'powerPunch'));
      criticalHitAction.play();
    } else {
      // Normal attack animation
      const normalAttackAction = mixer.clipAction(THREE.AnimationClip.findByName(attackerModel.animations, 'punch'));
      normalAttackAction.play();
    }
  }
  

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();  // Update the clock

    if (mixer) {
      mixer.update(delta);  // Update the animation mixer
    }

    composer.render();  // Use composer for post-processing
  }

  animate();
}
