import { useEffect, useState } from "react";
import Regle from "../Regle";
import ControleManche from "./ControleManche";
import InputJoueur from "./InputJoueur";
import ListeJoueurs from "./ListeJoueurs";
import SaisieScoresManche from "./SaisieScoresManche";
import { supabase } from "@/lib/supabaseClient";
import ScrollToTop from "../ScrollTop";
import { FinJeu } from "./FinJeu";
import { NombreManche } from "./NombreManche";
import GenerateurEquipes from "./GenerateurEquipes";
import { Shuffle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ListeEquipesGenerees from "./ListeEquipesGenerees";
import { useTranslation } from "react-i18next";

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

type Equipe = {
  emoji: string;
  membres: string[];
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
  const { t } = useTranslation("jeu");
  const [mounted, setMounted] = useState(false);
  const [nomJoueur, setNomJoueur] = useState("");
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [mancheScores, setMancheScores] = useState<Record<string, number>>({});
  const [mancheEnCours, setMancheEnCours] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [nombreManche, setNombreManche] = useState(0);
  const [showGenerateurEquipes, setShowGenerateurEquipes] = useState(false);
  const [equipesGenerees, setEquipesGenerees] = useState<Equipe[]>([]);

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
    if (!confirm(t("confirmerReinitialisation"))) return;
    setJoueurs([]);
    setMancheScores({});
    setMancheEnCours(false);
    setNomJoueur("");
    setNombreManche(0);
    setEquipesGenerees([]);
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
    setNombreManche((prev) => prev + 1);
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

  const handleEquipesGenerees = (equipes: Equipe[]) => {
    setEquipesGenerees(equipes);

    const nouvellesCouleurs = [
      "rgb(34, 197, 94)",
      "rgb(239, 68, 68)",
      "rgb(59, 130, 246)",
      "rgb(245, 158, 11)",
      "rgb(139, 92, 246)",
      "rgb(236, 72, 153)",
      "rgb(6, 182, 212)",
      "rgb(132, 204, 22)",
    ];

    const nouveauxJoueurs = [...joueurs];

    equipes.forEach((equipe, index) => {
      const nomEquipe = `${equipe.emoji} Équipe ${index + 1}`;

      if (!nouveauxJoueurs.find((j) => j.nom === nomEquipe)) {
        const couleurEquipe =
          nouvellesCouleurs[index % nouvellesCouleurs.length];

        nouveauxJoueurs.push({
          nom: nomEquipe,
          scores: [],
          couleur: couleurEquipe,
        });
      }
    });

    setJoueurs(nouveauxJoueurs);
  };

  return (
    <main className="flex flex-col justify-start max-w-2xl mx-auto px-6 py-10 text-zinc-900 dark:text-zinc-100 relative">
      <div className="text-center mb-4  ">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-200 dark:bg-zinc-900 rounded-full mb-2">
          <span className="text-4xl">{emoji}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{nom}</h1>
        <Regle jeu={nom} regle={regle_courte} lienExterneRegle={lien_regle} />
      </div>

      {nombreManche > 0 && (
        <div className="absolute top-10 right-6 sm:top-16 sm:right-6">
          <NombreManche nombreManche={nombreManche} />
        </div>
      )}

      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          <h2 className="text-xl font-semibold">{t("ajouterJoueurs")}</h2>
        </div>

        <div className="mb-4">
          <Button
            onClick={() => setShowGenerateurEquipes(true)}
            disabled={mancheEnCours}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-500/20"
          >
            <Shuffle className="w-5 h-5" />
            {t("genererEquipes")}
          </Button>
        </div>

        <InputJoueur
          nomJoueur={nomJoueur}
          setNomJoueur={setNomJoueur}
          ajouterJoueur={ajouterJoueur}
          disabled={mancheEnCours}
        />

        {joueurs.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{t("aucunJoueurEncore")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("commencerParAjouter")}
            </p>
          </div>
        )}

        {joueurs.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">
              {joueurs.length}{" "}
              {joueurs.length > 1
                ? t("joueurAjoute_plural")
                : t("joueurAjoute")}
            </p>
          </div>
        )}
      </div>

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
            onReset={() => {
              setJoueurs([]);
              setEquipesGenerees([]);
              setNombreManche(0);
              setMancheEnCours(false);
              setMancheScores({});
            }}
            est_ascendant={est_ascendant}
          />

          <ScrollToTop />
        </>
      )}

      <ListeEquipesGenerees
        equipesGenerees={equipesGenerees}
        joueurs={joueurs}
        setJoueurs={setJoueurs}
        setEquipesGenerees={setEquipesGenerees}
        mancheEnCours={mancheEnCours}
      />

      <GenerateurEquipes
        isOpen={showGenerateurEquipes}
        onClose={() => setShowGenerateurEquipes(false)}
        onEquipesGenerees={handleEquipesGenerees}
      />
    </main>
  );
}
