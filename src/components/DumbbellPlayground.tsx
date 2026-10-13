"use client";

import React, { useState } from "react";

interface Plate {
  weight: number;
  label: string;
  color: string;
  border: string;
  heightClass: string;
  countAvailable: number; // total available across both sleeves
}

const INVENTORY_PLATES: Plate[] = [
  {
    weight: 2.5,
    label: "2.5 kg",
    color: "bg-rose-600",
    border: "border-rose-400",
    heightClass: "h-20 sm:h-24",
    countAvailable: 4,
  },
  {
    weight: 1.5,
    label: "1.5 kg",
    color: "bg-sky-600",
    border: "border-sky-400",
    heightClass: "h-16 sm:h-20",
    countAvailable: 4,
  },
  {
    weight: 1.25,
    label: "1.25 kg",
    color: "bg-amber-500",
    border: "border-amber-300",
    heightClass: "h-14 sm:h-16",
    countAvailable: 4,
  },
  {
    weight: 0.5,
    label: "0.5 kg",
    color: "bg-emerald-600",
    border: "border-emerald-400",
    heightClass: "h-12 sm:h-14",
    countAvailable: 4,
  },
];

export function DumbbellPlayground() {
  const [hardwareMode, setHardwareMode] = useState<"dumbbell" | "barbell">("dumbbell");
  const [targetWeight, setTargetWeight] = useState<number>(10.0);

  const presets = [5.0, 7.5, 10.0, 12.5, 15.0, 17.5, 19.0];

  // Base bar weight (handle + collars)
  const baseWeight = hardwareMode === "dumbbell" ? 1.5 : 2.5; // 1.0kg handle + 0.5kg collars or 2.0kg barbell + 0.5kg collars

  // Calculate symmetrical plate stack per sleeve
  const netPlateWeight = Math.max(0, targetWeight - baseWeight);
  const targetPerSleeve = netPlateWeight / 2;

  const calculateSleevePlates = (targetPerSide: number): Plate[] => {
    let bestPlates: Plate[] = [];
    let minDiff = Infinity;
    let minPlateCount = Infinity;

    const search = (
      index: number,
      currentPlates: Plate[],
      currentWeight: number
    ) => {
      const diff = Math.abs(currentWeight - targetPerSide);
      if (
        diff < minDiff - 0.001 ||
        (Math.abs(diff - minDiff) < 0.001 && currentPlates.length < minPlateCount)
      ) {
        minDiff = diff;
        minPlateCount = currentPlates.length;
        bestPlates = [...currentPlates];
      }

      if (index >= INVENTORY_PLATES.length) return;
      if (currentWeight > targetPerSide + 0.001) return;

      const plate = INVENTORY_PLATES[index];
      const maxCount = Math.floor(plate.countAvailable / 2);

      for (let k = maxCount; k >= 0; k--) {
        const added: Plate[] = Array(k).fill(plate);
        search(
          index + 1,
          [...currentPlates, ...added],
          currentWeight + k * plate.weight
        );
      }
    };

    search(0, [], 0);
    return bestPlates.sort((a, b) => b.weight - a.weight);
  };

  const sleevePlates = calculateSleevePlates(targetPerSleeve);
  const actualPerSleeveWeight = sleevePlates.reduce((acc, p) => acc + p.weight, 0);
  const totalActualWeight = baseWeight + actualPerSleeveWeight * 2;

  return (
    <div className="rounded-3xl border border-cyan-500/30 bg-[#0B0D16]/95 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              Live Interactive Companion Tool
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-normal text-white">
            NestFit Modular Dumbbell Plate Calculator
          </h3>
        </div>

        {/* Hardware Mode Toggle */}
        <div
          role="group"
          aria-label="Hardware mode selection"
          className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10"
        >
          <button
            type="button"
            onClick={() => setHardwareMode("dumbbell")}
            aria-pressed={hardwareMode === "dumbbell"}
            className={`text-xs font-mono px-4 py-2 rounded-full transition-all min-h-[44px] flex items-center ${
              hardwareMode === "dumbbell"
                ? "bg-cyan-400 text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Single DB (1.5 kg Base)
          </button>
          <button
            type="button"
            onClick={() => setHardwareMode("barbell")}
            aria-pressed={hardwareMode === "barbell"}
            className={`text-xs font-mono px-4 py-2 rounded-full transition-all min-h-[44px] flex items-center ${
              hardwareMode === "barbell"
                ? "bg-cyan-400 text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Barbell Mode (2.5 kg Base)
          </button>
        </div>
      </div>

      {/* Target Weight Controls & Presets */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-400">
            Select Target Weight:
          </span>
          <span className="text-sm font-mono text-cyan-300 font-semibold">
            {totalActualWeight.toFixed(2)} kg Total
          </span>
        </div>

        <div
          role="group"
          aria-label="Target weight presets"
          className="flex flex-wrap gap-2"
        >
          {presets.map((preset) => {
            const isSelected = targetWeight === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => setTargetWeight(preset)}
                aria-pressed={isSelected}
                className={`text-xs font-mono px-4 py-2 rounded-xl border transition-all min-h-[44px] flex items-center ${
                  isSelected
                    ? "border-cyan-400 bg-cyan-400 text-black font-semibold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                }`}
              >
                {preset.toFixed(1)} kg
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Symmetrical Plate Stack Diagram */}
      <div className="p-6 rounded-2xl border border-white/10 bg-black/60 shadow-inner flex flex-col items-center justify-center min-h-[220px] mb-6">
        <div className="text-xs font-mono text-slate-400 mb-4 text-center">
          Symmetrical Plate Loading Distribution (Left Sleeve • Handle Grip • Right Sleeve)
        </div>

        <div className="w-full overflow-x-auto no-scrollbar py-2 flex items-center justify-start sm:justify-center">
          <div className="flex items-center justify-center min-w-max mx-auto px-2">
          {/* Left Collar */}
          <div className="w-3.5 h-10 rounded-sm bg-slate-500 border border-slate-300 shadow-md shrink-0 flex items-center justify-center text-[8px] font-mono text-black font-bold">
            C
          </div>

          {/* Left Sleeve Plates (rendered outside-in or inside-out) */}
          <div className="flex items-center justify-end gap-1.5 flex-1 pr-2">
            {[...sleevePlates].reverse().map((plate, idx) => (
              <div
                key={`left-${idx}`}
                className={`w-6 sm:w-8 ${plate.heightClass} ${plate.color} border ${plate.border} rounded-md shadow-lg flex items-center justify-center text-[10px] font-mono font-bold text-white transition-all transform hover:scale-105`}
                title={`${plate.label} Plate`}
              >
                <span className="-rotate-90 text-[9px] sm:text-[10px] tracking-tighter">
                  {plate.weight}
                </span>
              </div>
            ))}
          </div>

          {/* Center Handle Bar with Textured Grip */}
          <div className="relative w-24 sm:w-32 h-6 rounded-full bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 border border-slate-300 shadow-inner flex items-center justify-center shrink-0">
            <span className="text-[9px] font-mono text-black font-bold uppercase tracking-wider">
              {hardwareMode === "dumbbell" ? "Handle (1kg)" : "Barbell (2kg)"}
            </span>
          </div>

          {/* Right Sleeve Plates */}
          <div className="flex items-center justify-start gap-1.5 flex-1 pl-2">
            {sleevePlates.map((plate, idx) => (
              <div
                key={`right-${idx}`}
                className={`w-6 sm:w-8 ${plate.heightClass} ${plate.color} border ${plate.border} rounded-md shadow-lg flex items-center justify-center text-[10px] font-mono font-bold text-white transition-all transform hover:scale-105`}
                title={`${plate.label} Plate`}
              >
                <span className="-rotate-90 text-[9px] sm:text-[10px] tracking-tighter">
                  {plate.weight}
                </span>
              </div>
            ))}
          </div>

          {/* Right Collar */}
          <div className="w-3.5 h-10 rounded-sm bg-slate-500 border border-slate-300 shadow-md shrink-0 flex items-center justify-center text-[8px] font-mono text-black font-bold">
            C
          </div>
        </div>
      </div>

        <div className="text-xs font-mono text-cyan-300 mt-5">
          {sleevePlates.length === 0 ? (
            <span>Base bar only (No plates required)</span>
          ) : (
            <span>
              Each Sleeve: {sleevePlates.map((p) => p.label).join(" + ")} ={" "}
              {actualPerSleeveWeight.toFixed(2)} kg
            </span>
          )}
        </div>
      </div>

      {/* Hardware Telemetry Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <span className="text-slate-400 block mb-1">Base Hardware</span>
          <span className="text-white font-semibold">{baseWeight.toFixed(2)} kg</span>
          <span className="text-xs text-slate-400 block mt-0.5">
            {hardwareMode === "dumbbell" ? "Handle (1.0kg) + Collars" : "Barbell (2.0kg) + Collars"}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <span className="text-slate-400 block mb-1">Plates Loaded</span>
          <span className="text-cyan-300 font-semibold">
            {(actualPerSleeveWeight * 2).toFixed(2)} kg
          </span>
          <span className="text-xs text-slate-400 block mt-0.5">
            {sleevePlates.length * 2} plates across 2 sleeves
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <span className="text-slate-400 block mb-1">Sleeve Capacity</span>
          <span className="text-emerald-400 font-semibold">
            {sleevePlates.length} / 4 Slots
          </span>
          <span className="text-xs text-slate-400 block mt-0.5">
            Safe spinlock thread clearance
          </span>
        </div>
      </div>
    </div>
  );
}
