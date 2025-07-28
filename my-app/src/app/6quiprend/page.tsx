"use client";

import { useState, useEffect } from "react";
import Regle from "@/components/Regle";
import InputJoueur from "@/components/jeu/InputJoueur";
import ListeJoueurs from "@/components/jeu/ListeJoueurs";
import ControleManche from "@/components/jeu/ControleManche";
import SaisieScoresManche from "@/components/jeu/SaisieScoresManche";
import { PartageBouton } from "@/components/PartageBouton";

type Joueur = {
  nom: string;
  scores: number[];
};

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

const lienExterneRegle =
  "https://www.papj.fr/contentpapj/uploads/2021/05/Regle-du-jeu-6-qui-prend.pdf";

const LOCALSTORAGE_KEY = "score-up-6quiprend";

export default function SixQuiPrendPage() {
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

  const joueursAvecScoresTotaux = joueurs.map((j) => ({
    name: j.nom,
    score: j.scores.reduce((acc, s) => acc + s, 0),
  }));

  return (
    <main className="flex flex-col justify-start max-w-2xl mx-auto px-6 py-10 text-zinc-900 dark:text-zinc-100">
      <Regle
        jeu={"6quiprend"}
        regle={regles6QuiPrend}
        lienExterneRegle={lienExterneRegle}
      />

      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-10">
        🐮 6 qui prend
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
            emoji="🐮"
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
              emoji="🐮"
            />
          )}

          <PartageBouton
            gameName="6 qui prend"
            players={joueursAvecScoresTotaux}
          />
        </>
      )}
    </main>
  );
}
