/**
 * ============================================================================
 * 🧑‍💻 DevOps Academy — 3D Interactive Avatar Tutor (Alex)
 * Procedural 3D humanoid developer avatar that gestures, talks, and guides
 * students through "What is CI/CD?" with synchronized dialogue and speech synthesis.
 * ============================================================================
 */

(function () {
  'use strict';

  const LESSONS = [
    {
      id: "intro",
      tag: "THE BIG PICTURE",
      title: "Why does CI/CD exist?",
      quote: "Before CI/CD, software releases were terrifying 2:00 AM nightmares. Developers would say 'Well, it worked on my laptop!', but in production, missing dependencies and configuration drift broke everything.",
      keypoint: "CI/CD replaces stressful manual deployments with an automated, repeatable assembly line.",
      gesture: "welcome", // open arms
      mood: "curious"
    },
    {
      id: "ci",
      tag: "PART 1: CI",
      title: "What is Continuous Integration (CI)?",
      quote: "Continuous Integration is the practice of automatically testing and validating code every time a developer runs 'git push'. An automated runner boots up in the cloud, installs your project, and runs the entire test suite.",
      keypoint: "If even a single test fails, the pipeline halts immediately. Broken code never enters the main branch.",
      gesture: "pointing", // pointing forward
      mood: "focused"
    },
    {
      id: "cd-delivery",
      tag: "PART 2: CD",
      title: "What is Continuous Delivery?",
      quote: "Once tests pass, Continuous Delivery packages the verified code into an immutable, self-contained Docker container. It is tagged with the exact Git commit SHA and pushed to a secure registry (like AWS ECR).",
      keypoint: "Every single commit becomes a release-ready artifact that can be deployed to staging with one click.",
      gesture: "thumbsUp",
      mood: "confident"
    },
    {
      id: "cd-deploy",
      tag: "PART 3: CD",
      title: "What is Continuous Deployment?",
      quote: "Continuous Deployment goes one step further: if all tests pass, the container is automatically released to production clusters (AWS or Kubernetes) with zero downtime using rolling updates.",
      keypoint: "No human intervention needed. Code travels from your keyboard to production users in under 5 minutes.",
      gesture: "celebrate",
      mood: "excited"
    },
    {
      id: "contrast",
      tag: "THE PARADIGM SHIFT",
      title: "The Old Way vs. The CI/CD Way",
      quote: "The Old Way: Monthly manual releases, manual zip file copying, configuration drift, and panic rollback meetings. The CI/CD Way: 20 automated deploys per day, immutable Docker images, automated rollbacks, and peaceful sleep.",
      keypoint: "Now, let's explore the core engine that makes CI/CD work: Docker containers and Compose!",
      gesture: "welcome",
      mood: "happy"
    }
  ];

  let currentLessonIndex = 0;
  let isSpeakingAudio = false;

  // Three.js Avatar Globals
  let scene, camera, renderer;
  let canvasContainer;
  let clock;
  let avatarGroup;

  // Avatar Skeletal Body Parts
  let headGroup, eyesGroup, mouthMesh, leftEye, rightEye;
  let rightArmGroup, leftArmGroup;
  let bodyMesh;

  function init() {
    canvasContainer = document.getElementById('avatar-3d-canvas');
    if (!canvasContainer) return;

    clock = new THREE.Clock();

    // Scene
    scene = new THREE.Scene();
    scene.background = null; // transparent background to blend into light card

    const width = canvasContainer.clientWidth || 320;
    const height = canvasContainer.clientHeight || 360;

    camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 1.35, 3.4);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    canvasContainer.appendChild(renderer.domElement);

    setupLighting();
    buildStylizedAvatar();

    window.addEventListener('resize', onResize);
    setupAvatarUI();

    updateLesson(0);
    animate();
  }

  function setupLighting() {
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(3, 5, 4);
    key.castShadow = true;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xe0f2fe, 0.8);
    fill.position.set(-3, 2, -2);
    scene.add(fill);
  }

  // --- Procedural 3D Stylized Engineer Avatar ---
  function buildStylizedAvatar() {
    avatarGroup = new THREE.Group();
    avatarGroup.position.set(0, 0, 0);
    scene.add(avatarGroup);

    // 1. Skin & Material Palettes
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xfbd0a2, // Warm skin tone
      roughness: 0.6,
      metalness: 0.05
    });

    const hoodieMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Docker Blue Developer Hoodie
      roughness: 0.5,
      metalness: 0.15
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Dark Navy / Slate Hair
      roughness: 0.8
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Stylish Developer Glasses
      metalness: 0.9,
      roughness: 0.1
    });

    // 2. Torso / Hoodie
    const bodyGeo = new THREE.CylinderGeometry(0.48, 0.58, 1.1, 32);
    bodyMesh = new THREE.Mesh(bodyGeo, hoodieMat);
    bodyMesh.position.set(0, 0.45, 0);
    avatarGroup.add(bodyMesh);

    // Hoodie collar / zipper line
    const zipperGeo = new THREE.BoxGeometry(0.04, 0.85, 0.04);
    const zipperMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8 });
    const zipper = new THREE.Mesh(zipperGeo, zipperMat);
    zipper.position.set(0, 0.55, 0.5);
    avatarGroup.add(zipper);

    // 3. Head & Face Group
    headGroup = new THREE.Group();
    headGroup.position.set(0, 1.32, 0);
    avatarGroup.add(headGroup);

    // Head Sphere
    const headGeo = new THREE.SphereGeometry(0.42, 32, 32);
    const head = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(head);

    // Hair Cap & Tuft
    const hairGeo = new THREE.SphereGeometry(0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.52);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 0.06, -0.02);
    headGroup.add(hair);

    // Front Hair Fringe
    const fringeGeo = new THREE.BoxGeometry(0.38, 0.12, 0.14);
    const fringe = new THREE.Mesh(fringeGeo, hairMat);
    fringe.position.set(0, 0.32, 0.38);
    fringe.rotation.x = -0.2;
    headGroup.add(fringe);

    // 4. Eyes & Glasses
    eyesGroup = new THREE.Group();
    eyesGroup.position.set(0, 0.05, 0.38);
    headGroup.add(eyesGroup);

    const eyeGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });

    leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.15, 0, 0);
    eyesGroup.add(leftEye);

    rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.15, 0, 0);
    eyesGroup.add(rightEye);

    // Glasses Frame
    const lensGeo = new THREE.TorusGeometry(0.11, 0.022, 12, 24);
    const lLens = new THREE.Mesh(lensGeo, glassMat);
    lLens.position.set(-0.15, 0, 0.05);
    eyesGroup.add(lLens);

    const rLens = new THREE.Mesh(lensGeo, glassMat);
    rLens.position.set(0.15, 0, 0.05);
    eyesGroup.add(rLens);

    const bridgeGeo = new THREE.BoxGeometry(0.12, 0.025, 0.02);
    const bridge = new THREE.Mesh(bridgeGeo, glassMat);
    bridge.position.set(0, 0.02, 0.05);
    eyesGroup.add(bridge);

    // 5. Expressive Animated Mouth
    const mouthGeo = new THREE.BoxGeometry(0.14, 0.04, 0.02);
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0x9a3412 });
    mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
    mouthMesh.position.set(0, -0.16, 0.4);
    headGroup.add(mouthMesh);

    // 6. Articulated Arms
    // Left Arm (Relaxed posture)
    leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.58, 0.85, 0);
    avatarGroup.add(leftArmGroup);

    const armGeo = new THREE.CylinderGeometry(0.11, 0.1, 0.65, 16);
    const lArm = new THREE.Mesh(armGeo, hoodieMat);
    lArm.position.set(0, -0.3, 0);
    leftArmGroup.add(lArm);

    const handGeo = new THREE.SphereGeometry(0.11, 16, 16);
    const lHand = new THREE.Mesh(handGeo, skinMat);
    lHand.position.set(0, -0.65, 0);
    leftArmGroup.add(lHand);

    // Right Arm (Gesturing & Pointing)
    rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.58, 0.85, 0);
    avatarGroup.add(rightArmGroup);

    const rArm = new THREE.Mesh(armGeo, hoodieMat);
    rArm.position.set(0, -0.3, 0);
    rightArmGroup.add(rArm);

    const rHand = new THREE.Mesh(handGeo, skinMat);
    rHand.position.set(0, -0.65, 0);
    rightArmGroup.add(rHand);
  }

  // --- UI & Interaction ---
  function setupAvatarUI() {
    const prevBtn = document.getElementById('btn-avatar-prev');
    const nextBtn = document.getElementById('btn-avatar-next');
    const speakBtn = document.getElementById('btn-avatar-speak');
    const pillsContainer = document.getElementById('avatar-lesson-pills');

    if (prevBtn) prevBtn.addEventListener('click', () => updateLesson(currentLessonIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateLesson(currentLessonIndex + 1));

    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        toggleSpeechSynthesis();
      });
    }

    if (pillsContainer) {
      pillsContainer.innerHTML = '';
      LESSONS.forEach((l, idx) => {
        const btn = document.createElement('button');
        btn.className = 'avatar-pill-btn' + (idx === 0 ? ' is-active' : '');
        btn.textContent = `${idx + 1}. ${l.title.replace('What is ', '').replace('?', '')}`;
        btn.addEventListener('click', () => updateLesson(idx));
        pillsContainer.appendChild(btn);
      });
    }
  }

  function updateLesson(idx) {
    currentLessonIndex = Math.max(0, Math.min(LESSONS.length - 1, idx));
    const data = LESSONS[currentLessonIndex];

    const tagEl = document.getElementById('avatar-speech-tag');
    const titleEl = document.getElementById('avatar-speech-title');
    const quoteEl = document.getElementById('avatar-speech-quote');
    const pointEl = document.getElementById('avatar-speech-point');
    const counterEl = document.getElementById('avatar-lesson-counter');

    if (tagEl) tagEl.textContent = data.tag;
    if (titleEl) titleEl.textContent = data.title;
    if (quoteEl) quoteEl.textContent = data.quote;
    if (pointEl) pointEl.textContent = data.keypoint;
    if (counterEl) counterEl.textContent = `Lesson ${currentLessonIndex + 1} of ${LESSONS.length}`;

    // Update Pills
    document.querySelectorAll('.avatar-pill-btn').forEach((btn, i) => {
      btn.classList.toggle('is-active', i === currentLessonIndex);
    });

    const prevBtn = document.getElementById('btn-avatar-prev');
    const nextBtn = document.getElementById('btn-avatar-next');
    if (prevBtn) prevBtn.disabled = currentLessonIndex === 0;
    if (nextBtn) nextBtn.disabled = currentLessonIndex === LESSONS.length - 1;

    // Apply Avatar Gesture
    applyGesture(data.gesture);

    // If already speaking audio, read new lesson aloud
    if (isSpeakingAudio) {
      speakCurrentLesson();
    }
  }

  function applyGesture(gestureName) {
    if (!rightArmGroup || !leftArmGroup) return;

    if (gestureName === 'pointing') {
      // Point forward & up
      rightArmGroup.rotation.x = -Math.PI / 2.2;
      rightArmGroup.rotation.z = -Math.PI / 6;
      leftArmGroup.rotation.x = 0;
      leftArmGroup.rotation.z = Math.PI / 12;
    } else if (gestureName === 'welcome') {
      // Open both arms
      rightArmGroup.rotation.x = -Math.PI / 5;
      rightArmGroup.rotation.z = -Math.PI / 3.8;
      leftArmGroup.rotation.x = -Math.PI / 5;
      leftArmGroup.rotation.z = Math.PI / 3.8;
    } else if (gestureName === 'thumbsUp') {
      rightArmGroup.rotation.x = -Math.PI / 2.8;
      rightArmGroup.rotation.z = -Math.PI / 8;
      leftArmGroup.rotation.x = 0;
      leftArmGroup.rotation.z = 0;
    } else if (gestureName === 'celebrate') {
      rightArmGroup.rotation.x = -Math.PI / 1.5;
      rightArmGroup.rotation.z = -Math.PI / 4;
      leftArmGroup.rotation.x = -Math.PI / 1.5;
      leftArmGroup.rotation.z = Math.PI / 4;
    }
  }

  // --- Browser Speech Synthesis Integration ---
  function toggleSpeechSynthesis() {
    if (!('speechSynthesis' in window)) {
      alert("Browser speech synthesis is not supported on this device.");
      return;
    }

    const speakBtn = document.getElementById('btn-avatar-speak');
    if (isSpeakingAudio) {
      window.speechSynthesis.cancel();
      isSpeakingAudio = false;
      if (speakBtn) speakBtn.textContent = '🔊 Read Aloud';
    } else {
      isSpeakingAudio = true;
      if (speakBtn) speakBtn.textContent = '⏹ Stop Audio';
      speakCurrentLesson();
    }
  }

  function speakCurrentLesson() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const data = LESSONS[currentLessonIndex];
    const textToSpeak = `${data.title}. ${data.quote} ${data.keypoint}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onend = () => {
      isSpeakingAudio = false;
      const speakBtn = document.getElementById('btn-avatar-speak');
      if (speakBtn) speakBtn.textContent = '🔊 Read Aloud';
    };

    window.speechSynthesis.speak(utterance);
  }

  function onResize() {
    if (!canvasContainer || !camera || !renderer) return;
    const width = canvasContainer.clientWidth || 320;
    const height = canvasContainer.clientHeight || 360;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // --- Animation Loop ---
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // 1. Natural Breathing & Subtle Torso Sway
    if (avatarGroup) {
      avatarGroup.position.y = Math.sin(elapsed * 2.2) * 0.03;
      avatarGroup.rotation.y = Math.sin(elapsed * 0.8) * 0.06;
    }

    // 2. Head Subtle Nodding & Natural Look
    if (headGroup) {
      headGroup.rotation.x = Math.sin(elapsed * 1.8) * 0.04;
      headGroup.rotation.z = Math.sin(elapsed * 1.1) * 0.03;
    }

    // 3. Eye Blinking Logic
    if (leftEye && rightEye) {
      // Blink every 3.5 seconds
      const isBlinking = (Math.sin(elapsed * 1.8) > 0.96);
      leftEye.scale.y = isBlinking ? 0.1 : 1.0;
      rightEye.scale.y = isBlinking ? 0.1 : 1.0;
    }

    // 4. Talking Mouth Animation when Speech is Active
    if (mouthMesh) {
      if (isSpeakingAudio) {
        mouthMesh.scale.y = 1.0 + Math.sin(elapsed * 16.0) * 1.2;
        mouthMesh.scale.x = 1.0 + Math.cos(elapsed * 12.0) * 0.3;
      } else {
        mouthMesh.scale.set(1.0, 1.0, 1.0);
      }
    }

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
