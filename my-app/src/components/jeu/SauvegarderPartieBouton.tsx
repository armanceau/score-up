"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Save } from "lucide-react";

// Ajoutez ces props au type existant
type SauvegarderPartieBoutonProps = {
  userId: string;
  jeu: string;
  players: { name: string; score: number }[];
  jeu_id: string;
  onReset?: () => void; // Fonction pour réinitialiser l'état local
};

export function SauvegarderPartieBouton({
  userId,
  jeu,
  players,
  jeu_id,
  onReset,
}: SauvegarderPartieBoutonProps) {
  const [enCours, setEnCours] = useState(false);

  const handleSave = async () => {
    try {
      setEnCours(true);

      const { error } = await supabase.from("partie").insert({
        user_id: userId,
        jeu: jeu,
        details: { joueurs: players },
        jeu_id: jeu_id,
      });

      if (error) throw error;

      localStorage.removeItem(`score-up-${jeu_id}`);

      if (onReset) {
        onReset();
      }

      alert("✅ Partie sauvegardée !");
    } catch (err) {
      console.error(err);
      alert("❌ Impossible de sauvegarder la partie");
    } finally {
      setEnCours(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={enCours}
      className="bg-green-500 text-white hover:text-green-400 cursor-pointer px-4 py-2 rounded-lg group flex items-center justify-center disabled:opacity-40 transition-[background-color,border-radius] duration-500 hover:bg-green-900 hover:rounded-[9999px] relative overflow-hidden"
    >
      {enCours ? (
        "Sauvegarde en cours..."
      ) : (
        <>
          <span className="transition-all duration-300 group-hover:pr-8">
            Sauvegarder
          </span>

          <span className="absolute right-1 w-8 h-8 rounded-full bg-green-400 text-green-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Save height={18} />
          </span>
        </>
      )}
    </button>
  );
}
