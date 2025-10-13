import { BoutonDanger } from "../bouton/BoutonDanger";

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
    <div className="flex gap-2 mb-3">
      <BoutonDanger className="flex-1 px-4 py-2" onClick={reinitialiserPartie}>
        Réinitialiser la partie
      </BoutonDanger>

      {!mancheEnCours && (
        <button
          onClick={demarrerNouvelleManche}
          disabled={joueursLength === 0}
          className="bg-black dark:bg-white text-white dark:text-black cursor-pointer px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition disabled:opacity-40 flex-1"
        >
          Nouvelle manche
        </button>
      )}
    </div>
  );
}
