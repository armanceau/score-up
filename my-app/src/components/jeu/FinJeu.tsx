import { useState } from "react";
import ModalFinJeu from "../modal/ModalFinJeu";

type FinJeuProps = {
  joueursAvecScoresTotaux: { name: string; score: number }[];
  emoji: string;
  nom: string;
  idJeu: string;
  userId: string | null;
  onReset: () => void;
  est_ascendant: boolean;
};

export const FinJeu = ({
  joueursAvecScoresTotaux,
  emoji,
  nom,
  idJeu,
  userId,
  onReset,
  est_ascendant,
}: FinJeuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReset = () => {
    onReset();
  };

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
      >
        Fin de partie
      </button>

      <ModalFinJeu
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        joueursAvecScoresTotaux={joueursAvecScoresTotaux}
        emoji={emoji}
        nom={nom}
        idJeu={idJeu}
        userId={userId}
        onReset={handleReset}
        est_ascendant={est_ascendant}
      />
    </>
  );
};
