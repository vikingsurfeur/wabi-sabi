---
name: nextjs-app-conventions
description: Conventions Next.js App Router pour le site Wabi Sabi (RSC vs Client Component, data fetching, next/image, next/font, Metadata/SEO, Core Web Vitals, organisation des fichiers). Charge ce skill pour écrire/relire toute page, route ou composant Next.js. Cite la règle (ex. R-IMG) dans les revues.
---

# Conventions Next.js App Router — Wabi Sabi

Ces conventions encadrent l'écriture de toute page, route et composant du site vitrine
(App Router, RSC par défaut, Tailwind CSS v4, Motion/Lenis). Chaque règle porte un identifiant
**citable** : en revue, on écrit « viole R-IMG » plutôt qu'une remarque vague. Le fil rouge est
double : **moins de JavaScript expédié au client** (perf + sobriété) et **fond Crème `#E5E0DA`,
texte Anthracite `#3C3B40`, accent Golden Ocre `#F2B705`** (cf. skill `wabi-sabi-design-system`).

---

## R-RSC — Server Component par défaut

Server Component par défaut. Pas de `"use client"` sauf besoin réel (état, effets,
API navigateur, Motion/Lenis). Garder les Client Components petits et en feuille de l'arbre.

Un composant n'a besoin du client que s'il utilise au moins l'un de : `useState`, `useEffect`,
`useReducer`, `useRef` sur un nœud DOM piloté, un gestionnaire d'événement (`onClick`, `onChange`),
une API navigateur (`window`, `document`, `localStorage`, `IntersectionObserver`), ou un hook
d'une lib client (`motion/react`, `lenis/react`). Tout le reste — rendu de contenu, mapping de
données `content/`, composition de markup — reste serveur, donc zéro octet de JS envoyé.

Mauvais signal : ajouter `"use client"` « pour être tranquille ». Chaque directive client
contamine l'arbre rendu sous elle et gonfle le bundle.

```tsx
// ✅ R-RSC : section purement présentationnelle = Server Component (aucune directive)
import { piliers } from "@/content/piliers";

export function Piliers() {
  return (
    <ul>
      {piliers.map((p) => (
        <li key={p.titre}>
          <h3>{p.titre}</h3>
          <p>{p.message}</p>
        </li>
      ))}
    </ul>
  );
}
```

```tsx
// ❌ R-RSC : "use client" inutile — ce composant n'a ni état, ni effet, ni handler.
"use client";
export function Piliers() {
  /* ... même rendu statique ... */
}
```

---

## R-CLIENT — Isoler l'interactivité en feuille

Isoler l'interactivité dans de petits composants `"use client"` ; le parent reste RSC.

Quand une page a besoin d'un fragment interactif, on extrait **uniquement ce fragment** dans un
fichier `"use client"` et on l'importe depuis le Server Component parent. Le parent peut continuer
à être `async`, à lire `content/` et à composer le reste en serveur. Pattern « îlot client » :
des feuilles interactives plantées dans un arbre serveur.

```tsx
// ✅ R-CLIENT : le toggle est une feuille client ; la page reste un Server Component.
// components/ui/MenuToggle.tsx
"use client";
import { useState } from "react";
export function MenuToggle() {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen((v) => !v)}>{open ? "Fermer" : "Menu"}</button>;
}

// app/page.tsx — PAS de "use client", reste RSC
import { MenuToggle } from "@/components/ui/MenuToggle";
export default function Home() {
  return (
    <header>
      <h1>Wabi Sabi</h1>
      <MenuToggle />
    </header>
  );
}
```

```tsx
// ❌ R-CLIENT : "use client" en tête de page → toute la page (et ses enfants) bascule client
// juste pour un bouton. Reflux du contenu statique dans le bundle.
"use client";
export default function Home() {
  const [open, setOpen] = useState(false);
  /* tout le contenu de la page, désormais client */
}
```

---

## R-IMG — Toujours `next/image`

Toujours `next/image` (jamais `<img>`), avec `width`/`height` ou `fill` + `sizes`,
et `alt` pertinent. Images au-dessus de la ligne de flottaison : `priority`.

Les dimensions explicites (ou `fill` + conteneur dimensionné) réservent la place avant
chargement → pas de layout shift (cf. R-PERF, CLS). `sizes` permet à Next de servir la bonne
résolution selon le viewport. `alt` décrit le contenu pour les lecteurs d'écran (vide `alt=""`
uniquement si l'image est purement décorative, cf. R-A11Y). `priority` précharge le hero/LCP.

```tsx
// ✅ R-IMG : dimensions réservées, alt parlant, priority sur l'image LCP du hero.
import Image from "next/image";

<Image
  src="/team/cedric.jpg"
  alt="Cédric, responsable Vision Stratégie & Produit"
  width={480}
  height={480}
  priority
/>;

// ✅ R-IMG (image responsive plein conteneur)
<div className="relative aspect-video">
  <Image src="/hero.jpg" alt="Atelier de formation IA en PME" fill sizes="100vw" />
</div>;
```

```tsx
// ❌ R-IMG : <img> brut, sans dimensions → CLS, pas d'optimisation, alt manquant.
<img src="/hero.jpg" />
```

---

## R-FONT — Typos via `next/font`

Typos via `next/font` (auto-hébergées), `display: "swap"`, exposées en variables CSS.

Les polices du site sont **Fraunces** (display/titres) et **Plus Jakarta Sans** (corps/UI),
chargées via `next/font/google`. L'auto-hébergement supprime la requête vers Google Fonts
(perf + RGPD), `display: "swap"` évite le texte invisible (FOIT), et l'exposition en variable CSS
(`--font-display`, `--font-sans`) permet de les brancher dans `@theme` Tailwind et le `<html>`.

```ts
// ✅ R-FONT : lib/fonts.ts — auto-hébergé, swap, variables CSS.
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

export const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-display" });
export const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
```

```tsx
// ✅ R-FONT : variables appliquées une fois sur <html>, réutilisées partout via Tailwind.
<html lang="fr" className={`${fraunces.variable} ${jakarta.variable}`}>
```

```tsx
// ❌ R-FONT : <link> CDN Google Fonts dans le <head> — requête tierce, pas de swap maîtrisé,
// pas auto-hébergé. Interdit.
<link href="https://fonts.googleapis.com/css2?family=Fraunces" rel="stylesheet" />
```

---

## R-META — Métadonnées par route

Chaque route exporte `metadata` (ou `generateMetadata`) — `title`, `description`,
`openGraph`. Métadonnées globales dans `app/layout.tsx`.

`metadata` statique pour le contenu fixe ; `generateMetadata` (async) quand le titre/description
dépendent des paramètres de route ou de données. Définir `metadataBase` dans le layout pour que
les URLs OpenGraph relatives se résolvent. Les routes enfants héritent et complètent le layout.

```ts
// ✅ R-META : layout global (base + OG par défaut)
export const metadata: Metadata = {
  metadataBase: new URL("https://wabisabi.fr"),
  title: { default: "Wabi Sabi — Former · Automatiser · Transformer", template: "%s — Wabi Sabi" },
  description: "Cabinet de formation et d'outils IA pour PME.",
  openGraph: { type: "website", locale: "fr_FR", siteName: "Wabi Sabi" },
};

// ✅ R-META : route dynamique
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Article ${slug}` };
}
```

```tsx
// ❌ R-META : <title> et <meta> posés à la main dans le JSX → ignore l'API Metadata,
// pas de dédoublonnage, OG incomplet.
<head><title>Wabi Sabi</title></head>
```

---

## R-FETCH — Data fetching côté serveur

Data fetching côté serveur (RSC `async`) quand possible. Modules de contenu typés
dans `content/` importés directement (pas d'appel réseau pour le contenu statique).

Le contenu du site (piliers, équipe, KPIs, infos) vit dans des modules TypeScript typés sous
`content/`, importés directement — zéro requête réseau, typage à la compilation. Pour des données
distantes, faire le `fetch` dans un Server Component `async` (caching/revalidation gérés par Next),
jamais un `useEffect(fetch)` côté client qui ajoute un aller-retour et expose les clés.

```tsx
// ✅ R-FETCH : contenu statique importé directement dans un RSC.
import { kpis } from "@/content/kpis";
export function Kpis() {
  return <ul>{kpis.map((k) => <li key={k.libelle}>{k.valeur} — {k.libelle}</li>)}</ul>;
}

// ✅ R-FETCH : donnée distante = fetch serveur dans un RSC async.
async function Articles() {
  const res = await fetch("https://api.exemple.fr/articles", { next: { revalidate: 3600 } });
  const articles = await res.json();
  return <List items={articles} />;
}
```

```tsx
// ❌ R-FETCH : appel réseau pour du contenu statique, côté client, dans un effet.
"use client";
useEffect(() => { fetch("/api/piliers").then(/* ... */); }, []);
```

---

## R-FILE — Une responsabilité par fichier

Un fichier = une responsabilité. `components/ui` (primitives), `components/sections`
(sections de page), `components/motion` (animation), `lib` (utils), `content` (données).
Alias d'import `@/*`.

Arborescence cible :

```
app/        routes, layout, SEO (sitemap.ts, robots.ts)
components/
  ui/       primitives réutilisables (Container, Section, Button)
  sections/ sections de page assemblées (Hero, Piliers, Kpis)
  motion/   composants d'animation client (SmoothScroll, Reveal, KintsugiLine)
lib/        helpers purs (utils, fonts, seo)
content/    données typées en français (site, piliers, team, kpis)
public/     assets statiques
```

```tsx
// ✅ R-FILE : imports par alias absolu @/*, chacun dans son dossier de responsabilité.
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { piliers } from "@/content/piliers";
```

```tsx
// ❌ R-FILE : chemins relatifs fragiles + un Button d'UI mélangé aux données dans content/.
import { Button } from "../../components/ui/Button";
import { Button as Bouton } from "@/content/ui-bits"; // mauvais dossier
```

---

## R-PERF — Budget Core Web Vitals

Budget Core Web Vitals (LCP < 2.5 s, CLS < 0.1, INP < 200 ms). JS client minimal,
pas de layout shift (dimensions réservées), `transform`/`opacity` pour l'animation.

- **LCP** : précharger l'image/le texte hero (`priority` sur l'image, fonts en `swap`), pas de
  composant bloquant en tête (cf. R-RSC : moins de JS = hydratation plus rapide).
- **CLS** : réserver l'espace de toute image/embed (R-IMG), éviter les insertions tardives qui
  poussent le contenu.
- **INP** : garder les îlots client petits (R-CLIENT) ; pas de handler lourd sur le chemin
  d'interaction.
- **Animation** : uniquement `transform` et `opacity` (composités GPU, pas de reflow), jamais
  `width`/`height`/`top`/`left` (cf. skill `motion-lenis-patterns`, M-PERF).

```tsx
// ✅ R-PERF : transition d'opacité/translation, dimensions d'image réservées.
<div className="transition-opacity duration-700" />
<Image src="/hero.jpg" alt="..." width={1200} height={630} priority />
```

```tsx
// ❌ R-PERF : animer la hauteur → reflow à chaque frame, jank, mauvais INP/CLS.
<div style={{ transition: "height 0.7s", height: open ? 400 : 0 }} />
```

---

## R-A11Y — Accessibilité

HTML sémantique (`header/main/section/nav/footer`), un seul `<h1>` par page,
hiérarchie de titres correcte, focus visible, contraste AA, `lang="fr"`, `prefers-reduced-motion`.

Un seul `<h1>` par page (le sujet principal), puis `<h2>`/`<h3>` sans sauter de niveau. Landmarks
sémantiques plutôt que des `<div>` génériques. Tout élément focusable garde un anneau de focus
visible (ne jamais `outline: none` sans remplacement). Contraste **AA** : attention au Golden Ocre
`#F2B705` sur fond clair Crème `#E5E0DA` — réservé aux gros éléments ou couplé à du texte foncé
Anthracite `#3C3B40`. `lang="fr"` sur `<html>`. Toute animation se neutralise sous
`prefers-reduced-motion` (cf. M-RM).

```tsx
// ✅ R-A11Y : landmarks + un seul h1 + hiérarchie + focus visible.
<main>
  <header><h1>Wabi Sabi</h1></header>
  <section aria-labelledby="piliers-titre">
    <h2 id="piliers-titre">Nos trois piliers</h2>
    <h3>Former</h3>
  </section>
  <a href="#contact" className="focus-visible:outline-2 focus-visible:outline-anthracite">Contact</a>
</main>
```

```tsx
// ❌ R-A11Y : deux <h1>, niveaux sautés, focus retiré, soupe de div.
<div><h1>Wabi Sabi</h1><h1>Nos piliers</h1><h4>Former</h4>
  <div onClick={...} style={{ outline: "none" }}>Contact</div>
</div>
```

---

## R-SEO — Indexabilité

`app/sitemap.ts`, `app/robots.ts`, JSON-LD `Organization`, image OpenGraph.

Sitemap et robots sont des routes de fichiers spéciales d'App Router (`sitemap.ts`, `robots.ts`)
qui génèrent `/sitemap.xml` et `/robots.txt`. Le JSON-LD `Organization` (nom, URL, contact,
slogan) est injecté via un `<script type="application/ld+json">`. Une image OpenGraph
(`opengraph-image`) soigne le partage sur les réseaux. Cohérent avec R-META.

```ts
// ✅ R-SEO : app/robots.ts
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://wabisabi.fr/sitemap.xml" };
}
```

```tsx
// ✅ R-SEO : JSON-LD Organization injecté dans la page.
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
/>
```

```ts
// ❌ R-SEO : sitemap.xml écrit à la main dans public/ et figé → désynchronisé des routes.
```

---

## R-ENV — Variables d'environnement

Variables d'env via `process.env`, jamais de secret côté client (préfixe
`NEXT_PUBLIC_` uniquement pour le non-sensible).

Tout ce qui est lu côté client doit porter le préfixe `NEXT_PUBLIC_` et être considéré comme
**public** (inlined dans le bundle). Les secrets (clés d'API, tokens) restent sans préfixe et ne
sont lus que dans du code serveur (RSC, Route Handlers, Server Actions). Ne jamais interpoler un
secret dans un Client Component.

```ts
// ✅ R-ENV : secret lu côté serveur uniquement ; valeur publique préfixée.
// Server Component / Route Handler
const apiKey = process.env.API_SECRET_KEY; // jamais exposé au client
// Client Component
const gaId = process.env.NEXT_PUBLIC_ANALYTICS_ID; // non-sensible, OK
```

```ts
// ❌ R-ENV : secret sans préfixe lu dans un "use client" → fuite dans le bundle public.
"use client";
const key = process.env.STRIPE_SECRET_KEY; // undefined côté client OU fuite si NEXT_PUBLIC_
```

---

## Vérification

`pnpm typecheck && pnpm lint && pnpm build` doivent passer. Pas de framework de test unitaire :
la qualité se vérifie par build + rendu + Lighthouse (Perf/A11y/SEO/Best Practices ≥ 90).