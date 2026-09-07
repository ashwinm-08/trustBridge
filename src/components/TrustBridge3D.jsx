import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles, Orbit, Scale, Cpu, ShieldCheck } from 'lucide-react';

export default function TrustBridge3D({ activeAgent = 'all', className = '' }) {
  const mountRef = useRef(null);
  const [viewPreset, setViewPreset] = useState('orbit'); // 'orbit' | 'scales' | 'brain' | 'agents'
  const cameraTargetRef = useRef({ x: 0, y: 0, z: 11 });
  const cameraCurrentRef = useRef({ x: 0, y: 0, z: 11 });

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Dimensions
    const width = currentMount.clientWidth || 480;
    const height = currentMount.clientHeight || 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // Group for all elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 0. 3D Holographic Pedestal & Cyber Grid Floor
    const grid = new THREE.GridHelper(10, 20, 0x00F0FF, 0x1E293B);
    grid.position.y = -2.6;
    grid.material.opacity = 0.45;
    grid.material.transparent = true;
    mainGroup.add(grid);

    // Glowing Pedestal Ring
    const baseRingGeo = new THREE.TorusGeometry(3.8, 0.04, 16, 64);
    const baseRingMat = new THREE.MeshBasicMaterial({ color: 0x00F0FF, transparent: true, opacity: 0.6 });
    const baseRing = new THREE.Mesh(baseRingGeo, baseRingMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -2.58;
    mainGroup.add(baseRing);

    // 1. Central "Scales of Justice" Structure
    // Vertical Spindle / Pillar of Justice
    const pillarGeo = new THREE.CylinderGeometry(0.09, 0.14, 4.4, 16);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x00F0FF,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x003344,
      emissiveIntensity: 0.8,
      wireframe: true
    });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    mainGroup.add(pillar);

    // Horizontal Balance Beam
    const beamGeo = new THREE.BoxGeometry(4.2, 0.09, 0.09);
    const beamMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0x78350F,
      emissiveIntensity: 0.9
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = 1.3;
    mainGroup.add(beam);

    // Left Scale (Customer Advocate Pan)
    const leftPanGeo = new THREE.ConeGeometry(0.75, 0.4, 20, 1, true);
    const leftPanMat = new THREE.MeshStandardMaterial({
      color: 0xA855F7,
      metalness: 0.8,
      roughness: 0.15,
      wireframe: true,
      side: THREE.DoubleSide,
      emissive: 0x581C87,
      emissiveIntensity: 0.5
    });
    const leftPan = new THREE.Mesh(leftPanGeo, leftPanMat);
    leftPan.rotation.x = Math.PI;
    leftPan.position.set(-1.9, 0.2, 0);
    mainGroup.add(leftPan);

    // Right Scale (Bank Defender Pan)
    const rightPanGeo = new THREE.ConeGeometry(0.75, 0.4, 20, 1, true);
    const rightPanMat = new THREE.MeshStandardMaterial({
      color: 0x3B82F6,
      metalness: 0.8,
      roughness: 0.15,
      wireframe: true,
      side: THREE.DoubleSide,
      emissive: 0x1E3A8A,
      emissiveIntensity: 0.5
    });
    const rightPan = new THREE.Mesh(rightPanGeo, rightPanMat);
    rightPan.rotation.x = Math.PI;
    rightPan.position.set(1.9, 0.2, 0);
    mainGroup.add(rightPan);

    // Cords for scales
    const lineMat = new THREE.LineBasicMaterial({ color: 0x94A3B8, transparent: true, opacity: 0.7 });
    const createCord = (p1, p2) => {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      return new THREE.Line(geo, lineMat);
    };
    mainGroup.add(createCord(new THREE.Vector3(-1.9, 1.3, 0), new THREE.Vector3(-1.9, 0.58, 0)));
    mainGroup.add(createCord(new THREE.Vector3(1.9, 1.3, 0), new THREE.Vector3(1.9, 0.58, 0)));

    // 2. Central Holographic Core (NewgenONE Brain)
    const coreGeo = new THREE.IcosahedronGeometry(1.1, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00F0FF,
      wireframe: true,
      emissive: 0x00F0FF,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.8
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = -0.2;
    mainGroup.add(core);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x10B981,
      transparent: true,
      opacity: 0.7
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    innerSphere.position.y = -0.2;
    mainGroup.add(innerSphere);

    // 3. Four Concentric Rings for NewgenONE 4 Pillars
    const rings = [];
    const ringRadii = [2.2, 2.7, 3.2, 3.7];
    const ringColors = [0x00F0FF, 0x8B5CF6, 0x3B82F6, 0x10B981];

    ringRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.02, 8, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[idx],
        transparent: true,
        opacity: 0.55
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.3 + (idx * 0.2);
      ringMesh.rotation.y = idx * 0.35;
      mainGroup.add(ringMesh);
      rings.push(ringMesh);
    });

    // 4. Three Orbiting Swarm Agents
    // Agent 1: Customer Advocate (Purple)
    const agentAdvocateGeo = new THREE.SphereGeometry(0.32, 20, 20);
    const agentAdvocateMat = new THREE.MeshStandardMaterial({
      color: 0xA855F7,
      emissive: 0x9333EA,
      emissiveIntensity: 1.0,
      roughness: 0.1
    });
    const agentAdvocate = new THREE.Mesh(agentAdvocateGeo, agentAdvocateMat);

    // Agent 2: Bank Defender (Blue)
    const agentDefenderGeo = new THREE.SphereGeometry(0.32, 20, 20);
    const agentDefenderMat = new THREE.MeshStandardMaterial({
      color: 0x3B82F6,
      emissive: 0x2563EB,
      emissiveIntensity: 1.0,
      roughness: 0.1
    });
    const agentDefender = new THREE.Mesh(agentDefenderGeo, agentDefenderMat);

    // Agent 3: RBI Judge (Emerald)
    const agentJudgeGeo = new THREE.SphereGeometry(0.38, 20, 20);
    const agentJudgeMat = new THREE.MeshStandardMaterial({
      color: 0x10B981,
      emissive: 0x059669,
      emissiveIntensity: 1.2,
      roughness: 0.1
    });
    const agentJudge = new THREE.Mesh(agentJudgeGeo, agentJudgeMat);

    mainGroup.add(agentAdvocate);
    mainGroup.add(agentDefender);
    mainGroup.add(agentJudge);

    // Dynamic Connecting Energy Arcs
    const arcMat = new THREE.LineBasicMaterial({ color: 0x00F0FF, transparent: true, opacity: 0.35 });
    const arcGeo1 = new THREE.BufferGeometry();
    const arcLine1 = new THREE.Line(arcGeo1, arcMat);
    const arcLine2 = new THREE.Line(new THREE.BufferGeometry(), arcMat);
    const arcLine3 = new THREE.Line(new THREE.BufferGeometry(), arcMat);
    mainGroup.add(arcLine1);
    mainGroup.add(arcLine2);
    mainGroup.add(arcLine3);

    // 5. Ambient Particle Galaxy
    const particleCount = 240;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00F0FF,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00F0FF, 2.5, 25);
    pointLight1.position.set(4, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xA855F7, 2.5, 25);
    pointLight2.position.set(-4, -3, 4);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x10B981, 2, 20);
    pointLight3.position.set(0, 5, -3);
    scene.add(pointLight3);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseMove = (event) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
      } else {
        const rect = currentMount.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        mouseX = x * 1.5;
        mouseY = y * 1.2;
      }
    };

    currentMount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    currentMount.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Camera lerp towards target
      cameraCurrentRef.current.x += (cameraTargetRef.current.x - cameraCurrentRef.current.x) * 0.05;
      cameraCurrentRef.current.y += (cameraTargetRef.current.y - cameraCurrentRef.current.y) * 0.05;
      cameraCurrentRef.current.z += (cameraTargetRef.current.z - cameraCurrentRef.current.z) * 0.05;
      camera.position.set(
        cameraCurrentRef.current.x,
        cameraCurrentRef.current.y,
        cameraCurrentRef.current.z
      );
      camera.lookAt(0, 0, 0);

      // Rotation dampening
      if (!isDragging) {
        targetRotationY = mouseX * 0.7;
        targetRotationX = -mouseY * 0.5;
      }
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Base rotation
      core.rotation.y = elapsed * 0.45;
      core.rotation.x = elapsed * 0.3;
      innerSphere.scale.setScalar(0.95 + Math.sin(elapsed * 2.5) * 0.08);

      // Scales balancing oscillation
      const balanceTilt = Math.sin(elapsed * 1.3) * 0.09;
      beam.rotation.z = balanceTilt;
      leftPan.position.y = 0.2 - balanceTilt * 1.9;
      rightPan.position.y = 0.2 + balanceTilt * 1.9;

      // Rings counter-rotation
      rings.forEach((ring, i) => {
        ring.rotation.z = elapsed * (0.2 + i * 0.08) * (i % 2 === 0 ? 1 : -1);
      });

      // Swarm Agents Orbital Trajectories
      const rad1 = 2.7;
      const angle1 = elapsed * 0.95;
      agentAdvocate.position.set(
        Math.cos(angle1) * rad1,
        Math.sin(elapsed * 1.4) * 0.7 - 0.2,
        Math.sin(angle1) * rad1
      );

      const rad2 = 3.0;
      const angle2 = elapsed * 0.85 + 2.1;
      agentDefender.position.set(
        Math.cos(angle2) * rad2,
        Math.cos(elapsed * 1.2) * 0.6 - 0.1,
        Math.sin(angle2) * rad2
      );

      const rad3 = 2.4;
      const angle3 = -elapsed * 0.75 + 4.2;
      agentJudge.position.set(
        Math.cos(angle3) * rad3,
        1.8 + Math.sin(elapsed * 2) * 0.25,
        Math.sin(angle3) * rad3
      );

      // Update dynamic energy arc points
      arcLine1.geometry.setFromPoints([core.position, agentAdvocate.position]);
      arcLine2.geometry.setFromPoints([core.position, agentDefender.position]);
      arcLine3.geometry.setFromPoints([core.position, agentJudge.position]);

      // Subtle particle float
      particles.rotation.y = elapsed * 0.035;
      particles.rotation.x = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      currentMount.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Camera preset handler
  const setCameraView = (view) => {
    setViewPreset(view);
    if (view === 'orbit') {
      cameraTargetRef.current = { x: 0, y: 0, z: 11 };
    } else if (view === 'scales') {
      cameraTargetRef.current = { x: 0, y: 0.8, z: 7.5 };
    } else if (view === 'brain') {
      cameraTargetRef.current = { x: 0, y: -0.3, z: 6.5 };
    } else if (view === 'agents') {
      cameraTargetRef.current = { x: 2.2, y: 2.0, z: 9 };
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[420px] flex items-center justify-center ${className}`}>
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Top 3D Interactive View Mode Switcher */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-cyan-500/30 backdrop-blur-md shadow-lg z-20">
        <button
          onClick={() => setCameraView('orbit')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-mono transition-all ${
            viewPreset === 'orbit'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Full Orbit View"
        >
          <Orbit className="w-3 h-3" />
          <span>3D Orbit</span>
        </button>

        <button
          onClick={() => setCameraView('scales')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-mono transition-all ${
            viewPreset === 'scales'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-glow-amber'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Zoom to Scales of Justice"
        >
          <Scale className="w-3 h-3" />
          <span>Scales</span>
        </button>

        <button
          onClick={() => setCameraView('brain')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-mono transition-all ${
            viewPreset === 'brain'
              ? 'bg-purple-500 text-white font-bold shadow-glow-purple'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Zoom to NewgenONE Core Brain"
        >
          <Cpu className="w-3 h-3" />
          <span>Core</span>
        </button>

        <button
          onClick={() => setCameraView('agents')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-mono transition-all ${
            viewPreset === 'agents'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-glow-emerald'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Elevated Swarm Perspective"
        >
          <ShieldCheck className="w-3 h-3" />
          <span>Swarm</span>
        </button>
      </div>

      {/* Bottom 3D Labels & Spatial Hint */}
      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[11px] font-mono text-slate-400 pointer-events-none z-20">
        <span className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-cyan-500/30 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-white font-semibold">Interactive 3D WebGL Swarm</span>
        </span>
        <span className="hidden sm:inline bg-slate-900/90 px-3 py-1.5 rounded-xl border border-purple-500/30 backdrop-blur-md shadow-lg text-slate-300">
          Click & Drag to Orbit • Scroll to Zoom
        </span>
      </div>
    </div>
  );
}
