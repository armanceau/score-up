"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setMessage("Vous êtes déjà connecté ! Redirection…");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    };
    checkUser();
  }, []);

  const handleAuth = async () => {
    setMessage("");
    setIsError(false);

    if (!email || !password) {
      setMessage("Veuillez remplir tous les champs.");
      setIsError(true);
      return;
    }

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setMessage(error.message);
          setIsError(true);
        } else {
          setMessage("Inscription réussie ! Vérifie ton email pour confirmer.");
          setIsError(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setMessage("Aïe, une erreur est survenue.");
          setIsError(true);
        } else {
          setMessage("Connexion réussie ! Redirection en cours...");
          setIsError(false);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      }
    } catch (err: unknown) {
      setMessage("Une erreur est survenue. Réessaie plus tard.");
      setIsError(true);
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black font-sans px-6 py-16">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-colors shadow-sm">
        <h2 className="text-3xl font-semibold text-center mb-6 text-zinc-900 dark:text-zinc-100">
          {isSignUp ? "Inscription" : "Connexion"} à{" "}
          <span className="text-blue-600 dark:text-blue-400">Score Up</span>
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAuth}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition"
          >
            {isSignUp ? "S'inscrire" : "Se connecter"}
          </button>
        </div>

        <p
          className="mt-4 text-sm text-center text-blue-600 dark:text-blue-400 cursor-pointer underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Déjà un compte ? Se connecter"
            : "Pas encore inscrit ? Créer un compte"}
        </p>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              isError
                ? "text-red-500 dark:text-red-400"
                : "text-green-500 dark:text-green-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
