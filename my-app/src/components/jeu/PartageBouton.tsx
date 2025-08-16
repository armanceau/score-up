"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";

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
      className="py-2 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex-1 cursor-pointer transition-colors"
    >
      {enCours ? "Partage en cours..." : "📤 Partager les scores"}
    </button>
  );
}
