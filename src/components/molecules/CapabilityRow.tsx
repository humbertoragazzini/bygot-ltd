"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface CapabilityRowProps {
  number: string;
  title: string;
  description: string;
  metadata: string;
  isLast?: boolean;
}

export function CapabilityRow({
  number,
  title,
  description,
  metadata,
  isLast = false,
}: CapabilityRowProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`group relative border-t border-border py-8 sm:py-10 md:py-12 transition-colors duration-200 ${
        isLast ? "border-b" : ""
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
        {/* Column 1: Index Number */}
        <div className="md:col-span-1">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            {number}
          </span>
        </div>

        {/* Column 2: Title */}
        <div className="md:col-span-4">
          <motion.h3
            className="text-foreground text-2xl sm:text-3xl font-medium tracking-tight"
            whileHover={
              shouldReduceMotion
                ? undefined
                : { x: 6, transition: { duration: 0.18, ease: "easeOut" } }
            }
          >
            {title}
          </motion.h3>
        </div>

        {/* Column 3: Description */}
        <div className="md:col-span-5">
          <p className="text-muted text-base sm:text-lg leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Column 4: Metadata tags */}
        <div className="md:col-span-2 md:text-right mt-1 md:mt-0">
          <span className="font-mono text-[11px] text-muted/70 tracking-wider uppercase group-hover:text-muted transition-colors duration-200">
            {metadata}
          </span>
        </div>
      </div>
    </div>
  );
}
