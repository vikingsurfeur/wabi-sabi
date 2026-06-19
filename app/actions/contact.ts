"use server";

import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/content/site";

export type ContactState = {
  status: "idle" | "success" | "error" | "unavailable";
  message: string;
};

const schema = z.object({
  nom: z.string().min(2, "Indiquez votre nom."),
  email: z.string().email("Email invalide."),
  organisation: z.string().min(2, "Indiquez votre organisation."),
  type: z.enum(["pme", "public", "autre"]),
  message: z.string().min(10, "Votre message est trop court."),
});

export async function contactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot : un bot remplit le champ caché « website ».
  if (formData.get("website")) {
    return {
      status: "success",
      message: "Merci, votre message a bien été envoyé.",
    };
  }

  const parsed = schema.safeParse({
    nom: formData.get("nom"),
    email: formData.get("email"),
    organisation: formData.get("organisation"),
    type: formData.get("type"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Formulaire invalide.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "unavailable",
      message: `Envoi indisponible pour le moment. Écrivez-nous directement à ${site.email}.`,
    };
  }

  const { nom, email, organisation, type, message } = parsed.data;
  const to = process.env.CONTACT_TO ?? site.email;
  try {
    const resend = new Resend(apiKey);
    // Resend ne lève PAS sur erreur API : elle est renvoyée dans `error`
    // (domaine non vérifié, destinataire restreint en mode test, etc.).
    const { error } = await resend.emails.send({
      from:
        process.env.CONTACT_FROM ?? "Site Wabi Sabi <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Nouveau contact — ${organisation} (${type})`,
      text: `Nom: ${nom}\nEmail: ${email}\nOrganisation: ${organisation}\nType: ${type}\n\n${message}`,
    });
    if (error) {
      // Journalisé côté serveur → visible dans les logs de fonction Vercel.
      console.error("Resend send error:", error);
      return {
        status: "error",
        message: `Une erreur est survenue. Réessayez ou écrivez-nous à ${site.email}.`,
      };
    }
    return {
      status: "success",
      message: "Merci, votre message a bien été envoyé.",
    };
  } catch (err) {
    console.error("Resend exception:", err);
    return {
      status: "error",
      message: `Une erreur est survenue. Réessayez ou écrivez-nous à ${site.email}.`,
    };
  }
}
