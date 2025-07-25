"use client";

export default function AProposPage() {
  return (
    <section className="max-w-2xl mx-auto mt-10 px-4 text-center">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        À propos
      </h2>
      <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
        Cette application a été créée pour simplifier la gestion des règles de
        vos jeux préférés. Que ce soit pour une soirée entre amis ou un
        après-midi en famille, vous pouvez accéder rapidement aux règles,
        ajouter des joueurs, et suivre la partie en toute simplicité.
      </p>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-xs">
        Fait avec ❤️ par{" "}
        <a
          href="https://www.linkedin.com/in/arthur-manceau/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
        >
          Arthur Manceau
        </a>{" "}
        en utilisant Next.js, React, Tailwind CSS, et beaucoup de passion pour les jeux
        de société et le développement web 🐵.
      </p>
    </section>
  );
}
