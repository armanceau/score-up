import { useState } from "react";

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

  return (
    <section className="mb-10">
      <h2 className="text-xl font-medium mb-4">Classement actuel</h2>
      <ol className="space-y-2">
        {joueursTries.map((j) => {
          console.log(j.nom + " " + j.couleur);
          return (
            <li
              key={j.nom}
              className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 py-2"
              style={{
                border: `1px solid ${j.couleur || "rgb(62, 63, 70)"}`,
                borderRadius: "8px",
                padding: "5px 10px 5px 10px",
                backgroundColor: j.couleur
                  ? j.couleur.replace("rgb", "rgba").replace(")", ", 0.1)")
                  : undefined,
              }}
            >
              {editNom === j.nom ? (
                <span className="flex flex-col gap-2">
                  <span className="font-semibold">{j.nom}</span>
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
                    <button
                      onClick={saveEdit}
                      className="inline-flex justify-center items-center gap-2 bg-green-50 dark:bg-green-900 text-green-700 cursor-pointer dark:text-green-300 border border-green-200 dark:border-green-700 px-2 py-1 rounded-md text-sm font-medium shadow-sm hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
                      title="Mettre à jour les scores"
                    >
                      ✅
                    </button>
                    <button
                      onClick={() => {
                        setEditNom(null);
                        setEditScores([]);
                      }}
                      className="inline-flex justify-center items-center gap-2 bg-red-50 dark:bg-red-900 text-red-700 cursor-pointer dark:text-red-300 border border-red-200 dark:border-red-700 px-2 py-1 rounded-md text-sm font-medium shadow-sm hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
                      title="Annuler"
                    >
                      ❌
                    </button>
                  </div>
                </span>
              ) : (
                <span>
                  👤 <span className="font-semibold">{j.nom}</span> –{" "}
                  <span className="text-sm">
                    {total(j.scores)} {emoji}
                  </span>{" "}
                  <span className="text-sm text-zinc-500">
                    ({j.scores.join(", ")})
                  </span>
                </span>
              )}

              {!mancheEnCours && (
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(j)}
                    className="text-blue-500 hover:text-blue-600 text-sm transition cursor-pointer"
                    title="Modifier les scores"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => supprimerJoueur(j.nom)}
                    className="text-red-800 hover:text-red-600 text-sm transition cursor-pointer"
                    title="Supprimer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
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
