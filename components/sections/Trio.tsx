import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { team } from "@/content/team";

export function Trio() {
  return (
    <Section id="equipe" tone="creme">
      <Container>
        <Reveal>
          <p className="text-monstera font-sans text-sm tracking-[0.25em] uppercase">
            L&apos;équation 360°
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-4xl md:text-5xl">
            Trois profils, une vision complète
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.prenom} delay={i * 0.1}>
              <div className="ring-bronze/30 relative aspect-square w-full max-w-[220px] overflow-hidden rounded-[1.75rem] shadow-sm ring-1">
                <Image
                  src={m.photo}
                  alt={`${m.prenom}, ${m.role}`}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-6 text-2xl">{m.prenom}</h3>
              <p className="text-monstera mt-1 text-sm font-semibold">
                {m.role}
              </p>
              <p className="text-anthracite/80 mt-4">{m.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
