"use client";

type ModalCouleurProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectCouleur: (couleur: string) => void;
  couleurActuelle?: string;
};

export default function ModalCouleur({
  isOpen,
  onClose,
  onSelectCouleur,
  couleurActuelle,
}: ModalCouleurProps) {
  const couleurs = [
    { valeur: "rgb(255, 89, 94)", label: "Rouge" },
    { valeur: "rgb(255, 202, 58)", label: "Jaune" },
    { valeur: "rgb(138, 201, 38)", label: "Vert" },
    { valeur: "rgb(25, 130, 196)", label: "Bleu" },
    { valeur: "rgb(106, 76, 147)", label: "Violet" },
    { valeur: "rgb(255, 127, 80)", label: "Corail" },
    { valeur: "rgb(0, 206, 209)", label: "Turquoise" },
    { valeur: "rgb(255, 105, 180)", label: "Rose" },
    { valeur: "rgb(255, 165, 0)", label: "Orange" },
    { valeur: "rgb(62, 63, 70)", label: "Défaut" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6 max-w-md w-full animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Sélectionnez une couleur
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
          >
            ✖
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {couleurs.map((c) => (
            <button
              key={c.valeur}
              title={c.label}
              style={{ backgroundColor: c.valeur }}
              onClick={() => {
                onSelectCouleur(c.valeur);
                onClose();
              }}
              className={`w-10 h-10 rounded-full border-2 cursor-pointer transition ${
                couleurActuelle === c.valeur
                  ? "border-black dark:border-white scale-110"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
