import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <Section tone="creme">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl">
            Et si on prenait 45 min pour se rencontrer ?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-anthracite/80 mt-6 text-lg">
            Nos meilleurs clients ont dit oui. Aujourd&apos;hui, ils nous
            remercient.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Button href="/contact">Prendre rendez-vous</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
