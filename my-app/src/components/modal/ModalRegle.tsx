"use client";

import { BaseModal } from "./BaseModal";
import { useTranslation } from "react-i18next";

type ModalRegleProps = {
  isOpen: boolean;
  onClose: () => void;
  titre?: string;
  regles: string;
  lienExterneRegle?: string;
};

export default function ModalRegle({
  isOpen,
  onClose,
  titre,
  regles,
  lienExterneRegle,
}: ModalRegleProps) {
  const { t } = useTranslation("commun");
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={t(`reglesDuJeu`, { titre })}
    >
      {Array.isArray(regles) ? (
        regles.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {regles.map((ligne, i) => (
              <li key={i}>{ligne}</li>
            ))}
          </ul>
        ) : (
          <div>{t("aucuneRegleDisponible")}</div>
        )
      ) : regles ? (
        <div className="whitespace-pre-line">{regles}</div>
      ) : (
        <div className="txt-gr text-sm text-gray-500">
          {t("aucuneRegleDisponible")}
        </div>
      )}

      {lienExterneRegle && (
        <a
          href={lienExterneRegle}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer select-none mt-2"
        >
          {t("lienDesRegles")}
          <span className="text-zinc-400">↗</span>
        </a>
      )}
    </BaseModal>
  );
}
