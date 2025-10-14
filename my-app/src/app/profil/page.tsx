"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { InformationPersonnelle } from "@/components/profil/InformationPersonnelle";
import { ZoneDangereuse } from "@/components/profil/ZoneDangereuse";
import StatistiquesUtilisateur from "@/components/profil/StatistiquesUtilisateur";

export default function ProfilPage() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
    creerA: string;
    emailVerifie?: string;
  } | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        router.push("/");
      } else {
        const { data: userData, error } = await supabase.auth.getUser();
        if (error || !userData.user) {
          setMessage(
            "Erreur lors de la récupération des informations de l'utilisateur."
          );
          setIsError(true);
        } else {
          setUser({
            id: userData.user.id,
            email: userData.user.email ?? "",
            name: "Utilisateur",
            creerA: userData.user.created_at,
            emailVerifie: userData.user.email_confirmed_at,
          });
        }
      }
    };
    checkUser();
  }, [router]);

  return (
    <main className="flex flex-col justify-start max-w-2xl mx-auto px-6 py-10 text-zinc-900 dark:text-zinc-100 gap-6">
      <h1 className="text-3xl font-bold">Profil</h1>
      <p className="text-sm text-gray-500 -mt-5">Détails de votre profil</p>
      {isError ? (
        <>
          <p>{message}</p>
          <a
            href={"/"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer select-none mt-2 w-fit"
          >
            Accueil
            <span className="text-zinc-400">↗</span>
          </a>
        </>
      ) : user ? (
        <>
          <InformationPersonnelle user={user} />
          <StatistiquesUtilisateur userId={user.id} />
          <ZoneDangereuse />
        </>
      ) : null}
    </main>
  );
}
