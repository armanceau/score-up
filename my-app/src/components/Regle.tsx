"use client";
import { useState } from "react";
import ModalRegle from "@/components/modal/ModalRegle";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type RegleProps = {
  jeu: string;
  regle: string;
  lienExterneRegle?: string;
};

export default function Regle({ jeu, regle, lienExterneRegle }: RegleProps) {
  const [modalOuvert, setModalOuvert] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 absolute">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setModalOuvert(true)}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
            >
              💡
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Voir les règles</p>
          </TooltipContent>
        </Tooltip>
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
