"use client";

import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

export const MailTemplate = () => {
  const [copied, setCopied] = useState(false);

  const template = `Hello 👋,
Je t'informe que ta demande pour le jeu "NomDuJeu" a été traitée.

Merci pour ta participation et à bientôt sur la plateforme !

A bientôt,
Arthur de Score Up 🎲`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 border items-end border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm px-3 py-4 rounded-md max-w-sm mb-3">
      <textarea
        className="w-full h-50 p-2 text-black dark:text-white"
        value={template}
        readOnly
      />
      <button
        className="inline-flex justify-center items-center gap-2 bg-green-50 dark:bg-green-900 text-green-700 cursor-pointer dark:text-green-300 border border-green-200 dark:border-green-700 px-2 py-1 w-min rounded-md text-sm font-medium shadow-sm hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
        onClick={handleCopy}
      >
        {copied ? <CopyCheck height={15} /> : <Copy height={15} />}
      </button>
    </div>
  );
};
