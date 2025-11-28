import { Jeu } from "@/lib/jeux";
import {
  Eye,
  EyeOff,
  MoreVertical,
  SquarePen,
  Trash2,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TableauJeuxProps {
  data: Jeu[];
  modifierJeu: (id: Jeu["id"], update: Partial<Jeu>) => Promise<Jeu>;
  refreshJeux: () => void;
  openEditForm: (jeu: Jeu) => void;
  handleDelete: (id: Jeu["id"]) => void;
}

export const TableauJeux: React.FC<TableauJeuxProps> = ({
  data,
  modifierJeu,
  refreshJeux,
  openEditForm,
  handleDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Jeu | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Fonction de tri
  const handleSort = (field: keyof Jeu) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Données filtrées et triées
  const filteredAndSortedJeux = useMemo(() => {
    const filtered = data.filter((jeu) => {
      const matchesSearch =
        jeu.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jeu.href.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jeu.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesVisibility =
        visibilityFilter === "all" ||
        (visibilityFilter === "visible" && jeu.est_visible) ||
        (visibilityFilter === "hidden" && !jeu.est_visible);

      return matchesSearch && matchesVisibility;
    });

    if (sortField) {
      return [...filtered].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        // Gérer les valeurs null
        if (aValue === null && bValue === null) return 0;
        if (aValue === null) return sortDirection === "asc" ? 1 : -1;
        if (bValue === null) return sortDirection === "asc" ? -1 : 1;

        if (typeof aValue === "boolean" && typeof bValue === "boolean") {
          return sortDirection === "asc"
            ? (aValue ? 1 : 0) - (bValue ? 1 : 0)
            : (bValue ? 1 : 0) - (aValue ? 1 : 0);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, visibilityFilter, sortField, sortDirection]);

  const SortableHeader = ({
    field,
    children,
  }: {
    field: keyof Jeu;
    children: React.ReactNode;
  }) => (
    <TableHead
      className="cursor-pointer select-none hover:bg-muted/50 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field &&
          (sortDirection === "asc" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          ))}
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, ID, href..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Visibilité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="visible">Visibles</SelectItem>
              <SelectItem value="hidden">Masqués</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredAndSortedJeux.length} jeu(x) trouvé(s)
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader field="emoji">Emoji</SortableHeader>
              <SortableHeader field="nom">Nom</SortableHeader>
              <SortableHeader field="id">ID</SortableHeader>
              <SortableHeader field="href">Href</SortableHeader>
              <SortableHeader field="joueurs">Joueurs</SortableHeader>
              <SortableHeader field="est_ascendant">Ascendant</SortableHeader>
              <SortableHeader field="est_visible">Visible</SortableHeader>
              <SortableHeader field="limite_score">Limite score</SortableHeader>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedJeux.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Search className="h-8 w-8" />
                    <p>Aucun jeu trouvé</p>
                    <p className="text-sm">
                      Essayez de modifier vos critères de recherche
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedJeux.map((jeu) => (
                <TableRow key={jeu.id}>
                  <TableCell className="text-lg">{jeu.emoji}</TableCell>
                  <TableCell className="font-medium">{jeu.nom}</TableCell>
                  <TableCell className="font-mono text-sm">{jeu.id}</TableCell>
                  <TableCell className="font-mono text-sm text-blue-600 dark:text-blue-400">
                    {jeu.href}
                  </TableCell>
                  <TableCell>{jeu.joueurs}</TableCell>
                  <TableCell>
                    <span
                      className={
                        jeu.est_ascendant ? "text-green-600" : "text-red-600"
                      }
                    >
                      {jeu.est_ascendant ? "✅" : "❌"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        jeu.est_visible
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {jeu.est_visible ? "✅ Visible" : "❌ Masqué"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {jeu.limite_score ? (
                      <span className="font-mono">{jeu.limite_score}</span>
                    ) : (
                      <span className="text-muted-foreground">∞</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
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
                          className="cursor-pointer text-blue-600 dark:text-blue-400"
                        >
                          {jeu.est_visible ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" /> Masquer
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" /> Afficher
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openEditForm(jeu)}
                          className="cursor-pointer"
                        >
                          <SquarePen className="mr-2 h-4 w-4" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(jeu.id)}
                          className="cursor-pointer text-red-600 dark:text-red-400"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
