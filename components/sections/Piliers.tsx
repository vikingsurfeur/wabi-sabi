import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { piliers } from "@/content/piliers";

export function Piliers() {
  return (
    <Section id="piliers" tone="monstera">
      <Container>
        <Reveal>
          <h2 className="text-creme text-4xl md:text-5xl">Nos trois piliers</h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {piliers.map((p, i) => (
            <Reveal key={p.titre} delay={i * 0.1}>
              <h3 className="text-bronze text-2xl">{p.titre}</h3>
              <p className="text-creme/80 mt-4">{p.message}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
