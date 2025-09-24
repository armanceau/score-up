"use client";

import React, { useState, useEffect } from "react";
import { Jeu } from "@/lib/jeux";

type FormulaireJeuProps = {
  initialData?: Partial<Jeu>;
  onSubmit: (data: Partial<Jeu>) => void;
  onCancel: () => void;
  isEditing?: boolean;
};

export const FormulaireJeu: React.FC<FormulaireJeuProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<Partial<Jeu>>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 border rounded space-y-4 bg-zinc-50 dark:bg-zinc-900"
    >
      <div className="flex flex-wrap gap-2">
        <input
          placeholder="ID"
          required
          value={formData.id ?? ""}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          className="border p-2 rounded flex-1 min-w-[200px]"
          disabled={isEditing}
        />
        <input
          placeholder="Nom"
          required
          value={formData.nom ?? ""}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
        <input
          placeholder="Emoji"
          required
          value={formData.emoji ?? ""}
          onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
        <input
          placeholder="Href"
          required
          value={formData.href ?? ""}
          onChange={(e) => setFormData({ ...formData, href: e.target.value })}
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
        <input
          type="number"
          placeholder="Joueurs"
          required
          value={formData.joueurs ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, joueurs: Number(e.target.value) })
          }
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
        <input
          type="number"
          placeholder="Limite score"
          value={formData.limite_score ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              limite_score: e.target.value ? Number(e.target.value) : null,
            })
          }
          className="border p-2 rounded flex-1 min-w-[200px]"
        />

        <label className="flex items-center gap-2 border p-2 rounded min-w-[200px]">
          Ascendant
          <input
            type="checkbox"
            checked={formData.est_ascendant ?? false}
            onChange={(e) =>
              setFormData({ ...formData, est_ascendant: e.target.checked })
            }
          />
        </label>

        <label className="flex items-center gap-2 border p-2 rounded min-w-[200px]">
          Visible
          <input
            type="checkbox"
            checked={formData.est_visible ?? true}
            onChange={(e) =>
              setFormData({ ...formData, est_visible: e.target.checked })
            }
          />
        </label>

        <input
          type="url"
          placeholder="Lien vers les règles"
          value={formData.lien_regle ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, lien_regle: e.target.value })
          }
          className="border p-2 rounded flex-1 min-w-[300px]"
        />

        <textarea
          placeholder="Règles courtes"
          value={formData.regle_courte ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, regle_courte: e.target.value })
          }
          className="border p-2 rounded w-full min-h-[100px]"
        />
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
        >
          {isEditing ? "Modifier" : "Ajouter"}
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white rounded hover:bg-zinc-400 transition cursor-pointer"
          onClick={onCancel}
        >
          Annuler
        </button>
      </div>
    </form>
  );
};
