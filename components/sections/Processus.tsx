import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { processus } from "@/content/processus";

export function Processus() {
  return (
    <Section id="processus" tone="creme">
      <Container>
        <Reveal>
          <p className="text-monstera font-sans text-sm tracking-[0.25em] uppercase">
            {processus.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl text-4xl md:text-5xl">
            {processus.titre}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-anthracite/80 mt-6 max-w-2xl text-lg">
            {processus.description}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
