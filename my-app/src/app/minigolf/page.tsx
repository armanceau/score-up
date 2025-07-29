"use client";

import { useState, useEffect } from "react";
import Regle from "@/components/Regle";
import InputJoueur from "@/components/jeu/InputJoueur";
import ListeJoueurs from "@/components/jeu/ListeJoueurs";
import ControleManche from "@/components/jeu/ControleManche";
import SaisieScoresManche from "@/components/jeu/SaisieScoresManche";
import { PartageBouton } from "@/components/PartageBouton";
import { PartageImage } from "@/components/PartageImage";

type Joueur = {
  nom: string;
  scores: number[];
};

const reglesMinigolf = `
- Une partie se joue en plusieurs trous (manches).
- Chaque joueur joue à tour de rôle pour finir le trou en un minimum de coups.
- Le but est de faire rentrer la balle dans le trou avec le moins de coups possible.
- Chaque coup consiste à frapper la balle depuis sa position actuelle.
- La balle doit rester sur le parcours sans sortir des limites.
- Si la balle sort du parcours, un coup de pénalité est ajouté.
- Le joueur avec le total de coups le plus bas à la fin de la partie gagne.
- En cas d'égalité, une séance de départage peut être jouée.
`;

const lienExterneRegle =
  "https://www.bowlingbresseloisirs.fr/WORDPRESS/wp-content/uploads/2019/01/regles-mini-golf-sur-piste.pdf";

const LOCALSTORAGE_KEY = "score-up-minigolf";

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

  const joueursAvecScoresTotaux = joueurs.map((j) => ({
    name: j.nom,
    score: j.scores.reduce((acc, s) => acc + s, 0),
  }));

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
        regle={reglesMinigolf}
        lienExterneRegle={lienExterneRegle}
      />

      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-10">
        ⛳ Mini-golf
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
            emoji="⛳"
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
              emoji="⛳"
            />
          )}

          <PartageBouton selectorToCapture="#resultat-partie" />

          <div
            id="resultat-partie"
            className="flex justify-center py-4 "
            style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
          >
            <PartageImage
              ref={null}
              gameName="Mini-golf"
              players={joueursAvecScoresTotaux}
            />
          </div>
        </>
      )}
    </main>
  );
}
