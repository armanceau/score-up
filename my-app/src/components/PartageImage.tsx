import React from "react";

export const PartageImage = React.forwardRef(function PartageImage(
  {
    gameName,
    players,
  }: { gameName: string; players: { name: string; score: number }[] },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className="w-[400px] p-6 rounded-xl bg-white text-zinc-900 shadow-xl font-sans text-center"
    >
      <h2 className="text-xl font-bold mb-2">{gameName}</h2>
      <p className="text-sm text-zinc-500 mb-4">
        Partie du {new Date().toLocaleDateString("fr-FR")}
      </p>

      <div className="mb-4">
        <h3 className="font-semibold">🏆 Podium</h3>
        <ol className="text-left pl-6 mt-1">
          {players.slice(0, 3).map((p, i) => (
            <li key={p.name}>
              {["🥇", "🥈", "🥉"][i]} {p.name} - {p.score} pts
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-1">👥 Tous les joueurs</h3>
        <ul className="text-sm">
          {players.map((p) => (
            <li key={p.name}>
              {p.name} : {p.score} pts
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
