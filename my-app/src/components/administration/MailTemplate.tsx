"use client";

import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { Combobox } from "../ui/combobox";

export const MailTemplate = () => {
  const [copied, setCopied] = useState(false);
  const [statut, setStatut] = useState<boolean | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>("null");
  let phraseResultat = "";

  if (statut === true) {
    phraseResultat =
      "Bonne nouvelle 🎉 : ta demande a été acceptée ! Retrouve ton jeu dès maintenant à l'accueil.";
  } else if (statut === false) {
    phraseResultat =
      "Nous sommes désolés 😕 : ta demande a été refusée. Nous avons jugé que le jeu n'avait pas d'intérêt à être ajouté.";
  } else {
    phraseResultat = "Ta demande est encore en cours de traitement ⏳.";
  }

  const template = `Hello 👋,
Je t'informe que ta demande pour le jeu "NomDuJeu" a été traitée.

${phraseResultat}

Merci pour ta participation et à bientôt sur la plateforme !

Aller sur la plateforme : https://scoreup.vercel.app

A bientôt,
Arthur de Score Up 🎲`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComboboxChange = (value: string) => {
    setSelectedValue(value);
    if (value === "true") setStatut(true);
    else if (value === "false") setStatut(false);
    else setStatut(null);
  };

  return (
    <div className="flex flex-col gap-4 border items-end border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm px-3 py-4 rounded-md max-w-sm mb-3">
      <textarea
        className="w-full h-50 p-2 text-black dark:text-white"
        value={template}
        readOnly
      />
      <div className="flex gap-2">
        <button
          className="inline-flex justify-center items-center gap-2 bg-green-50 dark:bg-green-900 text-green-700 cursor-pointer dark:text-green-300 border border-green-200 dark:border-green-700 px-2 py-1 w-min rounded-md text-sm font-medium shadow-sm hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
          onClick={handleCopy}
        >
          {copied ? <CopyCheck height={15} /> : <Copy height={15} />}
        </button>
        <Combobox
          options={[
            { label: "Acceptée", value: "true" },
            { label: "Refusée", value: "false" },
            { label: "Réinitialiser", value: "null" },
          ]}
          value={selectedValue}
          onChange={handleComboboxChange}
          placeholder={"Choix du statut"}
          widthClass="w-48"
        />
      </div>
    </div>
  );
};
