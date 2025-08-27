"use client";

import JeuPage from "@/components/jeu/JeuPage";

const id = "scrabble";
const regles = `
- Une partie se joue en plusieurs manches.
- Chaque joueur pioche 7 lettres au début et à chaque tour pour avoir toujours 7 lettres.
- À son tour, un joueur forme un mot sur la grille avec ses lettres.
- Le premier mot doit passer par la case centrale.
- Les mots suivants doivent être reliés à un mot déjà posé.
- Chaque lettre a une valeur en points.
- Certaines cases sur la grille multiplient la valeur des lettres ou des mots.
- Après avoir posé un mot, le joueur calcule son score en additionnant les valeurs.
- Le joueur peut échanger des lettres au lieu de jouer.
- La partie se termine quand toutes les lettres sont piochées et qu'un joueur pose toutes ses lettres, ou quand aucun joueur ne peut jouer.
- Le joueur avec le plus de points gagne.
`;

const lienExterneRegle =
  "https://www.ffsc.fr/files/public/fichiers/reglements/classique/Reglement.international.du.Scrabble.classique.pdf";
const LOCALSTORAGE_KEY = "score-up-scrabble";

export default function ScrabblePage() {
  return (
    <JeuPage
      idJeu={id}
      regles={regles}
      lienExterneRegle={lienExterneRegle}
      localStorageKey={LOCALSTORAGE_KEY}
    />
  );
}
