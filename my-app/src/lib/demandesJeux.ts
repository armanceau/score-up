import { supabase } from "./supabaseClient";

export type DemandeJeu = {
  id: string;
  email_utilisateur: string;
  nom_jeu: string;
  description_courte: string;
  date_creation: string;
  statut: "en_attente" | "accepte" | "refuse";
};

export async function getDemandesJeux(): Promise<DemandeJeu[]> {
  const { data, error } = await supabase
    .from("demandes_jeux")
    .select("*");

  if (error) {
    console.error("Erreur lors de la récupération des demandes :", error);
    return [];
  }

  return data ?? [];
}

export async function ajouterDemandeJeu(demande: {
  email_utilisateur: string;
  nom_jeu: string;
  description_courte: string;
}): Promise<DemandeJeu> {
  const { data, error } = await supabase
    .from("demandes_jeux")
    .insert([demande])
    .select()
    .single<DemandeJeu>();

  if (error) {
    console.error("Erreur lors de l'ajout de la demande :", error);
    throw new Error("Impossible d'ajouter la demande");
  }

  return data!;
}

export async function modifierDemandeJeu(
  id: string,
  statut: "en_attente" | "accepte" | "refuse"
): Promise<DemandeJeu> {
  const { data, error } = await supabase
    .from("demandes_jeux")
    .update({ statut })
    .eq("id", id)
    .select()
    .single<DemandeJeu>();

  if (error) {
    console.error("Erreur lors de la modification du statut :", error);
    throw new Error("Impossible de modifier la demande");
  }

  return data!;
}

export async function getDemandeJeuParId(id: string): Promise<DemandeJeu | null> {
  const { data, error } = await supabase
    .from("demandes_jeux")
    .select("*")
    .eq("id", id)
    .single<DemandeJeu>();

  if (error) {
    console.error("Erreur lors de la récupération de la demande :", error);
    return null;
  }

  return data;
}
