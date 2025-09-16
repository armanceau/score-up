"use client";

import JeuPage from "@/components/jeu/JeuPage";

const id = "petit-bac";
const regles = `
- Chaque joueur prépare une feuille avec plusieurs colonnes (prénom, animal, fruit/légume, métier, etc.).
- Un joueur tire une lettre de l'alphabet au hasard.
- Tous les joueurs doivent trouver un mot par colonne qui commence par cette lettre.
- Le premier joueur à remplir toutes ses colonnes dit "Stop !" et arrête la manche.
- Les autres joueurs doivent poser leurs stylos immédiatement.
- Chaque mot correct et unique rapporte 2 points.
- Si plusieurs joueurs ont trouvé le même mot, chacun marque 1 point.
- Si la case est vide ou le mot est faux, 0 point.
- La partie se joue en plusieurs manches avec des lettres différentes.
- Le joueur avec le plus de points à la fin remporte la partie.
`;

const lienExterneRegle =
  "https://champagnole.circo39.ac-besancon.fr/wp-content/uploads/sites/9/2020/03/petit-bac.pdf";
const LOCALSTORAGE_KEY = "score-up-petitbac";

export default function PetitbacPage() {
  return (
    <JeuPage
      idJeu={id}
      regles={regles}
      lienExterneRegle={lienExterneRegle}
      localStorageKey={LOCALSTORAGE_KEY}
    />
  );
}
