"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas-pro";
import { Share } from "lucide-react";

type PartageBoutonProps = {
  selectorToCapture: string; // ex: "#resultat-partie"
  fileName?: string;
};

export function PartageBouton({
  selectorToCapture,
  fileName = "scoreup.png",
}: PartageBoutonProps) {
  const [enCours, setEnCours] = useState(false);
  const boutonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation("jeu");

  const partager = async () => {
    const element = document.querySelector(selectorToCapture) as HTMLElement;
    if (!element) {
      alert(t("elementIntrouvable"));
      return;
    }

    try {
      setEnCours(true);

      const canvas = await html2canvas(element, { backgroundColor: "#ffffff" });
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) throw new Error(t("erreurConversionImage"));

      const file = new File([blob], fileName, { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: t("titrePartage"),
          text: t("textePartage"),
          url: "https://scoreup.vercel.app/",
          files: [file],
        });
      } else {
        alert(t("partageNonSupporte"));
      }
    } catch (e) {
      console.error("Erreur de partage :", e);
      alert(t("erreurPartage"));
    } finally {
      setEnCours(false);
    }
  };

  return (
    <button
      ref={boutonRef}
      onClick={partager}
      disabled={enCours}
      className="bg-blue-500 text-white hover:text-blue-400 cursor-pointer px-4 py-2 rounded-lg group flex items-center justify-center disabled:opacity-40 transition-[background-color,border-radius] duration-500 hover:bg-blue-900 hover:rounded-[9999px] relative overflow-hidden"
    >
      {enCours ? (
        t("partageEnCours")
      ) : (
        <>
          <span className="transition-all duration-300 group-hover:pr-8">
            {t("partager")}
          </span>

          <span className="absolute right-1 w-8 h-8 rounded-full bg-blue-400 text-blue-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Share height={18} />
          </span>
        </>
      )}
    </button>
  );
}
