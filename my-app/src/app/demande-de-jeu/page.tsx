"use client";

import { FormulaireDemandeJeu } from "@/components/formulaire/FormulaireDemandeJeu";
import ScrollToTop from "@/components/ScrollTop";
import { ajouterDemandeJeu } from "@/lib/demandesJeux";
import { useTranslation } from "react-i18next";

export default function DemandeJeuPage() {
  const { t } = useTranslation("commun");
  const handleSubmit = async (data: {
    email: string;
    nomJeu: string;
    descriptionJeu: string;
  }) => {
    try {
      await ajouterDemandeJeu({
        email_utilisateur: data.email,
        nom_jeu: data.nomJeu,
        description_courte: data.descriptionJeu,
      });
      alert(t("demandeEnvoyee"));
    } catch {
      alert(t("demandeErreur"));
    }
  };
  return (
    <main className="flex flex-col justify-start max-w-2xl mx-auto px-6 py-10 text-zinc-900 dark:text-zinc-100 gap-6">
      <h1 className="text-3xl font-bold">{t("demandeDeJeu")}</h1>
      <p className="text-sm text-gray-500 -mt-5">
          {t("demandeDeJeuDescription")}
      </p>

      <FormulaireDemandeJeu onSubmit={handleSubmit} />

      <ScrollToTop />
    </main>
  );
}
