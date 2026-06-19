import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

// Fraunces : serif d'affichage variable (optical sizing auto via le navigateur).
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

// Plus Jakarta Sans : corps / UI.
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});
