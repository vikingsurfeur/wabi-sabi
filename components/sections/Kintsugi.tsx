import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { KintsugiLine } from "@/components/motion/KintsugiLine";
import { kintsugi } from "@/content/kintsugi";

export function KintsugiBand() {
  return (
    <Section tone="monstera">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <p className="text-bronze font-sans text-sm tracking-[0.25em] uppercase">
            {kintsugi.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-creme mt-6 text-4xl md:text-5xl">
            {kintsugi.titre}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <KintsugiLine className="text-ocre mx-auto mt-8 h-5 w-72" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-creme/85 mt-8 text-lg">{kintsugi.texte}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
