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
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      250
    );

    // Elevated camera positioned for isometric perspective looking at the center
    camera.position.set(0, isMobile ? 18 : 16, isMobile ? 36 : 32);
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

    // Disposables tracking for robust cleanup
    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(obj: T): T => {
      disposables.push(obj);
      return obj;
    };

    // Master Group configured with classic isometric tilt and depth
    const solarSystemGroup = new THREE.Group();
    solarSystemGroup.rotation.x = 0.58; // Incline orbital plane ~33 degrees
    solarSystemGroup.rotation.z = -0.32; // Diagonal isometric orientation
    scene.add(solarSystemGroup);

    // 1. Radiant Central Star: The Sun in the middle
    const sunRadius = isMobile ? 2.0 : 2.6;
    const sunGeometry = track(
      new THREE.SphereGeometry(sunRadius, isMobile ? 20 : 32, isMobile ? 20 : 32)
    );
    const sunMaterial = track(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#FFBA08"),
      })
    );
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    solarSystemGroup.add(sunMesh);

    // Sun Corona Glow (Pulsating Additive Outer Aura)
    const coronaGeometry = track(
      new THREE.SphereGeometry(sunRadius * 1.45, isMobile ? 16 : 28, isMobile ? 16 : 28)
    );
    const coronaMaterial = track(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#FF6B00"),
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      })
    );
    const coronaMesh = new THREE.Mesh(coronaGeometry, coronaMaterial);
    solarSystemGroup.add(coronaMesh);

    // Outer Solar Flare Halo Sprite
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = 64;
    haloCanvas.height = 64;
    const haloCtx = haloCanvas.getContext("2d");
    if (haloCtx) {
      const gradient = haloCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 230, 150, 0.8)");
      gradient.addColorStop(0.3, "rgba(255, 140, 0, 0.35)");
      gradient.addColorStop(0.7, "rgba(255, 80, 0, 0.1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      haloCtx.fillStyle = gradient;
      haloCtx.fillRect(0, 0, 64, 64);
    }
    const haloTexture = track(new THREE.CanvasTexture(haloCanvas));
    const haloMat = track(
      new THREE.SpriteMaterial({
        map: haloTexture,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      })
    );
    const haloSprite = new THREE.Sprite(haloMat);
    haloSprite.scale.set(sunRadius * 4.2, sunRadius * 4.2, 1);
    solarSystemGroup.add(haloSprite);

    // Solar Illumination: Radiant PointLight illuminating all orbiting planets
    const sunLight = new THREE.PointLight("#FFF8E7", 4.5, 150, 0.35);
    solarSystemGroup.add(sunLight);

    const ambientLight = new THREE.AmbientLight("#1A2238", 0.55);
    scene.add(ambientLight);

    // 2. Canonical Planetary Definitions with Isometric Depth
    const planetsData: PlanetDef[] = [
      { name: "Mercury", radius: 0.32, distance: 4.8, speed: 1.35, color: "#A8A29E" },
      { name: "Venus", radius: 0.50, distance: 7.0, speed: 1.05, color: "#E0B368" },
      { name: "Earth", radius: 0.55, distance: 9.6, speed: 0.85, color: "#0284C7", hasMoon: true },
      { name: "Mars", radius: 0.40, distance: 12.2, speed: 0.65, color: "#E11D48" },
      { name: "Jupiter", radius: 1.25, distance: 16.0, speed: 0.42, color: "#D97706" },
      {
        name: "Saturn",
        radius: 1.05,
        distance: 20.4,
        speed: 0.32,
        color: "#FBBF24",
        hasRing: true,
        ringInner: 1.45,
        ringOuter: 2.65,
        ringColor: "#FDE68A",
      },
      { name: "Uranus", radius: 0.75, distance: 24.6, speed: 0.22, color: "#06B6D4" },
      { name: "Neptune", radius: 0.70, distance: 28.6, speed: 0.16, color: "#3B82F6" },
    ];

    interface PlanetRuntime {
      data: PlanetDef;
      mesh: THREE.Mesh;
      group: THREE.Group;
      moonMesh?: THREE.Mesh;
      currentAngle: number;
    }

    const planetRuntimes: PlanetRuntime[] = [];
    const sphereSegments = isMobile ? 16 : 28;

    planetsData.forEach((pData, index) => {
      // Holographic Orbit Trajectory Ring (Noticeable glowing isometric ellipses)
      const orbitPoints: THREE.Vector3[] = [];
      const segments = 96;
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
          opacity: 0.38,
          blending: THREE.AdditiveBlending,
        })
      );
      const orbitLine = new THREE.LineLoop(orbitGeom, orbitMat);
      solarSystemGroup.add(orbitLine);

      // Planet Group for individual orbital revolution
      const planetGroup = new THREE.Group();
      solarSystemGroup.add(planetGroup);

      // Planet Mesh with standard lighting and material depth
      const pGeom = track(new THREE.SphereGeometry(pData.radius, sphereSegments, sphereSegments));
      const pMat = track(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(pData.color),
          roughness: 0.6,
          metalness: 0.1,
        })
      );
      const pMesh = new THREE.Mesh(pGeom, pMat);

      // Distributed initial orbital angle
      const initialAngle = (index / planetsData.length) * Math.PI * 2 + index * 0.8;
      pMesh.position.set(
        Math.cos(initialAngle) * pData.distance,
        0,
        Math.sin(initialAngle) * pData.distance
      );
      planetGroup.add(pMesh);

      // Saturn Rings with 3D axial tilt
      if (pData.hasRing && pData.ringInner && pData.ringOuter) {
        const ringGeom = track(
          new THREE.RingGeometry(pData.ringInner, pData.ringOuter, isMobile ? 40 : 64)
        );
        const ringMat = track(
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(pData.ringColor || "#FDE68A"),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.75,
            roughness: 0.7,
          })
        );
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.PI * 0.45;
        ringMesh.rotation.y = Math.PI * 0.12;
        pMesh.add(ringMesh);
      }

      // Earth's Moon
      let moonMesh: THREE.Mesh | undefined;
      if (pData.hasMoon) {
        const moonGeom = track(new THREE.SphereGeometry(0.16, 12, 12));
        const moonMat = track(
          new THREE.MeshStandardMaterial({
            color: new THREE.Color("#CBD5E1"),
            roughness: 0.8,
          })
        );
        moonMesh = new THREE.Mesh(moonGeom, moonMat);
        moonMesh.position.set(1.0, 0.15, 0);
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

    // 3. Ambient Distant Cosmic Starfield
    const starCount = isMobile ? 800 : 1600;
    const starGeom = track(new THREE.BufferGeometry());
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starColorCyan = new THREE.Color("#00F0FF");
    const starColorWhite = new THREE.Color("#FFFFFF");
    const starColorAmber = new THREE.Color("#F59E0B");

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radiusDist = 55 + Math.random() * 95;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i3] = radiusDist * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radiusDist * Math.cos(phi) * 0.65;
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
        size: isMobile ? 1.6 : 2.2,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
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

    // Animation Loop: Isometric planetary revolution with authentic 3D depth
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Central Sun axial rotation and corona breathing pulse
        sunMesh.rotation.y += delta * 0.18;
        coronaMesh.rotation.y -= delta * 0.10;

        const pulse = 1 + Math.sin(elapsed * 1.8) * 0.04;
        coronaMesh.scale.set(pulse, pulse, pulse);
        haloSprite.scale.set(
          sunRadius * 4.2 * (1 + Math.sin(elapsed * 1.2) * 0.03),
          sunRadius * 4.2 * (1 + Math.sin(elapsed * 1.2) * 0.03),
          1
        );

        // Planetary orbital revolution along isometric track
        planetRuntimes.forEach((p) => {
          p.currentAngle += delta * p.data.speed * 0.24;
          p.mesh.position.x = Math.cos(p.currentAngle) * p.data.distance;
          p.mesh.position.z = Math.sin(p.currentAngle) * p.data.distance;

          // Planetary axial spin
          p.mesh.rotation.y += delta * 0.65;

          // Moon revolution around Earth
          if (p.moonMesh) {
            const moonAngle = elapsed * 2.5;
            p.moonMesh.position.x = Math.cos(moonAngle) * 1.0;
            p.moonMesh.position.z = Math.sin(moonAngle) * 1.0;
          }
        });

        // Gentle cosmic drift
        solarSystemGroup.rotation.y = elapsed * 0.006;
        starField.rotation.y = elapsed * 0.0015;
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
      {/* 3D Isometric Solar System Canvas (High visibility 90% opacity) */}
      <div ref={containerRef} className="absolute inset-0 opacity-90" />

      {/* Subtle depth vignette wash preserving text contrast without hiding 3D space */}
      <div className="absolute inset-0 bg-[#05060A]/35 pointer-events-none" />
    </div>
  );
}
