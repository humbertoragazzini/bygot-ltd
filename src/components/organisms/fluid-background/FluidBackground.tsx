"use client";

import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";
import { FluidSimulation, type SplatPoint } from "./FluidSimulation";

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function FluidBackground() {
  const reducedMotionPref = useReducedMotion();
  const isReducedMotion = Boolean(reducedMotionPref);

  const isVisibleRef = useRef<boolean>(true);
  const splatQueueRef = useRef<SplatPoint[]>([]);
  const previousPointerRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Palette definitions for subtle dye injection
  const palette = useRef([
    new THREE.Vector3(0.85, 0.74, 0.61).multiplyScalar(0.22), // Soft Sand #D8BE9C
    new THREE.Vector3(0.66, 0.28, 0.19).multiplyScalar(0.16), // Muted Rust #A94832
    new THREE.Vector3(0.91, 0.82, 0.79).multiplyScalar(0.20), // Pale Blush #E8D2C9
  ]);

  // Track window visibility to halt GPU simulation when tab is inactive
  useEffect(() => {
    const handleVisibility = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Track pointer movements with interpolation for fluid interaction
  useEffect(() => {
    if (isReducedMotion) return;

    let colorIndex = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const x = Math.min(Math.max(e.clientX / window.innerWidth, 0), 1);
      const y = Math.min(Math.max(1.0 - e.clientY / window.innerHeight, 0), 1);

      if (!previousPointerRef.current) {
        previousPointerRef.current = { x, y, time: now };
        return;
      }

      const prev = previousPointerRef.current;
      const dx = x - prev.x;
      const dy = y - prev.y;
      const dist = Math.hypot(dx, dy);

      // Interpolate points for fast motion to ensure continuous fluid dragging
      const maxStep = 0.025;
      const steps = Math.min(Math.max(Math.ceil(dist / maxStep), 1), 8);

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const ix = prev.x + dx * t;
        const iy = prev.y + dy * t;
        const color = palette.current[colorIndex % palette.current.length];

        splatQueueRef.current.push({
          x: ix,
          y: iy,
          dx: (dx / steps) * 1.2,
          dy: (dy / steps) * 1.2,
          color,
        });

        colorIndex++;
      }

      previousPointerRef.current = { x, y, time: now };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isReducedMotion]);

  if (!checkWebGLSupport()) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-transparent"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
          depth: true,
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        camera={{ position: [0, 0, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background: "transparent",
        }}
      >
        <FluidSimulation
          splatQueueRef={splatQueueRef}
          isReducedMotion={isReducedMotion}
          isVisibleRef={isVisibleRef}
        />
      </Canvas>
    </div>
  );
}
