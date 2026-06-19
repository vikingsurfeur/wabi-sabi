export type UseCaseGroup = { metier: string; usages: string[] };

export const usecases: UseCaseGroup[] = [
  {
    metier: "Direction & Assistanat",
    usages: [
      "Rédaction et relecture d'emails",
      "Agendas et RDV optimisés",
      "Comptes-rendus de réunion automatiques",
    ],
  },
  {
    metier: "Aménagement & Construction",
    usages: [
      "Analyse de DCE / appels d'offres",
      "Rédaction de dossiers et cahiers des charges",
      "Veille réglementaire automatisée",
    ],
  },
  {
    metier: "Stationnement",
    usages: [
      "Prévision d'affluence des parkings",
      "Traitement des réclamations & RAPO",
      "Détection d'anomalies des équipements",
    ],
  },
  {
    metier: "Informatique & Données",
    usages: [
      "Exploitation des données dormantes",
      "Recherche documentaire (GED augmentée)",
      "Tableaux de bord transverses",
    ],
  },
  {
    metier: "Juridique & Commande publique",
    usages: [
      "Conformité des marchés & des pièces",
      "Veille juridique & jurisprudence",
      "Rédaction de contrats & conventions",
    ],
  },
  {
    metier: "Patrimoine & Travaux",
    usages: [
      "Maintenance prédictive des ouvrages",
      "Suivi de travaux : synthèse des CR",
      "Recherche dans les dossiers techniques",
    ],
  },
  {
    metier: "Comptabilité & Finances",
    usages: [
      "Extraction des factures (OCR)",
      "Rapprochement des écritures",
      "Prévision de trésorerie & recettes",
    ],
  },
  {
    metier: "Communication",
    usages: [
      "Contenus réseaux sociaux & newsletters",
      "Adaptation multi-canal",
      "Veille e-réputation & médias",
    ],
  },
  {
    metier: "Ressources Humaines & Paie",
    usages: [
      "Tri & synthèse des candidatures",
      "Réponses RH de premier niveau",
      "Contrôle des variables de paie",
    ],
  },
];
