"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Gamepad } from "lucide-react";
import { useTranslation } from "react-i18next";

type FormulaireDemandeJeuProps = {
  onSubmit: (data: {
    email: string;
    nomJeu: string;
    descriptionJeu: string;
  }) => void;
};

export const FormulaireDemandeJeu: React.FC<FormulaireDemandeJeuProps> = ({
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [isEmailEditable, setIsEmailEditable] = useState(true);
  const [nomJeu, setNomJeu] = useState("");
  const [descriptionJeu, setDescriptionJeu] = useState("");
  const { t } = useTranslation("formulaire");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user) {
        const { data: userData, error } = await supabase.auth.getUser();
        if (userData?.user && !error) {
          setEmail(userData.user.email ?? "");
          setIsEmailEditable(false);
        }
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, nomJeu, descriptionJeu });
    setNomJeu("");
    setDescriptionJeu("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm px-3 py-4 rounded-md"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Email</label>
          {!isEmailEditable && (
            <button
              type="button"
              className="font-medium transition-colors disabled:opacity-50 hover:bg-white/90 dark:hover:bg-zinc-800 rounded-md px-3 h-7 text-xs text-blue-500 cursor-pointer"
              onClick={() => setIsEmailEditable(true)}
            >
              {t("modifier")}
            </button>
          )}
        </div>
        <div className="flex items-center h-10 px-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white">
          <Mail className="h-4 w-4 text-muted-foreground mr-2" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemple@scoreup.com"
            disabled={!isEmailEditable}
            className="flex-1 bg-transparent border-none outline-none text-sm text-black dark:text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">{t("nomDuJeu")}</label>
        </div>
        <div className="flex items-center h-10 px-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white">
          <Gamepad className="h-4 w-4 text-muted-foreground mr-2" />
          <input
            type="text"
            required
            placeholder="6 qui prend"
            value={nomJeu}
            onChange={(e) => setNomJeu(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-sm text-black dark:text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">
            {t("courteDescriptionDuJeu")}
          </label>
        </div>
        <textarea
          required
          placeholder={t("courteDescriptionDuJeuPlaceHolder")}
          value={descriptionJeu}
          onChange={(e) => setDescriptionJeu(e.target.value)}
          className="border border-zinc-300 dark:border-zinc-700 rounded-md p-2 w-full bg-white dark:bg-zinc-800 text-black dark:text-white min-h-[80px] resize-none"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
      >
        {t("proposerLeJeu")}
      </button>
    </form>
  );
};
