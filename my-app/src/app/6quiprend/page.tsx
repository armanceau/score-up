"use client";

import JeuPage from "@/components/jeu/JeuPage";

const regles6QuiPrend = `
- Chaque joueur reçoit 10 cartes numérotées de 1 à 104.
- Quatre cartes sont posées en rangées au centre.
- Chaque tour, tous les joueurs choisissent une carte.
- Les cartes sont posées dans l’ordre croissant.
- Une carte est placée dans la rangée avec la dernière carte la plus proche mais inférieure.
- Si la carte est plus petite que toutes les dernières cartes, le joueur ramasse une rangée.
- Si une rangée atteint 6 cartes, le joueur qui pose la 6ᵉ ramasse les 5 premières.
- Le but : éviter de ramasser des cartes qui ont des têtes de bœuf (points).
- Le joueur avec le moins de têtes gagne.
`;

export default function SixQuiPrendPage() {
  return (
    <JeuPage
      nomJeu="6quiprend"
      emoji="🐮"
      regles={regles6QuiPrend}
      lienExterneRegle="https://www.papj.fr/contentpapj/uploads/2021/05/Regle-du-jeu-6-qui-prend.pdf"
      localStorageKey="score-up-6quiprend"
    />
  );
}
