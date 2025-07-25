type Joueur = {
  nom: string;
  scores: number[];
};

type ListeJoueursProps = {
  joueurs: Joueur[];
  supprimerJoueur: (nom: string) => void;
  mancheEnCours: boolean;
  emoji: string;
};

export default function ListeJoueurs({
  joueurs,
  supprimerJoueur,
  mancheEnCours,
  emoji,
}: ListeJoueursProps) {
  const total = (scores: number[]) => scores.reduce((acc, val) => acc + val, 0);
  const joueursTries = [...joueurs].sort(
    (a, b) => total(a.scores) - total(b.scores)
  );

  return (
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
              <span className="text-sm">
                {total(j.scores)} {emoji}
              </span>{" "}
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
  );
}
