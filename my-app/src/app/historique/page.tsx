"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import CardHistorique from "@/components/CardHistorique";
import ScrollToTop from "@/components/ScrollTop";
import { getJeux, Jeu } from "@/lib/jeux";
import { FunnelX, UserIcon } from "lucide-react";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/datepicker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Player = {
  name: string;
  score: number;
};

type Partie = {
  id: string;
  created_at: string;
  jeu: string;
  jeu_id: string;
  details: { joueurs: Player[] };
};

export default function HistoriquePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [parties, setParties] = useState<Partie[]>([]);
  const [jeuxVisibles, setJeuxVisibles] = useState<Jeu[]>([]);
  const [filters, setFilters] = useState({
    date: "",
    jeu: "",
    joueurs: "",
  });

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) setTimeout(() => router.push("/"));
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const id = sessionData.session?.user.id ?? null;
      setUserId(id);

      if (id) {
        const { data: partiesData, error: partiesError } = await supabase
          .from("partie")
          .select("*")
          .eq("user_id", id)
          .order("created_at", { ascending: false });

        if (partiesError) console.error(partiesError);
        else setParties(partiesData ?? []);
        const jeux = await getJeux();

        const visibles = jeux.filter((j) => j.est_visible !== false && j.id);

        const visiblesIds = new Set(visibles.map((j) => j.id));

        const partiesValides = (partiesData ?? []).filter((p) =>
          visiblesIds.has(p.jeu_id)
        );

        setJeuxVisibles(visibles);
        setParties(partiesValides);
      }
    };

    fetchData();
  }, []);

  const formatDateLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const partiesFiltres = parties.filter((partie) => {
    const matchDate =
      !filters.date ||
      new Date(partie.created_at).toISOString().split("T")[0] === filters.date;

    const matchJeu =
      !filters.jeu ||
      jeuxVisibles.find((j) => j.id === partie.jeu_id)?.nom.toLowerCase() ===
        filters.jeu.trim().toLowerCase();

    const joueursRecherche = filters.joueurs
      .split(",")
      .map((j) => j.trim().toLowerCase())
      .filter((j) => j);

    const matchJoueurs =
      joueursRecherche.length === 0 ||
      joueursRecherche.every((jr) =>
        partie.details.joueurs.some((p) => p.name.toLowerCase().includes(jr))
      );

    return matchDate && matchJeu && matchJoueurs;
  });

  const jeuxOptions: ComboboxOption[] = jeuxVisibles.map((j) => ({
    label: `${j.emoji} ${j.nom}`,
    value: j.nom,
  }));

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">
        📜 Historique des parties
      </h1>

      <div className="mb-6 flex flex-wrap gap-0.5 items-center justify-between w-full">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Date</label>
          <DatePicker
            value={filters.date ? new Date(filters.date) : undefined}
            onChange={(date) =>
              setFilters({
                ...filters,
                date: date ? formatDateLocal(date) : "",
              })
            }
            widthClass="w-48 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Jeu</label>
          <Combobox
            options={[{ label: "Tous les jeux", value: "" }, ...jeuxOptions]}
            value={filters.jeu}
            onChange={(value) => setFilters({ ...filters, jeu: value })}
            placeholder="Tous les jeux"
            widthClass="w-48"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="joueurs" className="mb-1 text-sm font-medium">
            Joueurs
          </Label>
          <Input
            id="joueurs"
            name="joueurs"
            placeholder="Séparés par ,"
            value={filters.joueurs}
            onChange={handleFilterChange}
            className="w-48 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm px-3 py-2 rounded-md"
          />
        </div>
        <div className="flex items-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="h-10 mt-6 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm rounded-md"
                onClick={() =>
                  setFilters({
                    date: "",
                    jeu: "",
                    joueurs: "",
                  })
                }
              >
                <FunnelX />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Vider les filtres</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {partiesFiltres.length === 0 && (
        <p className="text-center text-gray-500">
          Aucune partie correspondante.
        </p>
      )}

      <div className="space-y-4">
        {partiesFiltres.map((partie) => {
          const jeu = jeuxVisibles.find((j) => j.id === partie.jeu_id);
          const est_Ascendant = jeu?.est_ascendant ?? false;

          return (
            <CardHistorique
              key={partie.id}
              partie={partie}
              est_ascendant={est_Ascendant}
            />
          );
        })}
      </div>

      <ScrollToTop />
    </main>
  );
}
