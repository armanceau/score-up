"use server";

import { supabaseAdmin } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

export async function supprimerCompteAction(userId: string) {
  try {
    const { error: deleteHistoriqueError } = await supabaseAdmin
      .from("partie")
      .delete()
      .eq("user_id", userId);

    if (deleteHistoriqueError) {
      console.error("Erreur suppression historique:", deleteHistoriqueError);
      throw new Error("Erreur lors de la suppression de l'historique");
    }

    const { error: deleteUserError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteUserError) {
      console.error("Erreur suppression utilisateur:", deleteUserError);
      throw new Error("Erreur lors de la suppression du compte utilisateur");
    }

    revalidatePath("/profil");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression du compte:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression du compte",
    };
  }
}
