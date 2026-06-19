import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { legal } from "@/content/legal";

export const metadata: Metadata = {
  title: "Mentions légales — Wabi Sabi",
  description: "Mentions légales du site Wabi Sabi.",
  robots: { index: false },
};

export default function MentionsLegales() {
  const { editeur, hebergeur } = legal;
  return (
    <main className="py-24 md:py-32">
      <Container className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl">Mentions légales</h1>

        <h2 className="mt-12 text-2xl">Éditeur</h2>
        <p className="text-anthracite/80 mt-3 leading-relaxed">
          {editeur.raisonSociale} ({editeur.statut})<br />
          {editeur.adresse}
          <br />
          SIRET : {editeur.siret}
          <br />
          Directeur de la publication : {editeur.directeurPublication}
          <br />
          {editeur.email} — {editeur.telephone}
        </p>

        <h2 className="mt-10 text-2xl">Hébergeur</h2>
        <p className="text-anthracite/80 mt-3 leading-relaxed">
          {hebergeur.nom}
          <br />
          {hebergeur.adresse}
          <br />
          {hebergeur.site}
        </p>

        <h2 className="mt-10 text-2xl">Propriété intellectuelle</h2>
        <p className="text-anthracite/80 mt-3 leading-relaxed">
          L&apos;ensemble des contenus de ce site est protégé. Toute
          reproduction sans autorisation est interdite.
        </p>

        <h2 className="mt-10 text-2xl">Données personnelles</h2>
        <p className="text-anthracite/80 mt-3 leading-relaxed">
          Les informations transmises via le formulaire de contact servent
          uniquement à traiter votre demande. Conformément au RGPD, vous
          disposez d&apos;un droit d&apos;accès, de rectification et de
          suppression en écrivant à {editeur.email}.
        </p>
      </Container>
    </main>
  );
}
