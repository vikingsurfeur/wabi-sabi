# Spec — Contenu du site vitrine Wabi Sabi (accueil + contact + légal)

**Date :** 2026-06-19
**Auteur :** David Bouscarle (avec Claude Code)
**Statut :** Validé pour implémentation
**Pré-requis :** cycle « architecture IA + scaffolding » terminé (voir
`docs/superpowers/specs/2026-06-19-architecture-ia-site-wabi-sabi-design.md`).

---

## 1. Contexte & objectif

Remplir le site vitrine **Wabi Sabi** (cabinet formation + outils IA) avec son **contenu réel**,
sur la base du design system déjà en place. Objectif business : convertir le visiteur vers un
**rendez-vous de 45 min**. Sources de contenu : `docs/wabi-sabi/story-telling-wabi-sabi.md`
(message house, bios, histoire des couleurs/Kintsugi) et `docs/presentation-semepa.pptx`
(méthode, cas d'usage par métier, angle sécurité/données, KPIs). Le contenu brut est réécrit
proprement pour le web (coquilles des docs corrigées).

## 2. Périmètre

**Inclus :**

- Page d'**accueil** narrative complète (9 sections + grille cas d'usage).
- **Header** (nav ancrée + CTA) avec menu mobile, **Footer**.
- Page **Contact** avec formulaire fonctionnel (Server Action + Resend, dégradation propre).
- Page **Mentions légales**.
- Contenu en **modules TS typés** ; visuels = monogrammes + formes organiques + Kintsugi.

**Exclus (cycles ultérieurs) :**

- Vraies photos/logo (emplacements prévus), blog/veille MDX, multilingue, espace client.
- Pages Offre/Services détaillées séparées (le contenu vit dans l'accueil pour l'instant).

## 3. Décisions structurantes

| Sujet                 | Décision                                                                          |
| --------------------- | --------------------------------------------------------------------------------- |
| Architecture          | **Hybride** : accueil long-scroll + pages Contact & Mentions légales              |
| Cible du discours     | **PME en cœur + volet « structures publiques »** (section sécurité + cas d'usage) |
| Conversion            | **Formulaire + Resend** via Server Action, **dégradation propre** sans clé API    |
| Visuels               | **Placeholders élégants** (monogrammes, formes organiques, veines Kintsugi)       |
| Sections optionnelles | **Bandeau Kintsugi** ET **grille cas d'usage par métier** : inclus                |

## 4. Architecture de l'information

- **Routes :** `/` (accueil), `/contact`, `/mentions-legales`.
- **Header** (Client Component pour le menu mobile) : wordmark « Wabi Sabi » → liens d'ancrage
  (Approche · Méthode · Équipe · Sécurité) + CTA « Prendre 45 min » (→ `/contact`). Burger en mobile.
- **Footer** : email `contact@wabisabi.fr`, tél `07 78 54 33 67`, tagline, lien Mentions légales,
  © année.

## 5. Flux de la page d'accueil

1. **Hero** _(enrichi)_ — eyebrow tagline `Former · Automatiser · Transformer` ; **H1 = « L'IA ne
   s'improvise pas. Elle s'intègre. »** ; lede = UVP ; veine Kintsugi ; CTA « Prendre 45 min ».
2. **Manifeste** — « Tout le monde parle d'IA. Chez Wabi Sabi, nous ne l'avons pas découverte hier. »
   Experts natifs du digital (web, data, acquisition, code) → le recul pour savoir _où_ l'IA est
   rentable. 3 profils, 3 parcours, une vision **360°**.
3. **Les 3 piliers** _(enrichi)_ — chacun avec message clé + 2-3 arguments de preuve :
   - **Former** : démystifier/acculturer. Preuves : vulgarisation sans jargon, ateliers ultra-pratiques
     au rythme de la PME, l'humain au centre, méthode inspirée d'Anthropic Academy, sécurisation des données.
   - **Automatiser** : connecter les outils, éradiquer le chronophage. Preuves : audit pragmatique
     (esprit wabi-sabi), intégration haut niveau par le Lead Tech (David), automatisations fiables/sécurisées.
   - **Transformer** : organisation agile, orientée croissance. Preuves : alignement Produit/Marketing/Data
     (Cédric & Manon), pilotage par la donnée, focus ROI & scalabilité.
4. **Le trio 360°** — monogrammes :
   - **Cédric** — Vision Stratégie & Produit (audit, vision globale, ROI, mesure d'impact business).
   - **David** — Tech & Infrastructure (Lead Tech, architectures, automatisation robuste & sécurisée).
   - **Manon** — Data & Performance Market (acquisition, data comportementale, visibilité mesurable, vulgarisation).
5. **La méthode** — 4 étapes : (1) **Audit** → cartographie besoins/irritants/gains rapides ;
   (2) **Feuille de route** priorisée par service + formations par profil + outils à créer/intégrer ;
   (3) **Ateliers** pratiques par groupe métier (aucun collaborateur laissé de côté) ;
   (4) **Automatisations** & agents conçus à l'audit (archi sécurisées, connectées, auditables).
   _Et après ?_ : mesure d'impact (KPIs), veille continue par métier, accompagnement sécurité.
6. **Sécurité & données** _(volet PME + public)_ — « Vos données ne sont pas négociables. » Charte IA
   adaptée aux obligations légales et à la culture interne ; architectures sécurisées (données ne
   transitant pas par des services non maîtrisés) ; traçabilité complète ; formation aux risques
   (hallucinations, fuites, biais). Citation : _« Nous ne déployons rien que vous ne puissiez auditer,
   expliquer et défendre devant votre conseil d'administration. »_
7. **Chiffres clés** _(existant, enrichi)_ — +100 structures · 95 % adoption · 64 % productivité ·
   **Anthropic Academy certifiés**.
8. **Grille cas d'usage par métier** — grille condensée (étiquetée « illustratif »), par service :
   Direction & Assistanat, Aménagement & Construction, Stationnement, Informatique & Données,
   Juridique & Commande publique, Patrimoine & Travaux, Comptabilité & Finances, Communication,
   RH & Paie — 2-3 usages chacun (tirés du pitch). Couvre fortement le volet secteur public.
9. **Bandeau Kintsugi** _(signature)_ — court passage poétique : le Golden Ocre = l'IA chirurgicale
   injectée dans les fissures ; les imperfections deviennent zone de rentabilité.
10. **CTA final** — « Et si on prenait 45 min pour se rencontrer ? Nos meilleurs clients ont dit oui. »
    → `/contact`.

Rythme visuel : alternance des tons de section (`creme` / `monstera` / `anthracite`), reveals au
scroll, veines Kintsugi en séparateurs. Respect `prefers-reduced-motion` et contraste AA (cf. skill
`wabi-sabi-design-system`).

## 6. Formulaire de contact

- **Server Action** Next.js + **Resend SDK**, email vers `contact@wabisabi.fr`.
- **Champs :** nom, email, organisation, **type de structure** (PME / secteur public / autre), message.
- **Anti-spam :** champ **honeypot** caché + validation **zod** (côté serveur), longueur/format email.
- **États accessibles :** succès, erreur, chargement (`aria-live`), focus géré, labels explicites.
- **Env :** `RESEND_API_KEY` (+ `CONTACT_TO`/`CONTACT_FROM` optionnels). **Dégradation propre :**
  si la clé est absente, l'action renvoie un état « indisponible » et l'UI affiche un repli
  `mailto:contact@wabisabi.fr` (+ téléphone). Aucune erreur bloquante.
- Page `/contact` : intro courte + formulaire + coordonnées (email, tél).

## 7. Contenu typé (modules `content/`)

Étendre l'existant. Modules : `manifeste.ts`, `piliers.ts` _(enrichi avec preuves)_,
`team.ts` _(enrichi : description par membre)_, `methode.ts` _(étapes + « et après »)_,
`securite.ts`, `usecases.ts` _(par métier)_, `kintsugi.ts`, `legal.ts` _(mentions)_, `site.ts` _(existant)_.
Tout typé, FR, coquilles des sources corrigées.

## 8. Composants & design

- **Réutilise** `Container`, `Section`, `Button`, `Reveal`, `KintsugiLine`, tokens de la charte.
- **Nouveaux composants** : `Header` (nav + menu mobile, Client), `Footer`, `Monogram` (initiales sur
  forme organique, bronze/monstera), `SectionTitle`/eyebrow, `StepList` (méthode), `UseCaseGrid`,
  `PillarCard`, `MemberCard`, `ContactForm` (Client) + `contactAction` (Server Action).
- Patterns issus du skill `wabi-sabi-design-system` (proportions, contraste AA, eyebrow sur clair en
  Anthracite/Monstera, ocre ≤ ~10 %).

## 9. SEO / Perf / A11y

- **Metadata par route** (`/contact`, `/mentions-legales`) ; `openGraph` hérité + spécifique.
- **JSON-LD** : enrichir l'`Organization` avec `contactPoint` (email/tél) ; ajouter les routes au sitemap.
- **A11y** : nav au clavier (menu mobile), formulaire labellisé + `aria-live`, hiérarchie de titres,
  contraste AA, `prefers-reduced-motion`. **Perf** : RSC par défaut (Header/ContactForm en Client isolés),
  pas de layout shift, budget Core Web Vitals maintenu.

## 10. Critères de succès

- `pnpm build`/`typecheck`/`lint` verts ; **Lighthouse ≥ 90** (Perf/A11y/SEO/BP) sur `/` et `/contact`.
- Les 3 routes rendent le contenu réel on-brand ; nav + footer fonctionnels (ancres + menu mobile).
- Formulaire : validation + honeypot OK ; avec clé Resend → email envoyé ; sans clé → repli mailto propre.
- `prefers-reduced-motion` respecté partout ; AA vérifié (audit `quality-auditor`).

## 11. Questions ouvertes (faible coût)

1. **Mentions légales** : raison sociale, statut juridique, SIRET, directeur de publication —
   inconnus. La page sera structurée avec ces champs **marqués à compléter** ; hébergeur = Vercel,
   contact connus. À renseigner par David.
2. **H1 de l'accueil** : proposé = « L'IA ne s'improvise pas. Elle s'intègre. » (le wordmark « Wabi
   Sabi » vit dans le header). À confirmer.
3. **Grille cas d'usage** : étiquetée « illustratif » ; arbitrer plus tard si on personnalise par client.

## 12. Découpage indicatif (pour le plan)

1. **Layout global** : `Header` (nav + menu mobile) + `Footer` + intégration layout.
2. **Contenu typé** : modules `content/*` (manifeste, piliers enrichis, team, méthode, sécurité, usecases, kintsugi, legal).
3. **Composants de section** : `Monogram`, `PillarCard`, `MemberCard`, `StepList`, `UseCaseGrid`, bandeau Kintsugi.
4. **Page d'accueil** : assemblage des sections 1-10 (enrichir Hero/Piliers/KPIs existants).
5. **Contact** : `ContactForm` + `contactAction` (Resend + zod + honeypot + dégradation) + page `/contact`.
6. **Mentions légales** : page `/mentions-legales` + `legal.ts`.
7. **SEO/Perf/A11y** : metadata des routes, sitemap, JSON-LD `contactPoint` ; audit `quality-auditor` + Lighthouse.
