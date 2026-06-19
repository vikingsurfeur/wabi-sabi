import type { Metadata } from "next";
import { fraunces, jakarta } from "@/lib/fonts";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wabi Sabi — Former · Automatiser · Transformer",
  description:
    "Cabinet de formation et d'outils IA pour PME. L'intégration IA à 360° par des experts natifs du digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
