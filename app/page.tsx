import { Hero } from "@/components/sections/Hero";
import { Manifeste } from "@/components/sections/Manifeste";
import { Piliers } from "@/components/sections/Piliers";
import { Trio } from "@/components/sections/Trio";
import { Methode } from "@/components/sections/Methode";
import { Securite } from "@/components/sections/Securite";
import { Kpis } from "@/components/sections/Kpis";
import { UseCases } from "@/components/sections/UseCases";
import { KintsugiBand } from "@/components/sections/Kintsugi";
import { FinalCta } from "@/components/sections/FinalCta";
import { organizationJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />
      <Hero />
      <Manifeste />
      <Piliers />
      <Trio />
      <Methode />
      <Securite />
      <Kpis />
      <UseCases />
      <KintsugiBand />
      <FinalCta />
    </main>
  );
}
