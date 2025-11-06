"use client";

import { useState, useEffect } from "react";
import {
  getStatistiquesUtilisateur,
  StatistiquesUtilisateur as StatsType,
} from "@/lib/statistiques";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { useTranslation } from "react-i18next";

type StatistiquesProps = {
  userId: string;
};

const COULEURS = [
  "#3B82F6", // blue-500
  "#EF4444", // red-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#8B5CF6", // violet-500
  "#EC4899", // pink-500
  "#06B6D4", // cyan-500
  "#84CC16", // lime-500
  "#F97316", // orange-500
  "#6366F1", // indigo-500
];

export default function StatistiquesUtilisateur({ userId }: StatistiquesProps) {
  const { t } = useTranslation('profil');
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statistiques = await getStatistiquesUtilisateur(userId);
        setStats(statistiques);
      } catch {
        setError(t('erreurStats'));
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchStats();
    }
  }, [userId, t]);

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card text-card-foreground border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            {data.value} partie{data.value! > 1 ? "s" : ""} jouée
            {data.value! > 1 ? "s" : ""}
          </p>
          <p className="text-xs text-muted-foreground">
            {data.payload && stats
              ? `${((data.value! / stats.nombrePartiesTotal) * 100).toFixed(
                  1
                )}% du total`
              : ""}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <section className="bg-card text-card-foreground rounded-lg border p-6">
        <h2 className="text-2xl font-medium mb-2">Statistiques </h2>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-muted rounded"></div>
            <div className="h-16 bg-muted rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className="bg-card text-card-foreground rounded-lg border p-6">
        <h2 className="text-2xl font-medium mb-2">Statistiques </h2>
        <p className="text-destructive">{error}</p>
      </section>
    );
  }

  if (stats.nombrePartiesTotal === 0) {
    return (
      <section className="bg-card text-card-foreground rounded-lg border p-6">
        <h2 className="text-2xl font-medium mb-2">Statistiques </h2>
        <p className="text-muted-foreground">
          Aucune partie enregistrée pour le moment. Jouez et sauvegardez vos
          parties pour voir vos statistiques !
        </p>
      </section>
    );
  }

  const dataGraphique = stats.jeuxJoues.map((jeu) => ({
    name: jeu.jeu,
    value: jeu.nombreParties,
  }));

  return (
    <section className="bg-card text-card-foreground rounded-lg border p-6">
      <h2 className="text-2xl font-medium mb-2">Statistiques </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg">Répartition des jeux</h3>

          <div className="flex flex-wrap gap-3 justify-start mb-4">
            {dataGraphique.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COULEURS[index % COULEURS.length] }}
                />
                <span className="text-sm font-medium">{entry.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({entry.value} parties)
                </span>
              </div>
            ))}
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataGraphique}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataGraphique.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COULEURS[index % COULEURS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
              🎮 Jeu préféré
            </h3>
            <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              {stats.jeuPrefere.nom}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {stats.jeuPrefere.nombreParties} parties
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/50 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
              📈 Parties totales
            </h3>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
              {stats.nombrePartiesTotal}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              parties sauvegardées
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/50 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-1">
              📅 Moyenne mensuelle
            </h3>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {stats.moyenneParMois}
            </p>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              parties par mois
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/50 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <h3 className="text-sm font-medium text-orange-800 dark:text-orange-300 mb-1">
              🎯 Jeux différents
            </h3>
            <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {stats.nombreJeuxDifferents}
            </p>
            <p className="text-sm text-orange-600 dark:text-orange-400">
              jeux découverts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
