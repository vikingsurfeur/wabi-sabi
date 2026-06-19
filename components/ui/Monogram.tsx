import { cn } from "@/lib/utils";

// Pastille organique avec les initiales (placeholder en attendant les portraits).
export function Monogram({
  prenom,
  className,
}: {
  prenom: string;
  className?: string;
}) {
  const initiale = prenom.charAt(0).toUpperCase();
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-monstera/10 text-monstera font-display flex h-16 w-16 items-center justify-center rounded-[40%_60%_60%_40%/50%_40%_60%_50%] text-2xl",
        className,
      )}
    >
      {initiale}
    </div>
  );
}
