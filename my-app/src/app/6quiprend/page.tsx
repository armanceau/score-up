"use client";

import { useState, useEffect } from "react";
import Regle from "@/components/Regle";

type Joueur = {
  nom: string;
  scores: number[];
};

const regles6QuiPrend = `
- Chaque joueur reçoit 10 cartes numérotées de 1 à 104.
- Quatre cartes sont posées en rangées au centre.
- Chaque tour, tous les joueurs choisissent une carte.
- Les cartes sont posées dans l’ordre croissant.
- Une carte est placée dans la rangée avec la dernière carte la plus proche mais inférieure.
- Si la carte est plus petite que toutes les dernières cartes, le joueur ramasse une rangée.
- Si une rangée atteint 6 cartes, le joueur qui pose la 6ᵉ ramasse les 5 premières.
- Le but : éviter de ramasser des cartes qui ont des têtes de bœuf (points).
- Le joueur avec le moins de têtes gagne.
`;

const lienExterneRegle =
  "https://www.papj.fr/contentpapj/uploads/2021/05/Regle-du-jeu-6-qui-prend.pdf";

const LOCALSTORAGE_KEY = "score-up-6quiprend";

export default function SixQuiPrendPage() {
  const [nomJoueur, setNomJoueur] = useState("");
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [mancheScores, setMancheScores] = useState<Record<string, number>>({});
  const [mancheEnCours, setMancheEnCours] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setJoueurs(parsed.joueurs ?? []);
        setMancheEnCours(parsed.mancheEnCours ?? false);
        setMancheScores(parsed.mancheScores ?? {});
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify({ joueurs, mancheEnCours, mancheScores })
    );
  }, [joueurs, mancheEnCours, mancheScores]);

  const ajouterJoueur = () => {
    const nomTrimmed = nomJoueur.trim();
    if (
      nomTrimmed &&
      !joueurs.some((j) => j.nom.toLowerCase() === nomTrimmed.toLowerCase())
    ) {
      setJoueurs([...joueurs, { nom: nomTrimmed, scores: [] }]);
      setNomJoueur("");
    }
  };

  const supprimerJoueur = (nom: string) => {
    if (mancheEnCours) return;
    setJoueurs(joueurs.filter((j) => j.nom !== nom));
  };

  const reinitialiserPartie = () => {
    if (!confirm("Voulez-vous vraiment réinitialiser la partie ?")) return;
    setJoueurs([]);
    setMancheScores({});
    setMancheEnCours(false);
    setNomJoueur("");
    localStorage.removeItem(LOCALSTORAGE_KEY);
  };

  const demarrerNouvelleManche = () => {
    const initialScores: Record<string, number> = {};
    joueurs.forEach((j) => {
      initialScores[j.nom] = 0;
    });
    setMancheScores(initialScores);
    setMancheEnCours(true);
  };

  const validerManche = () => {
    const joueursMisAJour = joueurs.map((joueur) => ({
      ...joueur,
      scores: [...joueur.scores, mancheScores[joueur.nom] || 0],
    }));
    setJoueurs(joueursMisAJour);
    setMancheScores({});
    setMancheEnCours(false);
  };

  const total = (scores: number[]) => scores.reduce((acc, val) => acc + val, 0);

  const joueursTries = [...joueurs].sort(
    (a, b) => total(a.scores) - total(b.scores)
  );
  return (
    <main className="flex flex-col justify-start max-w-2xl mx-auto px-6 py-10 text-zinc-900 dark:text-zinc-100">
      <Regle
        jeu={"6quiprend"}
        regle={regles6QuiPrend}
        lienExterneRegle={lienExterneRegle}
      />
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-10">
        🐮 6 qui prend
      </h1>

      <section className="mb-10">
        <h2 className="text-xl font-medium mb-3">Ajoute les joueurs</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={nomJoueur}
            onChange={(e) => setNomJoueur(e.target.value)}
            placeholder="Nom du joueur"
            disabled={mancheEnCours}
            className="flex-grow px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-zinc-500 transition"
          />
          <button
            onClick={ajouterJoueur}
            disabled={mancheEnCours}
            className="bg-black dark:bg-white text-white dark:text-black cursor-pointer px-5 rounded-md font-medium hover:opacity-90 transition disabled:opacity-40"
          >
            Ajouter
          </button>
        </div>
      </section>

      {joueurs.length > 0 && (
        <>
          <section className="mb-10">
            <h2 className="text-xl font-medium mb-4">Classement actuel</h2>
            <ol className="space-y-2">
              {joueursTries.map((j) => (
                <li
                  key={j.nom}
                  className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 py-2"
                >
                  <span>
                    👤 <span className="font-semibold">{j.nom}</span> –{" "}
                    <span className="text-sm">{total(j.scores)} 🐮</span>{" "}
                    <span className="text-sm text-zinc-500">
                      ({j.scores.join(", ")})
                    </span>
                  </span>
                  {!mancheEnCours && (
                    <button
                      onClick={() => supprimerJoueur(j.nom)}
                      className="text-red-500 hover:text-red-600 text-sm transition cursor-pointer"
                      title="Supprimer"
                    >
                      ✖️
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <div className="flex gap-4 mb-10">
            <button
              onClick={reinitialiserPartie}
              className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900 text-red-700 cursor-pointer dark:text-red-300 border border-red-200 dark:border-red-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
            >
              Réinitialiser la partie
            </button>

            {!mancheEnCours && (
              <button
                onClick={demarrerNouvelleManche}
                disabled={joueurs.length === 0}
                className="bg-black dark:bg-white text-white dark:text-black cursor-pointer px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition disabled:opacity-40"
              >
                Nouvelle manche
              </button>
            )}
          </div>

          {mancheEnCours && (
            <section>
              <h2 className="text-xl font-medium mb-4">Nouvelle manche</h2>
              <div className="space-y-3">
                {joueurs.map((j) => (
                  <div key={j.nom} className="flex items-center gap-4">
                    <label className="w-32 text-sm font-medium">
                      {j.nom} :
                    </label>
                    <input
                      type="number"
                      value={mancheScores[j.nom] ?? 0}
                      onChange={(e) =>
                        setMancheScores({
                          ...mancheScores,
                          [j.nom]: parseInt(e.target.value, 10) || 0,
                        })
                      }
                      min={0}
                      className="w-24 px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-zinc-500 text-sm transition"
                    />
                    <span className="text-lg">🐮</span>
                  </div>
                ))}
              </div>
              <button
                onClick={validerManche}
                className="mt-2 inline-flex items-center gap-2 bg-green-50 dark:bg-green-900 text-green-700 cursor-pointer dark:text-green-300 border border-green-200 dark:border-green-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
              >
                Valider la manche
              </button>
            </section>
          )}
        </>
      )}
    </main>
  );
}
