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
