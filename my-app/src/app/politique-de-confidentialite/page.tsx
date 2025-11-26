"use client";
import { useTranslation } from "react-i18next";

export default function PolitiqueConfidentialite() {
  const { t } = useTranslation("politiqueConfidentialite");
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-justify">
      <h1 className="text-3xl font-bold mb-6">
        {t("politiqueConfidentialite")}
      </h1>

      <p className="mb-4">{t("politiqueConfidentialiteIntro")}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        {t("collecteDesDonnees")}
      </h2>
      <p className="mb-4">{t("collecteDesDonnees2")}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        {t("utilisationDesDonnees")}
      </h2>
      <p className="mb-4">{t("utilisationDesDonnees2")}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("vosDroits")}</h2>
      <p className="mb-4">
        {t("vosDroits2")}
        Conformément à la législation en vigueur, vous disposez d’un droit
        d’accès, de modification et de suppression de vos données. Pour exercer
        ces droits, contactez-nous via notre support.
      </p>
    </div>
  );
}
