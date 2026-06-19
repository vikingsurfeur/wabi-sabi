import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { kpis } from "@/content/kpis";

export function Kpis() {
  return (
    <Section tone="creme">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          {kpis.map((k, i) => (
            <Reveal key={k.libelle} delay={i * 0.1} className="text-center">
              <p className="font-display text-monstera text-6xl">{k.valeur}</p>
              <p className="text-anthracite/90 mt-2">{k.libelle}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
