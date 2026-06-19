import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-ocre text-anthracite hover:brightness-95",
  ghost: "border border-anthracite/30 text-anthracite hover:bg-anthracite/5",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-visible:outline-anthracite inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
