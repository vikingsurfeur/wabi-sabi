# Wabi Sabi — Site vitrine

Site vitrine du cabinet **Wabi Sabi** (formation + outils IA pour PME).
Tagline : *Former · Automatiser · Transformer*. Concept de marque : **Kintsugi** — l'art japonais de
réparer la céramique brisée à l'or : l'IA est la *ligne d'or dans les fissures de l'entreprise*. Tout
le site (ton, palette, motion) doit incarner cette métaphore : l'épure *wabi-sabi* (beauté du naturel,
de l'imparfait) rehaussée d'un accent doré rare et signifiant.

## Stack
Next.js (App Router, RSC) · React 19 · TypeScript strict · pnpm · Tailwind CSS v4 (`@theme`) ·
Motion (`motion/react`) + Lenis (`lenis/react`) · next/font (Fraunces + Plus Jakarta Sans) ·
ESLint (config Next) · Prettier + `prettier-plugin-tailwindcss` · Vercel.

Points d'attention de version :
- **Tailwind v4** = tokens CSS-first via `@theme` dans `app/globals.css` (pas de `tailwind.config.js`
  pour les couleurs). Un token `--color-monstera` y est déclaré → la classe `bg-monstera`/`text-monstera`
  est générée automatiquement. Idem `--font-display`/`--font-sans` → `font-display`/`font-sans`.
- **Motion** s'importe depuis `motion/react` (et non l'ancien `framer-motion`).
- **Lenis** s'importe depuis `lenis/react` (`ReactLenis`).
- **pnpm** est le seul gestionnaire : ne jamais introduire `package-lock.json` ni `yarn.lock`.

## Commandes
- `pnpm dev` — serveur de dev
- `pnpm build` — build production
- `pnpm start` — serveur production
- `pnpm lint` — ESLint
- `pnpm typecheck` — `tsc --noEmit`

> **Vérification = build/typecheck/lint/rendu/audit, PAS de tests unitaires.** Aucun framework de test
> n'est introduit. La preuve de qualité d'une tâche est : `pnpm typecheck && pnpm lint && pnpm build`
> au vert, rendu visuel correct sur `localhost:3000`, et Lighthouse ≥ 90 (Perf/A11y/SEO/Best Practices)
> en fin de parcours. Ne jamais déclarer une tâche « terminée » sans la preuve du build OK.

## Structure
`app/` (routes, layout, SEO) · `components/{ui,sections,motion}` · `lib/` (utils, fonts, seo) ·
`content/` (données typées FR) · `public/` (assets). Alias `@/*`.

Responsabilité de chaque dossier :
- `components/ui/` — primitives réutilisables et neutres (`Container`, `Section`, `Button`).
- `components/sections/` — sections de page composées (`Hero`, `Piliers`, `Kpis`).
- `components/motion/` — tout le JS d'animation client (`SmoothScroll`, `Reveal`, `KintsugiLine`).
  C'est le seul endroit qui « possède » `"use client"` au niveau composant ; on l'importe ailleurs
  en RSC pour garder le client en feuille de l'arbre.
- `lib/` — `utils.ts` (`cn`), `fonts.ts` (`next/font`), `seo.ts` (metadata + JSON-LD).
- `content/` — modules TypeScript typés et statiques (`site`, `piliers`, `team`, `kpis`), importés
  directement (pas d'appel réseau pour le contenu).

## Conventions (skills)
Charger selon le travail : `wabi-sabi-design-system` (UI/couleurs/typo), `nextjs-app-conventions`
(pages/routes), `motion-lenis-patterns` (animations). Subagents : `frontend-builder`, `quality-auditor`.

Quand citer quoi :
- Toute création/modif d'UI, de couleur, de typographie ou d'animation → `wabi-sabi-design-system`.
- Toute page/route/composant Next.js → `nextjs-app-conventions` (cite la règle, ex. `R-IMG`, `R-RSC`).
- Toute animation/transition/effet au scroll → `motion-lenis-patterns` (ex. `M-RM`, `M-REVEAL`).
- Qualité visuelle haut de gamme → `artifact-design`.
- Pour construire une section/page → dispatcher `frontend-builder`. Pour auditer perf/a11y/SEO avant
  un merge → dispatcher `quality-auditor` (lecture seule, ne modifie pas le code).

## Règles clés
- **Palette (hex verbatim)** : Monstera `#0B4628` · Bronze `#C2A687` · Anthracite `#3C3B40` ·
  Crème `#E5E0DA` · Golden Ocre `#F2B705`.
- Fond Crème `#E5E0DA` (jamais blanc pur), texte Anthracite `#3C3B40`, CTA Golden Ocre `#F2B705`.
  Sémantique : `background = creme`, `foreground = anthracite`, `primary = monstera`,
  `material = bronze`, `accent = ocre`. Surfaces sombres : `anthracite` ou `monstera`.
- **Golden Ocre ≈ 10 % d'usage** : réservé aux CTA et aux veines Kintsugi. Jamais en aplat large.
  Attention contraste AA : l'ocre sur clair ne convient qu'aux gros éléments ; sinon texte foncé dessus.
- **Typo** : display = **Fraunces**, corps = **Plus Jakarta Sans** (les deux via `next/font/google`,
  `display: "swap"`, exposées en variables CSS `--font-display` / `--font-sans`).
- RSC par défaut ; isoler le client (Motion/Lenis) dans de petits composants en feuille.
  `"use client"` uniquement en cas de besoin réel (état, effets, API navigateur).
- **`prefers-reduced-motion` toujours respecté** : via `useReducedMotion()` de Motion, rendre l'état
  final immédiatement (opacité 1, pas de translate) et désactiver le smooth-scroll Lenis.
- **Animer uniquement `transform`/`opacity`** (jamais `width/height/top/left` → reflow). Durées sobres
  et lentes (~0.6–0.9 s), easings doux ; pas d'animation bloquant le LCP.
- Contenu visible en français (accents corrects) ; identifiants de code en anglais.
- `next/image` + `next/font` systématiques (jamais `<img>` brut, jamais de typo non auto-hébergée).
- Core Web Vitals : LCP < 2.5 s, CLS < 0.1, INP < 200 ms. Pas de layout shift (dimensions réservées).
- SEO : `metadata` par route, `app/sitemap.ts`, `app/robots.ts`, JSON-LD `Organization`, OpenGraph.
- A11y : HTML sémantique, un seul `<h1>` par page, hiérarchie de titres correcte, focus visible,
  contraste AA, `lang="fr"`.
- Commits fréquents après chaque tâche, en français, avec trailer
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
- Charte de référence : `docs/wabi-sabi/` ; spec : `docs/superpowers/specs/2026-06-19-architecture-ia-site-wabi-sabi-design.md`.

## Outillage `.claude/`
- `.claude/skills/` — trois skills citables (design system, conventions Next.js, patterns motion).
- `.claude/agents/` — deux subagents (`frontend-builder`, `quality-auditor`).
- `.claude/hooks/format.sh` — hook format-on-edit Prettier (défensif, no-op si pnpm/Prettier absent),
  câblé en `PostToolUse` (matcher `Edit|Write|MultiEdit`) dans `.claude/settings.json`.
- `.claude/settings.json` — allowlist de permissions Bash (pnpm, pnpm exec, npx, node, git, vercel)
  + hook de formatage. L'ensemble `.claude/` est versionné (extractible en plugin plus tard).
