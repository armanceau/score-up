import { supabase } from "./supabaseClient";

export type Jeu = {
  id: string;
  nom: string;
  emoji: string;
  href: string;
  joueurs: number;
  est_ascendant: boolean;
  limite_score: number | null;
};

export async function getJeux(): Promise<Jeu[]> {
  const { data, error } = await supabase
    .from("jeux")
    .select("*") as { data: Jeu[] | null; error: unknown };

  if (error) {
    console.error("Erreur lors de la récupération des jeux :", error);
    return [];
  }

  return data ?? [];
}

export async function ajouterJeu(jeu: Jeu): Promise<Jeu> {
  const { data, error } = await supabase
    .from("jeux")
    .insert([jeu])
    .select()
    .single<Jeu>();

  if (error) {
    console.error("Erreur lors de l'ajout du jeu :", error);
    throw new Error("Impossible d'ajouter le jeu");
  }

  return data!;
}

export async function supprimerJeu(id: string): Promise<void> {
  const { error } = await supabase
    .from("jeux")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la suppression du jeu :", error);
    throw new Error("Impossible de supprimer le jeu");
  }
}

export async function modifierJeu(id: string, jeu: Partial<Jeu>): Promise<Jeu> {
  const { data, error } = await supabase
    .from("jeux")
    .update(jeu)
    .eq("id", id)
    .select()
    .single<Jeu>();

  if (error) {
    console.error("Erreur lors de la modification du jeu :", error);
    throw new Error("Impossible de modifier le jeu");
  }

  return data!;
}
