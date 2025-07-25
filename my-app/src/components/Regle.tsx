"use client";
import { useState } from "react";
import ModalRegle from "@/components/ModalRegle";

type RegleProps = {
  jeu: string;
  regle: string;
  lienExterneRegle?: string;
};

export default function Regle({ jeu, regle, lienExterneRegle }: RegleProps) {
  const [modalOuvert, setModalOuvert] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          title="Voir les règles"
          onClick={() => setModalOuvert(true)}
          className="ext-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
        >
          💡
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
