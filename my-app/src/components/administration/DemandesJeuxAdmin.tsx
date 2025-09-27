"use client";

import { useEffect, useState } from "react";
import {
  DemandeJeu,
  getDemandesJeux,
  modifierDemandeJeu,
} from "@/lib/demandesJeux";
import { TableauDemandes } from "./TableauDemandes";
import { MailTemplate } from "./MailTemplate";

type DemandesJeuxAdminProps = {
  onBack?: () => void;
};

export const DemandesJeuxAdmin: React.FC<DemandesJeuxAdminProps> = ({
  onBack,
}) => {
  const [demandes, setDemandes] = useState<DemandeJeu[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDemandes = async () => {
    setLoading(true);
    const data = await getDemandesJeux();
    setDemandes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const handleChangeStatut = async (
    demandeId: string,
    statut: DemandeJeu["statut"]
  ) => {
    try {
      await modifierDemandeJeu(demandeId, statut);
      fetchDemandes();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la modification du statut");
    }
  };

  if (loading) return <p>Chargement des demandes...</p>;

  return (
    <div className="min-h-screen flex flex-col p-6">
      {onBack && (
        <button
          className="mb-4 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 transition w-fit cursor-pointer"
          onClick={onBack}
        >
          ← Retour
        </button>
      )}
      <MailTemplate />
      <TableauDemandes
        demandes={demandes}
        onChangeStatut={handleChangeStatut}
      />
    </div>
  );
};
