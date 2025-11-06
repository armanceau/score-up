"use client";

import { useState } from "react";
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
  const [confirmationText, setConfirmationText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (confirmationText !== "SUPPRIMER") {
      setError("Vous devez taper 'SUPPRIMER' pour confirmer");
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
        console.warn("Avertissement lors de la déconnexion:", signOutError);
      }

      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la suppression du compte:", error);
      setError("Erreur lors de la suppression du compte. Veuillez réessayer.");
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
            Supprimer le compte
          </DialogTitle>
          <DialogDescription className="text-left">
            Cette action est irréversible. Toutes vos données seront
            définitivement supprimées.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              Données qui seront supprimées :
            </h4>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              <li>• Vos statistiques de jeu</li>
              <li>• Vos informations personnelles</li>
              <li>• Votre historique de parties</li>
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Attention :</strong> Cette action est irréversible et ne
              peut pas être annulée.
            </p>
          </div>

          {/* Confirmation */}
          <div className="space-y-2">
            <Label htmlFor="confirmation">
              Tapez &quot;SUPPRIMER&quot; pour confirmer :
            </Label>
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
            Compte associé : <strong>{userEmail}</strong>
          </div>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 p-2 rounded">
              {error}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>
            Annuler
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
                Suppression...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Supprimer définitivement
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
