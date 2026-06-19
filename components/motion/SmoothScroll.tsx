"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

// Smooth-scroll Lenis, désactivé si l'utilisateur demande moins de mouvement.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.0 }}>
      {children}
    </ReactLenis>
  );
}
