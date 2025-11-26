"use client";

import { BaseModal } from "./BaseModal";
import { SauvegarderPartieBouton } from "../jeu/SauvegarderPartieBouton";
import { PartageBouton } from "../jeu/PartageBouton";
import { PartageImage } from "../PartageImage";
import { useTranslation } from "react-i18next";

type ModalFinJeuProps = {
  isOpen: boolean;
  onClose: () => void;
  joueursAvecScoresTotaux: { name: string; score: number }[];
  emoji: string;
  nom: string;
  idJeu: string;
  userId: string | null;
  onReset: () => void;
  est_ascendant: boolean;
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
  est_ascendant,
}: ModalFinJeuProps) {
  const { t } = useTranslation("commun");
  const joueursTries = [...joueursAvecScoresTotaux].sort((a, b) => {
    const diff = a.score - b.score;
    return est_ascendant ? -diff : diff;
  });

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={t("finPartie")}>
      <h3 className="text-lg font-semibold mb-3"> {t("resultats")} :</h3>
      <ul className="mb-4">
        {joueursTries.map((j) => (
          <li key={j.name} className="flex justify-between border-b py-1">
            <span>{j.name}</span>
            <span className="font-bold">{j.score}</span>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mb-4 flex-wrap justify-center">
        <PartageBouton selectorToCapture="#resultat-partie" />
        {userId && (
          <SauvegarderPartieBouton
            userId={userId}
            jeu={`${emoji} ${nom}`}
            players={joueursTries}
            jeu_id={idJeu}
            onReset={onReset}
          />
        )}
      </div>

      <div
        id="resultat-partie"
        className="flex justify-center py-4"
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
      >
        <PartageImage
          ref={null}
          gameName={`${emoji} ${nom}`}
          players={joueursTries}
        />
      </div>
    </BaseModal>
  );
}
