"use client";

import JeuPage from "@/components/jeu/JeuPage";

const nomJeu = "Skyjo";
const emoji = "🌈";
const regles = `
- Chaque joueur dispose de 12 cartes face cachée, disposées en 3 lignes de 4.
- Au début, chaque joueur retourne 2 cartes.
- À son tour, un joueur pioche une carte (pioche ou défausse).
- Il peut soit échanger cette carte avec une de ses cartes (même face cachée), soit la défausser et retourner une de ses cartes.
- Le but est d'avoir le moins de points possible.
- Quand un joueur a toutes ses cartes révélées, la manche s'arrête.
- Tous les joueurs révèlent leurs cartes et comptent leurs points.
- Le jeu continue jusqu'à ce qu'un joueur atteigne 100 points ou plus.
- Le joueur avec le moins de points à ce moment-là gagne la partie.
`;

const lienExterneRegle =
  "https://cdn.1j1ju.com/medias/ee/b8/88-skyjo-regle.pdf";
const LOCALSTORAGE_KEY = "score-up-skyjo";

export default function SkyjoPage() {
  return (
    <JeuPage
      nomJeu={nomJeu}
      emoji={emoji}
      regles={regles}
      lienExterneRegle={lienExterneRegle}
      localStorageKey={LOCALSTORAGE_KEY}
    />
  );
}
