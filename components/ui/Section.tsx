import { cn } from "@/lib/utils";

type Tone = "creme" | "anthracite" | "monstera";

const tones: Record<Tone, string> = {
  creme: "bg-creme text-anthracite",
  anthracite: "bg-anthracite text-creme",
  monstera: "bg-monstera text-creme",
};

export function Section({
  id,
  tone = "creme",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-24 md:py-32", tones[tone], className)}>
      {children}
    </section>
  );
}
