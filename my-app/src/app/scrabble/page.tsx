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

const reglesScrabble = `
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
        regle={reglesScrabble}
        lienExterneRegle={lienExterneRegle}
      />

      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-10">
        🔤 Scrabble
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
            emoji="🔤"
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
              emoji="🔤"
            />
          )}
        </>
      )}
    </main>
  );
}
