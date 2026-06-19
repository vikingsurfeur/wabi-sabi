import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { usecases } from "@/content/usecases";

export function UseCases() {
  return (
    <Section tone="creme">
      <Container>
        <Reveal>
          <h2 className="text-4xl md:text-5xl">
            Qui adopte l&apos;IA, et pour quoi ?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-anthracite/70 mt-4 max-w-2xl">
            Quelques usages concrets par métier, à titre illustratif. Vos cas
            réels émergent de l&apos;audit.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {usecases.map((g, i) => (
            <Reveal key={g.metier} delay={(i % 3) * 0.08}>
              <div className="border-bronze/30 h-full rounded-2xl border p-6">
                <h3 className="text-monstera text-lg">{g.metier}</h3>
                <ul className="mt-4 space-y-2">
                  {g.usages.map((u) => (
                    <li key={u} className="text-anthracite/80 text-sm">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
