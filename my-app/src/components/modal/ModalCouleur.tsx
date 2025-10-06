import { useState, useEffect } from "react";
import { BaseModal } from "./BaseModal";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ModalCouleurProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectCouleur: (couleur: string | null) => void;
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
    { valeur: "rgb(128, 128, 128)", label: "Défaut" },
  ];

  const [selection, setSelection] = useState<string | null>(
    couleurActuelle ?? null
  );

  useEffect(() => {
    setSelection(couleurActuelle ?? null);
  }, [isOpen, couleurActuelle]);

  const toggleSelection = (valeur: string) => {
    if (selection === valeur) {
      setSelection(null);
    } else {
      setSelection(valeur);
    }
  };

  const valider = () => {
    onSelectCouleur(selection);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Sélectionnez une couleur"
    >
      <div className="grid grid-cols-5 gap-2 mb-4">
        {couleurs.map((c) => (
          <Tooltip key={c.valeur}>
            <TooltipTrigger asChild>
              <button
                title={c.label}
                style={{ backgroundColor: c.valeur }}
                onClick={() => toggleSelection(c.valeur)}
                className={`w-10 h-10 rounded-full border-2 cursor-pointer transition ${
                  selection === c.valeur
                    ? "border-black dark:border-white scale-110"
                    : "border-transparent"
                }`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{c.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={valider}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Valider
        </button>
      </div>
    </BaseModal>
  );
}
