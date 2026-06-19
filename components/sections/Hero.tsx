import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { KintsugiLine } from "@/components/motion/KintsugiLine";
import { site } from "@/content/site";

export function Hero() {
  return (
    <header className="relative overflow-hidden py-32 md:py-44">
      <Container>
        <Reveal>
          <p className="text-monstera font-sans text-sm tracking-[0.25em] uppercase">
            {site.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.05] md:text-7xl">
            L&apos;IA ne s&apos;improvise pas. Elle s&apos;intègre.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <KintsugiLine className="text-ocre mt-6 h-5 w-64" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-anthracite/80 mt-8 max-w-2xl text-lg md:text-xl">
            {site.uvp}
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact">Prendre 45 min</Button>
            <Button href="#approche" variant="ghost">
              Notre approche
            </Button>
          </div>
        </Reveal>
      </Container>
    </header>
  );
}
