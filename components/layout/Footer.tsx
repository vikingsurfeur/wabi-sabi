import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-anthracite text-creme/80 py-16">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-creme text-2xl">{site.name}</p>
          <p className="mt-2 text-sm">{site.tagline}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href={`mailto:${site.email}`} className="hover:text-creme">
            {site.email}
          </a>
          <a href={`tel:${site.phoneE164}`} className="hover:text-creme">
            {site.phone}
          </a>
          <Link href="/mentions-legales" className="hover:text-creme">
            Mentions légales
          </Link>
        </div>
      </Container>
      <Container className="text-creme/50 mt-10 text-xs">
        © {new Date().getFullYear()} {site.name}. Tous droits réservés.
      </Container>
    </footer>
  );
}
