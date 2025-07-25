type InputJoueurProps = {
  nomJoueur: string;
  setNomJoueur: (nom: string) => void;
  ajouterJoueur: () => void;
  disabled: boolean;
};

export default function InputJoueur({
  nomJoueur,
  setNomJoueur,
  ajouterJoueur,
  disabled,
}: InputJoueurProps) {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={nomJoueur}
        onChange={(e) => setNomJoueur(e.target.value)}
        placeholder="Nom du joueur"
        disabled={disabled}
        className="flex-grow px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-zinc-500 transition"
      />
      <button
        onClick={ajouterJoueur}
        disabled={disabled}
        className="bg-black dark:bg-white text-white dark:text-black cursor-pointer px-5 rounded-md font-medium hover:opacity-90 transition disabled:opacity-40"
      >
        Ajouter
      </button>
    </div>
  );
}
