import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { securite } from "@/content/securite";

export function Securite() {
  return (
    <Section id="securite" tone="anthracite">
      <Container>
        <Reveal>
          <p className="text-bronze font-sans text-sm tracking-[0.25em] uppercase">
            {securite.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-creme mt-6 max-w-3xl text-4xl md:text-5xl">
            {securite.titre}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-creme/80 mt-6 max-w-2xl text-lg">
            {securite.intro}
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {securite.points.map((point, i) => (
            <Reveal key={point} delay={i * 0.08}>
              <li className="text-creme/90 flex gap-3">
                <span aria-hidden="true" className="text-ocre">
                  —
                </span>
                <span>{point}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.2}>
          <blockquote className="border-ocre text-creme font-display mt-12 max-w-3xl border-l-2 pl-6 text-xl italic">
            « {securite.citation} »
          </blockquote>
        </Reveal>
      </Container>
    </Section>
  );
}
