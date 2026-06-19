import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { manifeste } from "@/content/manifeste";

export function Manifeste() {
  return (
    <Section id="approche" tone="creme">
      <Container>
        <Reveal>
          <p className="text-monstera font-sans text-sm tracking-[0.25em] uppercase">
            {manifeste.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl text-3xl md:text-4xl">
            {manifeste.titre}
          </h2>
        </Reveal>
        <div className="mt-8 max-w-2xl space-y-5">
          {manifeste.paragraphes.map((p, i) => (
            <Reveal key={i} delay={0.2 + i * 0.1}>
              <p className="text-anthracite/90 text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
