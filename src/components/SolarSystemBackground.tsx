"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface PlanetDef {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  color: string;
  roughness?: number;
  hasRing?: boolean;
  ringInner?: number;
  ringOuter?: number;
  ringColor?: string;
  hasMoon?: boolean;
}

export function SolarSystemBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.innerWidth < 768;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      250
    );

    // Elevated overview looking down at the solar system plane
    camera.position.set(0, isMobile ? 28 : 22, isMobile ? 36 : 30);
    camera.lookAt(0, -1, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Disposables tracking for robust cleanup
    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(obj: T): T => {
      disposables.push(obj);
      return obj;
    };

    // Master Group for smooth solar plane orientation
    const solarSystemGroup = new THREE.Group();
    solarSystemGroup.rotation.x = 0.18; // Slight forward tilt for perspective depth
    scene.add(solarSystemGroup);

    // 1. Central Star: The Sun
    const sunRadius = isMobile ? 1.8 : 2.2;
    const sunGeometry = track(new THREE.SphereGeometry(sunRadius, isMobile ? 16 : 32, isMobile ? 16 : 32));
    const sunMaterial = track(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#FFAA00"),
      })
    );
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    solarSystemGroup.add(sunMesh);

    // Sun Corona Glow (Soft Additive Outer Shell)
    const coronaGeometry = track(new THREE.SphereGeometry(sunRadius * 1.35, isMobile ? 12 : 24, isMobile ? 12 : 24));
    const coronaMaterial = track(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#FF8800"),
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      })
    );
    const coronaMesh = new THREE.Mesh(coronaGeometry, coronaMaterial);
    solarSystemGroup.add(coronaMesh);

    // Solar Lighting: PointLight at the Sun illuminates all planetary surfaces
    const sunLight = new THREE.PointLight("#FFF5E0", 3.2, 120, 0.4);
    solarSystemGroup.add(sunLight);

    const ambientLight = new THREE.AmbientLight("#1C233D", 0.45);
    scene.add(ambientLight);

    // 2. Canonical Planetary Definitions
    const planetsData: PlanetDef[] = [
      { name: "Mercury", radius: 0.26, distance: 4.6, speed: 1.40, color: "#A8A29E" },
      { name: "Venus", radius: 0.42, distance: 6.6, speed: 1.05, color: "#E0B368" },
      { name: "Earth", radius: 0.46, distance: 9.0, speed: 0.85, color: "#0284C7", hasMoon: true },
      { name: "Mars", radius: 0.32, distance: 11.5, speed: 0.65, color: "#E11D48" },
      { name: "Jupiter", radius: 1.10, distance: 15.2, speed: 0.42, color: "#D97706" },
      {
        name: "Saturn",
        radius: 0.90,
        distance: 19.4,
        speed: 0.32,
        color: "#FBBF24",
        hasRing: true,
        ringInner: 1.25,
        ringOuter: 2.20,
        ringColor: "#FDE68A",
      },
      { name: "Uranus", radius: 0.62, distance: 23.4, speed: 0.22, color: "#06B6D4" },
      { name: "Neptune", radius: 0.58, distance: 27.2, speed: 0.16, color: "#3B82F6" },
    ];

    interface PlanetRuntime {
      data: PlanetDef;
      mesh: THREE.Mesh;
      group: THREE.Group;
      moonMesh?: THREE.Mesh;
      currentAngle: number;
    }

    const planetRuntimes: PlanetRuntime[] = [];
    const sphereSegments = isMobile ? 12 : 24;

    planetsData.forEach((pData, index) => {
      // Orbit Path Line (Holographic Cyberpunk Trajectory Ring)
      const orbitPoints: THREE.Vector3[] = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        orbitPoints.push(
          new THREE.Vector3(Math.cos(theta) * pData.distance, 0, Math.sin(theta) * pData.distance)
        );
      }
      const orbitGeom = track(new THREE.BufferGeometry().setFromPoints(orbitPoints));
      const orbitMat = track(
        new THREE.LineBasicMaterial({
          color: index % 2 === 0 ? "#00F0FF" : "#38BDF8",
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
        })
      );
      const orbitLine = new THREE.LineLoop(orbitGeom, orbitMat);
      solarSystemGroup.add(orbitLine);

      // Planet Group for individual orbital rotation
      const planetGroup = new THREE.Group();
      solarSystemGroup.add(planetGroup);

      // Planet Mesh
      const pGeom = track(new THREE.SphereGeometry(pData.radius, sphereSegments, sphereSegments));
      const pMat = track(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(pData.color),
          roughness: 0.7,
          metalness: 0.1,
        })
      );
      const pMesh = new THREE.Mesh(pGeom, pMat);

      // Initial distributed position along orbit
      const initialAngle = (index / planetsData.length) * Math.PI * 2 + index * 0.7;
      pMesh.position.set(
        Math.cos(initialAngle) * pData.distance,
        0,
        Math.sin(initialAngle) * pData.distance
      );
      planetGroup.add(pMesh);

      // Saturn Rings
      if (pData.hasRing && pData.ringInner && pData.ringOuter) {
        const ringGeom = track(
          new THREE.RingGeometry(pData.ringInner, pData.ringOuter, isMobile ? 32 : 64)
        );
        const ringMat = track(
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(pData.ringColor || "#FDE68A"),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.65,
            roughness: 0.8,
          })
        );
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.PI * 0.45; // Realistic tilted planetary ring
        ringMesh.rotation.y = Math.PI * 0.10;
        pMesh.add(ringMesh);
      }

      // Earth's Moon
      let moonMesh: THREE.Mesh | undefined;
      if (pData.hasMoon) {
        const moonGeom = track(new THREE.SphereGeometry(0.12, 10, 10));
        const moonMat = track(
          new THREE.MeshStandardMaterial({
            color: new THREE.Color("#CBD5E1"),
            roughness: 0.9,
          })
        );
        moonMesh = new THREE.Mesh(moonGeom, moonMat);
        moonMesh.position.set(0.85, 0.1, 0);
        pMesh.add(moonMesh);
      }

      planetRuntimes.push({
        data: pData,
        mesh: pMesh,
        group: planetGroup,
        moonMesh,
        currentAngle: initialAngle,
      });
    });

    // 3. Ambient Distant Starfield (Calm, twinkling cosmic stars)
    const starCount = isMobile ? 600 : 1400;
    const starGeom = track(new THREE.BufferGeometry());
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starColorCyan = new THREE.Color("#00F0FF");
    const starColorWhite = new THREE.Color("#FFFFFF");
    const starColorAmber = new THREE.Color("#F59E0B");

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radiusDist = 50 + Math.random() * 90;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i3] = radiusDist * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radiusDist * Math.cos(phi) * 0.7; // Flatter cosmic disk
      starPositions[i3 + 2] = radiusDist * Math.sin(phi) * Math.sin(theta);

      const colorPick = Math.random();
      const col =
        colorPick < 0.65
          ? starColorWhite
          : colorPick < 0.85
          ? starColorCyan
          : starColorAmber;

      starColors[i3] = col.r;
      starColors[i3 + 1] = col.g;
      starColors[i3 + 2] = col.b;
    }

    starGeom.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeom.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = track(
      new THREE.PointsMaterial({
        size: isMobile ? 1.5 : 2.0,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      })
    );
    const starField = new THREE.Points(starGeom, starMat);
    scene.add(starField);

    // Window Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Tab visibility handling
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Animation Loop: Steady, calm orbits with zero parallax jumps
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Calm rotation of the central star and corona
        sunMesh.rotation.y += delta * 0.15;
        coronaMesh.rotation.y -= delta * 0.08;

        // Subtle corona breathing pulse
        const pulse = 1 + Math.sin(elapsed * 1.5) * 0.03;
        coronaMesh.scale.set(pulse, pulse, pulse);

        // Update each planet's orbital position and axial spin
        planetRuntimes.forEach((p) => {
          // Orbital advance: speed factor tuned for smooth, pleasant motion
          p.currentAngle += delta * p.data.speed * 0.22;
          p.mesh.position.x = Math.cos(p.currentAngle) * p.data.distance;
          p.mesh.position.z = Math.sin(p.currentAngle) * p.data.distance;

          // Planetary axial spin
          p.mesh.rotation.y += delta * 0.6;

          // Moon orbit around Earth
          if (p.moonMesh) {
            const moonAngle = elapsed * 2.2;
            p.moonMesh.position.x = Math.cos(moonAngle) * 0.85;
            p.moonMesh.position.z = Math.sin(moonAngle) * 0.85;
          }
        });

        // Gentle, calm galactic drift of the entire system
        solarSystemGroup.rotation.y = elapsed * 0.008;
        starField.rotation.y = elapsed * 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden no-print"
    >
      {/* 3D Solar System Canvas (dimmed for high text contrast) */}
      <div ref={containerRef} className="absolute inset-0 opacity-45" />

      {/* Deep Space Dark Scrim guaranteeing 100% pure contrast for foreground text */}
      <div className="absolute inset-0 bg-[#05060A]/80 pointer-events-none" />
    </div>
  );
}
