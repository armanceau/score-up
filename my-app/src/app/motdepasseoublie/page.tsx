"use client";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MotDePasseOubliePage() {
  const { t } = useTranslation("authentification");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRecovery = async () => {
    setMessage("");
    setIsError(false);
    setLoading(true);

    if (!email) {
      setMessage(t("emailObligatoire"));
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
        setMessage(t("lienReinitialisationEnvoye"));
        setIsError(false);
      }
    } catch (err) {
      console.error(err);
      setMessage(t("erreurGenerique"));
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex justify-center font-sans px-6 py-16">
        <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-colors shadow-sm">
          <h2 className="text-3xl font-semibold text-center mb-6 text-zinc-900 dark:text-zinc-100">
            {t("motDePasseOublie")}
          </h2>

          <p className="text-zinc-700 dark:text-zinc-300 mb-6">
            {t("entrezVotreEmail")}
          </p>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder={t("adresseEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleRecovery}
              disabled={loading}
              className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition cursor-pointer"
            >
              {loading ? t("envoiEnCours") : t("envoyerLeLien")}
            </button>

            {message && (
              <p
                className={`mt-4 text-sm text-center ${
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
    </>
  );
}
