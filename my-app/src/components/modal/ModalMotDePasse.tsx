"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation('profil');

  const handleSave = async () => {
    if (!current || !next || !confirm) {
      setError(t('champsObligatoires'));
      return;
    }
    if (next !== confirm) {
      setError(t('motsDePasseNonIdentiques'));
      return;
    }
    if (next.length < 8) {
      setError(t('motDePasseTropCourt'));
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
      setError(t('erreurMiseAJour'));
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('modifierMotDePasse')}
      description={t('descriptionModifierMotDePasse')}
      footer={
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border rounded text-red-500 hover:bg-red-900 cursor-pointer transition"
            onClick={onClose}
          >
            {t('annuler', { ns: 'commun' })}
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition cursor-pointer"
            onClick={handleSave}
            disabled={success}
          >
            {t('modifier', { ns: 'commun' })}
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
          <span>{t('motDePasseMisAJour')}</span>
        </div>
      )}
      {[
        {
          label: t('motDePasseActuel'),
          value: current,
          setValue: setCurrent,
          show: showCurrent,
          setShow: setShowCurrent,
        },
        {
          label: t('nouveauMotDePasse'),
          value: next,
          setValue: setNext,
          show: showNext,
          setShow: setShowNext,
        },
        {
          label: t('confirmerMotDePasse'),
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
