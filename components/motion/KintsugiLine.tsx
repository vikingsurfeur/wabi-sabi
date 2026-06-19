"use client";

import { motion, useReducedMotion } from "motion/react";

// Veine dorée « Kintsugi » qui se trace à l'apparition (signature visuelle).
export function KintsugiLine({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg
      className={className}
      viewBox="0 0 400 20"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 10 C 80 2, 140 18, 210 9 S 340 2, 400 11"
        stroke="#f2b705"
        strokeWidth={2}
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 1.4, ease: "easeInOut" }}
      />
    </svg>
  );
}
