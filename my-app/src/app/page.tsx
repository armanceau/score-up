"use client";

import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { getJeux, Jeu } from "@/lib/jeux";
import { Combobox } from "@/components/ui/combobox";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation('commun');
  const [filtre, setFiltre] = useState("all");
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [loading, setLoading] = useState(true);

  const filtres = [
    { label: t('tousLesJeux'), value: "all" },
    { label: t('deuxAQuatreJoueurs'), value: "max4" },
    { label: t('cinqJoueursEtPlus'), value: "min5" },
  ];

  useEffect(() => {
    getJeux().then((data) => {
      setJeux(data);
      setLoading(false);
    });
  }, []);

  const jeuxFiltres = jeux
    .filter((jeu) => jeu.est_visible !== false)
    .filter((jeu) => {
      if (filtre === "all") return true;
      if (filtre === "max4") return jeu.joueurs <= 4;
      if (filtre === "min5") return jeu.joueurs >= 5;
    });

  return (
    <main className="min-h-screen px-6 py-16 bg-white text-black dark:bg-black dark:text-white font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">
          {t('bienvenueSur')}
          <span className="text-blue-600 dark:text-blue-400"> Score Up</span> 🎲
        </h1>

        <div className="flex justify-start mb-6">
          <Combobox
            options={filtres}
            value={filtre}
            onChange={setFiltre}
            placeholder={t('filtrerJeux')}
            widthClass="w-64"
          />
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Choisis ton jeu :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton cards
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-full h-24 rounded-lg" />
                <Skeleton className="w-2/3 h-4 rounded" />
              </div>
            ))
          ) : (
            <>
              {jeuxFiltres.map((jeu) => (
                <Card
                  key={jeu.href}
                  href={`/jeu/${jeu.href}`}
                  emoji={jeu.emoji}
                  name={jeu.nom}
                />
              ))}
              <Card
                href="/demande-de-jeu"
                emoji="➕"
                name="Jeu manquant ?"
                description="Proposez-en un via notre formulaire"
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
