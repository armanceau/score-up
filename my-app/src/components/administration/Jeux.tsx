"use client";

import React, { useState, useEffect } from "react";
import {
  getJeux,
  ajouterJeu,
  modifierJeu,
  supprimerJeu,
  Jeu,
} from "@/lib/jeux";
import { Tableau } from "./Tableau";
import { FormulaireJeu } from "./FormulaireJeu";

type JeuxProps = {
  onBack?: () => void;
};

export const Jeux: React.FC<JeuxProps> = ({ onBack }) => {
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingJeu, setEditingJeu] = useState<Jeu | null>(null);

  useEffect(() => {
    refreshJeux();
  }, []);

  const refreshJeux = async () => {
    const data = await getJeux();
    setJeux(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce jeu ?")) {
      await supprimerJeu(id);
      refreshJeux();
    }
  };

  const openEditForm = (jeu: Jeu) => {
    setEditingJeu(jeu);
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

      {formOpen && (
        <FormulaireJeu
          initialData={editingJeu ?? {}}
          onSubmit={async (data) => {
            if (editingJeu) {
              await modifierJeu(editingJeu.id, data);
            } else {
              await ajouterJeu(data as Jeu);
            }
            setFormOpen(false);
            setEditingJeu(null);
            refreshJeux();
          }}
          onCancel={() => {
            setFormOpen(false);
            setEditingJeu(null);
          }}
          isEditing={!!editingJeu}
        />
      )}

      <Tableau
        data={jeux}
        modifierJeu={modifierJeu}
        refreshJeux={refreshJeux}
        openEditForm={openEditForm}
        handleDelete={handleDelete}
      />
    </div>
  );
};
