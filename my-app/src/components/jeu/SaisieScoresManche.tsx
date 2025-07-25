type Joueur = {
  nom: string;
  scores: number[];
};

type SaisieScoresMancheProps = {
  joueurs: Joueur[];
  mancheScores: Record<string, number>;
  setMancheScores: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  validerManche: () => void;
  emoji: string;
};

export default function SaisieScoresManche({
  joueurs,
  mancheScores,
  setMancheScores,
  validerManche,
  emoji,
}: SaisieScoresMancheProps) {
  return (
    <section>
      <h2 className="text-xl font-medium mb-4">Nouvelle manche</h2>
      <div className="space-y-3">
        {joueurs.map((j) => (
          <div key={j.nom} className="flex items-center gap-4">
            <label className="w-32 text-sm font-medium">{j.nom} :</label>
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
            <span className="text-lg">{emoji}</span>
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
  );
}
