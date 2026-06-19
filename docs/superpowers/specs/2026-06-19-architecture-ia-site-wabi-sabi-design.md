# Spec — Architecture IA + Scaffolding du site vitrine Wabi Sabi

**Date :** 2026-06-19
**Auteur :** David Bouscarle (avec Claude Code)
**Statut :** Validé pour implémentation

---

## 1. Contexte & objectif

**Wabi Sabi** (wabisabi.fr) est un cabinet de **formation et d'outils IA** pour PME :
audit, formations par métier, automatisations/agents sur-mesure, charte IA, veille continue.
Positionnement : *« L'intégration IA à 360° par des experts natifs du digital, pour propulser la
performance et le quotidien de votre PME. »* — tagline **Former · Automatiser · Transformer**.
Trio fondateur : **Cédric** (Vision Stratégie & Produit), **David** (Tech & Infrastructure),
**Manon** (Data & Performance Market). Certifiés Anthropic Academy.

On construit un **site vitrine** Next.js déployé sur Vercel, sobre et « tranquillement animé »,
fidèle à l'esthétique *wabi-sabi* (beauté de l'épure, du naturel, de l'imparfait) et au concept
narratif **Kintsugi** (réparer à l'or — l'IA comme ligne d'or dans les fissures de l'entreprise).

**Objectif de ce spec :** poser en une étape (a) **l'architecture IA** — l'outillage Claude Code
versionné qui garantit une qualité « par défaut » lors du développement — et (b) le **scaffolding**
du projet Next.js prêt à recevoir les pages.

## 2. Périmètre

**Inclus :**
- Outillage Claude Code au niveau du repo (`.claude/` : CLAUDE.md, skills, subagents, settings/hooks).
- Initialisation du projet Next.js (App Router, TypeScript, Tailwind v4, Motion + Lenis, pnpm).
- Codification du **design system Wabi Sabi** (tokens, typo, motion, motif Kintsugi).
- Structure de dossiers, configs (ESLint/Prettier, SEO de base, Vercel), modules de contenu typés.
- Une **page d'accueil de démonstration** minimale prouvant que la chaîne (build, brand, motion,
  déploiement) fonctionne de bout en bout. Le contenu complet des pages est un cycle ultérieur.

**Exclus (cycles ultérieurs) :**
- Rédaction/intégration complète de toutes les pages et de tout le copywriting.
- CMS headless, blog/veille MDX, formulaire de contact branché à un backend.
- i18n multilingue (FR uniquement pour l'instant ; textes centralisés pour extension EN future).
- Authentification, espace client, intégrations tierces.

## 3. Décisions structurantes

| Sujet | Décision | Raison |
|---|---|---|
| Forme de l'outillage | `.claude/` **au niveau du repo** (approche A) | Simple, versionné, partageable ; structuré pour être *extrait* en plugin plus tard |
| Framework | **Next.js** dernière stable, **App Router**, RSC par défaut | Standard, SEO/perf natifs, Vercel |
| Langage | **TypeScript** strict | Robustesse |
| Gestionnaire de paquets | **pnpm** | Rapide, déterministe, supporté Vercel |
| Styles | **Tailwind CSS v4** (config CSS-first `@theme`) | Tokens centralisés, vélocité |
| Animation | **Motion** (`motion/react`) + **Lenis** (smooth-scroll) | Sobre, fluide, React-idiomatique ; garde `prefers-reduced-motion` |
| Contenu | Modules **TS typés** (`content/*.ts`) | Éditable sans CMS ; typé |
| i18n | **FR uniquement**, textes centralisés | YAGNI ; extensible plus tard |
| Déploiement | **Vercel** | Natif Next.js |

## 4. Architecture IA — `.claude/`

### 4.1 `CLAUDE.md` (mémoire projet)
Stack, structure des dossiers, résumé de marque, commandes (`pnpm dev/build/lint/typecheck`),
conventions, règles do/don't, pointeurs vers les skills. Court et actionnable.

### 4.2 Skills (`.claude/skills/`)
Trois skills cœur + un optionnel.

1. **`wabi-sabi-design-system`** *(le plus précieux)* — la bible visuelle : tokens (palette,
   typo, rythme d'espacement, radius, ombres), principes de motion, motif **Kintsugi**, patterns
   de composants, do/don't on-brand. Cité comme référence par tout travail d'UI.
2. **`nextjs-app-conventions`** — règles App Router **citables** (ex. « R-RSC », « R-IMG ») :
   RSC vs Client Component, data fetching, `next/image`/`next/font`, Metadata API/SEO,
   budget Core Web Vitals, organisation des fichiers.
3. **`motion-lenis-patterns`** — provider smooth-scroll (`ReactLenis`), patterns de reveal au
   scroll, animation de « tracé » des veines dorées (SVG path draw — Kintsugi), garde
   `prefers-reduced-motion` obligatoire, règles de perf (pas de layout thrash, `transform`/`opacity`).
4. *(optionnel)* **`brand-voice-fr`** — ton FR du cabinet (assurance, concret, pragmatisme
   wabi-sabi, rassurant sur la sécurité des données) pour la génération de copy.

### 4.3 Subagents (`.claude/agents/`)
Focalisés, mono-rôle.

1. **`frontend-builder`** — implémente pages/composants Next.js + Tailwind + Motion, on-brand
   (s'appuie sur les 3 skills). Édition de fichiers + bash dev.
2. **`quality-auditor`** — audit **perf** (Core Web Vitals/Lighthouse), **a11y** (WCAG AA),
   **SEO** (complétude Metadata/JSON-LD/sitemap). Lecture + build, sans édition.

On réutilise les skills globaux existants (`artifact-design`, `code-review`,
`verification-before-completion`) plutôt que de les dupliquer.

### 4.4 Settings & hooks (`.claude/settings.json`)
- **Allowlist** des commandes dev (pnpm, next, git, vercel, eslint) pour réduire les prompts.
- **Hook PostToolUse** : `prettier --write` + `eslint --fix` sur les `.ts/.tsx` édités (format-on-edit).
- Commandes `typecheck`/`lint`/`build` documentées (pas de hook bloquant — YAGNI).

## 5. Scaffolding Next.js

### 5.1 Dépendances
- Runtime : `next`, `react`, `react-dom`, `motion`, `lenis`.
- Dev : `typescript`, `@types/*`, `tailwindcss` v4 + `@tailwindcss/postcss`, `eslint` +
  config Next, `prettier` + `prettier-plugin-tailwindcss`.
- Optionnel : `@vercel/analytics`, `@vercel/speed-insights`.

### 5.2 Structure
```
app/
  layout.tsx            # fonts (next/font), <html lang="fr">, providers, metadata de base
  page.tsx              # page d'accueil de démonstration
  sitemap.ts robots.ts  # SEO
  globals.css           # @import tailwind + @theme tokens + base layer
components/
  ui/                   # primitives (Button, Container, Section…)
  sections/             # sections de page (Hero…)
  motion/               # SmoothScroll provider, Reveal, KintsugiLine
lib/                    # utils (cn, seo helpers)
content/                # données typées : services.ts, team.ts, kpis.ts, testimonials.ts, site.ts
public/                 # assets statiques (logo, og image, textures)
```

### 5.3 Configs
- `tsconfig.json` strict + alias `@/*`.
- `next.config.ts`, `postcss.config.mjs`, `.prettierrc`, `eslint` (config Next + a11y).
- `next/font` : **Fraunces** (display) + **Plus Jakarta Sans** (corps), auto-hébergées, `display: swap`, variables CSS.

## 6. Design system Wabi Sabi

### 6.1 Palette (tokens)
**Primaires :**
- `--monstera: #0B4628` — vert profond, couleur identitaire, ancrage. *Sections sombres / marque.*
- `--bronze: #C2A687` — or doux, matière/texture/humain. *Accents chauds, traits.*
- `--anthracite: #3C3B40` — structure, code/infra. *Texte principal, fonds sombres.*
- `--creme: #E5E0DA` — papier washi. *Fond par défaut du site (évite le blanc pur).*

**Accent action (≈10 %, le Kintsugi) :**
- `--ocre: #F2B705` — Golden Ocre. *CTA, veines dorées, points de rupture. À utiliser avec parcimonie.*

**Accents secondaires** *(usage très ponctuel — exacts à confirmer depuis `color-system.png`)* :
- Famille « Creative Energy » (warm) : Golden Ocre, Terracotta, Coral Deep, Plum.
- Famille « Tech & Growth » (cool) : Cyan Electric, Moss Green Light, Slate Blue, Lavender Digital.

**Tokens sémantiques :** `background=creme`, `foreground=anthracite`, `primary=monstera`,
`material=bronze`, `accent=ocre`, surface sombre = `anthracite`/`monstera`.

### 6.2 Typographie
- **Display / titres : Fraunces** (serif organique, axes optiques, italique calligraphique —
  cohérent avec « Art, Sensibilité & Épure »). *À confirmer : le specimen de marque n'est pas nommé.*
- **Corps / UI : Plus Jakarta Sans** (nommée dans la charte — géométrique, lisible, « data »).
- Échelle typographique fluide (`clamp()`), interlignage généreux, large blanc tournant.

### 6.3 Motion (sobre, « tranquille »)
- Easing doux, durées lentes (~0.6–0.9 s), reveals au scroll (fade + léger translate-y, staggered).
- **Smooth scroll Lenis** discret via provider `ReactLenis`.
- **Motif Kintsugi** : veines dorées qui se *tracent* (SVG `stroke-dashoffset` / path draw) à
  l'apparition ; séparateurs et accents « fissure réparée à l'or ».
- **`prefers-reduced-motion` : obligatoire** — désactive transforms et smooth-scroll, conserve
  l'opacité instantanée. Anime uniquement `transform`/`opacity` (perf).

### 6.4 Texture & formes
Grain papier discret, ombres douces et basses, formes organiques (le blob du logo), asymétrie
maîtrisée — au service de l'épure, jamais décoratif gratuit.

## 7. Contenu & i18n
Contenu structuré en modules TS typés dans `content/` (services, piliers, équipe, KPIs —
*+100 structures, 95 % d'adoption, 64 % de gain de productivité* —, témoignages, métadonnées site).
FR uniquement ; chaînes centralisées pour permettre une extraction EN ultérieure sans refonte.

## 8. SEO / Perf / A11y
- **SEO** : Metadata API (title/description/OG par page), `sitemap.ts`, `robots.ts`,
  JSON-LD `Organization`, image OpenGraph.
- **Perf** : RSC par défaut, `next/image`, `next/font`, JS client minimal (Motion/Lenis isolés
  en Client Components), budget Core Web Vitals (LCP < 2.5 s, CLS < 0.1).
- **A11y** : HTML sémantique, contrastes AA (vérifier ocre sur fonds clairs), focus visibles,
  navigation clavier, `prefers-reduced-motion`, `lang="fr"`.

## 9. Déploiement Vercel
Build pnpm, preview deployments par branche, env vars structurées (`.env.local` non versionné),
domaine wabisabi.fr (configuration ultérieure). Analytics/Speed Insights optionnels.

## 10. Critères de succès (vérification)
- `pnpm build` passe sans erreur ; `pnpm typecheck` et `pnpm lint` propres.
- La page d'accueil de démo rend les tokens de marque (fond crème, titres Fraunces, corps
  Plus Jakarta Sans, un CTA ocre) et **au moins une animation au scroll** respectant
  `prefers-reduced-motion`.
- Les 3 skills, les 2 subagents, le CLAUDE.md et les settings/hooks sont en place et cohérents.
- Lighthouse (mobile) : Performance, A11y, SEO, Best Practices ≥ 90 sur la page de démo.

## 11. Questions ouvertes (à confirmer, faible coût)
1. **Serif d'affichage** : valider **Fraunces** (reco) ou choisir une alternative
   (Cormorant plus classique, etc.).
2. **Hex exacts des accents secondaires** (familles warm/cool) à relever depuis `color-system.png`
   si on veut les utiliser tôt — non bloquant (cœur = 4 primaires + Golden Ocre).
3. **Cible** : la charte parle de **PME** ; le pitch SEMEPA visait le **secteur public**. La page
   de démo restera générique ; à arbitrer au moment du contenu.

## 12. Découpage indicatif (pour le plan)
1. **Outillage IA** : `.claude/` (CLAUDE.md, 3 skills, 2 subagents, settings/hooks).
2. **Scaffolding** : init Next.js + deps + configs + structure de dossiers.
3. **Design system** : `globals.css` (`@theme` tokens), `next/font`, primitives `ui/`.
4. **Motion** : provider Lenis, `Reveal`, `KintsugiLine`, garde reduced-motion.
5. **Page de démo** : Hero on-brand + une section animée + contenu typé minimal.
6. **SEO/Perf/A11y** : metadata, sitemap/robots, JSON-LD ; vérif build + Lighthouse.
