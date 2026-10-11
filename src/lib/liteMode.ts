"use client";

import { useEffect, useState } from "react";

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

/**
 * Decides whether the heavy visuals (WebGL solar system, rocket plume canvas,
 * Connectomics viewer) should be skipped. Conservative on purpose so normal
 * laptops keep the full experience.
 *
 * Lite mode turns on for: reduced-motion preference, Data Saver, very low
 * memory (2 GB or less) or very few CPU cores (2 or less).
 *
 * `?lite=1` forces it on and `?lite=0` forces it off, which is handy for testing.
 */
export function detectLiteMode(): boolean {
  if (typeof window === "undefined") return false;

  const override = new URLSearchParams(window.location.search).get("lite");
  if (override === "1") return true;
  if (override === "0") return false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

  const nav = navigator as NavigatorWithHints;
  if (nav.connection?.saveData) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return true;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2) return true;

  return false;
}

/** Returns null until the client has checked, so heavy scenes never mount and then unmount. */
export function useLiteMode(): boolean | null {
  const [lite, setLite] = useState<boolean | null>(null);

  useEffect(() => {
    setLite(detectLiteMode());
  }, []);

  return lite;
}
