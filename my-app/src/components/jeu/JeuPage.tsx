import { useEffect, useState } from "react";
import Regle from "../Regle";
import ControleManche from "./ControleManche";
import InputJoueur from "./InputJoueur";
import ListeJoueurs from "./ListeJoueurs";
import SaisieScoresManche from "./SaisieScoresManche";
import { supabase } from "@/lib/supabaseClient";
import ScrollToTop from "../ScrollTop";
import { FinJeu } from "./FinJeu";

type Props = {
  idJeu: string;
  nom: string;
  emoji: string;
  est_ascendant: boolean;
  regle_courte: string;
  lien_regle: string;
  localStorageKey: string;
};

type Joueur = {
  nom: string;
  scores: number[];
  couleur: string;
};

export default function JeuPage({
  idJeu,
  nom,
  emoji,
  est_ascendant,
  regle_courte,
  lien_regle,
  localStorageKey,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [nomJoueur, setNomJoueur] = useState("");
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [mancheScores, setMancheScores] = useState<Record<string, number>>({});
  const [mancheEnCours, setMancheEnCours] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session?.user.id ?? null);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const data = localStorage.getItem(localStorageKey);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setJoueurs(parsed.joueurs ?? []);
        setMancheEnCours(parsed.mancheEnCours ?? false);
        setMancheScores(parsed.mancheScores ?? {});
      } catch {}
    }
  }, [mounted, localStorageKey]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ joueurs, mancheEnCours, mancheScores })
      );
    }
  }, [joueurs, mancheEnCours, mancheScores, mounted, localStorageKey]);

  if (!mounted) return null;

  const ajouterJoueur = (couleur: string) => {
    const nomTrimmed = nomJoueur.trim();
    if (
      nomTrimmed &&
      !joueurs.some((j) => j.nom.toLowerCase() === nomTrimmed.toLowerCase())
    ) {
      setJoueurs([...joueurs, { nom: nomTrimmed, scores: [], couleur }]);
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
    localStorage.removeItem(localStorageKey);
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

  const modifierScores = (nom: string, newScores: number[]) => {
    setJoueurs((prev) =>
      prev.map((j) => (j.nom === nom ? { ...j, scores: newScores } : j))
    );
  };

  const joueursAvecScoresTotaux = joueurs.map((j) => ({
    name: j.nom,
    score: j.scores.reduce((acc, s) => acc + s, 0),
  }));

  return (
    <main className="flex flex-col justify-start max-w-2xl mx-auto px-6 py-10 text-zinc-900 dark:text-zinc-100">
      <Regle jeu={nom} regle={regle_courte} lienExterneRegle={lien_regle} />
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-10">
        {emoji} {nom}
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
            modifierScores={modifierScores}
            mancheEnCours={mancheEnCours}
            emoji={emoji}
            estAscendant={est_ascendant}
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
              emoji={emoji}
            />
          )}

          <FinJeu
            joueursAvecScoresTotaux={joueursAvecScoresTotaux}
            emoji={emoji}
            nom={nom}
            idJeu={idJeu}
            userId={userId}
            onReset={() => setJoueurs([])}
          />

          <ScrollToTop />
        </>
      )}
    </main>
  );
}
