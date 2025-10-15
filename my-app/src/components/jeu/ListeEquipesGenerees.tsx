"use client";

import { Button } from "@/components/ui/button";

interface Equipe {
  emoji: string;
  membres: string[];
}

interface Joueur {
  nom: string;
  scores: number[];
  couleur: string;
}

interface ListeEquipesGenereesProps {
  equipesGenerees: Equipe[];
  joueurs: Joueur[];
  setJoueurs: (joueurs: Joueur[]) => void;
  setEquipesGenerees: (equipes: Equipe[]) => void;
  mancheEnCours: boolean;
}

export default function ListeEquipesGenerees({
  equipesGenerees,
  joueurs,
  setJoueurs,
  setEquipesGenerees,
  mancheEnCours,
}: ListeEquipesGenereesProps) {
  if (equipesGenerees.length === 0) return null;

  const supprimerEquipes = () => {
    const joueursFiltres = joueurs.filter(
      (joueur) =>
        !equipesGenerees.some(
          (equipe, index) =>
            joueur.nom === `${equipe.emoji} Équipe ${index + 1}`
        )
    );
    setJoueurs(joueursFiltres);
    setEquipesGenerees([]);
  };

  return (
    <section className="mb-10 mt-10">
      <h2 className="text-xl font-medium mb-4">Équipes créées</h2>

      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4">
        <p className="text-sm text-green-700 dark:text-green-300 mb-2">
          ✅ Les équipes ont été ajoutées comme joueurs ! Vous pouvez maintenant
          commencer une manche.
        </p>
        <p className="text-xs text-green-600 dark:text-green-400">
          Chaque équipe aura un score unique, les membres de l&apos;équipe se
          partageront ce score.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipesGenerees.map((equipe, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4"
          >
            <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">
              {equipe.emoji} Équipe {idx + 1}
            </h3>
            <p className="text-xs text-green-600 dark:text-green-400 mb-2">
              Membres :
            </p>
            <ul className="space-y-1">
              {equipe.membres.map((membre, mIdx) => (
                <li key={mIdx} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  {membre}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button
          variant="outline"
          onClick={supprimerEquipes}
          disabled={mancheEnCours}
          className="w-full text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
        >
          Supprimer toutes les équipes
        </Button>
      </div>
    </section>
  );
}
