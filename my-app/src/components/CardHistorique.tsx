"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

type Player = {
  name: string;
  score: number;
};

type Partie = {
  id: string;
  created_at: string;
  jeu: string;
  details: { joueurs: Player[] };
};

type CardHistoriqueProps = {
  partie: Partie;
  est_ascendant: boolean;
};

export default function CardHistorique({
  partie,
  est_ascendant,
}: CardHistoriqueProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("historique");
  const toggleOpen = () => setOpen(!open);

  const trierJoueurs = (joueurs: Player[]) =>
    [...joueurs].sort((a, b) => {
      const scoreA = Number(a.score);
      const scoreB = Number(b.score);
      return est_ascendant ? scoreB - scoreA : scoreA - scoreB;
    });

  const top3 = trierJoueurs(partie.details.joueurs).slice(0, 3);
  const tousLesJoueurs = trierJoueurs(partie.details.joueurs);

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden shadow-sm">
      <button
        onClick={toggleOpen}
        className="w-full px-4 py-3 text-left cursor-pointer rounded-tl-md rounded-ml-md p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-between"
      >
        <div>
          <span className="font-semibold">{partie.jeu}</span>{" "}
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            ({new Date(partie.created_at).toLocaleDateString("fr-FR")})
          </span>
        </div>
        <div className="flex space-x-2 text-sm">
          {top3.map((p, i) => (
            <span key={p.name}>
              {["🥇", "🥈", "🥉"][i]} {p.name} ({p.score})
            </span>
          ))}
        </div>
      </button>

      {open && (
        <div className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">{t("tousLesJoueurs")}</h3>
          <ul className="space-y-1 text-sm">
            {tousLesJoueurs.map((joueur) => (
              <li key={joueur.name}>
                {joueur.name} : {joueur.score} pts
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
