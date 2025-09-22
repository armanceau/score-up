"use client";

import React, { useState, useEffect } from "react";
import {
  getJeux,
  ajouterJeu,
  modifierJeu,
  supprimerJeu,
  Jeu,
} from "@/lib/jeux";
import * as Lucide from "lucide-react";

type JeuxProps = {
  onBack?: () => void;
};

export const Jeux: React.FC<JeuxProps> = ({ onBack }) => {
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingJeu, setEditingJeu] = useState<Jeu | null>(null);
  const [formData, setFormData] = useState<Partial<Jeu>>({});

  useEffect(() => {
    refreshJeux();
  }, []);

  const refreshJeux = async () => {
    const data = await getJeux();
    setJeux(data);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJeu) {
        await modifierJeu(editingJeu.id, formData);
      } else {
        await ajouterJeu(formData as Jeu);
      }
      setFormOpen(false);
      setEditingJeu(null);
      setFormData({});
      refreshJeux();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'opération");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce jeu ?")) {
      await supprimerJeu(id);
      refreshJeux();
    }
  };

  const openEditForm = (jeu: Jeu) => {
    setEditingJeu(jeu);
    setFormData(jeu);
    setFormOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {onBack && (
        <button
          className="mb-4 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 transition w-fit cursor-pointer"
          onClick={onBack}
        >
          ← Retour
        </button>
      )}

      {!formOpen && (
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-fit"
          onClick={() => setFormOpen(true)}
        >
          + Ajouter un jeu
        </button>
      )}

      {/* Formulaire Ajouter / Modifier */}
      {formOpen && (
        <form
          onSubmit={handleFormSubmit}
          className="mb-6 p-4 border rounded space-y-4 bg-zinc-50 dark:bg-zinc-900"
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              placeholder="ID"
              required
              value={formData.id ?? ""}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="border p-2 rounded flex-1"
              disabled={!!editingJeu}
            />
            <input
              placeholder="Nom"
              required
              value={formData.nom ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
              className="border p-2 rounded flex-1"
            />
            <input
              placeholder="Emoji"
              required
              value={formData.emoji ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, emoji: e.target.value })
              }
              className="border p-2 rounded flex-1"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              placeholder="Href"
              required
              value={formData.href ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, href: e.target.value })
              }
              className="border p-2 rounded flex-1"
            />
            <input
              type="number"
              placeholder="Joueurs"
              required
              value={formData.joueurs ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, joueurs: Number(e.target.value) })
              }
              className="border p-2 rounded flex-1"
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
              className="border p-2 rounded flex-1"
            />
            <label className="flex items-center gap-2">
              Ascendant
              <input
                type="checkbox"
                checked={formData.est_ascendant ?? false}
                onChange={(e) =>
                  setFormData({ ...formData, est_ascendant: e.target.checked })
                }
              />
            </label>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              {editingJeu ? "Modifier" : "Ajouter"}
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white rounded hover:bg-zinc-400 transition"
              onClick={() => {
                setFormOpen(false);
                setEditingJeu(null);
                setFormData({});
              }}
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Tableau des jeux */}
      <div className="">
        <table className="min-w-full border border-zinc-300 dark:border-zinc-700">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-2 text-left">Emoji</th>
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Href</th>
              <th className="px-4 py-2 text-left">Joueurs</th>
              <th className="px-4 py-2 text-left">Ascendant</th>
              <th className="px-4 py-2 text-left">Limite score</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jeux.map((jeu) => (
              <tr
                key={jeu.id}
                className="border-t border-zinc-200 dark:border-zinc-700"
              >
                <td className="px-4 py-2">{jeu.emoji}</td>
                <td className="px-4 py-2">{jeu.nom}</td>
                <td className="px-4 py-2">{jeu.id}</td>
                <td className="px-4 py-2">{jeu.href}</td>
                <td className="px-4 py-2">{jeu.joueurs}</td>
                <td className="px-4 py-2">{jeu.est_ascendant ? "✅" : "❌"}</td>
                <td className="px-4 py-2">{jeu.limite_score ?? "∞"}</td>
                <td className="px-4 py-2 relative">
                  <button
                    className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
                    onClick={() =>
                      setMenuOpen(menuOpen === jeu.id ? null : jeu.id)
                    }
                  >
                    <Lucide.MoreVertical className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                  </button>
                  {menuOpen === jeu.id && (
                    <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        onClick={() => openEditForm(jeu)}
                      >
                        Modifier
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        onClick={() => handleDelete(jeu.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
