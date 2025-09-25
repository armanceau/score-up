"use client";

import { useRef, useState } from "react";
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

  const partager = async () => {
    const element = document.querySelector(selectorToCapture) as HTMLElement;
    if (!element) {
      alert("Élément à capturer introuvable.");
      return;
    }

    try {
      setEnCours(true);

      const canvas = await html2canvas(element, { backgroundColor: "#ffffff" });
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) throw new Error("Échec de la conversion de l'image");

      const file = new File([blob], fileName, { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Ma partie ScoreUp 🎮",
          text: "Voici mon score, t'es chaud pour faire mieux ? 💪",
          url: "https://scoreup.vercel.app/",
          files: [file],
        });
      } else {
        alert("Le partage de fichier n'est pas supporté sur ce navigateur.");
      }
    } catch (e) {
      console.error("Erreur de partage :", e);
      alert("Impossible de partager l'image.");
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
        "Partage en cours..."
      ) : (
        <>
          <span className="transition-all duration-300 group-hover:pr-8">
            Partager
          </span>

          <span className="absolute right-1 w-8 h-8 rounded-full bg-blue-400 text-blue-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Share height={18} />
          </span>
        </>
      )}
    </button>
  );
}
