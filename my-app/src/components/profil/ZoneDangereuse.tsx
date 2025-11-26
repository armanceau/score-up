import { useState } from "react";
import { BoutonDanger } from "../bouton/BoutonDanger";
import SuppressionCompte from "./SuppressionCompte";
import { useTranslation } from "react-i18next";

type ZoneDangereuseProps = {
  userEmail: string;
  userId: string;
};

export const ZoneDangereuse = ({ userEmail, userId }: ZoneDangereuseProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { t } = useTranslation("profil");

  return (
    <>
      <div className="flex flex-col gap-2 border border-red-600 dark:border-red-700 bg-white dark:bg-zinc-900 text-sm px-3 py-2 rounded-md">
        <h2 className="text-2xl font-medium mb-2">
          {t("zoneDangereuse.zoneDangereuse")}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          {t("zoneDangereuse.description")}
        </p>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">
            {t("zoneDangereuse.suppressionCompte")}
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300 mb-3">
            {t("zoneDangereuse.descriptionSuppression")}
          </p>
          <BoutonDanger
            className="px-4 py-2"
            onClick={() => setShowDeleteDialog(true)}
          >
            {t("zoneDangereuse.supprimerCompte")}
          </BoutonDanger>
        </div>
      </div>

      <SuppressionCompte
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        userEmail={userEmail}
        userId={userId}
      />
    </>
  );
};
