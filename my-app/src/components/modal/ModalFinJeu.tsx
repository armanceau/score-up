"use client";

import { BaseModal } from "./BaseModal";
import { SauvegarderPartieBouton } from "../jeu/SauvegarderPartieBouton";
import { PartageBouton } from "../jeu/PartageBouton";
import { PartageImage } from "../PartageImage";

type ModalFinJeuProps = {
  isOpen: boolean;
  onClose: () => void;
  joueursAvecScoresTotaux: { name: string; score: number }[];
  emoji: string;
  nom: string;
  idJeu: string;
  userId: string | null;
  onReset: () => void;
};

export default function ModalFinJeu({
  isOpen,
  onClose,
  joueursAvecScoresTotaux,
  emoji,
  nom,
  idJeu,
  userId,
  onReset,
}: ModalFinJeuProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Fin de partie">
      <h3 className="text-lg font-semibold mb-3">Résultats :</h3>
      <ul className="mb-4">
        {joueursAvecScoresTotaux.map((j) => (
          <li key={j.name} className="flex justify-between border-b py-1">
            <span>{j.name}</span>
            <span className="font-bold">{j.score}</span>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mb-4">
        {userId && (
          <SauvegarderPartieBouton
            userId={userId}
            jeu={`${emoji} ${nom}`}
            players={joueursAvecScoresTotaux}
            jeu_id={idJeu}
            onReset={onReset}
          />
        )}
        <PartageBouton selectorToCapture="#resultat-partie" />
      </div>

      <div
        id="resultat-partie"
        className="flex justify-center py-4"
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
      >
        <PartageImage
          ref={null}
          gameName={`${emoji} ${nom}`}
          players={joueursAvecScoresTotaux}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Revenir à la partie
        </button>
      </div>
    </BaseModal>
  );
}
