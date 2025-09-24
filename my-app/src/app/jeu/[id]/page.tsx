"use client";

import JeuPage from "@/components/jeu/JeuPage";
import { useJeux } from "@/lib/jeuxContext";
import { CircleX } from "lucide-react";
import { useParams } from "next/navigation";

export default function GamePage() {
  const params = useParams();
  const id = params?.id;

  const { jeux } = useJeux();
  const jeu = jeux.find((j) => j.id === id);

  if (!id) return <p>ID manquant</p>;
  if (!jeu) {
    return (
      <main className="flex flex-col items-center justify-center max-w-md mx-auto px-6 py-16 text-center text-zinc-900 dark:text-zinc-100">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-6">
          <CircleX className="text-red-200" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Aïe, jeu introuvable...</h2>
        <p className="txt-gr text-sm text-gray-500 mb-6 italic">
          Une erreur est survenue. Essaye de rafraîchir la page pour continuer.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-5 py-2.5 rounded-md text-sm font-medium shadow hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer select-none"
        >
          🔄 Rafraîchir
        </button>
      </main>
    );
  }

  return (
    <JeuPage
      idJeu={jeu.id}
      nom={jeu.nom}
      emoji={jeu.emoji}
      est_ascendant={jeu.est_ascendant}
      regle_courte={jeu.regle_courte}
      lien_regle={jeu.lien_regle}
      localStorageKey={`score-up-${jeu.id}`}
    />
  );
}
