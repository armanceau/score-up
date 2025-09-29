"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setMessage("Vous êtes déjà connecté ! Redirection…");
        setTimeout(() => router.push("/"), 3000);
      }
    };
    checkUser();
  }, [router]);

  // --- Auth email/password ---
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
          let errorMessage = "Aïe, une erreur est survenue.";

          switch (error.status) {
            case 400:
              errorMessage = "E-mail ou mot de passe invalide.";
              break;
            case 403:
              errorMessage = "Accès refusé.";
              break;
            case 404:
              errorMessage = "Ressource introuvable.";
              break;
            case 429:
              errorMessage = "Trop de tentatives, réessayez plus tard.";
              break;
            case 500:
              errorMessage =
                "Aïe une erreur est survenue (c'est pas toi, c'est nous).";
              break;
          }

          setMessage(errorMessage);
          setIsError(true);
        } else {
          setMessage("Connexion réussie ! Redirection en cours...");
          setIsError(false);
          router.push("/");
        }
      }
    } catch (err) {
      setMessage("Une erreur est survenue. Réessaie plus tard.");
      setIsError(true);
      console.error(err);
    }
  };

  // --- Auth via Google ---
  const handleOAuthSignIn = async (provider: "google") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/` },
      });

      if (error) {
        setMessage(error.message);
        setIsError(true);
      } else {
        setMessage("Redirection vers Google pour authentification...");
        setIsError(false);
      }
    } catch (err) {
      setMessage("Une erreur est survenue lors de l'authentification Google.");
      setIsError(true);
      console.error(err);
    }
  };

  return (
    <main className="flex justify-center font-sans px-6 py-16">
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

          <div className="flex items-center border rounded px-4 py-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Lock className="mr-2 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full outline-none"
              value={password}
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 cursor-pointer" />
              ) : (
                <Eye className="w-4 h-4 cursor-pointer" />
              )}
            </button>
          </div>

          <button
            onClick={handleAuth}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition cursor-pointer"
          >
            {isSignUp ? "S'inscrire" : "Se connecter"}
          </button>

          <button
            onClick={() => handleOAuthSignIn("google")}
            className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white font-medium 
              hover:bg-gray-100 dark:hover:bg-zinc-700 
              hover:shadow-lg 
              transition-all duration-150 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.8-1.6-35-4.6-51.6H272v97.7h147.4c-6.3 33.9-25.2 62.6-53.8 82v68h86.9c50.9-46.9 80-115.9 80-196.1z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c72.6 0 133.6-24 178.2-65.3l-86.9-68c-24.2 16.3-55 25.9-91.3 25.9-70.3 0-129.8-47.5-151.2-111.2H31.6v69.9C75.8 480.3 168.1 544.3 272 544.3z"
                fill="#34A853"
              />
              <path
                d="M120.8 329.6c-10.9-32.6-10.9-67.7 0-100.3V159.4H31.6c-21.9 43.3-21.9 94.7 0 138z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c37.3-.6 72.9 13.5 100.1 39.1l75-75C404.8 24.6 343.8 0 272 0 168.1 0 75.8 64 31.6 159.4l89.2 69c21.4-63.7 80.9-111.2 151.2-111z"
                fill="#EA4335"
              />
            </svg>

            <span>Se connecter avec Google</span>
          </button>
        </div>

        {!isSignUp && (
          <p
            className="mt-2 text-sm text-center text-blue-600 dark:text-blue-400 cursor-pointer underline"
            onClick={() => router.push("/motdepasseoublie")}
          >
            Mot de passe oublié ?
          </p>
        )}

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
