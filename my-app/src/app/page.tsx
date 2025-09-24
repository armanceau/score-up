"use client";

import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { getJeux, Jeu } from "@/lib/jeux";

const filtres = [
  { label: "Tous les jeux", value: "all" },
  { label: "2 à 4 joueurs", value: "max4" },
  { label: "5 joueurs et +", value: "min5" },
];

export default function Home() {
  const [filtre, setFiltre] = useState("all");
  const [jeux, setJeux] = useState<Jeu[]>([]);

  useEffect(() => {
    getJeux().then(setJeux);
  }, []);

  const jeuxFiltres = jeux
    .filter((jeu) => jeu.est_visible !== false)
    .filter((jeu) => {
      if (filtre === "all") return true;
      if (filtre === "max4") return jeu.joueurs <= 4;
      if (filtre === "min5") return jeu.joueurs >= 5;
    });

  return (
    <main className="min-h-screen px-6 py-16 bg-white text-black dark:bg-black dark:text-white font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">
          Bienvenue sur
          <span className="text-blue-600 dark:text-blue-400"> Score Up</span> 🎲
        </h1>

        <div className="flex justify-start mb-6">
          <select
            value={filtre}
            onChange={(e) => setFiltre(e.target.value)}
            className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm px-3 py-2 rounded-md"
          >
            {filtres.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Choisis ton jeu :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jeuxFiltres.map((jeu) => (
            <Card
              key={jeu.href}
              href={`/jeu/${jeu.href}`}
              emoji={jeu.emoji}
              name={jeu.nom}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
