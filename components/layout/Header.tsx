import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

const links = [
  { href: "/#approche", label: "Approche" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#equipe", label: "Équipe" },
  { href: "/#securite", label: "Sécurité" },
];

export function Header() {
  return (
    <header className="border-anthracite/10 bg-creme/80 sticky top-0 z-50 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-monstera text-xl">
          Wabi Sabi
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-anthracite/80 hover:text-anthracite text-sm"
            >
              {l.label}
            </Link>
          ))}
          <Button href="/contact" className="px-5 py-2">
            Prendre 45 min
          </Button>
        </nav>
        <MobileMenu links={links} />
      </Container>
    </header>
  );
}
