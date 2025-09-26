"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import CardHistorique from "@/components/CardHistorique";
import ScrollToTop from "@/components/ScrollTop";
import { getJeux, Jeu } from "@/lib/jeux";
import { Dice6, UserIcon } from "lucide-react";

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

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">
        📜 Historique des parties
      </h1>

      <div className="mb-6 flex flex-wrap gap-1 items-center justify-between w-full">
        <div className="flex flex-col w-48">
          <label className="text-sm font-medium mb-1">Date</label>
          <div className="flex items-center border rounded px-2 py-1 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full outline-none bg-transparent text-black dark:text-white"
            />
          </div>
        </div>

        <div className="flex flex-col w-48">
          <label className="text-sm font-medium mb-1">Jeu</label>
          <div className="flex items-center border rounded px-2 py-1 bg-white border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 focus-within:ring-2 focus-within:ring-blue-500">
            <Dice6 className="w-6 h-6 mr-2 text-zinc-500 dark:text-zinc-400" />
            <select
              name="jeu"
              value={filters.jeu}
              onChange={handleFilterChange}
              className="w-full outline-non bg-white dark:bg-zinc-800 cursor-pointer"
            >
              <option value="">Tous les jeux</option>
              {jeuxVisibles.map((j) => (
                <option key={j.id} value={j.nom}>
                  {j.emoji + " " + j.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Joueurs */}
        <div className="flex flex-col w-48">
          <label className="text-sm font-medium mb-1">Joueurs</label>
          <div className="flex items-center border rounded px-2 py-1 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus-within:ring-2 focus-within:ring-blue-500">
            <UserIcon className="w-6 h-6 mr-2 text-zinc-500 dark:text-zinc-400" />
            <input
              type="text"
              name="joueurs"
              placeholder="Séparés par ,"
              value={filters.joueurs}
              onChange={handleFilterChange}
              className="w-full outline-none bg-transparent text-black dark:text-white"
            />
          </div>
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
