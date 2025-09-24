"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type SauvegarderPartieBoutonProps = {
  userId: string;
  jeu: string;
  players: { name: string; score: number }[];
  jeu_id: string;
};

export function SauvegarderPartieBouton({
  userId,
  jeu,
  players,
  jeu_id,
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
      className="py-2 px-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex-1 cursor-pointer transition-colors"
    >
      {enCours ? "Sauvegarde en cours..." : "💾 Sauvegarder la partie"}
    </button>
  );
}
