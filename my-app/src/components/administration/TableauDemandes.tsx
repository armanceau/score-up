"use client";

import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { DemandeJeu } from "@/lib/demandesJeux";

type TableauDemandesProps = {
  demandes: DemandeJeu[];
  onChangeStatut: (demandeId: string, statut: DemandeJeu["statut"]) => void;
};

export const TableauDemandes: React.FC<TableauDemandesProps> = ({
  demandes,
  onChangeStatut,
}) => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const statutLabels: Record<
    DemandeJeu["statut"],
    { label: string; color: string; icon: string }
  > = {
    en_attente: {
      label: "⏳ En attente",
      color: "bg-yellow-100 text-yellow-800",
      icon: "⏳",
    },
    accepte: {
      label: "✅ Accepté",
      color: "bg-green-100 text-green-800",
      icon: "✅",
    },
    refuse: {
      label: "❌ Refusé",
      color: "bg-red-100 text-red-800",
      icon: "❌",
    },
  };

  return (
    <div className="overflow-x-scroll">
      <table className="min-w-full border border-zinc-300 dark:border-zinc-700">
        <thead className="bg-zinc-100 dark:bg-zinc-800">
          <tr>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Nom du jeu</th>
            <th className="px-4 py-2 text-left">Description courte</th>
            <th className="px-4 py-2 text-left">Date de la demande</th>
            <th className="px-4 py-2 text-left">Statut</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr
              key={demande.id}
              className="border-t border-zinc-200 dark:border-zinc-700"
            >
              <td className="px-4 py-2">
                <a href="mailto:{demande.email_utilisateur}">
                  {demande.email_utilisateur}
                </a>
              </td>
              <td className="px-4 py-2">{demande.nom_jeu}</td>
              <td className="px-4 py-2">{demande.description_courte}</td>
              <td className="px-4 py-2">
                {new Date(demande.date_creation).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    statutLabels[demande.statut].color
                  }`}
                >
                  {statutLabels[demande.statut].label}
                </span>
              </td>
              <td className="px-4 py-2 relative">
                <button
                  className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
                  onClick={() =>
                    setMenuOpen(menuOpen === demande.id ? null : demande.id)
                  }
                >
                  <MoreVertical className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                </button>
                {menuOpen === demande.id && (
                  <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg z-10">
                    {(
                      [
                        "en_attente",
                        "accepte",
                        "refuse",
                      ] as DemandeJeu["statut"][]
                    ).map((statut) => (
                      <button
                        key={statut}
                        className="w-full flex text-left items-center gap-1 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
                        onClick={() => onChangeStatut(demande.id, statut)}
                      >
                        {statutLabels[statut].label}
                      </button>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
