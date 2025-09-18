"use client";

import React, { useState } from "react";
import { Mail, Lock, ShieldCheck, ShieldX } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { ModalMotDePasse } from "../modal/ModalMotDePasse";

interface PersonalInfoCardProps {
  user: {
    name: string;
    email: string;
    creerA?: string;
    emailVerifie?: string;
  };
}

export const InformationPersonnelle = ({ user }: PersonalInfoCardProps) => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm px-3 py-2 rounded-md">
      <h2 className="text-2xl font-medium mb-2">Informations personnelles</h2>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">E-mail</label>
        </div>
        <div className="flex items-center h-10 px-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white">
          <Mail className="h-4 w-4 text-muted-foreground mr-2" />
          <span className="text-sm">{user.email}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Mot de passe</label>
          <button
            className="font-medium transition-colors disabled:opacity-50 hover:bg-white/90 dark:hover:bg-zinc-800 rounded-md px-3 h-7 text-xs text-primary cursor-pointer text-blue-500"
            onClick={() => setIsPasswordDialogOpen(true)}
          >
            Modifier
          </button>
        </div>
        <div className="flex items-center h-10 px-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white">
          <Lock className="h-4 w-4 text-muted-foreground mr-2" />
          <span className="text-sm">••••••••••••</span>
        </div>
      </div>

      <div className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Créer le :{" "}
          {user.creerA
            ? new Date(user.creerA).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "-"}
        </p>

        {user.emailVerifie ? (
          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium w-fit">
            <ShieldCheck className="w-3 h-3" />
            E-mail vérifié
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium w-fit">
            <ShieldX className="w-3 h-3" />
            E-mail von vérifié
          </span>
        )}
      </div>

      <ModalMotDePasse
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        email={user.email}
        onUpdatePassword={async (current, next) => {
          const { error: signInError } = await supabase.auth.signInWithPassword(
            {
              email: user.email,
              password: current,
            }
          );
          if (signInError) throw new Error("Mot de passe actuel incorrect");

          const { error: updateError } = await supabase.auth.updateUser({
            password: next,
          });
          if (updateError) throw updateError;
        }}
      />
    </div>
  );
};
