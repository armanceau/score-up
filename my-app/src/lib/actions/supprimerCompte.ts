"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function supprimerCompteAction(userId: string) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

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
