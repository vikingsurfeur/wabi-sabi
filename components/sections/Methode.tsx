import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { methode, apres } from "@/content/methode";

export function Methode() {
  return (
    <Section id="methode" tone="creme">
      <Container>
        <Reveal>
          <h2 className="text-4xl md:text-5xl">Comment on avance ensemble</h2>
        </Reveal>
        <ol className="mt-16 grid gap-10 md:grid-cols-2">
          {methode.map((e, i) => (
            <Reveal
              key={e.numero}
              as="li"
              delay={i * 0.1}
              className="border-bronze/40 border-l-2 pl-6"
            >
              <span className="font-display text-ocre text-sm">{e.numero}</span>
              <h3 className="mt-1 text-2xl">{e.titre}</h3>
              <p className="text-anthracite/80 mt-3">{e.description}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.2}>
          <div className="mt-16">
            <h3 className="text-monstera text-xl">Et après ?</h3>
            <ul className="mt-4 space-y-2">
              {apres.map((a) => (
                <li key={a} className="text-anthracite/80 flex gap-3">
                  <span aria-hidden="true" className="text-ocre">
                    —
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
