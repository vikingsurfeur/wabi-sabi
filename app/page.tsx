import { Hero } from "@/components/sections/Hero";
import { Piliers } from "@/components/sections/Piliers";
import { Kpis } from "@/components/sections/Kpis";

export default function Home() {
  return (
    <main>
      <Hero />
      <Kpis />
      <Piliers />
    </main>
  );
}
