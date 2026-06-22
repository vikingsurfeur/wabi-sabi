export type Member = {
  prenom: string;
  role: string;
  pilier: string;
  description: string;
  photo: string;
};

export const team: Member[] = [
  {
    prenom: "Manon",
    role: "Data & Performance Market",
    pilier: "Acquisition & performance mesurable",
    description:
      "Experte de l'acquisition et de la data comportementale, elle décuple votre visibilité et s'assure que chaque automatisation se traduit en performance mesurable.",
    photo: "/team/manon.jpg",
  },
  {
    prenom: "Cédric",
    role: "Vision Stratégie & Produit",
    pilier: "Audit & impact business",
    description:
      "Il intervient en amont (audit, vision globale) et en aval (mesure de l'impact business). Il sait ce qu'est un ROI et un business model.",
    photo: "/team/cedric.jpg",
  },
  {
    prenom: "David",
    role: "Tech & Infrastructure",
    pilier: "Automatisations robustes & sécurisées",
    description:
      "Lead Tech chevronné, il fait le pont entre la stratégie et la réalité technique en automatisant vos outils de manière robuste et sécurisée.",
    photo: "/team/david.jpg",
  },
];
