"use client";

import { useActionState } from "react";
import { contactAction, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle", message: "" };
const field =
  "border-anthracite/20 focus:border-monstera w-full rounded-lg border bg-transparent px-4 py-3 outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(contactAction, initial);
  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot anti-spam (caché) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="nom" className="text-sm font-semibold">
          Nom
        </label>
        <input id="nom" name="nom" required className={`mt-1 ${field}`} />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={`mt-1 ${field}`}
        />
      </div>
      <div>
        <label htmlFor="organisation" className="text-sm font-semibold">
          Organisation
        </label>
        <input
          id="organisation"
          name="organisation"
          required
          className={`mt-1 ${field}`}
        />
      </div>
      <div>
        <label htmlFor="type" className="text-sm font-semibold">
          Type de structure
        </label>
        <select
          id="type"
          name="type"
          required
          defaultValue="pme"
          className={`mt-1 ${field}`}
        >
          <option value="pme">PME / entreprise</option>
          <option value="public">Structure publique</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`mt-1 ${field}`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-ocre text-anthracite focus-visible:outline-anthracite inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
      >
        {pending ? "Envoi…" : "Envoyer"}
      </button>

      <p aria-live="polite" className="text-sm">
        {state.status === "success" && (
          <span className="text-monstera">{state.message}</span>
        )}
        {(state.status === "error" || state.status === "unavailable") && (
          <span className="text-anthracite">{state.message}</span>
        )}
      </p>
    </form>
  );
}
