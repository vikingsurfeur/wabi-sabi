# Architecture IA + Scaffolding Wabi Sabi — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mettre en place l'outillage Claude Code du repo (skills, subagents, settings/hooks, CLAUDE.md) puis échafauder le site vitrine Next.js Wabi Sabi avec son design system, son moteur d'animation et une page d'accueil de démonstration on-brand.

**Architecture:** Outillage `.claude/` versionné au niveau du repo (extractible en plugin plus tard). Application Next.js App Router (RSC par défaut), Tailwind CSS v4 (tokens CSS-first via `@theme`), Motion + Lenis pour une animation sobre avec garde `prefers-reduced-motion`, contenu en modules TypeScript typés. Le design system encode la charte Wabi Sabi (palette Monstera/Bronze/Anthracite/Crème + accent Golden Ocre, concept Kintsugi).

**Tech Stack:** Next.js (dernière stable, App Router) · React 19 · TypeScript strict · pnpm · Tailwind CSS v4 · Motion (`motion/react`) · Lenis (`lenis/react`) · next/font (Fraunces + Plus Jakarta Sans) · ESLint (config Next) · Prettier + `prettier-plugin-tailwindcss` · Vercel.

## Global Constraints

- **Vérification = build/typecheck/lint/rendu/audit, PAS de tests unitaires.** Aucun framework de test n'est introduit (hors périmètre du spec). Le « test » de chaque tâche est : `pnpm build` OK, `pnpm typecheck` OK, `pnpm lint` OK, rendu visuel correct sur `localhost:3000`, et Lighthouse ≥ 90 en fin de parcours.
- **Langue :** tout le contenu visible et les commentaires sont en **français** (accents corrects). Identifiants de code en anglais.
- **`prefers-reduced-motion` obligatoire :** toute animation doit se désactiver proprement (opacité instantanée, pas de transform/scroll animé) si l'utilisateur le demande.
- **RSC par défaut :** un composant n'est `"use client"` que s'il utilise état/effets/hooks navigateur (Motion, Lenis). Isoler le JS client.
- **Palette (hex exacts, verbatim) :** Monstera `#0B4628`, Bronze `#C2A687`, Anthracite `#3C3B40`, Crème `#E5E0DA`, Golden Ocre `#F2B705`.
- **Typo :** display = **Fraunces**, corps = **Plus Jakarta Sans** (les deux via `next/font/google`).
- **Fond du site = Crème `#E5E0DA`** (jamais blanc pur) ; texte principal = Anthracite `#3C3B40`.
- **Animer uniquement `transform`/`opacity`** (perf). Accent Golden Ocre ≈ 10 % d'usage (CTA, veines Kintsugi).
- **Commits fréquents** après chaque tâche, en français, avec trailer `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
- Branche de travail : `feat/architecture-ia-scaffolding` (déjà créée).

---

## File Structure

**Phase 1 — Outillage `.claude/` (Tasks 1-5)**
- `.claude/skills/wabi-sabi-design-system/SKILL.md` — bible visuelle (tokens, motion, Kintsugi, do/don't).
- `.claude/skills/nextjs-app-conventions/SKILL.md` — règles App Router citables.
- `.claude/skills/motion-lenis-patterns/SKILL.md` — patterns Motion + Lenis + reduced-motion.
- `.claude/agents/frontend-builder.md` — subagent constructeur UI.
- `.claude/agents/quality-auditor.md` — subagent audit perf/a11y/SEO.
- `.claude/hooks/format.sh` — hook format-on-edit (Prettier).
- `.claude/settings.json` — allowlist permissions + hook PostToolUse.
- `CLAUDE.md` — mémoire projet (stack, structure, commandes, conventions).

**Phase 2 — Scaffolding & design system (Tasks 6-10)**
- `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.prettierrc`, `.prettierignore` — configs (générées par create-next-app + ajustées).
- `app/layout.tsx` — fonts, `<html lang="fr">`, providers, metadata de base.
- `app/globals.css` — `@import "tailwindcss"` + `@theme` (tokens) + base layer.
- `lib/fonts.ts` — déclaration `next/font` Fraunces + Plus Jakarta Sans.
- `lib/utils.ts` — helper `cn()`.
- `components/ui/Container.tsx`, `components/ui/Section.tsx`, `components/ui/Button.tsx` — primitives.
- `components/motion/SmoothScroll.tsx` — provider Lenis (`ReactLenis`).
- `components/motion/Reveal.tsx` — reveal au scroll (Motion).
- `components/motion/KintsugiLine.tsx` — veine dorée tracée (SVG path draw).
- `content/site.ts`, `content/piliers.ts`, `content/team.ts`, `content/kpis.ts` — données typées.

**Phase 3 — Page de démo & SEO (Tasks 11-12)**
- `components/sections/Hero.tsx`, `components/sections/Piliers.tsx`, `components/sections/Kpis.tsx`.
- `app/page.tsx` — assemble la page d'accueil de démo.
- `app/sitemap.ts`, `app/robots.ts` — SEO.
- `lib/seo.ts` — helper metadata + JSON-LD Organization.

---

## Task 1 : Skill `wabi-sabi-design-system`

**Files:**
- Create: `.claude/skills/wabi-sabi-design-system/SKILL.md`

**Interfaces:**
- Produces : skill activable « wabi-sabi-design-system » ; source de vérité des tokens réutilisée par les Tasks 7-8-11 et par le subagent `frontend-builder`.

- [ ] **Step 1 : Écrire le SKILL.md**

```markdown
---
name: wabi-sabi-design-system
description: Charte visuelle du site Wabi Sabi (palette Monstera/Bronze/Anthracite/Crème + accent Golden Ocre, concept Kintsugi, typo Fraunces + Plus Jakarta Sans, principes de motion sobres). Charge ce skill pour TOUTE création/modification d'UI, de composant, de couleur, de typographie ou d'animation du site.
---

# Design System — Wabi Sabi

Esthétique : *wabi-sabi* (beauté de l'épure, du naturel, de l'imparfait) + concept **Kintsugi**
(réparer à l'or : l'IA est la ligne d'or dans les fissures de l'entreprise). Sobre, organique,
haut de gamme, généreux en blanc tournant. Jamais clinquant, jamais « template ».

## Palette (hex verbatim)

| Token | Hex | Rôle |
|---|---|---|
| `monstera` | `#0B4628` | Vert profond identitaire. Sections sombres, marque, ancrage. |
| `bronze` | `#C2A687` | Or doux, matière/texture/humain. Traits, accents chauds, filets. |
| `anthracite` | `#3C3B40` | Structure (code/infra). Texte principal, fonds sombres alternatifs. |
| `creme` | `#E5E0DA` | Papier washi. **Fond par défaut du site** (jamais blanc pur). |
| `ocre` | `#F2B705` | Golden Ocre / Kintsugi. **Accent action ≈10 %** : CTA, veines dorées. |

Accents secondaires (usage très ponctuel, hex à confirmer depuis `docs/wabi-sabi/color-system.png`) :
famille warm « Creative Energy » (Terracotta, Coral Deep, Plum) et cool « Tech & Growth »
(Cyan Electric, Moss Green Light, Slate Blue, Lavender Digital).

**Sémantique :** `background = creme`, `foreground = anthracite`, `primary = monstera`,
`material = bronze`, `accent = ocre`. Surfaces sombres : `anthracite` ou `monstera`.

## Typographie

- **Display / titres : Fraunces** (serif organique, axes optiques, italique calligraphique).
- **Corps / UI : Plus Jakarta Sans** (géométrique, lisible).
- Échelle fluide (`clamp()`), interlignage généreux, large blanc tournant, asymétrie maîtrisée.

## Motion (cf. skill `motion-lenis-patterns`)

Sobre et lent (~0.6–0.9 s, easing doux), reveals discrets au scroll, smooth-scroll Lenis léger.
Motif **Kintsugi** : veines dorées qui se *tracent* (SVG path draw). `prefers-reduced-motion`
TOUJOURS respecté. Anime uniquement `transform`/`opacity`.

## Texture & formes

Grain papier discret, ombres douces et basses, formes organiques (blob du logo). La décoration
sert l'épure, jamais l'inverse.

## Do / Don't

- ✅ Fond crème, texte anthracite, titres Fraunces, corps Plus Jakarta Sans.
- ✅ Golden Ocre réservé aux CTA et accents Kintsugi (parcimonie).
- ✅ Contraste AA vérifié (attention ocre sur clair → réserver aux gros éléments / ajouter du texte foncé).
- ❌ Pas de blanc pur en fond, pas de dégradés criards, pas d'animations rapides/agressives.
- ❌ Pas de palette hors charte sans validation.
```

- [ ] **Step 2 : Vérifier la validité du skill**

Run: `head -5 .claude/skills/wabi-sabi-design-system/SKILL.md`
Expected: le frontmatter YAML s'affiche avec `name:` et `description:` non vides.

- [ ] **Step 3 : Commit**

```bash
git add .claude/skills/wabi-sabi-design-system/SKILL.md
git commit -m "feat(ia): skill wabi-sabi-design-system (charte visuelle)"
```

---

## Task 2 : Skill `nextjs-app-conventions`

**Files:**
- Create: `.claude/skills/nextjs-app-conventions/SKILL.md`

**Interfaces:**
- Produces : skill « nextjs-app-conventions » avec règles citables (R-RSC, R-CLIENT, R-IMG…) réutilisées par `frontend-builder` et `quality-auditor`.

- [ ] **Step 1 : Écrire le SKILL.md**

```markdown
---
name: nextjs-app-conventions
description: Conventions Next.js App Router pour le site Wabi Sabi (RSC vs Client Component, data fetching, next/image, next/font, Metadata/SEO, Core Web Vitals, organisation des fichiers). Charge ce skill pour écrire/relire toute page, route ou composant Next.js. Cite la règle (ex. R-IMG) dans les revues.
---

# Conventions Next.js App Router — Wabi Sabi

- **R-RSC** : Server Component par défaut. Pas de `"use client"` sauf besoin réel (état, effets,
  API navigateur, Motion/Lenis). Garder les Client Components petits et en feuille de l'arbre.
- **R-CLIENT** : isoler l'interactivité dans de petits composants `"use client"` ; le parent reste RSC.
- **R-IMG** : toujours `next/image` (jamais `<img>`), avec `width`/`height` ou `fill` + `sizes`,
  et `alt` pertinent. Images au-dessus de la ligne de flottaison : `priority`.
- **R-FONT** : typos via `next/font` (auto-hébergées), `display: "swap"`, exposées en variables CSS.
- **R-META** : chaque route exporte `metadata` (ou `generateMetadata`) — `title`, `description`,
  `openGraph`. Métadonnées globales dans `app/layout.tsx`.
- **R-FETCH** : data fetching côté serveur (RSC `async`) quand possible. Modules de contenu typés
  dans `content/` importés directement (pas d'appel réseau pour le contenu statique).
- **R-FILE** : un fichier = une responsabilité. `components/ui` (primitives), `components/sections`
  (sections de page), `components/motion` (animation), `lib` (utils), `content` (données).
  Alias d'import `@/*`.
- **R-PERF** : budget Core Web Vitals (LCP < 2.5 s, CLS < 0.1, INP < 200 ms). JS client minimal,
  pas de layout shift (dimensions réservées), `transform`/`opacity` pour l'animation.
- **R-A11Y** : HTML sémantique (`header/main/section/nav/footer`), un seul `<h1>` par page,
  hiérarchie de titres correcte, focus visible, contraste AA, `lang="fr"`, `prefers-reduced-motion`.
- **R-SEO** : `app/sitemap.ts`, `app/robots.ts`, JSON-LD `Organization`, image OpenGraph.
- **R-ENV** : variables d'env via `process.env`, jamais de secret côté client (préfixe
  `NEXT_PUBLIC_` uniquement pour le non-sensible).

## Vérification

`pnpm typecheck && pnpm lint && pnpm build` doivent passer. Pas de framework de test unitaire :
la qualité se vérifie par build + rendu + Lighthouse (Perf/A11y/SEO/Best Practices ≥ 90).
```

- [ ] **Step 2 : Vérifier**

Run: `head -3 .claude/skills/nextjs-app-conventions/SKILL.md`
Expected: frontmatter avec `name: nextjs-app-conventions`.

- [ ] **Step 3 : Commit**

```bash
git add .claude/skills/nextjs-app-conventions/SKILL.md
git commit -m "feat(ia): skill nextjs-app-conventions (regles App Router citables)"
```

---

## Task 3 : Skill `motion-lenis-patterns`

**Files:**
- Create: `.claude/skills/motion-lenis-patterns/SKILL.md`

**Interfaces:**
- Produces : skill « motion-lenis-patterns » décrivant les patterns implémentés en Task 9
  (`SmoothScroll`, `Reveal`, `KintsugiLine`).

- [ ] **Step 1 : Écrire le SKILL.md**

```markdown
---
name: motion-lenis-patterns
description: Patterns d'animation du site Wabi Sabi avec Motion (motion/react) + Lenis (smooth-scroll), incluant le motif Kintsugi (veine dorée tracée) et la garde prefers-reduced-motion obligatoire. Charge ce skill pour ajouter ou relire toute animation/transition/effet au scroll.
---

# Patterns Motion + Lenis — Wabi Sabi

Animation **sobre et lente**. Anime uniquement `transform`/`opacity`. JS client isolé.

## Règles

- **M-RM (impératif)** : respecter `prefers-reduced-motion`. Via `useReducedMotion()` de Motion,
  rendre l'état final immédiatement (opacité 1, pas de translate) ; désactiver le smooth-scroll Lenis.
- **M-PROVIDER** : `SmoothScroll` (Client Component) enveloppe l'app dans `layout.tsx` via
  `ReactLenis` (`lenis/react`), options douces (`lerp` ~0.1, `duration` ~1.0). Désactivé si reduced-motion.
- **M-REVEAL** : composant `Reveal` (Client) — `motion.div` avec `initial={{opacity:0, y:16}}`,
  `whileInView={{opacity:1, y:0}}`, `viewport={{once:true, margin:"-10% 0px"}}`,
  `transition={{duration:0.7, ease:[0.22,1,0.36,1]}}`. Stagger via prop `delay`.
- **M-KINTSUGI** : `KintsugiLine` — `<motion.path>` SVG animé par `pathLength` (0→1) avec
  `stroke` ocre `#F2B705`, déclenché `whileInView`. C'est la signature visuelle « réparer à l'or ».
- **M-PERF** : pas d'animation de `width/height/top/left` ; préférer `transform`. Pas d'animation
  bloquant le LCP. Garder les composants animés petits et en feuille.

## Anti-patterns

- ❌ Animer le layout (reflow). ❌ Durées < 0.3 s ou easings agressifs. ❌ Oublier `prefers-reduced-motion`.
- ❌ Mettre `"use client"` sur un parent entier juste pour animer un enfant.
```

- [ ] **Step 2 : Vérifier**

Run: `head -3 .claude/skills/motion-lenis-patterns/SKILL.md`
Expected: frontmatter avec `name: motion-lenis-patterns`.

- [ ] **Step 3 : Commit**

```bash
git add .claude/skills/motion-lenis-patterns/SKILL.md
git commit -m "feat(ia): skill motion-lenis-patterns (Motion + Lenis + Kintsugi)"
```

---

## Task 4 : Subagents `frontend-builder` et `quality-auditor`

**Files:**
- Create: `.claude/agents/frontend-builder.md`
- Create: `.claude/agents/quality-auditor.md`

**Interfaces:**
- Produces : deux subagents invocables via le Task tool (`frontend-builder`, `quality-auditor`).

- [ ] **Step 1 : Écrire `frontend-builder.md`**

```markdown
---
name: frontend-builder
description: Construit pages et composants du site Wabi Sabi (Next.js App Router + Tailwind v4 + Motion/Lenis), on-brand. À utiliser pour implémenter une section, une page ou un composant UI.
tools: Read, Write, Edit, Bash, Glob, Grep
---

Tu es développeur front Next.js senior pour le site vitrine Wabi Sabi.

Avant toute écriture, charge et applique les skills : `wabi-sabi-design-system`,
`nextjs-app-conventions`, `motion-lenis-patterns` (et `artifact-design` pour la qualité visuelle).

Règles : RSC par défaut (isoler le client) ; tokens de la charte uniquement (jamais de couleur
en dur hors palette) ; fond crème, texte anthracite, CTA ocre ; `next/image` + `next/font` ;
`prefers-reduced-motion` respecté ; contenu visible en français.

À la fin : lance `pnpm typecheck && pnpm lint && pnpm build` et corrige jusqu'au vert.
Ne déclare « terminé » qu'avec la preuve du build OK. Rends un résumé des fichiers touchés.
```

- [ ] **Step 2 : Écrire `quality-auditor.md`**

```markdown
---
name: quality-auditor
description: Audite le site Wabi Sabi sur la performance (Core Web Vitals/Lighthouse), l'accessibilité (WCAG AA) et le SEO (Metadata, JSON-LD, sitemap/robots). Lecture seule + build, ne modifie pas le code. À utiliser avant un merge ou après une grosse feature.
tools: Read, Bash, Glob, Grep
---

Tu es auditeur qualité front. Tu NE modifies PAS le code — tu rapportes des constats priorisés.

Vérifie, en citant les règles de `nextjs-app-conventions` :
- **Perf** : `pnpm build` OK ; JS client minimal ; `next/image`/`next/font` ; pas de layout shift ;
  animations en `transform`/`opacity`. Lance Lighthouse si possible (`npx lighthouse <url> --quiet`).
- **A11y** : HTML sémantique, hiérarchie de titres, `alt`, focus visible, contraste AA (dont ocre),
  `lang="fr"`, `prefers-reduced-motion`.
- **SEO** : `metadata` par route, `sitemap.ts`, `robots.ts`, JSON-LD `Organization`, OpenGraph.

Rends un rapport : ❌ bloquants / ⚠️ à corriger / 💡 améliorations, chacun avec fichier:ligne et la règle.
```

- [ ] **Step 3 : Vérifier le frontmatter**

Run: `head -4 .claude/agents/frontend-builder.md && echo "---" && head -4 .claude/agents/quality-auditor.md`
Expected: chaque fichier a `name` et `description` (+ `tools`) en frontmatter.

- [ ] **Step 4 : Commit**

```bash
git add .claude/agents/frontend-builder.md .claude/agents/quality-auditor.md
git commit -m "feat(ia): subagents frontend-builder et quality-auditor"
```

---

## Task 5 : Settings, hook format-on-edit et CLAUDE.md

**Files:**
- Create: `.claude/hooks/format.sh`
- Create: `.claude/settings.json`
- Create: `CLAUDE.md`

**Interfaces:**
- Produces : allowlist de permissions, hook PostToolUse de formatage, mémoire projet `CLAUDE.md`.

- [ ] **Step 1 : Écrire le hook `.claude/hooks/format.sh`**

```bash
#!/usr/bin/env bash
# Formate avec Prettier le fichier qui vient d'être édité (no-op si rien n'est dispo).
set -euo pipefail
file="$(python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get("tool_input",{}).get("file_path",""))' 2>/dev/null || true)"
[ -z "${file:-}" ] && exit 0
case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.json|*.css|*.md) ;;
  *) exit 0 ;;
esac
[ -f package.json ] || exit 0
command -v pnpm >/dev/null 2>&1 || exit 0
pnpm exec prettier --write "$file" >/dev/null 2>&1 || true
exit 0
```

- [ ] **Step 2 : Rendre le hook exécutable**

Run: `chmod +x .claude/hooks/format.sh && echo OK`
Expected: `OK`

- [ ] **Step 3 : Écrire `.claude/settings.json`**

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(pnpm:*)",
      "Bash(pnpm exec:*)",
      "Bash(npx:*)",
      "Bash(node:*)",
      "Bash(git:*)",
      "Bash(vercel:*)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          { "type": "command", "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/format.sh\"" }
        ]
      }
    ]
  }
}
```

- [ ] **Step 4 : Écrire `CLAUDE.md`**

```markdown
# Wabi Sabi — Site vitrine

Site vitrine du cabinet **Wabi Sabi** (formation + outils IA pour PME).
Tagline : *Former · Automatiser · Transformer*. Concept de marque : **Kintsugi**.

## Stack
Next.js (App Router, RSC) · TypeScript strict · pnpm · Tailwind CSS v4 (`@theme`) ·
Motion (`motion/react`) + Lenis (`lenis/react`) · next/font (Fraunces + Plus Jakarta Sans) · Vercel.

## Commandes
- `pnpm dev` — serveur de dev
- `pnpm build` — build production
- `pnpm start` — serveur production
- `pnpm lint` — ESLint
- `pnpm typecheck` — `tsc --noEmit`

## Structure
`app/` (routes, layout, SEO) · `components/{ui,sections,motion}` · `lib/` (utils, fonts, seo) ·
`content/` (données typées FR) · `public/` (assets). Alias `@/*`.

## Conventions (skills)
Charger selon le travail : `wabi-sabi-design-system` (UI/couleurs/typo), `nextjs-app-conventions`
(pages/routes), `motion-lenis-patterns` (animations). Subagents : `frontend-builder`, `quality-auditor`.

## Règles clés
- Fond Crème `#E5E0DA` (jamais blanc pur), texte Anthracite `#3C3B40`, CTA Golden Ocre `#F2B705`.
- RSC par défaut ; isoler le client (Motion/Lenis). `prefers-reduced-motion` toujours respecté.
- Contenu visible en français (accents corrects). `next/image` + `next/font` systématiques.
- Charte de référence : `docs/wabi-sabi/` ; spec : `docs/superpowers/specs/2026-06-19-architecture-ia-site-wabi-sabi-design.md`.
```

- [ ] **Step 5 : Vérifier la validité JSON**

Run: `python3 -m json.tool .claude/settings.json > /dev/null && echo "JSON OK"`
Expected: `JSON OK`

- [ ] **Step 6 : Commit**

```bash
git add .claude/hooks/format.sh .claude/settings.json CLAUDE.md
git commit -m "feat(ia): settings (allowlist + hook format) et CLAUDE.md"
```

---

## Task 6 : Initialiser l'application Next.js

**Files:**
- Create (générés) : `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`,
  `eslint.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `next-env.d.ts`, `public/*`.
- Modify : `.gitignore` (fusion si nécessaire).

**Interfaces:**
- Produces : projet Next.js buildable à la racine du repo, gestionnaire pnpm, alias `@/*`,
  Tailwind v4 câblé. Scripts `dev/build/start/lint` + ajout de `typecheck`.

- [ ] **Step 1 : Scaffolder dans un dossier temporaire (évite les conflits avec les fichiers existants)**

```bash
SCRATCH="/private/tmp/claude-502/-Users-david-bouscarle-Projects-wabi-sabi/1e045806-c933-4161-a4dc-a2bf80684f68/scratchpad"
mkdir -p "$SCRATCH"
cd "$SCRATCH"
pnpm create next-app@latest wabi-app --ts --app --tailwind --eslint --no-src-dir --import-alias "@/*" --use-pnpm --turbopack --yes
```
Expected: un projet `wabi-app/` est généré (Tailwind v4, App Router, TS).

- [ ] **Step 2 : Importer les fichiers générés dans le repo (sans écraser .git ni la charte)**

```bash
cd /Users/david.bouscarle/Projects/wabi-sabi
SRC="/private/tmp/claude-502/-Users-david-bouscarle-Projects-wabi-sabi/1e045806-c933-4161-a4dc-a2bf80684f68/scratchpad/wabi-app"
# Fusionner .gitignore (créé en Step 0 du repo) : concaténer les lignes manquantes
cat "$SRC/.gitignore" >> .gitignore && sort -u -o .gitignore .gitignore
rsync -a --exclude '.git' --exclude '.gitignore' --exclude 'README.md' --exclude 'node_modules' "$SRC"/ ./
pnpm install
```
Expected: `package.json`, `app/`, configs présents à la racine ; `pnpm install` termine sans erreur.

- [ ] **Step 3 : Activer TypeScript strict et ajouter le script `typecheck`**

Dans `tsconfig.json`, s'assurer que `"strict": true` est présent sous `compilerOptions`.
Dans `package.json`, ajouter au bloc `"scripts"` :
```json
"typecheck": "tsc --noEmit"
```

- [ ] **Step 4 : Installer les dépendances d'animation et de formatage**

```bash
pnpm add motion lenis
pnpm add -D prettier prettier-plugin-tailwindcss
```
Expected: ajoutées dans `package.json`.

- [ ] **Step 5 : Créer `.prettierrc`**

```json
{
  "semi": true,
  "singleQuote": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 6 : Vérifier build + typecheck + lint**

```bash
pnpm typecheck && pnpm lint && pnpm build
```
Expected: les trois passent sans erreur (la page par défaut Next.js compile).

- [ ] **Step 7 : Commit**

```bash
git add -A
git commit -m "feat(scaffold): initialisation Next.js App Router + Tailwind v4 + Motion/Lenis"
```

---

## Task 7 : Design tokens, fonts et base layer

**Files:**
- Create: `lib/fonts.ts`
- Create: `lib/utils.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes : Tailwind v4 (Task 6).
- Produces : variables CSS `--font-display`, `--font-sans` ; classes de couleur Tailwind
  `bg-creme text-anthracite text-monstera bg-anthracite text-ocre` etc. ; helper `cn(...inputs)`.

- [ ] **Step 1 : Écrire `lib/fonts.ts`**

```ts
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
```

- [ ] **Step 2 : Écrire `lib/utils.ts`**

```ts
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}
```

- [ ] **Step 3 : Remplacer `app/globals.css` par les tokens de la charte**

```css
@import "tailwindcss";

@theme {
  --color-monstera: #0b4628;
  --color-bronze: #c2a687;
  --color-anthracite: #3c3b40;
  --color-creme: #e5e0da;
  --color-ocre: #f2b705;

  --font-display: var(--font-display), ui-serif, Georgia, serif;
  --font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: var(--color-creme);
    color: var(--color-anthracite);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  h1, h2, h3 {
    font-family: var(--font-display);
    color: var(--color-monstera);
    text-wrap: balance;
  }
  ::selection {
    background-color: var(--color-ocre);
    color: var(--color-anthracite);
  }
}
```

- [ ] **Step 4 : Brancher les fonts et `lang="fr"` dans `app/layout.tsx`**

Remplacer le contenu par (en conservant l'import de `globals.css`) :
```tsx
import type { Metadata } from "next";
import { fraunces, jakarta } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wabi Sabi — Former · Automatiser · Transformer",
  description:
    "Cabinet de formation et d'outils IA pour PME. L'intégration IA à 360° par des experts natifs du digital.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5 : Vérifier rendu + build**

```bash
pnpm typecheck && pnpm lint && pnpm build
```
Expected: vert. (Optionnel : `pnpm dev` puis vérifier sur `http://localhost:3000` que le fond est crème et la police de titre est un serif.)

- [ ] **Step 6 : Commit**

```bash
git add lib/fonts.ts lib/utils.ts app/globals.css app/layout.tsx
git commit -m "feat(design): tokens charte Wabi Sabi + fonts Fraunces/Plus Jakarta Sans"
```

---

## Task 8 : Primitives UI

**Files:**
- Create: `components/ui/Container.tsx`
- Create: `components/ui/Section.tsx`
- Create: `components/ui/Button.tsx`

**Interfaces:**
- Consumes : `cn` (`@/lib/utils`), classes Tailwind des tokens (Task 7).
- Produces : `<Container>`, `<Section id? tone?>`, `<Button as? variant? href?>`.

- [ ] **Step 1 : Écrire `components/ui/Container.tsx`**

```tsx
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)}>{children}</div>;
}
```

- [ ] **Step 2 : Écrire `components/ui/Section.tsx`**

```tsx
import { cn } from "@/lib/utils";

type Tone = "creme" | "anthracite" | "monstera";

const tones: Record<Tone, string> = {
  creme: "bg-creme text-anthracite",
  anthracite: "bg-anthracite text-creme",
  monstera: "bg-monstera text-creme",
};

export function Section({
  id,
  tone = "creme",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-24 md:py-32", tones[tone], className)}>
      {children}
    </section>
  );
}
```

- [ ] **Step 3 : Écrire `components/ui/Button.tsx`**

```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-ocre text-anthracite hover:brightness-95",
  ghost: "border border-anthracite/30 text-anthracite hover:bg-anthracite/5",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anthracite",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 4 : Vérifier**

```bash
pnpm typecheck && pnpm lint
```
Expected: vert.

- [ ] **Step 5 : Commit**

```bash
git add components/ui
git commit -m "feat(ui): primitives Container, Section, Button (on-brand)"
```

---

## Task 9 : Moteur d'animation (Lenis + Reveal + Kintsugi)

**Files:**
- Create: `components/motion/SmoothScroll.tsx`
- Create: `components/motion/Reveal.tsx`
- Create: `components/motion/KintsugiLine.tsx`
- Modify: `app/layout.tsx` (envelopper avec `SmoothScroll`)

**Interfaces:**
- Consumes : `motion/react`, `lenis/react`.
- Produces : `<SmoothScroll>`, `<Reveal delay?>`, `<KintsugiLine className?>`. Tous respectent
  `prefers-reduced-motion`.

- [ ] **Step 1 : Écrire `components/motion/SmoothScroll.tsx`**

```tsx
"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.0 }}>
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 2 : Écrire `components/motion/Reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3 : Écrire `components/motion/KintsugiLine.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";

// Veine dorée « Kintsugi » qui se trace à l'apparition.
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
```

- [ ] **Step 4 : Envelopper l'app avec `SmoothScroll` dans `app/layout.tsx`**

Dans `app/layout.tsx`, importer `SmoothScroll` et entourer `{children}` :
```tsx
import { SmoothScroll } from "@/components/motion/SmoothScroll";
// ...
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
```

- [ ] **Step 5 : Vérifier**

```bash
pnpm typecheck && pnpm lint && pnpm build
```
Expected: vert.

- [ ] **Step 6 : Commit**

```bash
git add components/motion app/layout.tsx
git commit -m "feat(motion): SmoothScroll Lenis + Reveal + KintsugiLine (reduced-motion safe)"
```

---

## Task 10 : Modules de contenu typés

**Files:**
- Create: `content/site.ts`
- Create: `content/piliers.ts`
- Create: `content/team.ts`
- Create: `content/kpis.ts`

**Interfaces:**
- Produces : `site` (objet), `piliers` (`Pilier[]`), `team` (`Member[]`), `kpis` (`Kpi[]`).

- [ ] **Step 1 : Écrire `content/site.ts`**

```ts
export const site = {
  name: "Wabi Sabi",
  url: "https://wabisabi.fr",
  tagline: "Former · Automatiser · Transformer",
  uvp: "L'intégration IA à 360° par des experts natifs du digital, pour propulser la performance et le quotidien de votre PME.",
  email: "contact@wabisabi.fr",
  phone: "07 78 54 33 67",
} as const;
```

- [ ] **Step 2 : Écrire `content/piliers.ts`**

```ts
export type Pilier = { titre: string; message: string };

export const piliers: Pilier[] = [
  {
    titre: "Former",
    message:
      "Démystifier l'IA et acculturer vos équipes pour lever les peurs et libérer les usages.",
  },
  {
    titre: "Automatiser",
    message:
      "Connecter vos outils et éradiquer les tâches chronophages pour redonner du temps à forte valeur.",
  },
  {
    titre: "Transformer",
    message:
      "Passer d'une organisation sous tension à une entreprise agile, performante et orientée croissance.",
  },
];
```

- [ ] **Step 3 : Écrire `content/team.ts`**

```ts
export type Member = { prenom: string; role: string; pilier: string };

export const team: Member[] = [
  { prenom: "Cédric", role: "Vision Stratégie & Produit", pilier: "Audit & impact business" },
  { prenom: "David", role: "Tech & Infrastructure", pilier: "Automatisations robustes & sécurisées" },
  { prenom: "Manon", role: "Data & Performance Market", pilier: "Acquisition & performance mesurable" },
];
```

- [ ] **Step 4 : Écrire `content/kpis.ts`**

```ts
export type Kpi = { valeur: string; libelle: string };

export const kpis: Kpi[] = [
  { valeur: "+100", libelle: "structures accompagnées" },
  { valeur: "95 %", libelle: "taux d'adoption de l'IA" },
  { valeur: "64 %", libelle: "de gain de productivité moyen" },
];
```

- [ ] **Step 5 : Vérifier**

```bash
pnpm typecheck
```
Expected: vert.

- [ ] **Step 6 : Commit**

```bash
git add content
git commit -m "feat(content): modules typés (site, piliers, équipe, KPIs)"
```

---

## Task 11 : Sections et page d'accueil de démonstration

**Files:**
- Create: `components/sections/Hero.tsx`
- Create: `components/sections/Piliers.tsx`
- Create: `components/sections/Kpis.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes : `Container`, `Section`, `Button` (Task 8) ; `Reveal`, `KintsugiLine` (Task 9) ;
  `site`, `piliers`, `kpis` (Task 10).
- Produces : page d'accueil assemblée.

- [ ] **Step 1 : Écrire `components/sections/Hero.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { KintsugiLine } from "@/components/motion/KintsugiLine";
import { site } from "@/content/site";

export function Hero() {
  return (
    <header className="relative overflow-hidden py-32 md:py-44">
      <Container>
        <Reveal>
          <p className="font-sans text-sm uppercase tracking-[0.25em] text-bronze">{site.tagline}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] md:text-7xl">{site.name}</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <KintsugiLine className="mt-6 h-5 w-64 text-ocre" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl text-lg text-anthracite/80 md:text-xl">{site.uvp}</p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={`mailto:${site.email}`}>Prendre 45 min</Button>
            <Button href="#piliers" variant="ghost">
              Notre approche
            </Button>
          </div>
        </Reveal>
      </Container>
    </header>
  );
}
```

- [ ] **Step 2 : Écrire `components/sections/Piliers.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { piliers } from "@/content/piliers";

export function Piliers() {
  return (
    <Section id="piliers" tone="monstera">
      <Container>
        <Reveal>
          <h2 className="text-4xl text-creme md:text-5xl">Nos trois piliers</h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {piliers.map((p, i) => (
            <Reveal key={p.titre} delay={i * 0.1}>
              <h3 className="text-2xl text-bronze">{p.titre}</h3>
              <p className="mt-4 text-creme/80">{p.message}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3 : Écrire `components/sections/Kpis.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { kpis } from "@/content/kpis";

export function Kpis() {
  return (
    <Section tone="creme">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          {kpis.map((k, i) => (
            <Reveal key={k.libelle} delay={i * 0.1} className="text-center">
              <p className="font-display text-6xl text-monstera">{k.valeur}</p>
              <p className="mt-2 text-anthracite/70">{k.libelle}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4 : Réécrire `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { Piliers } from "@/components/sections/Piliers";
import { Kpis } from "@/components/sections/Kpis";

export default function Home() {
  return (
    <main>
      <Hero />
      <Kpis />
      <Piliers />
    </main>
  );
}
```

- [ ] **Step 5 : Vérifier build + rendu**

```bash
pnpm typecheck && pnpm lint && pnpm build
```
Expected: vert. Lancer `pnpm dev` et confirmer sur `http://localhost:3000` : fond crème, titre serif Monstera, KPIs, section piliers vert Monstera, CTA ocre, reveals au scroll.

- [ ] **Step 6 : Commit**

```bash
git add components/sections app/page.tsx
git commit -m "feat(page): accueil de démo (Hero + KPIs + Piliers) on-brand animée"
```

---

## Task 12 : SEO, sitemap/robots, JSON-LD et audit final

**Files:**
- Create: `lib/seo.ts`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `app/page.tsx` (injecter le JSON-LD Organization)

**Interfaces:**
- Consumes : `site` (Task 10).
- Produces : `organizationJsonLd()`, `sitemap`, `robots`.

- [ ] **Step 1 : Écrire `lib/seo.ts`**

```ts
import { site } from "@/content/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    slogan: site.tagline,
    description: site.uvp,
  };
}
```

- [ ] **Step 2 : Écrire `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, priority: 1 }];
}
```

- [ ] **Step 3 : Écrire `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 4 : Injecter le JSON-LD dans `app/page.tsx`**

Ajouter en tête du `<main>` :
```tsx
import { organizationJsonLd } from "@/lib/seo";
// ...
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <Hero />
```

- [ ] **Step 5 : Vérifier build complet**

```bash
pnpm typecheck && pnpm lint && pnpm build
```
Expected: vert ; `/sitemap.xml` et `/robots.txt` listés dans la sortie de build.

- [ ] **Step 6 : Audit qualité (subagent `quality-auditor`)**

Dispatcher le subagent `quality-auditor` sur la page d'accueil (build de prod servi localement) :
- `pnpm build && pnpm start` puis `npx lighthouse http://localhost:3000 --quiet --chrome-flags="--headless"` si disponible.
- Corriger tout bloquant a11y/SEO remonté (cibles : Perf/A11y/SEO/Best Practices ≥ 90).

- [ ] **Step 7 : Commit final**

```bash
git add lib/seo.ts app/sitemap.ts app/robots.ts app/page.tsx
git commit -m "feat(seo): metadata, sitemap, robots, JSON-LD Organization + audit qualité"
```

---

## Self-Review (couverture du spec)

- §4.1 CLAUDE.md → Task 5 ✅ · §4.2 skills → Tasks 1-3 ✅ · §4.3 subagents → Task 4 ✅ ·
  §4.4 settings/hooks → Task 5 ✅
- §5 scaffolding (deps, structure, configs, fonts) → Tasks 6-7 ✅
- §6 design system (palette, typo, motion, Kintsugi, texture) → Tasks 7-9 ✅
- §7 contenu typé FR → Task 10 ✅
- §8 SEO/Perf/A11y → Tasks 9 (reduced-motion), 11 (sémantique), 12 (metadata/sitemap/robots/JSON-LD/audit) ✅
- §9 Vercel → couvert implicitement (build pnpm, prêt au déploiement ; config domaine = ultérieure, hors périmètre) ✅
- §10 critères de succès → vérifs build/typecheck/lint à chaque tâche + audit Lighthouse Task 12 ✅
- §11 questions ouvertes : Fraunces retenu (modifiable en 1 ligne dans `lib/fonts.ts`) ; accents secondaires non utilisés dans la démo (cœur seulement) ✅

Placeholders : aucun « TBD/TODO ». Cohérence des types : `Pilier`/`Member`/`Kpi`/`site` définis en
Task 10 et consommés tels quels en Tasks 11-12 ; `cn` défini en Task 7 et utilisé en Task 8.
