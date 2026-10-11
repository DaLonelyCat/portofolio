"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface NeuropilNode {
  id: string;
  name: string;
  circuit: string;
  x: number;
  y: number;
  z: number;
  color: string;
  radius: number;
  synapses: number;
  description: string;
}

const NEUROPIL_NODES: NeuropilNode[] = [
  // Central Complex (Compass Steering & Heading)
  {
    id: "eb-ring",
    name: "Ellipsoid Body (EB)",
    circuit: "Central Complex",
    x: 0,
    y: 0.2,
    z: 0.1,
    color: "#00F0FF",
    radius: 0.42,
    synapses: 4280,
    description: "Toroidal compass attractor network encoding 360-degree heading direction and angular velocity.",
  },
  {
    id: "fb-fan",
    name: "Fan-Shaped Body (FB)",
    circuit: "Central Complex",
    x: 0,
    y: 0.8,
    z: -0.2,
    color: "#38BDF8",
    radius: 0.38,
    synapses: 6120,
    description: "Multilayered premotor coordination matrix translating heading vectors into forward flight steering.",
  },
  {
    id: "pb-bridge",
    name: "Protocerebral Bridge (PB)",
    circuit: "Central Complex",
    x: 0,
    y: 1.3,
    z: -0.5,
    color: "#818CF8",
    radius: 0.35,
    synapses: 3190,
    description: "Bilateral 18-glomeruli bridge coordinating cross-hemispheric phase shifts in navigational state.",
  },

  // Mushroom Body (Associative Memory & Odor Learning)
  {
    id: "mb-calyx-l",
    name: "Mushroom Body Calyx (Left)",
    circuit: "Mushroom Body",
    x: -1.6,
    y: 1.2,
    z: -0.6,
    color: "#F59E0B",
    radius: 0.40,
    synapses: 8400,
    description: "Input dendritic field where ~2,000 Kenyon cells receive sparse olfactory odor representations.",
  },
  {
    id: "mb-calyx-r",
    name: "Mushroom Body Calyx (Right)",
    circuit: "Mushroom Body",
    x: 1.6,
    y: 1.2,
    z: -0.6,
    color: "#F59E0B",
    radius: 0.40,
    synapses: 8400,
    description: "Contralateral input field receiving projection neuron inputs from the antennal lobe.",
  },
  {
    id: "mb-lobe-l",
    name: "MB Vertical Lobe (Left)",
    circuit: "Mushroom Body",
    x: -0.9,
    y: 0.5,
    z: 0.8,
    color: "#FBBF24",
    radius: 0.32,
    synapses: 5120,
    description: "Output compartment where dopaminergic reinforcement neurons instruct valence memory recall.",
  },
  {
    id: "mb-lobe-r",
    name: "MB Vertical Lobe (Right)",
    circuit: "Mushroom Body",
    x: 0.9,
    y: 0.5,
    z: 0.8,
    color: "#FBBF24",
    radius: 0.32,
    synapses: 5120,
    description: "Symmetrical associative memory output compartment projecting to premotor descending pathways.",
  },

  // Optic Lobes (High-Speed Motion Vision)
  {
    id: "optic-med-l",
    name: "Medulla (Left)",
    circuit: "Optic Lobe",
    x: -2.8,
    y: -0.2,
    z: 0.0,
    color: "#10B981",
    radius: 0.52,
    synapses: 14200,
    description: "Multilayer visual neuropil extracting directional motion vectors, luminance changes, and polarization.",
  },
  {
    id: "optic-med-r",
    name: "Medulla (Right)",
    circuit: "Optic Lobe",
    x: 2.8,
    y: -0.2,
    z: 0.0,
    color: "#10B981",
    radius: 0.52,
    synapses: 14200,
    description: "Right compound eye visual processing column feeding wide-field tangential motion cells.",
  },
  {
    id: "optic-lob-l",
    name: "Lobula Complex (Left)",
    circuit: "Optic Lobe",
    x: -2.0,
    y: -0.5,
    z: -0.4,
    color: "#34D399",
    radius: 0.42,
    synapses: 9800,
    description: "Feature extraction center detecting loom expansion threats and stabilizing flight posture.",
  },
  {
    id: "optic-lob-r",
    name: "Lobula Complex (Right)",
    circuit: "Optic Lobe",
    x: 2.0,
    y: -0.5,
    z: -0.4,
    color: "#34D399",
    radius: 0.42,
    synapses: 9800,
    description: "Symmetrical visual column computing panoramic optic flow for trajectory adjustments.",
  },

  // Antennal Lobes (Sensory Glomeruli)
  {
    id: "al-ant-l",
    name: "Antennal Lobe (Left)",
    circuit: "Antennal Lobe",
    x: -0.7,
    y: -1.2,
    z: 0.6,
    color: "#EC4899",
    radius: 0.38,
    synapses: 4600,
    description: "Primary olfactory center containing 54 discrete glomeruli classifying airborne odorants.",
  },
  {
    id: "al-ant-r",
    name: "Antennal Lobe (Right)",
    circuit: "Antennal Lobe",
    x: 0.7,
    y: -1.2,
    z: 0.6,
    color: "#EC4899",
    radius: 0.38,
    synapses: 4600,
    description: "Right olfactory glomeruli cluster detecting bilateral odor gradients for chemotaxis tracking.",
  },

  // Protocerebrum (Motor Integration)
  {
    id: "proto-smp",
    name: "Superior Medial Protocerebrum",
    circuit: "Motor Integration",
    x: 0,
    y: 1.5,
    z: 0.4,
    color: "#A78BFA",
    radius: 0.44,
    synapses: 11200,
    description: "Dorsal integration hub pooling state signals before triggering descending motor commands.",
  },
];

// Synaptic axon links between related neuropil nodes
const SYNAPSE_EDGES: [string, string][] = [
  ["al-ant-l", "mb-calyx-l"],
  ["al-ant-r", "mb-calyx-r"],
  ["al-ant-l", "al-ant-r"],
  ["mb-calyx-l", "mb-lobe-l"],
  ["mb-calyx-r", "mb-lobe-r"],
  ["mb-lobe-l", "fb-fan"],
  ["mb-lobe-r", "fb-fan"],
  ["optic-med-l", "optic-lob-l"],
  ["optic-med-r", "optic-lob-r"],
  ["optic-lob-l", "eb-ring"],
  ["optic-lob-r", "eb-ring"],
  ["eb-ring", "fb-fan"],
  ["fb-fan", "pb-bridge"],
  ["pb-bridge", "proto-smp"],
  ["proto-smp", "eb-ring"],
];

interface PulseSignal {
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
  progress: number;
  speed: number;
  color: string;
}

export function ConnectomicsViewer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<NeuropilNode>(NEUROPIL_NODES[0]);
  const [activeCircuit, setActiveCircuit] = useState<string>("All");
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 6.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Subtle ambient starlight
    const ambientLight = new THREE.AmbientLight("#FFFFFF", 0.85);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight("#00F0FF", 2.2, 20);
    pointLight.position.set(2, 4, 3);
    scene.add(pointLight);

    // Node mesh tracking
    const nodeMeshes: { node: NeuropilNode; mesh: THREE.Mesh }[] = [];
    const sphereGeom = new THREE.SphereGeometry(1, 24, 24);

    NEUROPIL_NODES.forEach((node) => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color),
        emissive: new THREE.Color(node.color),
        emissiveIntensity: 0.45,
        roughness: 0.3,
        metalness: 0.2,
      });

      const mesh = new THREE.Mesh(sphereGeom, mat);
      mesh.scale.setScalar(node.radius);
      mesh.position.set(node.x, node.y, node.z);
      group.add(mesh);
      nodeMeshes.push({ node, mesh });
    });

    // Synaptic axon connection line segments
    const nodeMap = new Map(NEUROPIL_NODES.map((n) => [n.id, n]));
    const pulses: PulseSignal[] = [];

    SYNAPSE_EDGES.forEach(([fromId, toId]) => {
      const from = nodeMap.get(fromId);
      const to = nodeMap.get(toId);
      if (!from || !to) return;

      const p1 = new THREE.Vector3(from.x, from.y, from.z);
      const p2 = new THREE.Vector3(to.x, to.y, to.z);

      const geom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#00F0FF"),
        transparent: true,
        opacity: 0.32,
      });
      const line = new THREE.Line(geom, mat);
      group.add(line);

      // Create signal pulses traveling between synapses
      pulses.push({
        startPos: p1,
        endPos: p2,
        progress: Math.random(),
        speed: 0.45 + Math.random() * 0.4,
        color: Math.random() > 0.5 ? "#00F0FF" : "#F59E0B",
      });
    });

    // Pulse visualization sprite points
    const pulseCount = pulses.length;
    const pulseGeom = new THREE.BufferGeometry();
    const pulsePosArray = new Float32Array(pulseCount * 3);
    pulseGeom.setAttribute("position", new THREE.BufferAttribute(pulsePosArray, 3));

    const pulseMat = new THREE.PointsMaterial({
      color: new THREE.Color("#FFFFFF"),
      size: 0.16,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const pulsePoints = new THREE.Points(pulseGeom, pulseMat);
    group.add(pulsePoints);

    // Interactive Drag to Rotate 3D Brain Cluster
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotVelX = 0;
    let rotVelY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      rotVelX = 0;
      rotVelY = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      group.rotation.y += dx * 0.008;
      group.rotation.x += dy * 0.008;

      rotVelY = dx * 0.008;
      rotVelX = dy * 0.008;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();

      if (!isDragging) {
        if (Math.abs(rotVelX) > 0.0001 || Math.abs(rotVelY) > 0.0001) {
          group.rotation.x += rotVelX;
          group.rotation.y += rotVelY;
          rotVelX *= 0.92;
          rotVelY *= 0.92;
        } else if (isPlaying) {
          // Autonomous slow 3D rotation
          group.rotation.y += delta * 0.22;
        }
      }

      // Update Action Potential Pulses
      const posAttr = pulseGeom.getAttribute("position") as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      pulses.forEach((pulse, idx) => {
        if (isPlaying) {
          pulse.progress += delta * pulse.speed;
          if (pulse.progress > 1.0) pulse.progress = 0;
        }

        const curr = new THREE.Vector3().lerpVectors(
          pulse.startPos,
          pulse.endPos,
          pulse.progress
        );
        arr[idx * 3] = curr.x;
        arr[idx * 3 + 1] = curr.y;
        arr[idx * 3 + 2] = curr.z;
      });
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    renderLoop();

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 360;
      camera.aspect = newW / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [isPlaying]);

  const circuits = ["All", "Central Complex", "Mushroom Body", "Optic Lobe", "Antennal Lobe"];

  const filteredNodes =
    activeCircuit === "All"
      ? NEUROPIL_NODES
      : NEUROPIL_NODES.filter((n) => n.circuit === activeCircuit);

  return (
    <div className="rounded-3xl border border-cyan-500/30 bg-[#0B0D16]/95 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Interactive 3D Connectomics Graph
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-normal text-white">
            Drosophila Melanogaster Brain Connectome
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
          >
            {isPlaying ? "Pause Rotation" : "Resume Rotation"}
          </button>
          <span className="text-[11px] font-mono text-slate-400">
            Drag to Orbit 3D
          </span>
        </div>
      </div>

      {/* Main 2-Column Split: 3D Canvas & Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: 3D Interactive WebGL Brain Canvas */}
        <div className="lg:col-span-7">
          <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner flex items-center justify-center">
            <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
            
            {/* Visualizer Watermark overlay */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 bg-black/70 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md pointer-events-none">
              Synthetic Synaptic Attractor Simulation
            </div>

            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-cyan-300/80 bg-black/70 px-2.5 py-1 rounded-full border border-cyan-500/20 backdrop-blur-md pointer-events-none">
              139,256 Synapses Modeled
            </div>
          </div>
        </div>

        {/* Right: Selected Neuropil Telemetry */}
        <div className="lg:col-span-5 space-y-4">
          {/* Circuit Filter Selector */}
          <div className="flex flex-wrap gap-1.5">
            {circuits.map((c) => {
              const isActive = activeCircuit === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCircuit(c)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-full border transition-all ${
                    isActive
                      ? "border-cyan-400 bg-cyan-400 text-black font-semibold shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                      : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Active Neuropil Details Card */}
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-xs font-mono px-2.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${selectedNode.color}20`,
                  color: selectedNode.color,
                  border: `1px solid ${selectedNode.color}50`,
                }}
              >
                {selectedNode.circuit}
              </span>
              <span className="text-[11px] font-mono text-cyan-300">
                {selectedNode.synapses.toLocaleString()} Synapses
              </span>
            </div>

            <h4 className="text-base font-normal text-white">
              {selectedNode.name}
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {selectedNode.description}
            </p>
          </div>

          {/* Quick Nodes Chip Selector */}
          <div>
            <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
              Select Neuropil Node:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto no-scrollbar">
              {filteredNodes.map((n) => {
                const isCurrent = selectedNode.id === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setSelectedNode(n)}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                      isCurrent
                        ? "border-cyan-400 bg-cyan-950/60 text-cyan-300"
                        : "border-white/5 bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {n.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
