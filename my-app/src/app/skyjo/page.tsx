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

const reglesSkyjo = `
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
        jeu={"skyjo"}
        regle={reglesSkyjo}
        lienExterneRegle={lienExterneRegle}
      />

      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-10">
        🌈 Skyjo
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
            emoji="🌈"
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
              emoji="🌈"
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
              gameName="Skyjo"
              players={joueursAvecScoresTotaux}
            />
          </div>
        </>
      )}
    </main>
  );
}
