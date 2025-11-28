"use client";

import {
  MoreVertical,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState, useMemo } from "react";
import { DemandeJeu } from "@/lib/demandesJeux";
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

type TableauDemandesProps = {
  demandes: DemandeJeu[];
  onChangeStatut: (demandeId: string, statut: DemandeJeu["statut"]) => void;
};

export const TableauDemandes: React.FC<TableauDemandesProps> = ({
  demandes,
  onChangeStatut,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof DemandeJeu | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const statutLabels: Record<
    DemandeJeu["statut"],
    { label: string; color: string; icon: string }
  > = {
    en_attente: {
      label: "⏳ En attente",
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      icon: "⏳",
    },
    accepte: {
      label: "✅ Accepté",
      color:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      icon: "✅",
    },
    refuse: {
      label: "❌ Refusé",
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      icon: "❌",
    },
  };

  const handleSort = (field: keyof DemandeJeu) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedDemandes = useMemo(() => {
    const filtered = demandes.filter((demande) => {
      const matchesSearch =
        demande.nom_jeu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demande.email_utilisateur
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        demande.description_courte
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || demande.statut === statusFilter;

      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      return [...filtered].sort((a, b) => {
        let aValue: string | number = a[sortField] as string;
        let bValue: string | number = b[sortField] as string;

        if (sortField === "date_creation") {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    return filtered;
  }, [demandes, searchTerm, statusFilter, sortField, sortDirection]);

  const SortableHeader = ({
    field,
    children,
  }: {
    field: keyof DemandeJeu;
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
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="en_attente">En attente</SelectItem>
              <SelectItem value="accepte">Accepté</SelectItem>
              <SelectItem value="refuse">Refusé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredAndSortedDemandes.length} demande(s) trouvée(s)
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader field="email_utilisateur">Email</SortableHeader>
              <SortableHeader field="nom_jeu">Nom du jeu</SortableHeader>
              <SortableHeader field="description_courte">
                Description courte
              </SortableHeader>
              <SortableHeader field="date_creation">
                Date de la demande
              </SortableHeader>
              <SortableHeader field="statut">Statut</SortableHeader>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedDemandes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Search className="h-8 w-8" />
                    <p>Aucune demande trouvée</p>
                    <p className="text-sm">
                      Essayez de modifier vos critères de recherche
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedDemandes.map((demande) => (
                <TableRow key={demande.id}>
                  <TableCell>
                    <a
                      href={`mailto:${demande.email_utilisateur}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                    >
                      {demande.email_utilisateur}
                    </a>
                  </TableCell>
                  <TableCell className="font-medium">
                    {demande.nom_jeu}
                  </TableCell>
                  <TableCell
                    className="max-w-xs truncate"
                    title={demande.description_courte}
                  >
                    {demande.description_courte}
                  </TableCell>
                  <TableCell>
                    {new Date(demande.date_creation).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statutLabels[demande.statut].color
                      }`}
                    >
                      {statutLabels[demande.statut].label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {(
                          [
                            "en_attente",
                            "accepte",
                            "refuse",
                          ] as DemandeJeu["statut"][]
                        ).map((statut) => (
                          <DropdownMenuItem
                            key={statut}
                            onClick={() => onChangeStatut(demande.id, statut)}
                            className="cursor-pointer"
                          >
                            {statutLabels[statut].label}
                          </DropdownMenuItem>
                        ))}
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
