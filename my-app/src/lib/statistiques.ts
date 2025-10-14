import { supabase } from "./supabaseClient";

export type PartieHistorique = {
  id: string;
  jeu: string;
  players: { name: string; score: number }[];
  created_at: string;
  jeu_id: string;
};

export type StatistiquesJeu = {
  jeu: string;
  nombreParties: number;
  pourcentage: number;
};

export type StatistiquesUtilisateur = {
  jeuxJoues: StatistiquesJeu[];
  jeuPrefere: {
    nom: string;
    nombreParties: number;
  };
  nombrePartiesTotal: number;
  moyenneParMois: number;
  nombreJeuxDifferents: number;
  premierePartie: string;
};

export async function getPartiesUtilisateur(
  userId: string
): Promise<PartieHistorique[]> {
  const { data, error } = await supabase
    .from("partie")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Erreur lors du chargement des parties");
  }

  return data || [];
}

export function calculerStatistiques(
  parties: PartieHistorique[]
): StatistiquesUtilisateur {
  if (parties.length === 0) {
    return {
      jeuxJoues: [],
      jeuPrefere: { nom: "", nombreParties: 0 },
      nombrePartiesTotal: 0,
      moyenneParMois: 0,
      nombreJeuxDifferents: 0,
      premierePartie: "",
    };
  }

  const compteurJeux = parties.reduce((acc, partie) => {
    const jeu = partie.jeu;
    acc[jeu] = (acc[jeu] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const nombrePartiesTotal = parties.length;

  const jeuxJoues: StatistiquesJeu[] = Object.entries(compteurJeux)
    .map(([jeu, nombre]) => ({
      jeu,
      nombreParties: nombre,
      pourcentage: Math.round((nombre / nombrePartiesTotal) * 100),
    }))
    .sort((a, b) => b.nombreParties - a.nombreParties);

  const jeuPrefere = jeuxJoues[0] || { jeu: "", nombreParties: 0 };

  const premierePartie = new Date(parties[parties.length - 1].created_at);
  const maintenant = new Date();
  const diffMois = Math.max(
    1,
    (maintenant.getTime() - premierePartie.getTime()) /
      (1000 * 60 * 60 * 24 * 30)
  );
  const moyenneParMois = Math.round((nombrePartiesTotal / diffMois) * 10) / 10;

  return {
    jeuxJoues,
    jeuPrefere: {
      nom: jeuPrefere.jeu,
      nombreParties: jeuPrefere.nombreParties,
    },
    nombrePartiesTotal,
    moyenneParMois,
    nombreJeuxDifferents: Object.keys(compteurJeux).length,
    premierePartie: premierePartie.toISOString(),
  };
}

export async function getStatistiquesUtilisateur(
  userId: string
): Promise<StatistiquesUtilisateur> {
  const parties = await getPartiesUtilisateur(userId);
  return calculerStatistiques(parties);
}
