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

interface CometRuntime {
  active: boolean;
  spawnDelay: number;
  progress: number;
  duration: number;
  startPos: THREE.Vector3;
  velocity: THREE.Vector3;
  tailLength: number;
  geom: THREE.BufferGeometry;
  line: THREE.Line;
  head: THREE.Sprite;
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

    // Spherical Orbit Coordinates locked to the Sun at (0, 0, 0)
    const orbitRadius = isMobile ? 40 : 36;
    let orbitTheta = 0; // Azimuth angle
    let orbitPhi = 1.107; // Polar angle (~63.4 degrees, matching isometric elevation)

    camera.position.set(
      orbitRadius * Math.sin(orbitPhi) * Math.sin(orbitTheta),
      orbitRadius * Math.cos(orbitPhi),
      orbitRadius * Math.sin(orbitPhi) * Math.cos(orbitTheta)
    );
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

    // Sun Corona Glow (Pulsating Additive Outer Aura with depthWrite: false to stop blackbox occlusion)
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
        depthWrite: false, // Critical: stops depth buffer occlusion
      })
    );
    const coronaMesh = new THREE.Mesh(coronaGeometry, coronaMaterial);
    solarSystemGroup.add(coronaMesh);

    // Outer Solar Flare Halo Sprite (depthWrite: false prevents rectangular cutout)
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = 128;
    haloCanvas.height = 128;
    const haloCtx = haloCanvas.getContext("2d");
    if (haloCtx) {
      haloCtx.clearRect(0, 0, 128, 128);
      const gradient = haloCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(255, 230, 150, 0.85)");
      gradient.addColorStop(0.25, "rgba(255, 140, 0, 0.38)");
      gradient.addColorStop(0.65, "rgba(255, 80, 0, 0.12)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      haloCtx.fillStyle = gradient;
      haloCtx.fillRect(0, 0, 128, 128);
    }
    const haloTexture = track(new THREE.CanvasTexture(haloCanvas));
    haloTexture.generateMipmaps = false;
    haloTexture.minFilter = THREE.LinearFilter;
    haloTexture.magFilter = THREE.LinearFilter;

    const haloMat = track(
      new THREE.SpriteMaterial({
        map: haloTexture,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false, // Critical: stops blackbox cutout artifact
        depthTest: true,
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
          depthWrite: false, // Prevents orbit lines from clipping each other or background
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

    // 3. Ambient Distant Cosmic Starfield with GPU Twinkling Shader
    const starCount = isMobile ? 800 : 1600;
    const starGeom = track(new THREE.BufferGeometry());
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starTwinkleSpeeds = new Float32Array(starCount);
    const starPhases = new Float32Array(starCount);
    const starSizes = new Float32Array(starCount);

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

      // Varied organic twinkle frequency and phase
      starTwinkleSpeeds[i] = 1.0 + Math.random() * 2.8;
      starPhases[i] = Math.random() * Math.PI * 2;
      starSizes[i] = (isMobile ? 1.4 : 1.8) + Math.random() * 1.4;
    }

    starGeom.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeom.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    starGeom.setAttribute("aTwinkleSpeed", new THREE.BufferAttribute(starTwinkleSpeeds, 1));
    starGeom.setAttribute("aPhase", new THREE.BufferAttribute(starPhases, 1));
    starGeom.setAttribute("aSize", new THREE.BufferAttribute(starSizes, 1));

    const starShaderMat = track(
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5) },
        },
        vertexShader: `
          uniform float uTime;
          uniform float uPixelRatio;
          attribute float aTwinkleSpeed;
          attribute float aPhase;
          attribute float aSize;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float twinkle = 0.35 + 0.65 * sin(uTime * aTwinkleSpeed + aPhase);
            vAlpha = twinkle;
            gl_PointSize = aSize * uPixelRatio * (200.0 / -mvPosition.z) * (0.8 + 0.3 * twinkle);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            float dist = length(coord);
            if (dist > 0.5) discard;
            float glow = smoothstep(0.5, 0.0, dist);
            gl_FragColor = vec4(vColor, vAlpha * glow * 0.9);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      })
    );
    const starField = new THREE.Points(starGeom, starShaderMat);
    scene.add(starField);

    // 4. Dynamic Flying Comets / Shooting Stars Runner
    const cometCanvas = document.createElement("canvas");
    cometCanvas.width = 64;
    cometCanvas.height = 64;
    const cCtx = cometCanvas.getContext("2d");
    if (cCtx) {
      cCtx.clearRect(0, 0, 64, 64);
      const g = cCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255, 255, 255, 1.0)");
      g.addColorStop(0.25, "rgba(0, 240, 255, 0.85)");
      g.addColorStop(0.6, "rgba(0, 240, 255, 0.2)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      cCtx.fillStyle = g;
      cCtx.fillRect(0, 0, 64, 64);
    }
    const cometHeadTexture = track(new THREE.CanvasTexture(cometCanvas));

    const cometRuntimes: CometRuntime[] = [];
    const cometCount = 2;
    const tailSegments = 14;

    for (let c = 0; c < cometCount; c++) {
      const cGeom = track(new THREE.BufferGeometry());
      const cPositions = new Float32Array(tailSegments * 3);
      const cColors = new Float32Array(tailSegments * 3);

      for (let k = 0; k < tailSegments; k++) {
        const frac = k / (tailSegments - 1);
        const falloff = Math.pow(1 - frac, 2.0);
        const k3 = k * 3;
        if (k === 0) {
          cColors[k3] = 1.0;
          cColors[k3 + 1] = 1.0;
          cColors[k3 + 2] = 1.0;
        } else {
          cColors[k3] = 0.0 * falloff;
          cColors[k3 + 1] = 0.94 * falloff;
          cColors[k3 + 2] = 1.0 * falloff;
        }
      }

      cGeom.setAttribute("position", new THREE.BufferAttribute(cPositions, 3));
      cGeom.setAttribute("color", new THREE.BufferAttribute(cColors, 3));

      const cLineMat = track(
        new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      const cLine = new THREE.Line(cGeom, cLineMat);
      cLine.visible = false;
      scene.add(cLine);

      const cHeadMat = track(
        new THREE.SpriteMaterial({
          map: cometHeadTexture,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      const cHead = new THREE.Sprite(cHeadMat);
      cHead.scale.set(1.8, 1.8, 1);
      cHead.visible = false;
      scene.add(cHead);

      cometRuntimes.push({
        active: false,
        spawnDelay: c === 0 ? 0.8 : 3.4,
        progress: 0,
        duration: 1.5,
        startPos: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        tailLength: 12,
        geom: cGeom,
        line: cLine,
        head: cHead,
      });
    }

    // 5. Interactive Spherical Orbit Controller (Locked to Central Sun)
    let downPointerX = 0;
    let downPointerY = 0;

    const currentLookAt = new THREE.Vector3(0, 0, 0);
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const tempTargetPos = new THREE.Vector3();

    let isWarping = false;
    let warpSpeed = 1.0;

    const handleWarpStart = () => { isWarping = true; };
    const handleWarpEnd = () => { isWarping = false; };

    window.addEventListener("rocket-hyperdrive-start", handleWarpStart);
    window.addEventListener("rocket-hyperdrive-end", handleWarpEnd);

    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let velocityTheta = 0;
    let velocityPhi = 0;

    const isInteractiveElement = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return !!target.closest(
        'a, button, input, textarea, select, [role="button"], [role="dialog"], [role="menuitem"], summary, pre, code, article, [data-interactive="true"], [data-card="true"]'
      );
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Touch scrolling on mobile or trackpads will never move or tilt the solar system
      if (e.pointerType === "touch") return;
      if (e.button !== 0) return; // Only primary left click
      if (isInteractiveElement(e.target)) return; // Never block UI cards, buttons, links, or modals

      downPointerX = e.clientX;
      downPointerY = e.clientY;
      isDragging = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      velocityTheta = 0;
      velocityPhi = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;

      const deltaTheta = -dx * 0.0065;
      const deltaPhi = -dy * 0.005;

      orbitTheta += deltaTheta;
      orbitPhi = Math.max(0.22, Math.min(Math.PI * 0.74, orbitPhi + deltaPhi));

      velocityTheta = deltaTheta;
      velocityPhi = deltaPhi;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    // Window Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const pr = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5);
      renderer.setPixelRatio(pr);
      starShaderMat.uniforms.uPixelRatio.value = pr;
    };
    window.addEventListener("resize", handleResize);

    // Tab visibility handling
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Animation Loop: Isometric planetary revolution with interactive orbiting camera
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Update Starfield GPU Twinkling
      starShaderMat.uniforms.uTime.value = elapsed;

      // Update Camera Spherical Orbit (Camera strictly locked to orbiting the Sun at (0, 0, 0))
      targetLookAt.set(0, 0, 0);
      currentLookAt.lerp(targetLookAt, delta * 3.0);

      if (!isDragging) {
        if (Math.abs(velocityTheta) > 0.00005 || Math.abs(velocityPhi) > 0.00005) {
          orbitTheta += velocityTheta;
          orbitPhi = Math.max(0.22, Math.min(Math.PI * 0.74, orbitPhi + velocityPhi));
          velocityTheta *= 0.93;
          velocityPhi *= 0.93;
        } else if (!prefersReducedMotion) {
          orbitTheta += delta * 0.035;
        }
      }

      const targetCamX = orbitRadius * Math.sin(orbitPhi) * Math.sin(orbitTheta);
      const targetCamY = orbitRadius * Math.cos(orbitPhi);
      const targetCamZ = orbitRadius * Math.sin(orbitPhi) * Math.cos(orbitTheta);

      camera.position.lerp(tempTargetPos.set(targetCamX, targetCamY, targetCamZ), delta * 2.8);
      camera.lookAt(currentLookAt);

      // Starfield warp speed acceleration
      const targetWarpMult = isWarping ? 5.5 : 1.0;
      warpSpeed += (targetWarpMult - warpSpeed) * delta * 4;

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

        // Dynamic Flying Comets
        cometRuntimes.forEach((comet) => {
          if (!comet.active) {
            comet.spawnDelay -= delta;
            if (comet.spawnDelay <= 0) {
              comet.active = true;
              comet.duration = 1.3 + Math.random() * 0.6;
              comet.progress = 0;
              comet.tailLength = 11 + Math.random() * 6;

              const startX = -32 + Math.random() * 18;
              const startY = 16 + Math.random() * 12;
              const startZ = -22 + Math.random() * 18;
              comet.startPos.set(startX, startY, startZ);

              const dirX = 36 + Math.random() * 14;
              const dirY = -18 - Math.random() * 10;
              const dirZ = 20 + Math.random() * 14;
              comet.velocity.set(dirX, dirY, dirZ);

              comet.line.visible = true;
              comet.head.visible = true;
            }
          } else {
            comet.progress += delta;
            const t = comet.progress / comet.duration;
            if (t >= 1.0) {
              comet.active = false;
              comet.line.visible = false;
              comet.head.visible = false;
              comet.spawnDelay = 2.8 + Math.random() * 3.4;
            } else {
              const headX = comet.startPos.x + comet.velocity.x * comet.progress;
              const headY = comet.startPos.y + comet.velocity.y * comet.progress;
              const headZ = comet.startPos.z + comet.velocity.z * comet.progress;
              comet.head.position.set(headX, headY, headZ);

              const velNorm = comet.velocity.clone().normalize();
              const headFade = t > 0.75 ? (1.0 - t) / 0.25 : 1.0;
              comet.head.scale.set(1.8 * headFade, 1.8 * headFade, 1);

              const posAttr = comet.geom.getAttribute("position") as THREE.BufferAttribute;
              const arr = posAttr.array as Float32Array;
              const currentTailLen = Math.min(comet.tailLength, comet.progress * comet.velocity.length() * 0.4);

              for (let k = 0; k < tailSegments; k++) {
                const frac = k / (tailSegments - 1);
                const k3 = k * 3;
                arr[k3] = headX - velNorm.x * (currentTailLen * frac);
                arr[k3 + 1] = headY - velNorm.y * (currentTailLen * frac);
                arr[k3 + 2] = headZ - velNorm.z * (currentTailLen * frac);
              }
              posAttr.needsUpdate = true;
            }
          }
        });

        // Calm cosmic drift of starfield
        starField.rotation.y = elapsed * 0.0015;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("rocket-hyperdrive-start", handleWarpStart);
      window.removeEventListener("rocket-hyperdrive-end", handleWarpEnd);

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
