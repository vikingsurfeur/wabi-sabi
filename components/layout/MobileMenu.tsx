"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type LinkItem = { href: string; label: string };

// Îlot client : seul le toggle du menu mobile a besoin d'état/interactivité.
export function MobileMenu({ links }: { links: LinkItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        className="text-anthracite"
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" className="text-2xl">
          {open ? "✕" : "☰"}
        </span>
      </button>
      {open && (
        <nav
          id="menu-mobile"
          className="border-anthracite/10 bg-creme/95 absolute inset-x-0 top-16 border-t backdrop-blur"
        >
          <Container className="flex flex-col gap-4 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-anthracite text-base"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Button href="/contact" className="mt-2 self-start px-5 py-2">
              Prendre 45 min
            </Button>
          </Container>
        </nav>
      )}
    </div>
  );
}
