"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRecovery = async () => {
    setMessage("");
    setIsError(false);
    setLoading(true);

    if (!email) {
      setMessage("Veuillez entrer votre email.");
      setIsError(true);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setMessage(error.message);
        setIsError(true);
      } else {
        setMessage(
          "Si cet email est enregistré, un lien de réinitialisation a été envoyé."
        );
        setIsError(false);
      }
    } catch (err) {
      console.error(err);
      setMessage("Une erreur est survenue, réessayez plus tard.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen px-6 py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-800 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
          Mot de passe oublié
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-6">
          Entrez votre email pour recevoir un lien de réinitialisation.
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleRecovery}
            disabled={loading}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition"
          >
            {loading ? "Envoi en cours..." : "Envoyer le lien"}
          </button>

          {message && (
            <p
              className={`mt-2 text-sm ${
                isError
                  ? "text-red-500 dark:text-red-400"
                  : "text-green-500 dark:text-green-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
