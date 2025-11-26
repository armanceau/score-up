"use client";
import { useState } from "react";
import ModalRegle from "@/components/modal/ModalRegle";
import { Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

type RegleProps = {
  jeu: string;
  regle: string;
  lienExterneRegle?: string;
};

export default function Regle({ jeu, regle, lienExterneRegle }: RegleProps) {
  const { t } = useTranslation("commun");
  const [modalOuvert, setModalOuvert] = useState(false);

  return (
    <>
      <div className="text-center mb-4">
        <button
          onClick={() => setModalOuvert(true)}
          className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors cursor-pointer"
        >
          <Lightbulb className="w-5 h-5" />
          <span className="text-sm">{t("commentJouer")}</span>
        </button>
      </div>

      <ModalRegle
        isOpen={modalOuvert}
        onClose={() => setModalOuvert(false)}
        titre={jeu}
        regles={regle}
        lienExterneRegle={lienExterneRegle}
      />
    </>
  );
}
