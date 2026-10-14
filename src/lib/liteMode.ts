"use client";

import { useEffect, useState } from "react";

/**
 * Decides whether the heavy visuals (WebGL solar system and rocket plume canvas)
 * should be skipped.
 *
 * Reduced-motion is handled natively inside SolarSystemBackground to keep the
 * celestial visuals visible in a calm, static state rather than a blank screen.
 *
 * `?lite=1` forces lite mode on and `?lite=0` forces it off.
 */
export function detectLiteMode(): boolean {
  if (typeof window === "undefined") return false;

  const override = new URLSearchParams(window.location.search).get("lite");
  if (override === "1") return true;
  if (override === "0") return false;

  return false;
}

/** Initializes to false so WebGL and space visuals mount immediately without blank delay. */
export function useLiteMode(): boolean {
  const [lite, setLite] = useState<boolean>(false);

  useEffect(() => {
    setLite(detectLiteMode());
  }, []);

  return lite;
}
