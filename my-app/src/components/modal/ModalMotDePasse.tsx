"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { BaseModal } from "./BaseModal";

type ModalMotDePasseProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onUpdatePassword: (current: string, next: string) => Promise<void>;
};

export const ModalMotDePasse = ({
  isOpen,
  onClose,
  onUpdatePassword,
}: ModalMotDePasseProps) => {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!current || !next || !confirm) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    if (next !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (next.length < 8) {
      setError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setError("");
    try {
      await onUpdatePassword(current, next);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setCurrent("");
        setNext("");
        setConfirm("");
      }, 1500);
    } catch {
      setError("Erreur lors de la mise à jour du mot de passe.");
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Modifier le mot de passe"
      description="Saisis ton mot de passe actuel, puis ton nouveau mot de passe ci-dessous."
      footer={
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border rounded text-red-500 hover:bg-red-900 cursor-pointer transition"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition cursor-pointer"
            onClick={handleSave}
            disabled={success}
          >
            Modifier
          </button>
        </div>
      }
    >
      {error && (
        <div className="flex items-center gap-2 text-red-500 mb-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 text-green-500 mb-2">
          <Check className="w-4 h-4" />
          <span>Mot de passe mis à jour !</span>
        </div>
      )}
      {[
        {
          label: "Mot de passe actuel",
          value: current,
          setValue: setCurrent,
          show: showCurrent,
          setShow: setShowCurrent,
        },
        {
          label: "Nouveau mot de passe",
          value: next,
          setValue: setNext,
          show: showNext,
          setShow: setShowNext,
        },
        {
          label: "Confirmer le mot de passe",
          value: confirm,
          setValue: setConfirm,
          show: showConfirm,
          setShow: setShowConfirm,
        },
      ].map((field, i) => (
        <div key={i} className="flex flex-col mb-2">
          <label className="text-sm font-medium mb-1">{field.label}</label>
          <div className="flex items-center border rounded px-2 py-1 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Lock className="mr-2 w-4 h-4" />
            <input
              type={field.show ? "text" : "password"}
              className="w-full outline-none"
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
            />
            <button type="button" onClick={() => field.setShow(!field.show)}>
              {field.show ? (
                <EyeOff className="w-4 h-4 cursor-pointer" />
              ) : (
                <Eye className="w-4 h-4 cursor-pointer" />
              )}
            </button>
          </div>
        </div>
      ))}
    </BaseModal>
  );
};
