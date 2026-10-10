"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function GalaxyBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.innerWidth < 768;

    // Galaxy parameters
    const parameters = {
      count: isMobile ? 800 : 1800,
      size: isMobile ? 3.0 : 4.0,
      radius: isMobile ? 18 : 28,
      branches: 3,
      spin: 1.25,
      randomness: 0.45,
      power: 3.5,
      insideColor: "#F0F2F8", // Starlight core
      outsideColor: "#323548", // Outer cosmic dust
      accentColor: "#E07A5F", // Stellar flare copper-amber
    };

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      150
    );
    camera.position.set(0, 7, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create a circular point texture programmatically for soft starlight glow
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 32;
    starCanvas.height = 32;
    const ctx = starCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(240, 242, 248, 0.8)");
      gradient.addColorStop(0.7, "rgba(180, 190, 215, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    // Geometry Generation
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);
    const colorAccent = new THREE.Color(parameters.accentColor);

    for (let i = 0; i < parameters.count; i++) {
      // Position along spiral arms
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), parameters.power) * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) * 2 * Math.PI) / parameters.branches;

      // Randomness spread for volume
      const randomX =
        Math.pow(Math.random(), parameters.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), parameters.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        (radius * 0.4);
      const randomZ =
        Math.pow(Math.random(), parameters.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color interpolation: core is bright starlight, arms transition to cosmic dust
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      // ~15% of stars have copper-amber solar flare tint
      if (Math.random() < 0.15) {
        mixedColor.lerp(colorAccent, 0.7);
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.75,
    });

    const points = new THREE.Points(geometry, material);
    // 35-degree cosmic perspective tilt
    points.rotation.x = 0.58;
    scene.add(points);

    // Mouse and Scroll Interactivity
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const handlePointerMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
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

    // Tab visibility handling to pause RAF
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

      const elapsed = clock.getElapsedTime();

      // Smooth interaction interpolation
      if (!prefersReducedMotion) {
        mouse.x += (mouse.targetX - mouse.x) * 0.03;
        mouse.y += (mouse.targetY - mouse.y) * 0.03;
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.04;

        // Continuous slow rotation
        points.rotation.y = elapsed * 0.03 + mouse.x * 0.15;
        points.rotation.z = Math.sin(elapsed * 0.015) * 0.05 + scrollProgress * 0.2;

        // Parallax camera adjustments
        camera.position.x = mouse.x * 2.0;
        camera.position.y = 7 + mouse.y * 1.5 - scrollProgress * 4;
        camera.position.z = 30 - scrollProgress * 6;
      }

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

      geometry.dispose();
      material.dispose();
      starTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden no-print"
    >
      {/* Three.js Galaxy Canvas */}
      <div ref={containerRef} className="absolute inset-0 opacity-80" />

      {/* Protective background blur layer to guarantee foreground text readability */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-page/40" />
    </div>
  );
}
