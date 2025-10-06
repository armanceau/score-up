import { BoutonDanger } from "../bouton/BoutonDanger";

export const ZoneDangereuse = () => {
  const supprimerCompte = () => {
    alert("Désolé, cette fonctionnalité n'est pas encore disponible");
  };

  return (
    <div className="flex flex-col gap-2 border border-red-600 dark:border-red-700 bg-white dark:bg-zinc-900 text-sm px-3 py-2 rounded-md">
      <h2 className="text-2xl font-medium mb-2">Zone dangereuse</h2>

      <div className="space-y-2">
        <BoutonDanger
          className="px-4 py-2"
          disabled={true}
          onClick={supprimerCompte}
        >
          Supprimer le compte
        </BoutonDanger>
      </div>
    </div>
  );
};
