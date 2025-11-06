import { useState } from "react";
import ModalCouleur from "../modal/ModalCouleur";
import { PaintRoller } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation('jeu');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couleurChoisie, setCouleurChoisie] = useState<string>("");

  return (
    <div className="flex gap-2 flex-wrap">
      <input
        type="text"
        value={nomJoueur}
        onChange={(e) => setNomJoueur(e.target.value)}
        placeholder={t('nomJoueur')}
        disabled={disabled}
        className="flex-grow px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-zinc-500 transition"
      />
      <button
        disabled={disabled || !nomJoueur.trim()}
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 border rounded-md border-zinc-300 dark:border-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-700 transition cursor-pointer disabled:opacity-40"
      >
        <PaintRoller height={18} />
      </button>
      <ModalCouleur
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectCouleur={(c) => setCouleurChoisie(c!)}
        couleurActuelle={couleurChoisie}
      />
      <button
        onClick={() => {
          ajouterJoueur(couleurChoisie);
          setCouleurChoisie("");
        }}
        disabled={disabled || !nomJoueur.trim()}
        className="bg-black dark:bg-white text-white dark:text-black cursor-pointer px-5 py-1.5 rounded-md font-medium hover:opacity-90 transition disabled:opacity-40"
      >
        {t('ajouter', { ns: 'commun' })}
      </button>
    </div>
  );
}
