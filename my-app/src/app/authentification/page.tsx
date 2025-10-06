"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const handleOAuthSignIn = async (
    provider: "google" | "discord" | "facebook"
  ) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/` },
      });

      if (error) {
        setMessage(error.message);
        setIsError(true);
      } else {
        setMessage(`Redirection vers ${provider} pour authentification...`);
        setIsError(false);
      }
    } catch (err) {
      setMessage(
        `Une erreur est survenue lors de l'authentification avec ${provider}.`
      );
      setIsError(true);
      console.error(err);
    }
  };

  return (
    <main className="flex justify-center font-sans px-6 py-16">
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bienvenue</h1>
                  <p className="text-muted-foreground text-balance">
                    {isSignUp ? "Inscris-toi sur" : "Connecte-toi à ton compte"}{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      Score Up
                    </span>
                  </p>
                </div>
                <div className="flex items-center border rounded-md px-3 py-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Mail className="mr-2 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>

                <div className="flex items-center border rounded-md px-3 py-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                {!isSignUp && (
                  <p
                    className="-mt-2 -mb-2 text-sm text-center text-blue-600 dark:text-blue-400 cursor-pointer underline"
                    onClick={() => router.push("/motdepasseoublie")}
                  >
                    Mot de passe oublié ?
                  </p>
                )}
                <Button
                  onClick={handleAuth}
                  className="w-full bg-blue-600 dark:bg-blue-500 text-white"
                >
                  {isSignUp ? "S'inscrire" : "Se connecter"}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Ou continuer avec
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={() => handleOAuthSignIn("facebook")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-facebook"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                    </svg>
                    <span className="sr-only">Se connecter avec Facebook</span>
                  </Button> */}
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={() => handleOAuthSignIn("google")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Se connecter avec Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={() => handleOAuthSignIn("discord")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-discord"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                    </svg>
                    <span className="sr-only">Se connecter avec Discord</span>
                  </Button>
                </div>

                <div className="text-center text-sm">
                  <p className="mt-4 text-sm text-center ">
                    {isSignUp ? (
                      <>
                        Déjà un compte ?{" "}
                        <span
                          className="cursor-pointer underline underline-offset-4"
                          onClick={() => setIsSignUp(false)}
                        >
                          Se connecter
                        </span>
                      </>
                    ) : (
                      <>
                        Pas encore de compte ?{" "}
                        <span
                          className="cursor-pointer underline underline-offset-4"
                          onClick={() => setIsSignUp(true)}
                        >
                          S&apos;inscrire
                        </span>
                      </>
                    )}
                  </p>
                </div>
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
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          En continuant, vous acceptez nos{" "}
          <a href="/conditions-utilisation">Conditions d’utilisation</a> et
          notre{" "}
          <a href="/politique-de-confidentialite">
            Politique de confidentialité
          </a>
          .
        </div>
      </div>
    </main>
  );
}
