"use client";
import Link from "next/link";
import { useState } from "react";

const jeux = [
  { name: "Skyjo", emoji: "🃏", href: "/skyjo", players: 8 },
  { name: "6 qui prend", emoji: "🐮", href: "/6quiprend", players: 10 },
  { name: "Scrabble", emoji: "🔤", href: "/scrabble", players: 4 },
  { name: "Saboteur", emoji: "⛏️", href: "/saboteur", players: 10 },
  { name: "Love Letter", emoji: "💌", href: "/loveletter", players: 4 },
];

const filtres = [
  { label: "Tous les jeux", value: "all" },
  { label: "2 à 4 joueurs", value: "max4" },
  { label: "5 joueurs et +", value: "min5" },
];

export default function Home() {
  const [filtre, setFiltre] = useState("all");

  const jeuxFiltres = jeux.filter((jeu) => {
    if (filtre === "all") return true;
    if (filtre === "max4") return jeu.players <= 4;
    if (filtre === "min5") return jeu.players >= 5;
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
            <Link
              key={jeu.href}
              href={jeu.href}
              className="group border border-zinc-200 dark:border-zinc-700 rounded-lg p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-between"
            >
              <span className="text-lg font-medium">
                {jeu.emoji} {jeu.name}
              </span>
              <span className="text-zinc-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
