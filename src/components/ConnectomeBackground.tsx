"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface NodeData {
  baseX: number;
  baseY: number;
  baseZ: number;
  currentX: number;
  currentY: number;
  currentZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: THREE.Color;
}

export function ConnectomeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Viewport and performance metrics
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 36 : 92;
    const maxConnectionDist = isMobile ? 8.5 : 10.5;
    const maxConnections = isMobile ? 140 : 320;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Color definitions keyed to theme palette
    const colorMuted = new THREE.Color("#A3A1A8"); // warm muted ink
    const colorDeep = new THREE.Color("#444550"); // deep structural tone
    const colorAccent = new THREE.Color("#E07A5F"); // warm terracotta/copper
    const colorFilament = new THREE.Color("#2C2D35"); // border rule tone

    // Initialize node data
    const nodes: NodeData[] = [];
    const spreadX = isMobile ? 16 : 28;
    const spreadY = isMobile ? 22 : 26;
    const spreadZ = 32;

    for (let i = 0; i < nodeCount; i++) {
      const bx = (Math.random() - 0.5) * spreadX * 2;
      const by = (Math.random() - 0.5) * spreadY * 2;
      const bz = (Math.random() - 0.5) * spreadZ * 2;

      // ~18% accent nodes, others muted or deep
      const rand = Math.random();
      const nodeColor =
        rand < 0.18
          ? colorAccent.clone()
          : rand < 0.65
          ? colorMuted.clone()
          : colorDeep.clone();

      nodes.push({
        baseX: bx,
        baseY: by,
        baseZ: bz,
        currentX: bx,
        currentY: by,
        currentZ: bz,
        vx: 0,
        vy: 0,
        vz: 0,
        size: rand < 0.18 ? 3.8 : 2.6,
        color: nodeColor,
      });
    }

    // Node Points Geometry & Material
    const pointPositions = new Float32Array(nodeCount * 3);
    const pointColors = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      pointPositions[i * 3] = nodes[i].currentX;
      pointPositions[i * 3 + 1] = nodes[i].currentY;
      pointPositions[i * 3 + 2] = nodes[i].currentZ;

      pointColors[i * 3] = nodes[i].color.r;
      pointColors[i * 3 + 1] = nodes[i].color.g;
      pointColors[i * 3 + 2] = nodes[i].color.b;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(pointPositions, 3)
    );
    pointsGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(pointColors, 3)
    );

    // Create a circular point texture programmatically to avoid external asset dependencies
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(16, 16, 13, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
    const pointTexture = new THREE.CanvasTexture(canvas);

    const pointsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 3.5 : 4.5,
      vertexColors: true,
      map: pointTexture,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointCloud);

    // Filaments / Axonal Connections (LineSegments)
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const linesGeometry = new THREE.BufferGeometry();
    const linePosAttr = new THREE.BufferAttribute(linePositions, 3);
    const lineColorAttr = new THREE.BufferAttribute(lineColors, 3);

    linesGeometry.setAttribute("position", linePosAttr);
    linesGeometry.setAttribute("color", lineColorAttr);

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const lineSegments = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lineSegments);

    // Interaction State
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      worldX: 0,
      worldY: 0,
      hasMoved: false,
    };

    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const handlePointerMove = (e: MouseEvent) => {
      mouse.hasMoved = true;
      // Normalized device coordinates (-1 to 1)
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Project roughly to world coordinate plane at z=0
      mouse.worldX = mouse.targetX * (spreadX * 0.7);
      mouse.worldY = mouse.targetY * (spreadY * 0.7);
    };

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Window Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Visibility Listener to suspend RAF when tab is hidden
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth interaction interpolation (lerp)
      if (!prefersReducedMotion) {
        mouse.x += (mouse.targetX - mouse.x) * 0.04;
        mouse.y += (mouse.targetY - mouse.y) * 0.04;
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.05;
      }

      // Parallax camera adjustments based on scroll and mouse
      if (!prefersReducedMotion) {
        // Camera smoothly glides forward and pivots slightly through the connectome volume
        camera.position.z = 32 - scrollProgress * 18;
        camera.position.x = mouse.x * 2.5 + Math.sin(scrollProgress * Math.PI) * 2;
        camera.position.y = mouse.y * 2.0 - scrollProgress * 5;

        camera.rotation.y = mouse.x * 0.08 + scrollProgress * 0.25;
        camera.rotation.x = -mouse.y * 0.06;
        camera.rotation.z = Math.sin(scrollProgress * Math.PI * 0.5) * 0.05;
      }

      // Update Node positions with organic drift and mouse interaction
      const positions = pointsGeometry.attributes.position.array as Float32Array;
      const mouseInfluenceRadius = isMobile ? 6 : 9;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          // Gentle organic harmonic drift (simulating synaptic pulsation)
          const driftX = Math.sin(elapsed * 0.4 + i * 1.3) * 0.35;
          const driftY = Math.cos(elapsed * 0.35 + i * 1.7) * 0.35;
          const driftZ = Math.sin(elapsed * 0.3 + i * 0.9) * 0.25;

          const targetX = node.baseX + driftX;
          const targetY = node.baseY + driftY;
          const targetZ = node.baseZ + driftZ;

          // Mouse deflection
          if (mouse.hasMoved && !isMobile) {
            const dx = node.currentX - mouse.worldX;
            const dy = node.currentY - mouse.worldY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseInfluenceRadius && dist > 0.01) {
              const force = (1 - dist / mouseInfluenceRadius) * 0.8;
              node.vx += (dx / dist) * force;
              node.vy += (dy / dist) * force;
            }
          }

          // Elastic spring back to base position
          node.vx += (targetX - node.currentX) * 0.035;
          node.vy += (targetY - node.currentY) * 0.035;
          node.vz += (targetZ - node.currentZ) * 0.035;

          // Friction damping
          node.vx *= 0.88;
          node.vy *= 0.88;
          node.vz *= 0.88;

          node.currentX += node.vx;
          node.currentY += node.vy;
          node.currentZ += node.vz;
        }

        positions[i * 3] = node.currentX;
        positions[i * 3 + 1] = node.currentY;
        positions[i * 3 + 2] = node.currentZ;
      }
      pointsGeometry.attributes.position.needsUpdate = true;

      // Update Filaments / Connections
      let lineIndex = 0;
      const linePositionsArr = linesGeometry.attributes.position
        .array as Float32Array;
      const lineColorsArr = linesGeometry.attributes.color.array as Float32Array;

      for (let i = 0; i < nodeCount && lineIndex < maxConnections; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodeCount && lineIndex < maxConnections; j++) {
          const n2 = nodes[j];
          const dx = n1.currentX - n2.currentX;
          const dy = n1.currentY - n2.currentY;
          const dz = n1.currentZ - n2.currentZ;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxConnectionDist * maxConnectionDist) {
            const dist = Math.sqrt(distSq);
            const alpha = 1 - dist / maxConnectionDist;

            // Filament coordinates
            const offset = lineIndex * 6;
            linePositionsArr[offset] = n1.currentX;
            linePositionsArr[offset + 1] = n1.currentY;
            linePositionsArr[offset + 2] = n1.currentZ;

            linePositionsArr[offset + 3] = n2.currentX;
            linePositionsArr[offset + 4] = n2.currentY;
            linePositionsArr[offset + 5] = n2.currentZ;

            // Line colors blended with alpha intensity
            const cr = colorFilament.r * alpha;
            const cg = colorFilament.g * alpha;
            const cb = colorFilament.b * alpha;

            lineColorsArr[offset] = cr;
            lineColorsArr[offset + 1] = cg;
            lineColorsArr[offset + 2] = cb;

            lineColorsArr[offset + 3] = cr;
            lineColorsArr[offset + 4] = cg;
            lineColorsArr[offset + 5] = cb;

            lineIndex++;
          }
        }
      }

      linesGeometry.setDrawRange(0, lineIndex * 2);
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      pointsGeometry.dispose();
      pointsMaterial.dispose();
      pointTexture.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden no-print opacity-65"
    />
  );
}
