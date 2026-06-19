# Contenu du site vitrine Wabi Sabi — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplir le site vitrine Wabi Sabi de son contenu réel — page d'accueil narrative complète, header/footer, page Contact (formulaire Resend), page Mentions légales — sur la base du design system existant.

**Architecture:** Hybride : `/` (accueil long-scroll, sections ancrées), `/contact` (formulaire via Server Action + Resend, dégradation propre), `/mentions-legales`. Contenu en modules TS typés sous `content/`. RSC par défaut ; seuls le menu mobile du Header et le formulaire sont Client Components. Réutilise les primitives et le moteur d'animation du cycle précédent.

**Tech Stack:** Next.js 16 App Router · React 19 (`useActionState`) · TS strict · Tailwind v4 · Motion + Lenis · Resend · zod · pnpm.

## Global Constraints

- **Vérification = build/typecheck/lint/rendu/audit, PAS de tests unitaires** (aucun framework de test introduit). Critère : `pnpm typecheck && pnpm lint && pnpm build` verts, rendu correct sur `localhost`, Lighthouse ≥ 90 (Perf/A11y/SEO/BP) sur `/` et `/contact`.
- **Langue FR** partout (accents corrects), identifiants de code en anglais.
- **Palette (verbatim)** : Monstera `#0B4628`, Bronze `#C2A687`, Anthracite `#3C3B40`, Crème `#E5E0DA`, Golden Ocre `#F2B705`. Fond crème, texte anthracite, CTA ocre. Ocre ≤ ~10 %.
- **Eyebrow sur surface claire = Anthracite ou Monstera** (jamais Bronze — échoue l'AA). Cf. skill `wabi-sabi-design-system`.
- **Typo** : Fraunces (display) + Plus Jakarta Sans (corps), déjà câblées.
- **H1 de l'accueil = « L'IA ne s'improvise pas. Elle s'intègre. »** ; wordmark « Wabi Sabi » dans le header. Un seul `<h1>` par page.
- **RSC par défaut** ; `"use client"` uniquement pour `Header` (menu mobile) et `ContactForm`.
- **`prefers-reduced-motion` respecté** ; animer uniquement `transform`/`opacity` ; contraste AA vérifié.
- **Contact** : email `contact@wabisabi.fr`, tél `07 78 54 33 67` (E.164 `+33778543367`). Formulaire → Server Action + Resend ; **sans `RESEND_API_KEY`, dégradation propre** (état « indisponible » + repli `mailto:`).
- **Charger les skills** `wabi-sabi-design-system`, `nextjs-app-conventions`, `motion-lenis-patterns` avant d'écrire de l'UI.
- **Commits fréquents** en français, trailer `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`. Branche : `feat/contenu-site-vitrine`.

---

## File Structure

- `components/layout/Header.tsx` — nav ancrée + CTA + menu mobile (Client).
- `components/layout/Footer.tsx` — contact, tagline, lien légal.
- `components/ui/Monogram.tsx` — initiales sur pastille organique.
- `components/sections/Manifeste.tsx`, `Trio.tsx`, `Methode.tsx`, `Securite.tsx`, `UseCases.tsx`, `Kintsugi.tsx`, `FinalCta.tsx` — sections de l'accueil. (`Hero.tsx`, `Piliers.tsx`, `Kpis.tsx` existants, enrichis.)
- `components/contact/ContactForm.tsx` (Client) — formulaire + états.
- `app/actions/contact.ts` — Server Action `contactAction` (zod + honeypot + Resend + dégradation).
- `content/manifeste.ts`, `piliers.ts` _(enrichi)_, `team.ts` _(enrichi)_, `methode.ts`, `securite.ts`, `usecases.ts`, `kintsugi.ts`, `legal.ts`.
- `app/page.tsx` _(réassemblé)_, `app/contact/page.tsx`, `app/mentions-legales/page.tsx`.
- `app/sitemap.ts` _(modifié)_, `lib/seo.ts` _(modifié : contactPoint)_, `app/layout.tsx` _(Header/Footer)_.

---

## Task 1 : Header + Footer + intégration layout

**Files:**

- Create: `components/layout/Header.tsx`, `components/layout/Footer.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**

- Consumes : `site` (`@/content/site`), `Container`, `Button`.
- Produces : `<Header />`, `<Footer />` rendus sur toutes les pages.

- [ ] **Step 1 : Écrire `components/layout/Header.tsx`**

```tsx
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
```

- [ ] **Step 2 : Écrire `components/layout/Footer.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-anthracite text-creme/80 py-16">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-creme text-2xl">{site.name}</p>
          <p className="mt-2 text-sm">{site.tagline}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href={`mailto:${site.email}`} className="hover:text-creme">
            {site.email}
          </a>
          <a href={`tel:${site.phoneE164}`} className="hover:text-creme">
            {site.phone}
          </a>
          <Link href="/mentions-legales" className="hover:text-creme">
            Mentions légales
          </Link>
        </div>
      </Container>
      <Container className="text-creme/50 mt-10 text-xs">
        © {new Date().getFullYear()} {site.name}. Tous droits réservés.
      </Container>
    </footer>
  );
}
```

- [ ] **Step 3 : Intégrer Header/Footer dans `app/layout.tsx`**

Dans `app/layout.tsx`, importer `Header`/`Footer` et envelopper le contenu (à l'intérieur de `SmoothScroll`) :

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// ...
<SmoothScroll>
  <Header />
  {children}
  <Footer />
</SmoothScroll>;
```

- [ ] **Step 4 : Vérifier**

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: vert. (`pnpm dev` : header collant + footer sur `/`, menu burger en mobile.)

- [ ] **Step 5 : Commit**

```bash
git add components/layout app/layout.tsx
git commit -m "feat(layout): header (nav + menu mobile) et footer"
```

---

## Task 2 : Modules de contenu typés

**Files:**

- Create: `content/manifeste.ts`, `content/methode.ts`, `content/securite.ts`, `content/usecases.ts`, `content/kintsugi.ts`, `content/legal.ts`
- Modify: `content/piliers.ts`, `content/team.ts`

**Interfaces:**

- Produces : `manifeste`, `piliers` (`Pilier[]` avec `preuves`), `team` (`Member[]` avec `description`), `methode`+`apres`, `securite`, `usecases` (`UseCaseGroup[]`), `kintsugi`, `legal`.

- [ ] **Step 1 : Écrire `content/manifeste.ts`**

```ts
export const manifeste = {
  eyebrow: "Notre conviction",
  titre: "Des experts natifs du digital, pas des touristes de l'IA.",
  paragraphes: [
    "Aujourd'hui, tout le monde parle d'intelligence artificielle. Chez Wabi Sabi, nous ne l'avons pas découverte hier : nous façonnons le digital depuis des années — l'évolution du web, la révolution de la data, l'explosion du marketing digital.",
    "L'IA est simplement notre nouvel outil de pointe, adossé à une solide expérience du terrain. Et parce qu'une PME ne se résume pas à un seul problème, nous réunissons trois profils, trois parcours, pour une vision à 360°.",
  ],
} as const;
```

- [ ] **Step 2 : Remplacer `content/piliers.ts` (ajout des preuves)**

```ts
export type Pilier = { titre: string; message: string; preuves: string[] };

export const piliers: Pilier[] = [
  {
    titre: "Former",
    message:
      "Démystifier l'IA et acculturer vos équipes pour lever les peurs et libérer les usages.",
    preuves: [
      "Une vulgarisation sans jargon, héritée de notre longue pratique du digital.",
      "Des ateliers ultra-pratiques, au rythme de la PME et ancrés dans vos métiers.",
      "L'humain au centre, une méthode inspirée des concepts d'Anthropic Academy.",
    ],
  },
  {
    titre: "Automatiser",
    message:
      "Connecter vos outils et éradiquer les tâches chronophages pour redonner du temps à forte valeur.",
    preuves: [
      "Un audit pragmatique de vos processus existants (l'esprit Wabi Sabi).",
      "Une conception et une intégration de haut niveau par notre Lead Tech.",
      "Des automatisations fiables, sécurisées et connectées à 100 % à vos outils.",
    ],
  },
  {
    titre: "Transformer",
    message:
      "Passer d'une organisation sous tension à une entreprise agile, performante et orientée croissance.",
    preuves: [
      "Un alignement Produit / Marketing / Data sur toute la chaîne.",
      "Un pilotage par la donnée pour rendre l'impact de l'IA mesurable.",
      "Un focus permanent sur votre ROI et votre scalabilité.",
    ],
  },
];
```

- [ ] **Step 3 : Remplacer `content/team.ts` (ajout description)**

```ts
export type Member = {
  prenom: string;
  role: string;
  pilier: string;
  description: string;
};

export const team: Member[] = [
  {
    prenom: "Cédric",
    role: "Vision Stratégie & Produit",
    pilier: "Audit & impact business",
    description:
      "Il intervient en amont (audit, vision globale) et en aval (mesure de l'impact business). Il sait ce qu'est un ROI et un business model.",
  },
  {
    prenom: "David",
    role: "Tech & Infrastructure",
    pilier: "Automatisations robustes & sécurisées",
    description:
      "Lead Tech chevronné, il fait le pont entre la stratégie et la réalité technique en automatisant vos outils de manière robuste et sécurisée.",
  },
  {
    prenom: "Manon",
    role: "Data & Performance Market",
    pilier: "Acquisition & performance mesurable",
    description:
      "Experte de l'acquisition et de la data comportementale, elle décuple votre visibilité et s'assure que chaque automatisation se traduit en performance mesurable.",
  },
];
```

- [ ] **Step 4 : Écrire `content/methode.ts`**

```ts
export type Etape = { numero: string; titre: string; description: string };

export const methode: Etape[] = [
  {
    numero: "01",
    titre: "On audite",
    description:
      "Cartographie des besoins, des irritants réels et des gains rapides, service par service.",
  },
  {
    numero: "02",
    titre: "On trace la feuille de route",
    description:
      "Une feuille de route IA priorisée : formations adaptées à chaque profil, outils à créer ou à intégrer.",
  },
  {
    numero: "03",
    titre: "On forme par ateliers",
    description:
      "Des ateliers pratiques par groupe métier, ancrés dans des situations réelles. Aucun collaborateur laissé de côté.",
  },
  {
    numero: "04",
    titre: "On automatise",
    description:
      "Conception des automatisations, outils et agents identifiés à l'audit. Architectures sécurisées, connectées, auditables.",
  },
];

export const apres: string[] = [
  "On mesure l'impact réel avec les bons KPIs.",
  "On vous donne accès à notre veille continue par métier.",
  "On vous accompagne dans le temps pour une utilisation sécurisée des outils IA.",
];
```

- [ ] **Step 5 : Écrire `content/securite.ts`**

```ts
export const securite = {
  eyebrow: "Sécurité & données",
  titre: "Vos données ne sont pas négociables.",
  intro:
    "Que vous soyez une PME ou une structure publique, notre approche intègre la conformité et la protection des données sensibles dès le départ.",
  points: [
    "Une charte IA adaptée à vos obligations légales et à votre culture interne.",
    "Des architectures sécurisées : vos données ne transitent pas par des services non maîtrisés.",
    "Une traçabilité complète de chaque usage IA déployé.",
    "La formation aux risques associés : hallucinations, fuites de données, biais.",
  ],
  citation:
    "Nous ne déployons rien que vous ne puissiez auditer, expliquer et défendre devant votre conseil d'administration.",
} as const;
```

- [ ] **Step 6 : Écrire `content/usecases.ts`**

```ts
export type UseCaseGroup = { metier: string; usages: string[] };

export const usecases: UseCaseGroup[] = [
  {
    metier: "Direction & Assistanat",
    usages: [
      "Rédaction et relecture d'emails",
      "Agendas et RDV optimisés",
      "Comptes-rendus de réunion automatiques",
    ],
  },
  {
    metier: "Aménagement & Construction",
    usages: [
      "Analyse de DCE / appels d'offres",
      "Rédaction de dossiers et cahiers des charges",
      "Veille réglementaire automatisée",
    ],
  },
  {
    metier: "Stationnement",
    usages: [
      "Prévision d'affluence des parkings",
      "Traitement des réclamations & RAPO",
      "Détection d'anomalies des équipements",
    ],
  },
  {
    metier: "Informatique & Données",
    usages: [
      "Exploitation des données dormantes",
      "Recherche documentaire (GED augmentée)",
      "Tableaux de bord transverses",
    ],
  },
  {
    metier: "Juridique & Commande publique",
    usages: [
      "Conformité des marchés & des pièces",
      "Veille juridique & jurisprudence",
      "Rédaction de contrats & conventions",
    ],
  },
  {
    metier: "Patrimoine & Travaux",
    usages: [
      "Maintenance prédictive des ouvrages",
      "Suivi de travaux : synthèse des CR",
      "Recherche dans les dossiers techniques",
    ],
  },
  {
    metier: "Comptabilité & Finances",
    usages: [
      "Extraction des factures (OCR)",
      "Rapprochement des écritures",
      "Prévision de trésorerie & recettes",
    ],
  },
  {
    metier: "Communication",
    usages: [
      "Contenus réseaux sociaux & newsletters",
      "Adaptation multi-canal",
      "Veille e-réputation & médias",
    ],
  },
  {
    metier: "Ressources Humaines & Paie",
    usages: [
      "Tri & synthèse des candidatures",
      "Réponses RH de premier niveau",
      "Contrôle des variables de paie",
    ],
  },
];
```

- [ ] **Step 7 : Écrire `content/kintsugi.ts`**

```ts
export const kintsugi = {
  eyebrow: "Notre philosophie",
  titre: "L'art de réparer à l'or.",
  texte:
    "Le Kintsugi sublime les fissures d'un objet en les soulignant d'or plutôt qu'en les masquant. C'est notre approche : l'IA n'efface pas votre existant, elle le révèle. Là où il y avait une perte de temps, une faille, nous faisons passer une ligne d'or. Vos imperfections deviennent le point de départ de votre plus grande zone de valeur.",
} as const;
```

- [ ] **Step 8 : Écrire `content/legal.ts`**

```ts
// Champs « À COMPLÉTER » : à renseigner par l'éditeur (raison sociale, SIRET, etc.).
export const legal = {
  editeur: {
    raisonSociale: "À COMPLÉTER",
    statut: "À COMPLÉTER",
    adresse: "À COMPLÉTER",
    siret: "À COMPLÉTER",
    directeurPublication: "À COMPLÉTER",
    email: "contact@wabisabi.fr",
    telephone: "07 78 54 33 67",
  },
  hebergeur: {
    nom: "Vercel Inc.",
    adresse: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    site: "https://vercel.com",
  },
} as const;
```

- [ ] **Step 9 : Vérifier**

Run: `pnpm typecheck`
Expected: vert (l'enrichissement de `piliers`/`team` reste compatible avec `Piliers.tsx`/`Kpis.tsx`).

- [ ] **Step 10 : Commit**

```bash
git add content
git commit -m "feat(content): modules contenu (manifeste, méthode, sécurité, cas d'usage, kintsugi, légal) + enrichissements"
```

---

## Task 3 : Monogram, Trio (équipe) et enrichissement des Piliers

**Files:**

- Create: `components/ui/Monogram.tsx`, `components/sections/Trio.tsx`, `components/sections/Manifeste.tsx`
- Modify: `components/sections/Piliers.tsx`

**Interfaces:**

- Consumes : `team`, `piliers`, `manifeste`, `Container`, `Section`, `Reveal`.
- Produces : `<Monogram prenom>`, `<Trio />`, `<Manifeste />`, `<Piliers />` (avec preuves).

- [ ] **Step 1 : Écrire `components/ui/Monogram.tsx`**

```tsx
import { cn } from "@/lib/utils";

// Pastille organique avec les initiales (placeholder en attendant les portraits).
export function Monogram({
  prenom,
  className,
}: {
  prenom: string;
  className?: string;
}) {
  const initiale = prenom.charAt(0).toUpperCase();
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-monstera/10 text-monstera font-display flex h-16 w-16 items-center justify-center rounded-[40%_60%_60%_40%/50%_40%_60%_50%] text-2xl",
        className,
      )}
    >
      {initiale}
    </div>
  );
}
```

- [ ] **Step 2 : Écrire `components/sections/Manifeste.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { manifeste } from "@/content/manifeste";

export function Manifeste() {
  return (
    <Section id="approche" tone="creme">
      <Container>
        <Reveal>
          <p className="text-monstera font-sans text-sm tracking-[0.25em] uppercase">
            {manifeste.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-4xl">
            {manifeste.titre}
          </h2>
        </Reveal>
        <div className="mt-8 max-w-2xl space-y-5">
          {manifeste.paragraphes.map((p, i) => (
            <Reveal key={i} delay={0.2 + i * 0.1}>
              <p className="text-anthracite/90 text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3 : Remplacer `components/sections/Piliers.tsx` (ajout des preuves)**

```tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { piliers } from "@/content/piliers";

export function Piliers() {
  return (
    <Section tone="monstera">
      <Container>
        <Reveal>
          <h2 className="text-creme text-4xl md:text-5xl">Nos trois piliers</h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {piliers.map((p, i) => (
            <Reveal key={p.titre} delay={i * 0.1}>
              <h3 className="text-bronze text-2xl">{p.titre}</h3>
              <p className="text-creme/90 mt-4">{p.message}</p>
              <ul className="mt-6 space-y-3">
                {p.preuves.map((preuve) => (
                  <li key={preuve} className="text-creme/80 flex gap-3 text-sm">
                    <span aria-hidden="true" className="text-ocre">
                      —
                    </span>
                    <span>{preuve}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4 : Écrire `components/sections/Trio.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Monogram } from "@/components/ui/Monogram";
import { team } from "@/content/team";

export function Trio() {
  return (
    <Section id="equipe" tone="creme">
      <Container>
        <Reveal>
          <p className="text-monstera font-sans text-sm tracking-[0.25em] uppercase">
            L'équation 360°
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-4xl md:text-5xl">
            Trois profils, une vision complète
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.prenom} delay={i * 0.1}>
              <Monogram prenom={m.prenom} />
              <h3 className="mt-6 text-2xl">{m.prenom}</h3>
              <p className="text-bronze mt-1 text-sm font-semibold">{m.role}</p>
              <p className="text-anthracite/80 mt-4">{m.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5 : Vérifier**

Run: `pnpm typecheck && pnpm lint`
Expected: vert.

- [ ] **Step 6 : Commit**

```bash
git add components/ui/Monogram.tsx components/sections/Manifeste.tsx components/sections/Piliers.tsx components/sections/Trio.tsx
git commit -m "feat(sections): manifeste, trio (équipe) et piliers enrichis"
```

---

## Task 4 : Méthode et Sécurité

**Files:**

- Create: `components/sections/Methode.tsx`, `components/sections/Securite.tsx`

**Interfaces:**

- Consumes : `methode`, `apres`, `securite`, `Container`, `Section`, `Reveal`.
- Produces : `<Methode />`, `<Securite />`.

- [ ] **Step 1 : Écrire `components/sections/Methode.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { methode, apres } from "@/content/methode";

export function Methode() {
  return (
    <Section id="methode" tone="creme">
      <Container>
        <Reveal>
          <h2 className="text-4xl md:text-5xl">Comment on avance ensemble</h2>
        </Reveal>
        <ol className="mt-16 grid gap-10 md:grid-cols-2">
          {methode.map((e, i) => (
            <Reveal key={e.numero} delay={i * 0.1}>
              <li className="border-bronze/40 border-l-2 pl-6">
                <span className="font-display text-ocre text-sm">
                  {e.numero}
                </span>
                <h3 className="mt-1 text-2xl">{e.titre}</h3>
                <p className="text-anthracite/80 mt-3">{e.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.2}>
          <div className="mt-16">
            <h3 className="text-bronze text-xl">Et après ?</h3>
            <ul className="mt-4 space-y-2">
              {apres.map((a) => (
                <li key={a} className="text-anthracite/80 flex gap-3">
                  <span aria-hidden="true" className="text-ocre">
                    —
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2 : Écrire `components/sections/Securite.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { securite } from "@/content/securite";

export function Securite() {
  return (
    <Section id="securite" tone="anthracite">
      <Container>
        <Reveal>
          <p className="text-bronze font-sans text-sm tracking-[0.25em] uppercase">
            {securite.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-creme mt-6 max-w-3xl text-4xl md:text-5xl">
            {securite.titre}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-creme/80 mt-6 max-w-2xl text-lg">
            {securite.intro}
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {securite.points.map((point, i) => (
            <Reveal key={point} delay={i * 0.08}>
              <li className="text-creme/90 flex gap-3">
                <span aria-hidden="true" className="text-ocre">
                  —
                </span>
                <span>{point}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.2}>
          <blockquote className="border-ocre text-creme font-display mt-12 max-w-3xl border-l-2 pl-6 text-xl italic">
            « {securite.citation} »
          </blockquote>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3 : Vérifier**

Run: `pnpm typecheck && pnpm lint`
Expected: vert.

- [ ] **Step 4 : Commit**

```bash
git add components/sections/Methode.tsx components/sections/Securite.tsx
git commit -m "feat(sections): méthode (4 étapes + après) et sécurité (volet PME/public)"
```

---

## Task 5 : Cas d'usage, bandeau Kintsugi, CTA final

**Files:**

- Create: `components/sections/UseCases.tsx`, `components/sections/Kintsugi.tsx`, `components/sections/FinalCta.tsx`

**Interfaces:**

- Consumes : `usecases`, `kintsugi`, `site`, `Container`, `Section`, `Reveal`, `Button`, `KintsugiLine`.
- Produces : `<UseCases />`, `<KintsugiBand />`, `<FinalCta />`.

- [ ] **Step 1 : Écrire `components/sections/UseCases.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { usecases } from "@/content/usecases";

export function UseCases() {
  return (
    <Section tone="creme">
      <Container>
        <Reveal>
          <h2 className="text-4xl md:text-5xl">
            Qui adopte l'IA, et pour quoi ?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-anthracite/70 mt-4 max-w-2xl">
            Quelques usages concrets par métier, à titre illustratif. Vos cas
            réels émergent de l'audit.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {usecases.map((g, i) => (
            <Reveal key={g.metier} delay={(i % 3) * 0.08}>
              <div className="border-bronze/30 h-full rounded-2xl border p-6">
                <h3 className="text-monstera text-lg">{g.metier}</h3>
                <ul className="mt-4 space-y-2">
                  {g.usages.map((u) => (
                    <li key={u} className="text-anthracite/80 text-sm">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2 : Écrire `components/sections/Kintsugi.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { KintsugiLine } from "@/components/motion/KintsugiLine";
import { kintsugi } from "@/content/kintsugi";

export function KintsugiBand() {
  return (
    <Section tone="monstera">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <p className="text-bronze font-sans text-sm tracking-[0.25em] uppercase">
            {kintsugi.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-creme mt-6 text-4xl md:text-5xl">
            {kintsugi.titre}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <KintsugiLine className="text-ocre mx-auto mt-8 h-5 w-72" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-creme/85 mt-8 text-lg">{kintsugi.texte}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3 : Écrire `components/sections/FinalCta.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <Section tone="creme">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl">
            Et si on prenait 45 min pour se rencontrer ?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-anthracite/80 mt-6 text-lg">
            Nos meilleurs clients ont dit oui. Aujourd'hui, ils nous remercient.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Button href="/contact">Prendre rendez-vous</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4 : Vérifier**

Run: `pnpm typecheck && pnpm lint`
Expected: vert.

- [ ] **Step 5 : Commit**

```bash
git add components/sections/UseCases.tsx components/sections/Kintsugi.tsx components/sections/FinalCta.tsx
git commit -m "feat(sections): cas d'usage par métier, bandeau Kintsugi, CTA final"
```

---

## Task 6 : Assemblage de la page d'accueil

**Files:**

- Modify: `components/sections/Hero.tsx` (H1 = accroche), `app/page.tsx`

**Interfaces:**

- Consumes : toutes les sections (Tasks 3-5) + `Hero`, `Kpis` existants.
- Produces : page d'accueil complète.

- [ ] **Step 1 : Mettre à jour le H1 du Hero dans `components/sections/Hero.tsx`**

Remplacer le `<h1>` (actuellement `{site.name}`) par l'accroche, et déplacer le wordmark dans le header (déjà fait Task 1) :

```tsx
<Reveal delay={0.1}>
  <h1 className="mt-6 max-w-4xl text-5xl leading-[1.05] md:text-7xl">
    L'IA ne s'improvise pas. Elle s'intègre.
  </h1>
</Reveal>
```

- [ ] **Step 2 : Réassembler `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { Manifeste } from "@/components/sections/Manifeste";
import { Piliers } from "@/components/sections/Piliers";
import { Trio } from "@/components/sections/Trio";
import { Methode } from "@/components/sections/Methode";
import { Securite } from "@/components/sections/Securite";
import { Kpis } from "@/components/sections/Kpis";
import { UseCases } from "@/components/sections/UseCases";
import { KintsugiBand } from "@/components/sections/Kintsugi";
import { FinalCta } from "@/components/sections/FinalCta";
import { organizationJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />
      <Hero />
      <Manifeste />
      <Piliers />
      <Trio />
      <Methode />
      <Securite />
      <Kpis />
      <UseCases />
      <KintsugiBand />
      <FinalCta />
    </main>
  );
}
```

- [ ] **Step 3 : Vérifier build + rendu**

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: vert. (`pnpm dev` : toutes les sections s'enchaînent, alternance des tons, ancres `#approche/#methode/#equipe/#securite` fonctionnelles depuis le header.)

- [ ] **Step 4 : Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx
git commit -m "feat(page): assemblage complet de la page d'accueil narrative"
```

---

## Task 7 : Formulaire de contact (Server Action + Resend)

**Files:**

- Create: `app/actions/contact.ts`, `components/contact/ContactForm.tsx`, `app/contact/page.tsx`
- Modify: `package.json` (deps `resend`, `zod`)

**Interfaces:**

- Consumes : `site`.
- Produces : `contactAction(prevState, formData) => Promise<ContactState>` ; `<ContactForm />` ; route `/contact`.
- Types : `type ContactState = { status: "idle" | "success" | "error" | "unavailable"; message: string }`.

- [ ] **Step 1 : Installer les dépendances**

```bash
pnpm add resend zod
```

Expected: ajoutées au `package.json`.

- [ ] **Step 2 : Écrire la Server Action `app/actions/contact.ts`**

```ts
"use server";

import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/content/site";

export type ContactState = {
  status: "idle" | "success" | "error" | "unavailable";
  message: string;
};

const schema = z.object({
  nom: z.string().min(2, "Indiquez votre nom."),
  email: z.string().email("Email invalide."),
  organisation: z.string().min(2, "Indiquez votre organisation."),
  type: z.enum(["pme", "public", "autre"]),
  message: z.string().min(10, "Votre message est trop court."),
});

export async function contactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot : un bot remplit le champ caché « website ».
  if (formData.get("website")) {
    return {
      status: "success",
      message: "Merci, votre message a bien été envoyé.",
    };
  }

  const parsed = schema.safeParse({
    nom: formData.get("nom"),
    email: formData.get("email"),
    organisation: formData.get("organisation"),
    type: formData.get("type"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Formulaire invalide.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "unavailable",
      message: `Envoi indisponible pour le moment. Écrivez-nous directement à ${site.email}.`,
    };
  }

  const { nom, email, organisation, type, message } = parsed.data;
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from:
        process.env.CONTACT_FROM ?? "Site Wabi Sabi <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? site.email,
      replyTo: email,
      subject: `Nouveau contact — ${organisation} (${type})`,
      text: `Nom: ${nom}\nEmail: ${email}\nOrganisation: ${organisation}\nType: ${type}\n\n${message}`,
    });
    return {
      status: "success",
      message: "Merci, votre message a bien été envoyé.",
    };
  } catch {
    return {
      status: "error",
      message: `Une erreur est survenue. Réessayez ou écrivez-nous à ${site.email}.`,
    };
  }
}
```

- [ ] **Step 3 : Écrire `components/contact/ContactForm.tsx`**

```tsx
"use client";

import { useActionState } from "react";
import { contactAction, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle", message: "" };
const field =
  "border-anthracite/20 focus:border-monstera w-full rounded-lg border bg-transparent px-4 py-3 outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(contactAction, initial);
  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot anti-spam (caché) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="nom" className="text-sm font-semibold">
          Nom
        </label>
        <input id="nom" name="nom" required className={`mt-1 ${field}`} />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={`mt-1 ${field}`}
        />
      </div>
      <div>
        <label htmlFor="organisation" className="text-sm font-semibold">
          Organisation
        </label>
        <input
          id="organisation"
          name="organisation"
          required
          className={`mt-1 ${field}`}
        />
      </div>
      <div>
        <label htmlFor="type" className="text-sm font-semibold">
          Type de structure
        </label>
        <select
          id="type"
          name="type"
          required
          defaultValue="pme"
          className={`mt-1 ${field}`}
        >
          <option value="pme">PME / entreprise</option>
          <option value="public">Structure publique</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`mt-1 ${field}`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-ocre text-anthracite focus-visible:outline-anthracite inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
      >
        {pending ? "Envoi…" : "Envoyer"}
      </button>

      <p aria-live="polite" className="text-sm">
        {state.status === "success" && (
          <span className="text-monstera">{state.message}</span>
        )}
        {(state.status === "error" || state.status === "unavailable") && (
          <span className="text-anthracite">{state.message}</span>
        )}
      </p>
    </form>
  );
}
```

- [ ] **Step 4 : Écrire la page `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact — Wabi Sabi",
  description:
    "Prenons 45 min pour parler de votre intégration IA. Écrivez-nous ou appelez-nous.",
};

export default function ContactPage() {
  return (
    <main className="py-24 md:py-32">
      <Container className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl">Prenons 45 min.</h1>
        <p className="text-anthracite/80 mt-6 text-lg">
          Dites-nous où vous en êtes : on revient vers vous rapidement. Vous
          pouvez aussi nous écrire à{" "}
          <a href={`mailto:${site.email}`} className="text-monstera underline">
            {site.email}
          </a>{" "}
          ou nous appeler au{" "}
          <a href={`tel:${site.phoneE164}`} className="text-monstera underline">
            {site.phone}
          </a>
          .
        </p>
        <div className="mt-12">
          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
```

- [ ] **Step 5 : Vérifier build + comportement**

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: vert. (`pnpm dev` → `/contact` : sans `RESEND_API_KEY`, soumettre un formulaire valide affiche le message « Envoi indisponible… écrivez-nous à contact@wabisabi.fr » ; un champ vide affiche l'erreur de validation.)

- [ ] **Step 6 : Commit**

```bash
git add app/actions/contact.ts components/contact/ContactForm.tsx app/contact/page.tsx package.json pnpm-lock.yaml
git commit -m "feat(contact): formulaire + Server Action Resend (zod, honeypot, dégradation propre)"
```

---

## Task 8 : Page Mentions légales

**Files:**

- Create: `app/mentions-legales/page.tsx`

**Interfaces:**

- Consumes : `legal`, `site`, `Container`.
- Produces : route `/mentions-legales`.

- [ ] **Step 1 : Écrire `app/mentions-legales/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { legal } from "@/content/legal";

export const metadata: Metadata = {
  title: "Mentions légales — Wabi Sabi",
  description: "Mentions légales du site Wabi Sabi.",
  robots: { index: false },
};

export default function MentionsLegales() {
  const { editeur, hebergeur } = legal;
  return (
    <main className="py-24 md:py-32">
      <Container className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl">Mentions légales</h1>

        <h2 className="mt-12 text-2xl">Éditeur</h2>
        <p className="text-anthracite/80 mt-3 leading-relaxed">
          {editeur.raisonSociale} ({editeur.statut})<br />
          {editeur.adresse}
          <br />
          SIRET : {editeur.siret}
          <br />
          Directeur de la publication : {editeur.directeurPublication}
          <br />
          {editeur.email} — {editeur.telephone}
        </p>

        <h2 className="mt-10 text-2xl">Hébergeur</h2>
        <p className="text-anthracite/80 mt-3 leading-relaxed">
          {hebergeur.nom}
          <br />
          {hebergeur.adresse}
          <br />
          {hebergeur.site}
        </p>

        <h2 className="mt-10 text-2xl">Propriété intellectuelle</h2>
        <p className="text-anthracite/80 mt-3 leading-relaxed">
          L'ensemble des contenus de ce site est protégé. Toute reproduction
          sans autorisation est interdite.
        </p>

        <h2 className="mt-10 text-2xl">Données personnelles</h2>
        <p className="text-anthracite/80 mt-3 leading-relaxed">
          Les informations transmises via le formulaire de contact servent
          uniquement à traiter votre demande. Conformément au RGPD, vous
          disposez d'un droit d'accès, de rectification et de suppression en
          écrivant à {editeur.email}.
        </p>
      </Container>
    </main>
  );
}
```

- [ ] **Step 2 : Vérifier**

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: vert ; route `/mentions-legales` listée.

- [ ] **Step 3 : Commit**

```bash
git add app/mentions-legales/page.tsx
git commit -m "feat(legal): page mentions légales (champs éditeur à compléter)"
```

---

## Task 9 : SEO, sitemap, JSON-LD et audit final

**Files:**

- Modify: `app/sitemap.ts`, `lib/seo.ts`

**Interfaces:**

- Consumes : `site`.
- Produces : sitemap à 3 routes, JSON-LD `Organization` avec `contactPoint`.

- [ ] **Step 1 : Mettre à jour `app/sitemap.ts` (3 routes)**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/contact`, priority: 0.8 },
    { url: `${site.url}/mentions-legales`, priority: 0.2 },
  ];
}
```

- [ ] **Step 2 : Enrichir `lib/seo.ts` (contactPoint)**

Ajouter le `contactPoint` dans l'objet retourné par `organizationJsonLd()` :

```ts
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.phoneE164,
      areaServed: "FR",
      availableLanguage: "French",
    },
```

- [ ] **Step 3 : Vérifier build complet**

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: vert ; routes `/`, `/contact`, `/mentions-legales`, `/sitemap.xml`, `/robots.txt`.

- [ ] **Step 4 : Audit qualité (subagent `quality-auditor`)**

Lancer le build de prod (`pnpm build && pnpm start`) puis dispatcher le subagent `quality-auditor`
sur `/` et `/contact` (Lighthouse + revue a11y/SEO contre les règles `nextjs-app-conventions`).
Corriger tout bloquant (cibles Perf/A11y/SEO/BP ≥ 90). Vérifier en particulier : contraste AA des
nouvelles paires (bronze/monstera, creme/anthracite atténués), labels du formulaire, hiérarchie de
titres (un seul `<h1>` par page), focus du menu mobile.

- [ ] **Step 5 : Commit final**

```bash
git add app/sitemap.ts lib/seo.ts
git commit -m "feat(seo): sitemap 3 routes + JSON-LD contactPoint ; audit qualité"
```

---

## Self-Review (couverture du spec)

- §4 IA (routes, header, footer) → Tasks 1, 7, 8 ✅
- §5 flux accueil (sections 1-10 + grille cas d'usage) → Tasks 3-6 ✅ (Hero/Piliers/Kpis enrichis ; Manifeste, Trio, Methode, Securite, UseCases, KintsugiBand, FinalCta)
- §6 formulaire (Server Action, Resend, zod, honeypot, états, dégradation) → Task 7 ✅
- §7 contenu typé → Task 2 ✅
- §8 composants & design (Monogram, StepList via Methode, UseCaseGrid via UseCases, etc.) → Tasks 3-5 ✅
- §9 SEO/Perf/A11y (metadata routes, sitemap, contactPoint, audit) → Tasks 7, 8, 9 ✅
- §10 critères de succès → vérifs par tâche + audit Task 9 ✅
- §11 questions ouvertes : mentions légales en champs « À COMPLÉTER » (Task 2/8) ; H1 = accroche (Task 6) ✅

Placeholders : les « À COMPLÉTER » de `legal.ts` sont des champs de données assumés (renseignés par
l'éditeur), pas des trous d'implémentation. Cohérence des types : `Pilier.preuves`, `Member.description`,
`Etape`, `UseCaseGroup`, `ContactState` définis en Tasks 2/7 et consommés tels quels en Tasks 3-6/7.
Eyebrows sur surfaces claires en `text-monstera` (Manifeste/Trio) et sur sombre en `text-bronze`
(Securite/Kintsugi) — conforme à la règle de contraste.
