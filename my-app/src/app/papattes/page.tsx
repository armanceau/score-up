"use client";

import { useState, useEffect } from "react";
import Regle from "@/components/Regle";
import InputJoueur from "@/components/jeu/InputJoueur";
import ListeJoueurs from "@/components/jeu/ListeJoueurs";
import ControleManche from "@/components/jeu/ControleManche";
import SaisieScoresManche from "@/components/jeu/SaisieScoresManche";

type Joueur = {
  nom: string;
  scores: number[];
};

const reglesPapattes = `
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
  const [mounted, setMounted] = useState(false);
  const [nomJoueur, setNomJoueur] = useState("");
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [mancheScores, setMancheScores] = useState<Record<string, number>>({});
  const [mancheEnCours, setMancheEnCours] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setJoueurs(parsed.joueurs ?? []);
        setMancheEnCours(parsed.mancheEnCours ?? false);
        setMancheScores(parsed.mancheScores ?? {});
      } catch {}
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify({ joueurs, mancheEnCours, mancheScores })
      );
    }
  }, [joueurs, mancheEnCours, mancheScores, mounted]);

  if (!mounted) return null;

  const ajouterJoueur = () => {
    const nomTrimmed = nomJoueur.trim();
    if (
      nomTrimmed &&
      !joueurs.some((j) => j.nom.toLowerCase() === nomTrimmed.toLowerCase())
    ) {
      setJoueurs([...joueurs, { nom: nomTrimmed, scores: [] }]);
      setNomJoueur("");
    }
  };

  const supprimerJoueur = (nom: string) => {
    if (mancheEnCours) return;
    setJoueurs(joueurs.filter((j) => j.nom !== nom));
  };

  const reinitialiserPartie = () => {
    if (!confirm("Voulez-vous vraiment réinitialiser la partie ?")) return;
    setJoueurs([]);
    setMancheScores({});
    setMancheEnCours(false);
    setNomJoueur("");
    localStorage.removeItem(LOCALSTORAGE_KEY);
  };

  const demarrerNouvelleManche = () => {
    const initialScores: Record<string, number> = {};
    joueurs.forEach((j) => {
      initialScores[j.nom] = 0;
    });
    setMancheScores(initialScores);
    setMancheEnCours(true);
  };

  const validerManche = () => {
    const joueursMisAJour = joueurs.map((joueur) => ({
      ...joueur,
      scores: [...joueur.scores, mancheScores[joueur.nom] || 0],
    }));
    setJoueurs(joueursMisAJour);
    setMancheScores({});
    setMancheEnCours(false);
  };

  return (
    <main className="flex flex-col justify-start max-w-2xl mx-auto px-6 py-10 text-zinc-900 dark:text-zinc-100">
      <Regle
        jeu={"papattes"}
        regle={reglesPapattes}
        lienExterneRegle={lienExterneRegle}
      />

      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-10">
        🐾 Papattes
      </h1>

      <section className="mb-10">
        <h2 className="text-xl font-medium mb-3">Ajoute les joueurs</h2>
        <InputJoueur
          nomJoueur={nomJoueur}
          setNomJoueur={setNomJoueur}
          ajouterJoueur={ajouterJoueur}
          disabled={mancheEnCours}
        />
      </section>

      {joueurs.length > 0 && (
        <>
          <ListeJoueurs
            joueurs={joueurs}
            supprimerJoueur={supprimerJoueur}
            mancheEnCours={mancheEnCours}
            emoji="🐾"
          />

          <ControleManche
            reinitialiserPartie={reinitialiserPartie}
            demarrerNouvelleManche={demarrerNouvelleManche}
            mancheEnCours={mancheEnCours}
            joueursLength={joueurs.length}
          />

          {mancheEnCours && (
            <SaisieScoresManche
              joueurs={joueurs}
              mancheScores={mancheScores}
              setMancheScores={setMancheScores}
              validerManche={validerManche}
              emoji="🐾"
            />
          )}
        </>
      )}
    </main>
  );
}
