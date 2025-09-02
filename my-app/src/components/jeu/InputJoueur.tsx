import { useState } from "react";

type InputJoueurProps = {
  nomJoueur: string;
  setNomJoueur: (nom: string) => void;
  ajouterJoueur: (couleur: string) => void;
  disabled: boolean;
};

export default function InputJoueur({
  nomJoueur,
  setNomJoueur,
  ajouterJoueur,
  disabled,
}: InputJoueurProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couleurChoisie, setCouleurChoisie] = useState<string>("");

  const couleurs = [
    "rgb(255, 89, 94)", // #FF595E
    "rgb(255, 202, 58)", // #FFCA3A
    "rgb(138, 201, 38)", // #8AC926
    "rgb(25, 130, 196)", // #1982C4
    "rgb(106, 76, 147)", // #6A4C93
    "rgb(255, 127, 80)", // #FF7F50
    "rgb(0, 206, 209)", // #00CED1
    "rgb(255, 105, 180)", // #FF69B4
    "rgb(255, 165, 0)", // #FFA500
    "rgb(127, 255, 0)", // #7FFF00
  ];

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
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 border rounded-md border-zinc-300 dark:border-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-700 transition cursor-pointer"
      >
        🎨
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-md flex flex-col gap-3">
            <h3 className="text-lg font-medium">Sélectionnez une couleur</h3>
            <div className="grid grid-cols-5 gap-2">
              {couleurs.map((c) => (
                <button
                  key={c}
                  style={{ backgroundColor: c }}
                  onClick={() => {
                    setCouleurChoisie(c);
                    setIsModalOpen(false);
                  }}
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer ${
                    couleurChoisie === c
                      ? "border-black dark:border-white"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-2 px-3 py-1 border rounded-md hover:bg-gray-200 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          ajouterJoueur(couleurChoisie);
          setCouleurChoisie("");
        }}
        disabled={disabled || !couleurChoisie} 
        className="bg-black dark:bg-white text-white dark:text-black cursor-pointer px-5 rounded-md font-medium hover:opacity-90 transition disabled:opacity-40"
      >
        Ajouter
      </button>
    </div>
  );
}
