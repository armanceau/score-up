"use client";

import JeuPage from "@/components/jeu/JeuPage";
import { useJeux } from "@/lib/jeuxContext";
import { useParams } from "next/navigation";

export default function GamePage() {
  const params = useParams();
  const id = params?.id;

  const { jeux } = useJeux();
  const jeu = jeux.find((j) => j.id === id);

  if (!id) return <p>ID manquant</p>;
  if (!jeu) return <p>Jeu non trouvé</p>;

  return (
    <JeuPage
      idJeu={jeu.id}
      nom={jeu.nom}
      emoji={jeu.emoji}
      est_ascendant={jeu.est_ascendant}
      regle_courte={jeu.regle_courte}
      lien_regle={jeu.lien_regle}
      localStorageKey={`score-up-${jeu.id}`}
    />
  );
}
