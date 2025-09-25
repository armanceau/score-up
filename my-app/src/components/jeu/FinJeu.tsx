import { useState } from "react";
import ModalFinJeu from "../modal/ModalFinJeu";

type FinJeuProps = {
  joueursAvecScoresTotaux: { name: string; score: number }[];
  emoji: string;
  nom: string;
  idJeu: string;
  userId: string | null;
  onReset: () => void;
};

export const FinJeu = ({
  joueursAvecScoresTotaux,
  emoji,
  nom,
  idJeu,
  userId,
  onReset,
}: FinJeuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
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
        onReset={onReset}
      />
    </>
  );
};
