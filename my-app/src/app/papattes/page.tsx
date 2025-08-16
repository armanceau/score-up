"use client";

import JeuPage from "@/components/jeu/JeuPage";

const nomJeu = "Papattes";
const emoji = "🐾";
const regles = `
- Une partie se joue en plusieurs manches.
- Chaque manche finit quand tous les joueurs ont lancé leurs 4 Papattes et leur banane.
- Les Papattes doivent être lancées devant la précédente du même animal, sans dépasser la rivière.
- Les Papattes non valides (trop courtes, touchant la rivière ou retournées) sont éliminées.
- Après les Papattes, chaque joueur lance une banane pour toucher et éliminer des Papattes adverses.
- Fin de manche : on compte les points.
- 1 point par Papatte restante.
- 3, 2 et 1 points pour les animaux les plus proches de la rivière.
- 2 points pour l'animal avec la plus courte distance entre ses deux Papattes les plus proches de la rivière.
- Le premier à 25 points ou plus gagne.
- En cas d'égalité, un dernier lancer départage.
- Variante 2 joueurs : 4 Papattes + 2 bananes, banane possible avant Papatte, Papatte touchée par banane est éliminée.
`;

const lienExterneRegle = "https://www.tactic.net/site/rules/F/56838.pdf";
const LOCALSTORAGE_KEY = "score-up-papattes";

export default function PapattesPage() {
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
