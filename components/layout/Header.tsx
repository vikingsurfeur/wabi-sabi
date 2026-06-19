"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/#approche", label: "Approche" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#equipe", label: "Équipe" },
  { href: "/#securite", label: "Sécurité" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-anthracite/10 bg-creme/80 sticky top-0 z-50 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-monstera text-xl"
          onClick={() => setOpen(false)}
        >
          Wabi Sabi
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-anthracite/80 hover:text-anthracite text-sm"
            >
              {l.label}
            </Link>
          ))}
          <Button href="/contact" className="px-5 py-2">
            Prendre 45 min
          </Button>
        </nav>
        <button
          type="button"
          className="text-anthracite md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="text-2xl">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </Container>
      {open && (
        <nav
          id="menu-mobile"
          className="border-anthracite/10 border-t md:hidden"
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
    </header>
  );
}
