"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { supprimerCompteAction } from "@/lib/actions/supprimerCompte";
import { useRouter } from "next/navigation";

type SuppressionCompteProps = {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  userId: string;
};

export default function SuppressionCompte({
  isOpen,
  onClose,
  userEmail,
  userId,
}: SuppressionCompteProps) {
  const router = useRouter();
  const { t } = useTranslation("profil");
  const [confirmationText, setConfirmationText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (confirmationText !== "SUPPRIMER") {
      setError(t("erreurConfirmation"));
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const result = await supprimerCompteAction(userId);

      if (!result.success) {
        throw new Error(result.error);
      }

      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        console.warn(t("avertissementSuppression"), signOutError);
      }

      router.push("/");
    } catch (error) {
      console.error(t("erreurSuppression"), error);
      setError(t("erreurSuppression"));
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      setConfirmationText("");
      setError("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="w-5 h-5" />
            {t("supprimerCompte")}
          </DialogTitle>
          <DialogDescription className="text-left">
            {t("descriptionSuppression")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              {t("donneesSupprimeees")}
            </h4>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              <li>• {t("vosStatistiquesJeu")}</li>
              <li>• {t("vosInformationsPersonnelles")}</li>
              <li>• {t("historiqueParties")}</li>
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>{t("irreversible")}</strong> {t("messageIrreversible")}
            </p>
          </div>

          {/* Confirmation */}
          <div className="space-y-2">
            <Label htmlFor="confirmation">{t("tapezSupprimer")}</Label>
            <Input
              id="confirmation"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="SUPPRIMER"
              disabled={isDeleting}
              className="font-mono"
            />
          </div>

          <div className="text-xs text-muted-foreground">
            {t("compteAssocie")} <strong>{userEmail}</strong>
          </div>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 p-2 rounded">
              {error}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>
            {t("annuler")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={confirmationText !== "SUPPRIMER" || isDeleting}
            className="flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t("suppressionEnCours")}
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                {t("supprimerDefinitivement")}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
