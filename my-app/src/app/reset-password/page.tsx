"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const [canReset, setCanReset] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setCanReset(true);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleUpdatePassword = async () => {
    setMessage("");
    setIsError(false);

    if (!newPassword || !confirmPassword) {
      setMessage("Tous les champs sont obligatoires.");
      setIsError(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      setIsError(true);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage("Erreur : " + error.message);
      setIsError(true);
    } else {
      setMessage("Mot de passe mis à jour avec succès !");
      setIsError(false);
      setNewPassword("");
      setConfirmPassword("");
      router.push("/");
    }
  };

  if (!canReset) {
    return (
      <main className="flex justify-center items-center min-h-screen text-center px-6 py-16">
        <p className="text-zinc-700 dark:text-zinc-300">
          Veuillez utiliser le lien reçu par email pour réinitialiser votre mot
          de passe.
        </p>
      </main>
    );
  }

  return (
    <main className="flex justify-center font-sans px-6 py-16">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-colors shadow-sm">
        <h2 className="text-3xl font-semibold text-center mb-6 text-zinc-900 dark:text-zinc-100">
          Réinitialisation du mot de passe
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirmer le nouveau mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUpdatePassword}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition cursor-pointer"
          >
            Mettre à jour le mot de passe
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
  );
}
