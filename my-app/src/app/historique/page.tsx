"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import CardHistorique from "@/components/CardHistorique";
import ScrollToTop from "@/components/ScrollTop";

type Player = {
  name: string;
  score: number;
};

type Partie = {
  id: string;
  created_at: string;
  jeu: string;
  details: { joueurs: Player[] };
};

export default function HistoriquePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [parties, setParties] = useState<Partie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        setTimeout(() => {
          router.push("/");
        });
      }
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    const fetchUserAndParties = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const id = sessionData.session?.user.id ?? null;
      setUserId(id);

      if (id) {
        const { data, error } = await supabase
          .from("partie")
          .select("*")
          .eq("user_id", id)
          .order("created_at", { ascending: false });

        if (error) console.error(error);
        else setParties(data ?? []);
      }
    };

    fetchUserAndParties();
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">
        📜 Historique des parties
      </h1>

      {parties.length === 0 && (
        <p className="text-center text-gray-500">Aucune partie enregistrée.</p>
      )}

      <div className="space-y-4">
        {parties.map((partie) => {
          return <CardHistorique key={partie.id} partie={partie} />;
        })}
      </div>

      <ScrollToTop />
    </main>
  );
}
