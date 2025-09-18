"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { InformationPersonnelle } from "@/components/profil/InformationPersonnelle";
import { ZoneDangereuse } from "@/components/profil/ZoneDangereuse";

export default function ProfilPage() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          setMessage("Erreur lors de la récupération des infos utilisateur");
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

  const updatePassword = async () => {
    setMessage("");
    setIsError(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Tous les champs sont obligatoires.");
      setIsError(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("La confirmation du nouveau mot de passe ne correspond pas.");
      setIsError(true);
      return;
    }

    // Vérifier le mot de passe actuel
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });
    if (signInError) {
      setMessage("Mot de passe actuel incorrect.");
      setIsError(true);
      return;
    }

    // Mettre à jour
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (updateError) {
      setMessage(updateError.message);
      setIsError(true);
    } else {
      setMessage("Mot de passe mis à jour !");
      setIsError(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  // Mise à jour de l'email
  const updateEmail = async () => {
    const { error } = await supabase.auth.updateUser({ email });
    if (error) {
      setMessage(error.message);
      setIsError(true);
    } else {
      setMessage("Email mis à jour !");
      setIsError(false);
    }
  };

  // Vider l'historique
  const clearHistory = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;

    const { error } = await supabase
      .from("historique")
      .delete()
      .eq("user_id", user.user.id);

    if (error) {
      setMessage(error.message);
      setIsError(true);
    } else {
      setMessage("Historique vidé !");
      setIsError(false);
    }
  };

  // Supprimer le compte
  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible !"
    );
    if (!confirmDelete) return;

    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;

    const { error } = await supabase.auth.admin.deleteUser(user.user.id);
    if (error) {
      setMessage(error.message);
      setIsError(true);
    } else {
      setMessage("Compte supprimé !");
      setIsError(false);
      router.push("/");
    }
  };

  return (
    <main className="flex flex-col justify-start max-w-2xl mx-auto px-6 py-10 text-zinc-900 dark:text-zinc-100 gap-6">
      <h1 className="text-3xl font-bold">Profil</h1>
      <p className="text-sm text-gray-500 -mt-5">Détails de votre profil</p>
      {user && <InformationPersonnelle user={user} />}
      <ZoneDangereuse />

      <div className="flex flex-col gap-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm px-3 py-2 rounded-md">
        <h2 className="text-2xl font-bold mb-2">Informations personnelles</h2>

        <div className="flex flex-col gap-2 mb-2">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={updateEmail}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition"
          >
            Mettre à jour
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label>Mot de passe actuel</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label>Confirmer le nouveau mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={updatePassword}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition"
          >
            Mettre à jour le mot de passe
          </button>
        </div>
      </div>

      {/* Historique et suppression */}
      <div className="flex flex-col gap-2">
        <button
          onClick={clearHistory}
          className="w-full bg-yellow-600 text-white rounded-md py-2 px-4 hover:opacity-90 transition"
        >
          Vider
        </button>
        <button
          onClick={deleteAccount}
          className="w-full bg-red-600 text-white rounded-md py-2 px-4 hover:opacity-90 transition"
        >
          Supprimer le compte
        </button>
      </div>

      {/* Message */}
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
    </main>
  );
}
