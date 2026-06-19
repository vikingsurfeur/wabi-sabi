---
name: motion-lenis-patterns
description: Patterns d'animation du site Wabi Sabi avec Motion (motion/react) + Lenis (smooth-scroll), incluant le motif Kintsugi (veine dorée tracée) et la garde prefers-reduced-motion obligatoire. Charge ce skill pour ajouter ou relire toute animation/transition/effet au scroll.
---

# Patterns Motion + Lenis — Wabi Sabi

Animation **sobre et lente**. Anime uniquement `transform`/`opacity`. JS client isolé.

L'esthétique *wabi-sabi* exige une retenue radicale : l'animation accompagne le regard, elle ne le
capte pas. Les durées sont longues (≈ 0.6–0.9 s, jusqu'à 1.4 s pour le tracé Kintsugi), les easings
décélèrent en douceur (`ease-out` perceptuel), et rien ne « rebondit ». Le mouvement est une
respiration, pas une démonstration. Si une animation se *remarque* en tant qu'animation, elle est
probablement trop rapide, trop ample ou trop fréquente.

## Stack et imports (verbatim)

- **Motion pour React** : tout passe par `motion/react`. Imports usuels :
  `import { motion, useReducedMotion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react"`.
  Le namespace `motion/react` est la cible canonique (anciennement `framer-motion`) ; ne jamais
  importer depuis `framer-motion` dans ce repo.
- **Lenis pour React** : `import { ReactLenis, useLenis } from "lenis/react"`. La feuille de style
  recommandée par Lenis (`import "lenis/dist/lenis.css"`) peut être omise ici car le scroll est piloté
  par JS et les styles par défaut suffisent ; ne l'ajouter qu'en cas de besoin réel.
- Tout composant utilisant Motion ou Lenis est un Client Component (`"use client"`), gardé **petit et
  en feuille** de l'arbre (voir M-PERF et R-CLIENT du skill `nextjs-app-conventions`).

## Règles

### M-RM (impératif) — respecter `prefers-reduced-motion`

C'est la règle la plus importante du skill et elle n'est jamais négociable. La détection se fait via
`useReducedMotion()` de Motion, qui lit la media query `(prefers-reduced-motion: reduce)` et renvoie
un booléen réactif (`true` si l'utilisateur demande à réduire le mouvement, `null`/`false` sinon).

Quand `reduced` est vrai :

- **Rendre l'état final immédiatement** : opacité 1, pas de `translate`, pas de `scale`, pas de
  `pathLength` animé. La technique la plus sûre est de retourner un fragment ou un `<div>` statique
  sans `motion.*`, ou de fixer `initial` directement sur l'état final.
- **Désactiver le smooth-scroll Lenis** : ne pas monter `ReactLenis` du tout (retourner `children`
  brut) afin de rendre la barre de défilement native à l'utilisateur.
- **Couper les boucles et les effets de scroll** : pas de parallax, pas de `useScroll`/`useTransform`
  qui déplace des éléments, pas d'`autoplay`. On peut conserver des changements d'état instantanés
  (couleur au focus/hover) car ce ne sont pas des mouvements.

Patron de référence (à reproduire pour chaque composant animé) :

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export function Example({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <div>{children}</div>; // état final, zéro mouvement
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  );
}
```

Garde complémentaire CSS (défense en profondeur, déjà couverte par le composant mais utile pour le
`scroll-behavior: smooth` global) :

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Note : `useReducedMotion()` peut renvoyer `null` au tout premier rendu serveur/hydratation avant que
la media query soit résolue. Traiter `null` comme « pas de réduction » est acceptable (le composant
réagit dès que la valeur se stabilise), mais ne jamais faire dépendre la *structure* du DOM d'une
valeur qui diffère entre serveur et client sans précaution — préférer fixer `initial` sur l'état
final plutôt que de changer le type de balise rendue si l'hydratation pose problème.

### M-PROVIDER — `SmoothScroll` (Lenis, à la racine)

Le composant `SmoothScroll` (Client Component) enveloppe l'app dans `layout.tsx` via `ReactLenis`
(`lenis/react`), avec des options **douces**. Il est **désactivé si reduced-motion**.

- Monter `ReactLenis` avec la prop `root` pour qu'il pilote le scroll du document entier (`<html>`/
  `<body>`), et non un conteneur interne.
- Options recommandées (douces, conformes au baseline) : `lerp` ≈ `0.1` (interpolation lissée —
  plus bas = plus « lourd »/inertiel, plus haut = plus réactif) et `duration` ≈ `1.0`
  (durée de l'amortissement, en secondes). `lerp` et `duration` sont deux modes alternatifs ;
  Lenis privilégie l'un selon ce qui est fourni — garder des valeurs cohérentes et discrètes.
- Options utiles à connaître : `smoothWheel` (lissage molette, `true` par défaut), `wheelMultiplier`
  / `touchMultiplier` (sensibilité), `easing` (fonction d'easing custom), `orientation`
  (`"vertical"` par défaut), `gestureOrientation`, `prevent` (callback pour exclure des nœuds, ex.
  une modale scrollable). Ne pas sur-paramétrer : le défaut « doux » suffit.
- `ReactLenis` instancie une seule fois Lenis et gère lui-même la boucle `requestAnimationFrame` et
  le cleanup ; ne pas réécrire manuellement le RAF dans un composant qui utilise `ReactLenis`.
- Pour les ancres internes (`#piliers`), récupérer l'instance via `const lenis = useLenis()` puis
  `lenis?.scrollTo("#piliers", { offset: -80 })` au clic ; ou laisser le scroll natif des liens
  fonctionner. `scrollTo` accepte un nombre, un sélecteur ou un élément, plus `{ offset, duration,
  immediate, lock }`.

Implémentation de référence :

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

Intégration dans `app/layout.tsx` : `<body><SmoothScroll>{children}</SmoothScroll></body>`. Le
`layout.tsx` lui-même reste un Server Component ; seul `SmoothScroll` porte `"use client"`. C'est
l'unique frontière client nécessaire pour le scroll global.

### M-REVEAL — composant `Reveal` (apparition au scroll)

Le composant `Reveal` (Client) anime l'entrée d'un bloc à l'entrée dans le viewport, une seule fois.

- Base : `motion.div` avec `initial={{ opacity: 0, y: 16 }}`, `whileInView={{ opacity: 1, y: 0 }}`,
  `viewport={{ once: true, margin: "-10% 0px" }}`, `transition={{ duration: 0.7, ease: [0.22, 1,
  0.36, 1] }}`.
- `whileInView` déclenche l'animation quand l'élément entre dans le viewport (Motion s'appuie sur
  `IntersectionObserver` en interne — pas de listener de scroll coûteux).
- `viewport.once: true` garantit que l'animation ne rejoue pas au re-scroll (sobriété + perf).
  `viewport.margin: "-10% 0px"` retarde légèrement le déclenchement pour que l'élément soit
  franchement visible avant d'apparaître (rootMargin de l'observer). `viewport.amount` (`0`–`1` ou
  `"some"`/`"all"`) règle la fraction visible requise si un contrôle plus fin est utile.
- L'easing `[0.22, 1, 0.36, 1]` est une cubic-bézier `easeOutExpo`-like : démarrage franc puis
  décélération longue — c'est la « signature » de mouvement du site. Ne pas la remplacer par un
  easing à rebond (`backOut`, spring trop vif).
- **Stagger via la prop `delay`** : l'orchestration des listes se fait en passant `delay={i * 0.1}`
  par item (cf. sections `Piliers`/`Kpis`). Garder le pas faible (≈ 0.08–0.12 s) pour un effet de
  cascade discret, et borner le nombre d'items animés pour ne pas créer une cascade interminable.
- Alternative équivalente quand l'élément peut sortir de l'écran avant l'observer : `useInView(ref,
  { once: true, margin: "-10% 0px" })` puis `animate={inView ? ... : ...}`. Pour le cas standard,
  `whileInView` suffit et reste plus simple.

Implémentation de référence :

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

Pour des groupes nombreux, on peut aussi orchestrer avec un parent `variants` +
`transition={{ staggerChildren: 0.1 }}` et `whileInView` sur le parent ; ici, la prop `delay` par
item est volontairement choisie pour rester explicite et lisible.

### M-KINTSUGI — `KintsugiLine` (la veine dorée tracée)

`KintsugiLine` est la **signature visuelle « réparer à l'or »** : une fissure dorée qui se trace à
l'apparition, métaphore de l'IA comblant les failles de l'entreprise.

- Technique : un `<motion.path>` SVG animé par `pathLength` (`0` → `1`), déclenché `whileInView`.
  `pathLength` est une valeur normalisée gérée par Motion (il calcule en interne `stroke-dasharray`
  et `stroke-dashoffset` à partir de la longueur réelle du chemin) — ne pas manipuler
  `strokeDasharray` à la main.
- `stroke` = ocre **`#F2B705`** (la couleur Kintsugi, verbatim). Pour une garde a11y, le SVG porte
  `aria-hidden="true"` car c'est de la décoration.
- En reduced-motion : `initial` doit déjà valoir `{ pathLength: 1 }` (ligne entièrement tracée, zéro
  animation) et la `duration` mise à `0`.
- Détails de qualité : `strokeLinecap="round"` pour des extrémités douces, `fill="none"`,
  `preserveAspectRatio="none"` si la ligne doit s'étirer en largeur, `transition` longue
  (≈ 1.4 s, `ease: "easeInOut"`) pour un tracé contemplatif. La largeur de trait reste fine (≈ 2)
  pour évoquer un filet d'or, pas un trait épais.

Implémentation de référence :

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

Note sur le hex : le token de couleur Kintsugi est **`#F2B705`** ; l'attribut `stroke` peut s'écrire
en minuscules (`#f2b705`) — la valeur hexadécimale est identique, CSS étant insensible à la casse.

### M-PERF — animer pour la fluidité, pas pour l'effet

- **Pas d'animation de `width`/`height`/`top`/`left`** (déclenche layout/reflow). Préférer
  **`transform`** (`translate`, `scale`, `rotate`) et **`opacity`** : ces propriétés sont
  compositées par le GPU et n'invalident pas le layout. Motion route automatiquement `x`/`y` vers
  `transform: translate(...)`.
- **Ne pas bloquer le LCP** : aucune animation d'entrée sur l'élément LCP (titre/visuel principal du
  Hero). Le contenu critique doit être peint à l'état final ; n'animer que les éléments secondaires,
  ou n'appliquer qu'une transition d'opacité très brève qui n'altère pas la mesure de peinture.
- **Composants animés petits et en feuille** : isoler chaque `"use client"` au plus près de
  l'élément animé. Le parent (page/section) reste RSC. Ne jamais hisser `"use client"` sur une
  section entière juste pour animer un enfant (cf. anti-patterns et R-CLIENT).
- **Effets de scroll mesurés** : si un parallax/progress est vraiment nécessaire, utiliser
  `useScroll()` + `useTransform()` (et éventuellement `useSpring()` pour lisser) plutôt qu'un
  écouteur `scroll` manuel ; ces hooks lisent via `requestAnimationFrame` et n'écrivent que des
  `transform`. Toujours derrière la garde reduced-motion.
- **Pas de layout shift** : réserver les dimensions (les éléments qui font un `Reveal` ne doivent pas
  changer la hauteur du flux — animer `opacity`/`y` ne reflow pas, mais éviter d'animer l'apparition
  d'un bloc qui pousse le contenu). `will-change` est géré par Motion au besoin ; ne pas l'abuser.

## Anti-patterns

- ❌ Animer le layout (`width`/`height`/`top`/`left`/`margin`) → reflow, jank. Utiliser `transform`.
- ❌ Durées < 0.3 s ou easings agressifs (rebond, `spring` raide, `linear` brutal) → casse la
  sobriété wabi-sabi.
- ❌ Oublier `prefers-reduced-motion` (M-RM) : tout composant animé DOIT avoir sa branche réduite.
- ❌ Mettre `"use client"` sur un parent entier juste pour animer un enfant → casse le RSC par
  défaut et alourdit le bundle. Isoler l'animation dans un petit composant feuille.
- ❌ Importer depuis `framer-motion` au lieu de `motion/react`.
- ❌ Manipuler `strokeDasharray`/`strokeDashoffset` à la main pour le tracé : utiliser `pathLength`.
- ❌ Réécrire une boucle `requestAnimationFrame` Lenis alors que `ReactLenis` la gère déjà.
- ❌ Animer l'élément LCP (titre/visuel du Hero) au point de retarder ou fausser sa peinture.
- ❌ Stagger trop long ou listes entièrement animées : cascade interminable, perçue comme lente.
- ❌ `whileInView` sans `viewport.once: true` quand le rejeu n'apporte rien → mouvement répétitif et
  coûteux au re-scroll.