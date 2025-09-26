import { Jeu } from "@/lib/jeux";
import { Eye, EyeOff, MoreVertical, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

interface TableauProps {
  data: Jeu[];
  modifierJeu: (id: Jeu["id"], update: Partial<Jeu>) => Promise<Jeu>;
  refreshJeux: () => void;
  openEditForm: (jeu: Jeu) => void;
  handleDelete: (id: Jeu["id"]) => void;
}

export const Tableau: React.FC<TableauProps> = ({
  data,
  modifierJeu,
  refreshJeux,
  openEditForm,
  handleDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  return (
    <div className="overflow-x-scroll">
      <table className="min-w-full border border-zinc-300 dark:border-zinc-700">
        <thead className="bg-zinc-100 dark:bg-zinc-800">
          <tr>
            <th className="px-4 py-2 text-left">Emoji</th>
            <th className="px-4 py-2 text-left">Nom</th>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Href</th>
            <th className="px-4 py-2 text-left">Joueurs</th>
            <th className="px-4 py-2 text-left">Ascendant</th>
            <th className="px-4 py-2 text-left">Visible</th>
            <th className="px-4 py-2 text-left">Limite score</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((jeu) => (
            <tr
              key={jeu.id}
              className="border-t border-zinc-200 dark:border-zinc-700"
            >
              <td className="px-4 py-2">{jeu.emoji}</td>
              <td className="px-4 py-2">{jeu.nom}</td>
              <td className="px-4 py-2">{jeu.id}</td>
              <td className="px-4 py-2">{jeu.href}</td>
              <td className="px-4 py-2">{jeu.joueurs}</td>
              <td className="px-4 py-2">{jeu.est_ascendant ? "✅" : "❌"}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    jeu.est_visible
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {jeu.est_visible ? "Visible" : "Non visible"}
                </span>
              </td>
              <td className="px-4 py-2">{jeu.limite_score ?? "∞"}</td>
              <td className="px-4 py-2 relative">
                <button
                  className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
                  onClick={() =>
                    setMenuOpen(menuOpen === jeu.id ? null : jeu.id)
                  }
                >
                  <MoreVertical className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                </button>
                {menuOpen === jeu.id && (
                  <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg z-10">
                    <button
                      className="w-full flex text-left items-center gap-1 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer text-blue-600 dark:text-blue-400"
                      onClick={async () => {
                        try {
                          await modifierJeu(jeu.id, {
                            est_visible: !jeu.est_visible,
                          });
                          refreshJeux();
                        } catch (err) {
                          console.error(err);
                          alert(
                            "Erreur lors de la modification de la visibilité"
                          );
                        }
                      }}
                    >
                      {jeu.est_visible ? (
                        <>
                          <EyeOff size={15} /> Masquer
                        </>
                      ) : (
                        <>
                          <Eye size={15} /> Afficher
                        </>
                      )}
                    </button>
                    <button
                      className="w-full flex text-left items-center gap-1 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
                      onClick={() => openEditForm(jeu)}
                    >
                      <SquarePen size={15} /> Modifier
                    </button>
                    <button
                      className="w-full flex text-left items-center gap-1 px-4 py-2 text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
                      onClick={() => handleDelete(jeu.id)}
                    >
                      <Trash2 size={15} /> Supprimer
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
