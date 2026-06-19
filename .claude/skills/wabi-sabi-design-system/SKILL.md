---
name: wabi-sabi-design-system
description: Charte visuelle du site Wabi Sabi (palette Monstera/Bronze/Anthracite/Crème + accent Golden Ocre, concept Kintsugi, typo Fraunces + Plus Jakarta Sans, principes de motion sobres). Charge ce skill pour TOUTE création/modification d'UI, de composant, de couleur, de typographie ou d'animation du site.
---

# Design System — Wabi Sabi

Esthétique : _wabi-sabi_ (beauté de l'épure, du naturel, de l'imparfait) + concept **Kintsugi**
(réparer à l'or : l'IA est la ligne d'or dans les fissures de l'entreprise). Sobre, organique,
haut de gamme, généreux en blanc tournant. Jamais clinquant, jamais « template ».

Cette charte est la **source de vérité unique** des décisions visuelles. Toute couleur, espacement,
graisse ou animation doit pouvoir se justifier par une règle ci-dessous. En cas de doute, choisis
l'option la plus calme et la plus dépouillée : le wabi-sabi privilégie le retrait à l'ajout.

## Principes directeurs

1. **L'épure d'abord.** Un écran réussi est un écran où l'on a su _retirer_. Hiérarchie claire,
   une seule idée par bloc, beaucoup de vide. Le blanc tournant (négatif) est un élément de design
   actif, pas un reste.
2. **L'imperfection assumée.** Asymétrie maîtrisée, traits qui respirent, formes organiques.
   On évite la grille trop rigide et les symétries parfaites « corporate ».
3. **La matière avant l'effet.** Grain de papier, filets bronze, ombres basses : la texture
   évoque le tangible (washi, terre, or). On ne décore jamais pour décorer.
4. **L'or est rare.** Le Golden Ocre est l'événement. Plus il est rare, plus il signifie.
   Réservé à l'action (CTA) et à la signature Kintsugi (veines dorées).
5. **Le calme du mouvement.** Animations lentes, déclenchées par l'intention (scroll), jamais
   en boucle, jamais agressives. `prefers-reduced-motion` n'est pas une option, c'est un dû.

## Palette (hex verbatim)

| Token        | Hex       | Rôle                                                                  |
| ------------ | --------- | --------------------------------------------------------------------- |
| `monstera`   | `#0B4628` | Vert profond identitaire. Sections sombres, marque, ancrage.          |
| `bronze`     | `#C2A687` | Or doux, matière/texture/humain. Traits, accents chauds, filets.      |
| `anthracite` | `#3C3B40` | Structure (code/infra). Texte principal, fonds sombres alternatifs.   |
| `creme`      | `#E5E0DA` | Papier washi. **Fond par défaut du site** (jamais blanc pur).         |
| `ocre`       | `#F2B705` | Golden Ocre / Kintsugi. **Accent action ≈10 %** : CTA, veines dorées. |

Accents secondaires (usage très ponctuel, hex à confirmer depuis `docs/wabi-sabi/color-system.png`) :
famille warm « Creative Energy » (Terracotta, Coral Deep, Plum) et cool « Tech & Growth »
(Cyan Electric, Moss Green Light, Slate Blue, Lavender Digital).

**Sémantique :** `background = creme`, `foreground = anthracite`, `primary = monstera`,
`material = bronze`, `accent = ocre`. Surfaces sombres : `anthracite` ou `monstera`.

### Répartition cible (règle des proportions)

Un écran on-brand respecte approximativement cette distribution. C'est un garde-fou, pas un dogme :

- **≈ 70 % Crème** — fond et surfaces claires. Le repos de l'œil.
- **≈ 15 % Anthracite** — texte courant, structure, micro-typographie.
- **≈ 5 % Monstera** — sections d'ancrage sombres, titres sur fond clair, marque.
- **≈ 5 % Bronze** — filets, sur-titres (eyebrow), détails de matière, traits.
- **≈ 5 % Golden Ocre** — strictement l'action et le Kintsugi. Si l'ocre dépasse ~10 %, c'est
  un signal d'alarme : on en a trop mis.

### Surfaces et profondeur

Le site n'empile pas les ombres. La profondeur naît du **changement de surface** (tone) et d'ombres
**basses et diffuses**, jamais de cartes flottantes saturées d'ombres dures.

- **Surface claire** : `creme`. Cartes/encarts sur fond crème = légère variation (filet bronze à
  faible opacité, ombre très basse) plutôt qu'un blanc plus clair.
- **Surface sombre d'ancrage** : `monstera` (chaleur, marque) ou `anthracite` (technique, sobriété).
  On alterne clair/sombre pour rythmer le scroll, sans jamais deux sombres consécutifs sans respiration.
- **Ombres** : douces, basses, teintées vers l'anthracite (jamais noir pur). Exemple de barème :
  `shadow-sm` pour un simple décollement, `shadow-md` réservé aux éléments interactifs survolés.
  Bannir les ombres dures à fort blur/offset.

## Typographie

- **Display / titres : Fraunces** (serif organique, axes optiques, italique calligraphique).
- **Corps / UI : Plus Jakarta Sans** (géométrique, lisible).
- Échelle fluide (`clamp()`), interlignage généreux, large blanc tournant, asymétrie maîtrisée.

### Échelle et usage

Fraunces porte l'émotion et la marque ; Plus Jakarta Sans porte l'information. On ne mélange pas
leurs rôles (pas de paragraphe courant en Fraunces, pas de gros titre en Jakarta).

- **H1 (hero)** : Fraunces, très large (`clamp` ~3rem → ~5rem), `leading` serré (~1.05),
  `text-wrap: balance`, couleur Monstera sur fond clair. Un seul `<h1>` par page.
- **H2 (sections)** : Fraunces, ~2.25rem → ~3rem. Sur fond sombre, couleur Crème ; sur fond clair,
  Monstera.
- **H3 (sous-sections / cartes)** : Fraunces ou Jakarta semibold selon densité. Le Bronze est
  pertinent pour des titres de carte sur surface sombre (chaleur, hiérarchie secondaire).
- **Corps** : Plus Jakarta Sans, ~1rem → ~1.25rem, `leading` généreux (~1.6), mesure limitée
  (`max-w-2xl` à `max-w-prose`) pour le confort de lecture.
- **Eyebrow / sur-titre** : Plus Jakarta Sans, petit, `uppercase`, `tracking` large (~0.25em).
  Sur surface CLAIRE (crème) : couleur **Anthracite ou Monstera** — le Bronze sur crème échoue
  l'AA (ratio ~1.75) et est INTERDIT pour ce texte. Le Bronze comme eyebrow est réservé aux
  surfaces SOMBRES (Monstera/Anthracite). Sert à étiqueter une section sans rivaliser avec le H.
- **Italique Fraunces** : à réserver aux accents calligraphiques (un mot, une citation),
  jamais pour un paragraphe entier.

### Détails de finition typographique

- `text-wrap: balance` sur les titres (évite la veuve d'un mot seul sur la dernière ligne).
- Mesure de lecture maîtrisée : on ne laisse jamais une ligne de corps dépasser ~75 caractères.
- Pas de justification (`text-align: justify`) : elle crée des rivières incompatibles avec l'épure.
- Ponctuation française : espaces fines insécables avant `; : ! ?` et guillemets `«  »` lorsque
  l'environnement le permet ; sinon rester cohérent.

## Patterns de composants

Bibliothèque de référence pour composer des écrans on-brand. Ces patterns encodent la charte ; les
implémentations vivent dans `components/ui` (primitives), `components/sections` et `components/motion`.

### Boutons (CTA)

- **`primary`** : fond `ocre`, texte `anthracite`, coins très arrondis (pill / `rounded-full`),
  `transition` douce, état `hover` discret (légère baisse de luminosité, ex. `hover:brightness-95`).
  C'est le seul élément autorisé à porter l'ocre en aplat. Un écran a **au plus un ou deux** CTA
  primaires visibles à la fois.
- **`ghost`** (secondaire) : pas d'aplat ocre. Bordure fine `anthracite` à faible opacité
  (`border-anthracite/30`), `hover` = voile très léger (`hover:bg-anthracite/5`). Sert le second
  choix sans concurrencer le primaire.
- **Focus** : anneau visible obligatoire — `focus-visible:outline-2 focus-visible:outline-offset-2`
  avec une couleur contrastée (`outline-anthracite` sur clair). Ne jamais supprimer l'outline.
- **Texte** : Plus Jakarta Sans, `font-semibold`, libellé orienté action et en français
  (« Prendre 45 min », « Notre approche »). Pas de MAJUSCULES criardes.

### Cartes et encarts

- Sur fond crème : surface = crème avec **filet** plutôt que fort contraste de fond ; rayon généreux,
  padding ample (`p-8`+), ombre basse. La carte respire.
- Sur fond Monstera : titres en Bronze, corps en `creme/80` (crème légèrement atténuée pour la
  hiérarchie). Jamais de texte ocre courant — l'ocre reste l'action/la veine.
- Pas de bordure « boîte » dure partout : préférer l'espacement et le changement de surface pour
  séparer. Le vide structure autant que le trait.

### Sections (rythme de page)

- Chaque section choisit un **tone** : `creme` (clair, défaut), `anthracite` (technique), `monstera`
  (ancrage marque). On alterne pour créer un rythme clair → sombre → clair.
- Rythme vertical généreux : padding de section large (`py-24`/`py-32`) — l'air entre les sections
  fait partie du luxe perçu.
- Conteneur centré à largeur maîtrisée (`max-w-6xl`), gouttières latérales (`px-6` → `px-10`).

### Hero

- Eyebrow Anthracite/Monstera (tagline) → H1 Fraunces Monstera → **veine Kintsugi** (signature) → UVP en corps
  atténué (`anthracite/80`) → groupe de CTA (un `primary` ocre + un `ghost`).
- Apparition orchestrée en **stagger** doux (cf. skill `motion-lenis-patterns`, `delay` croissant
  ~0.1 s par bloc). Jamais d'autoplay vidéo lourd ni d'animation en boucle dans le hero.
- `overflow-hidden` pour contenir d'éventuelles formes organiques débordantes ; pas de layout shift.

### Chiffres clés (KPIs)

- Valeur en Fraunces très large (`text-6xl`), couleur Monstera ; libellé en corps atténué
  (`anthracite/70`) dessous. Grille `md:grid-cols-3`, centrée, généreuse.
- Reveal en stagger. Pas de compteur animé clinquant ; la sobriété prime (un fondu/translation suffit).

### Veine Kintsugi (signature visuelle)

- Trait `ocre` tracé en SVG (`pathLength` 0→1) qui « répare à l'or ». Élément décoratif :
  `aria-hidden="true"`. Fin (≈2px), organique (courbe de Bézier irrégulière), jamais une ligne droite
  parfaite. C'est l'unique licence « dorée » avec le CTA. Détails d'implémentation : skill
  `motion-lenis-patterns`.

### États et interactions

- **Hover** : effet minimal et rapide à percevoir mais doux (luminosité, voile léger, soulignement
  qui se trace). Pas de transformations spectaculaires.
- **Focus** : toujours visible, jamais masqué (accessibilité clavier non négociable).
- **Disabled** : opacité réduite + `cursor-not-allowed`, sans ajouter de couleur hors charte.
- **Liens dans le texte** : soulignement fin (ou décalé), couleur héritée ou Monstera ; ne pas
  utiliser l'ocre pour un lien courant (réserve d'action).

## Motion (cf. skill `motion-lenis-patterns`)

Sobre et lent (~0.6–0.9 s, easing doux), reveals discrets au scroll, smooth-scroll Lenis léger.
Motif **Kintsugi** : veines dorées qui se _tracent_ (SVG path draw). `prefers-reduced-motion`
TOUJOURS respecté. Anime uniquement `transform`/`opacity`.

## Texture & formes

Grain papier discret, ombres douces et basses, formes organiques (blob du logo). La décoration
sert l'épure, jamais l'inverse.

- **Grain** : très subtil, perçu plutôt que vu (faible opacité, par-dessus le fond crème). Il donne
  la matière « washi » sans salir la lecture. À couper si reduced-motion/économie de données l'exige.
- **Formes organiques** : courbes irrégulières inspirées du blob du logo, jamais de cercles/rectangles
  parfaits en élément décoratif. Positionnées en débord maîtrisé, jamais au centre de la lecture.
- **Filets bronze** : séparateurs fins et chauds, à faible opacité, pour articuler sans cloisonner.
- **Rayons** : coins généreux et cohérents ; les pills pour les CTA, des rayons doux pour les cartes.

## Accessibilité & contraste de la palette

Cible : **WCAG 2.1 AA**. Texte normal ≥ 4.5:1 ; texte large (≥ 24px ou ≥ 18.66px gras) et éléments
d'interface ≥ 3:1. Vérifier chaque appariement texte/fond avant de valider. La beauté ne dispense
jamais de la lisibilité.

### Appariements texte/fond recommandés

| Fond                   | Texte conseillé        | Statut                                                                         |
| ---------------------- | ---------------------- | ------------------------------------------------------------------------------ |
| `creme` `#E5E0DA`      | `anthracite` `#3C3B40` | ✅ Combo par défaut, fort contraste, AA largement validé.                      |
| `creme` `#E5E0DA`      | `monstera` `#0B4628`   | ✅ Titres/accents, contraste élevé, AA validé.                                 |
| `monstera` `#0B4628`   | `creme` `#E5E0DA`      | ✅ Sections sombres, AA validé.                                                |
| `monstera` `#0B4628`   | `bronze` `#C2A687`     | ✅ Titres de carte sur sombre, large/UI ; vérifier en corps fin.               |
| `anthracite` `#3C3B40` | `creme` `#E5E0DA`      | ✅ Surface technique, AA validé.                                               |
| `creme` `#E5E0DA`      | `bronze` `#C2A687`     | ⚠️ Faible — proscrit pour le corps ; éventuellement très gros titre décoratif. |
| `creme` `#E5E0DA`      | `ocre` `#F2B705`       | ⚠️ Faible — texte ocre sur clair INTERDIT (voir ci-dessous).                   |
| `ocre` `#F2B705`       | `anthracite` `#3C3B40` | ✅ CTA primaire : texte foncé sur ocre, lisible.                               |
| `ocre` `#F2B705`       | `creme` `#E5E0DA`      | ❌ À proscrire (deux clairs, contraste insuffisant).                           |

### Règles de contraste impératives

- **Texte Golden Ocre sur fond clair = INTERDIT.** Le couple `ocre`/`creme` n'atteint pas AA pour du
  texte. L'ocre est une couleur d'**aplat d'action** (CTA, avec texte `anthracite` dessus) ou de
  **trait décoratif** (Kintsugi, `aria-hidden`), jamais de la couleur de texte sur clair.
- **Bronze sur crème** ne convient pas au corps. Réservé aux gros éléments décoratifs ou à l'eyebrow
  uniquement si le test de contraste passe pour la taille concernée ; sinon préférer Anthracite/Monstera.
- **Atténuations d'opacité** (`anthracite/80`, `creme/80`, etc.) : recalculer le contraste _effectif_
  contre le fond réel. `creme/70` sur crème peut casser l'AA — n'atténuer que ce qui reste lisible
  (corps secondaire à ~70–80 % maxi sur fond suffisamment contrasté).
- **Ne jamais coder l'information par la seule couleur.** Ajouter un libellé, une icône ou une forme
  (ex. ne pas distinguer un état uniquement par « c'est en ocre »).
- **Focus visible partout** : tout élément interactif a un état focus contrasté (≥ 3:1 contre
  l'environnement). Ne jamais retirer l'outline sans le remplacer par un équivalent plus visible.
- **Cibles tactiles** ≥ 44×44px ; espacement suffisant entre actions.
- **Mouvement** : `prefers-reduced-motion` désactive reveals, smooth-scroll et tracé Kintsugi
  (état final instantané). Pas de contenu clignotant.
- **Langue** : `lang="fr"` au niveau `<html>` ; hiérarchie de titres correcte (`h1` unique → `h2` → `h3`).

## Do / Don't

- ✅ Fond crème, texte anthracite, titres Fraunces, corps Plus Jakarta Sans.
- ✅ Golden Ocre réservé aux CTA et accents Kintsugi (parcimonie).
- ✅ Contraste AA vérifié (attention ocre sur clair → réserver aux gros éléments / ajouter du texte foncé).
- ✅ Respecter la répartition (~70 % crème, ocre ≤ ~10 %) et alterner les surfaces pour rythmer le scroll.
- ✅ Blanc tournant généreux ; un seul `<h1>` ; focus toujours visible ; `prefers-reduced-motion` géré.
- ✅ Au plus un ou deux CTA primaires par écran ; le `ghost` pour le second choix.
- ❌ Pas de blanc pur en fond, pas de dégradés criards, pas d'animations rapides/agressives.
- ❌ Pas de palette hors charte sans validation.
- ❌ Pas de texte ocre sur fond clair, pas de bronze en corps sur crème.
- ❌ Pas d'ombres dures, pas de cartes saturées d'effets, pas de symétrie « template ».
- ❌ Pas d'animation de layout (width/height/top/left) ni d'autoplay en boucle.
