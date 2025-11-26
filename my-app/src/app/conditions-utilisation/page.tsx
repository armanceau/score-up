"use client";
import { useTranslation } from "react-i18next";

export default function ConditionsUtilisation() {
  const { t } = useTranslation("conditionsUtilisation");
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-justify">
      <h1 className="text-3xl font-bold mb-6"> {t("conditionsUtilisation")}</h1>

      <p className="mb-4">
        {t("enUtilisantNotreApplicationVousAcceptezLesPresentesConditions")}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("accesAuService")}</h2>
      <p className="mb-4">{t("accesAuService2")}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        {t("responsabilites")}
      </h2>
      <p className="mb-4">{t("responsabilites2")}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t("modifications")}</h2>
      <p className="mb-4">{t("modifications2")}</p>
    </div>
  );
}
