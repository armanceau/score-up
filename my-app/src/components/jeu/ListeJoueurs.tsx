import { SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Joueur = {
  nom: string;
  scores: number[];
  couleur: string;
};

type ListeJoueursProps = {
  joueurs: Joueur[];
  supprimerJoueur: (nom: string) => void;
  modifierScores: (nom: string, scores: number[]) => void;
  mancheEnCours: boolean;
  emoji: string;
  estAscendant: boolean;
};

export default function ListeJoueurs({
  joueurs,
  supprimerJoueur,
  modifierScores,
  mancheEnCours,
  emoji,
  estAscendant,
}: ListeJoueursProps) {
  const [editNom, setEditNom] = useState<string | null>(null);
  const [editScores, setEditScores] = useState<string[]>([]);
  const total = (scores: number[]) => scores.reduce((acc, val) => acc + val, 0);
  const joueursTries = [...joueurs].sort((a, b) => {
    const diff = total(a.scores) - total(b.scores);
    return estAscendant ? -diff : diff;
  });

  const startEdit = (j: Joueur) => {
    setEditNom(j.nom);
    setEditScores(j.scores.map((s) => s.toString()));
  };

  const saveEdit = () => {
    if (editNom) {
      const newScores = editScores.map((s) => parseInt(s) || 0);
      modifierScores(editNom, newScores);
      setEditNom(null);
      setEditScores([]);
    }
  };

  // Fonction pour obtenir l'emoji de la médaille
  const getMedailleEmoji = (position: number) => {
    switch (position) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `${position}e`;
    }
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-medium mb-4">Classement actuel</h2>
      <ol className="space-y-2">
        {joueursTries.map((j, index) => {
          const position = index + 1;

          return (
            <li
              key={j.nom}
              className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 py-2"
              style={{
                border: `0.5px solid ${j.couleur || "rgb(62, 63, 70)"}`,
                borderRadius: "8px",
                padding: "5px 10px 5px 10px",
                backgroundColor: j.couleur
                  ? j.couleur.replace("rgb", "rgba").replace(")", ", 0.1)")
                  : undefined,
              }}
            >
              {editNom === j.nom ? (
                <span className="flex flex-col gap-2">
                  <span className="font-semibold flex items-center gap-2">
                    <span className="text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full min-w-[2rem] text-center">
                      {getMedailleEmoji(position)}
                    </span>
                    {j.nom}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {editScores.map((val, idx) => (
                      <input
                        key={idx}
                        type="number"
                        value={val}
                        onChange={(e) => {
                          const copy = [...editScores];
                          copy[idx] = e.target.value;
                          setEditScores(copy);
                        }}
                        className="w-16 px-1 py-0.5 border rounded text-sm"
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 mt-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={saveEdit}
                          className="inline-flex justify-center items-center gap-2 bg-green-50 dark:bg-green-900 text-green-700 cursor-pointer dark:text-green-300 border border-green-200 dark:border-green-700 px-2 py-1 rounded-md text-sm font-medium shadow-sm hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
                        >
                          ✅
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Mettre à jour les scores</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            setEditNom(null);
                            setEditScores([]);
                          }}
                          className="inline-flex justify-center items-center gap-2 bg-red-50 dark:bg-red-900 text-red-700 cursor-pointer dark:text-red-300 border border-red-200 dark:border-red-700 px-2 py-1 rounded-md text-sm font-medium shadow-sm hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
                        >
                          ❌
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Annuler</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </span>
              ) : (
                <span
                  className="flex items-center gap-1"
                  style={{ color: `${j.couleur || "rgb(128, 128, 128)"}` }}
                >
                  <span className="text-sm font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-full min-w-[2rem] text-center">
                    {getMedailleEmoji(position)}
                  </span>
                  <span className="text-sm font-medium">{j.nom}</span>
                  <span>-</span>
                  <span className="text-sm">
                    {total(j.scores)} {emoji}
                  </span>{" "}
                  <span className="text-sm text-zinc-500">
                    ({j.scores.join(", ")})
                  </span>
                </span>
              )}

              {!mancheEnCours && (
                <div className="flex gap-05">
                  <button
                    onClick={() => startEdit(j)}
                    className="hover:bg-blue-900 text-zinc-500 hover:text-blue-400 text-sm transition cursor-pointer p-1 rounded-sm w-7 flex items-center justify-center"
                    title="Modifier les scores"
                  >
                    <SquarePen size={18} />
                  </button>
                  <button
                    onClick={() => supprimerJoueur(j.nom)}
                    className="hover:bg-red-900 text-zinc-500 hover:text-red-400 text-sm transition cursor-pointer p-1 rounded-sm w-7 flex items-center justify-center"
                    title="Supprimer"
                  >
                    <Trash height={18} />
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
