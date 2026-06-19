import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact — Wabi Sabi",
  description:
    "Prenons 45 min pour parler de votre intégration IA. Écrivez-nous ou appelez-nous.",
};

export default function ContactPage() {
  return (
    <main className="py-24 md:py-32">
      <Container className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl">Prenons 45 min.</h1>
        <p className="text-anthracite/80 mt-6 text-lg">
          Dites-nous où vous en êtes : on revient vers vous rapidement. Vous
          pouvez aussi nous écrire à{" "}
          <a href={`mailto:${site.email}`} className="text-monstera underline">
            {site.email}
          </a>{" "}
          ou nous appeler au{" "}
          <a href={`tel:${site.phoneE164}`} className="text-monstera underline">
            {site.phone}
          </a>
          .
        </p>
        <div className="mt-12">
          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
