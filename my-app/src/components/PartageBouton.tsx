"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import { PartageImage } from "./PartageImage";

export function PartageBouton({
  gameName,
  players,
}: {
  gameName: string;
  players: { name: string; score: number }[];
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const handleShare = async () => {
    if (!imageRef.current) return;

    setGenerating(true);

    const canvas = await html2canvas(imageRef.current);
    const dataUrl = canvas.toDataURL("image/png");

    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], "score.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Score Up",
        text: `Résultat de la partie de ${gameName} !`,
      });
    } else {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "score.png";
      link.click();
    }

    setGenerating(false);
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-blue-700"
      >
        {generating ? "Génération..." : "Partager la partie 📤"}
      </button>

      <div className="absolute opacity-0 pointer-events-none -z-10">
        <PartageImage ref={imageRef} gameName={gameName} players={players} />
      </div>
    </>
  );
}
