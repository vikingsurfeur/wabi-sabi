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
