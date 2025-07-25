type ControleMancheProps = {
  reinitialiserPartie: () => void;
  demarrerNouvelleManche: () => void;
  mancheEnCours: boolean;
  joueursLength: number;
};

export default function ControleManche({
  reinitialiserPartie,
  demarrerNouvelleManche,
  mancheEnCours,
  joueursLength,
}: ControleMancheProps) {
  return (
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
          disabled={joueursLength === 0}
          className="bg-black dark:bg-white text-white dark:text-black cursor-pointer px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition disabled:opacity-40"
        >
          Nouvelle manche
        </button>
      )}
    </div>
  );
}
