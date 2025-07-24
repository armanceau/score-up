import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 bg-white text-black dark:bg-black dark:text-white font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">
          Bienvenue sur{" "}
          <span className="text-blue-600 dark:text-blue-400">Score Up</span> 🎲
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Choisis ton jeu :
        </p>

        <ul className="space-y-4">
          <li>
            <Link
              href="/skyjo"
              className="inline-block bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-black dark:text-white font-medium rounded-lg text-sm px-6 py-3 transition"
            >
              🟦 Skyjo
            </Link>
          </li>
          <li>
            <Link
              href="/6quiprend"
              className="inline-block bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-black dark:text-white font-medium rounded-lg text-sm px-6 py-3 transition"
            >
              🐮 6 qui prend
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
