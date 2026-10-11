"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLiteMode } from "../lib/liteMode";

interface ThrusterParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  size: number;
  color: string;
}

export function SatelliteRelay() {
  const lite = useLiteMode();
  const [forceLoad, setForceLoad] = useState(false);

  // Subsystem States
  const [wingsDeployed, setWingsDeployed] = useState(true);
  const [thrusterFiring, setThrusterFiring] = useState(false);
  const [dishTracking, setDishTracking] = useState(true);
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const wingsDeployedRef = useRef(true);
  const thrusterFiringRef = useRef(false);
  const dishTrackingRef = useRef(true);

  wingsDeployedRef.current = wingsDeployed;
  thrusterFiringRef.current = thrusterFiring;
  dishTrackingRef.current = dishTracking;

  useEffect(() => {
    if (lite === true && !forceLoad) return;
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4.8, 2.6, 5.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const domEl = renderer.domElement;
    domEl.style.touchAction = "none";
    container.appendChild(domEl);

    // Disposables tracking
    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(obj: T): T => {
      disposables.push(obj);
      return obj;
    };

    // Master Satellite Group
    const satelliteGroup = new THREE.Group();
    satelliteGroup.rotation.y = 0.5;
    scene.add(satelliteGroup);

    // Lighting: Key Cyberpunk Cyan light and Warm Starlight fill
    const ambientLight = new THREE.AmbientLight("#FFFFFF", 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#00F0FF", 2.2);
    keyLight.position.set(6, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#F59E0B", 1.8);
    rimLight.position.set(-6, -4, -5);
    scene.add(rimLight);

    // 1. Central Bus Chassis (Hexagonal metallic titanium body)
    const busGeometry = track(new THREE.CylinderGeometry(0.85, 0.85, 1.8, 6));
    const busMaterial = track(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0F172A"),
        metalness: 0.85,
        roughness: 0.25,
      })
    );
    const busMesh = new THREE.Mesh(busGeometry, busMaterial);
    satelliteGroup.add(busMesh);

    // Gold Foil Radiation Shielding Bands
    const foilGeom = track(new THREE.CylinderGeometry(0.87, 0.87, 0.5, 6));
    const foilMat = track(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFBA08"),
        metalness: 0.9,
        roughness: 0.35,
        emissive: new THREE.Color("#B45309"),
        emissiveIntensity: 0.2,
      })
    );
    const foilMesh = new THREE.Mesh(foilGeom, foilMat);
    foilMesh.position.y = 0.1;
    satelliteGroup.add(foilMesh);

    // 2. High-Gain Parabolic Communications Dish
    const dishGroup = new THREE.Group();
    dishGroup.position.set(0, 1.05, 0);
    satelliteGroup.add(dishGroup);

    const dishGeom = track(new THREE.SphereGeometry(0.65, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.45));
    const dishMat = track(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#CBD5E1"),
        metalness: 0.7,
        roughness: 0.3,
        side: THREE.DoubleSide,
      })
    );
    const dishMesh = new THREE.Mesh(dishGeom, dishMat);
    dishMesh.rotation.x = Math.PI * 0.9;
    dishGroup.add(dishMesh);

    // Feed Horn Antenna Stalk
    const feedGeom = track(new THREE.CylinderGeometry(0.04, 0.04, 0.75, 8));
    const feedMat = track(new THREE.MeshStandardMaterial({ color: new THREE.Color("#00F0FF"), metalness: 0.8 }));
    const feedMesh = new THREE.Mesh(feedGeom, feedMat);
    feedMesh.position.set(0, 0.35, 0);
    dishGroup.add(feedMesh);

    // 3. Ion Propulsion Thruster Assembly (Rear Nozzle)
    const nozzleGeom = track(new THREE.CylinderGeometry(0.28, 0.42, 0.45, 16));
    const nozzleMat = track(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#334155"),
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    const nozzleMesh = new THREE.Mesh(nozzleGeom, nozzleMat);
    nozzleMesh.position.set(0, -1.05, 0);
    satelliteGroup.add(nozzleMesh);

    // Nozzle Plasma Glow Ring
    const glowRingGeom = track(new THREE.TorusGeometry(0.38, 0.04, 12, 24));
    const glowRingMat = track(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00F0FF"),
      })
    );
    const glowRing = new THREE.Mesh(glowRingGeom, glowRingMat);
    glowRing.rotation.x = Math.PI / 2;
    glowRing.position.set(0, -1.25, 0);
    satelliteGroup.add(glowRing);

    // 4. Twin Deployable Photovoltaic Solar Array Wings
    const createWing = (dir: 1 | -1) => {
      const hinge = new THREE.Group();
      hinge.position.set(dir * 0.85, 0, 0);

      const panelGeom = track(new THREE.BoxGeometry(1.6, 0.8, 0.04));
      const panelMat = track(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#0C4A6E"),
          metalness: 0.6,
          roughness: 0.2,
          emissive: new THREE.Color("#0284C7"),
          emissiveIntensity: 0.35,
        })
      );
      const panelMesh = new THREE.Mesh(panelGeom, panelMat);
      panelMesh.position.set(dir * 0.9, 0, 0);
      hinge.add(panelMesh);

      // Gold strut arm
      const strutGeom = track(new THREE.CylinderGeometry(0.03, 0.03, 0.25, 8));
      const strutMat = track(new THREE.MeshStandardMaterial({ color: new THREE.Color("#FFBA08") }));
      const strutMesh = new THREE.Mesh(strutGeom, strutMat);
      strutMesh.rotation.z = Math.PI / 2;
      strutMesh.position.set(dir * 0.1, 0, 0);
      hinge.add(strutMesh);

      satelliteGroup.add(hinge);
      return hinge;
    };

    const leftWingHinge = createWing(-1);
    const rightWingHinge = createWing(1);

    // 5. Thruster Plasma Particles System
    const particles: ThrusterParticle[] = [];
    const maxParticles = 60;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(maxParticles * 3);
    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = track(
      new THREE.PointsMaterial({
        color: new THREE.Color("#00F0FF"),
        size: 0.18,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      })
    );
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    satelliteGroup.add(particleSystem);

    // 6. Interactive Drag Orbit Controller (Completely isolated)
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotVelX = 0;
    let rotVelY = 0;

    const onPointerDown = (e: PointerEvent) => {
      e.stopPropagation();
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      rotVelX = 0;
      rotVelY = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      e.stopPropagation();
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      satelliteGroup.rotation.y += dx * 0.008;
      satelliteGroup.rotation.x += dy * 0.008;

      rotVelY = dx * 0.008;
      rotVelX = dy * 0.008;
    };

    const onPointerUp = (e?: PointerEvent) => {
      if (isDragging) {
        e?.stopPropagation();
        isDragging = false;
      }
    };

    domEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Autonomous subtle orbit rotation with inertia dampening
      if (!isDragging) {
        if (Math.abs(rotVelX) > 0.0001 || Math.abs(rotVelY) > 0.0001) {
          satelliteGroup.rotation.x += rotVelX;
          satelliteGroup.rotation.y += rotVelY;
          rotVelX *= 0.92;
          rotVelY *= 0.92;
        } else {
          satelliteGroup.rotation.y += delta * 0.18;
          satelliteGroup.rotation.z = Math.sin(elapsed * 0.6) * 0.08;
        }
      }

      // Dish Scanning Animation
      if (dishTrackingRef.current) {
        dishGroup.rotation.y = Math.sin(elapsed * 1.2) * 0.45;
      }

      // Smooth Wing Deployment / Retraction
      const targetWingAngle = wingsDeployedRef.current ? 0 : Math.PI * 0.45;
      leftWingHinge.rotation.y = THREE.MathUtils.lerp(leftWingHinge.rotation.y, -targetWingAngle, delta * 4);
      rightWingHinge.rotation.y = THREE.MathUtils.lerp(rightWingHinge.rotation.y, targetWingAngle, delta * 4);

      // Plasma Thruster Flame Simulation
      if (thrusterFiringRef.current) {
        glowRingMat.color.set("#FFFFFF");
        // Spawn thruster particles
        for (let i = 0; i < 3; i++) {
          if (particles.length < maxParticles) {
            particles.push({
              x: (Math.random() - 0.5) * 0.15,
              y: -1.25,
              z: (Math.random() - 0.5) * 0.15,
              vx: (Math.random() - 0.5) * 0.2,
              vy: -2.5 - Math.random() * 2.5,
              vz: (Math.random() - 0.5) * 0.2,
              life: 1.0,
              size: 0.2 + Math.random() * 0.2,
              color: "#00F0FF",
            });
          }
        }
      } else {
        glowRingMat.color.set("#00F0FF");
      }

      // Update Thruster Particles
      const posArr = particleGeom.getAttribute("position") as THREE.BufferAttribute;
      const arr = posArr.array as Float32Array;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.z += p.vz * delta;
        p.life -= delta * 2.8;

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      for (let i = 0; i < maxParticles; i++) {
        if (i < particles.length) {
          arr[i * 3] = particles[i].x;
          arr[i * 3 + 1] = particles[i].y;
          arr[i * 3 + 2] = particles[i].z;
        } else {
          arr[i * 3] = 0;
          arr[i * 3 + 1] = -999;
          arr[i * 3 + 2] = 0;
        }
      }
      posArr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", handleResize);

      if (container && domEl) {
        container.removeChild(domEl);
      }
      disposables.forEach((d) => d.dispose());
      particleGeom.dispose();
      renderer.dispose();
    };
  }, [lite, forceLoad]);

  const fireThrusters = () => {
    setThrusterFiring(true);
    setTimeout(() => {
      setThrusterFiring(false);
    }, 2400);
  };

  const pingRelay = () => {
    const latencies = [28, 34, 42, 51, 63];
    const picked = latencies[Math.floor(Math.random() * latencies.length)];
    setPingStatus(`Signal acquired (${picked} ms) • Telemetry nominal`);
    setTimeout(() => {
      setPingStatus(null);
    }, 3500);
  };

  return (
    <section id="satellite" data-satellite-relay="true" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Orbital Telemetry Station
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Deep Space Satellite Relay
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Interactive 3D mechanical spacecraft and real-time propulsion simulation
          </span>
        </div>

        {/* Satellite Chassis Card */}
        {lite === true && !forceLoad ? (
          <div className="p-8 rounded-3xl border border-white/10 bg-[#0B0D16]/95 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-normal text-white mb-1">
                3D Deep Space Satellite Relay
              </h3>
              <p className="text-xs text-slate-400 max-w-xl">
                The interactive 3D satellite viewer is paused to keep this page light on your device.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setForceLoad(true)}
              className="text-xs font-mono px-5 py-2.5 rounded-full border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:text-white hover:border-cyan-400 transition-all min-h-[44px] shrink-0"
            >
              Load 3D Satellite anyway
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border border-cyan-500/30 bg-[#0B0D16]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: 3D Interactive WebGL Satellite Canvas */}
              <div className="lg:col-span-7">
                <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner flex items-center justify-center">
                  <div
                    ref={containerRef}
                    className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
                    aria-label="3D Interactive Orbital Satellite Model. Drag to rotate in 3D."
                  />

                  {/* Watermark Tag */}
                  <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 bg-black/75 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md pointer-events-none">
                    Orbital Relay Node CK-2026
                  </div>

                  <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400 bg-black/75 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md pointer-events-none">
                    Drag to rotate in 3D
                  </div>

                  {thrusterFiring && (
                    <div className="absolute top-3 right-3 text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-400/50 backdrop-blur-md animate-pulse pointer-events-none">
                      Ion Thrusters Active: 12.4 kN
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Subsystems Telemetry & Interactive Actions */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-normal text-white mb-2">
                    Subsystem Diagnostics
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Custom Three.js spacecraft model featuring deployable photovoltaic wings, rotatable parabolic dish antenna, and dynamic plasma particle propulsion.
                  </p>
                </div>

                {/* Subsystem Telemetry Badges */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Solar Arrays
                    </span>
                    <span className={wingsDeployed ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
                      {wingsDeployed ? "Deployed (100%)" : "Stowed (0%)"}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Dish Antenna
                    </span>
                    <span className={dishTracking ? "text-cyan-300 font-semibold" : "text-slate-400 font-semibold"}>
                      {dishTracking ? "Scanning Active" : "Fixed Axis"}
                    </span>
                  </div>
                </div>

                {/* Interactive Mission Control Actions */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    Subsystem Controls:
                  </span>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setWingsDeployed(!wingsDeployed)}
                      className={`text-xs font-mono px-4 py-2 rounded-full border transition-all ${
                        wingsDeployed
                          ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50"
                          : "border-amber-500/50 bg-amber-950/40 text-amber-300 hover:bg-amber-900/50"
                      }`}
                    >
                      {wingsDeployed ? "Retract Solar Wings" : "Deploy Solar Wings"}
                    </button>

                    <button
                      type="button"
                      onClick={fireThrusters}
                      disabled={thrusterFiring}
                      className={`text-xs font-mono px-4 py-2 rounded-full border transition-all ${
                        thrusterFiring
                          ? "border-cyan-400 bg-cyan-400 text-black font-semibold shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                          : "border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400"
                      }`}
                    >
                      {thrusterFiring ? "Firing Plasma..." : "Fire Ion Thruster"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setDishTracking(!dishTracking)}
                      className="text-xs font-mono px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/20 transition-all"
                    >
                      {dishTracking ? "Lock Dish Axis" : "Rotate Dish"}
                    </button>

                    <button
                      type="button"
                      onClick={pingRelay}
                      className="text-xs font-mono px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/20 transition-all"
                    >
                      Ping Telemetry
                    </button>
                  </div>

                  {pingStatus && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-2 rounded-xl animate-in fade-in duration-200"
                    >
                      {pingStatus}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
