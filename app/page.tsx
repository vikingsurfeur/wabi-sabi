import { Hero } from "@/components/sections/Hero";
import { Piliers } from "@/components/sections/Piliers";
import { Kpis } from "@/components/sections/Kpis";
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
      <Kpis />
      <Piliers />
    </main>
  );
}
