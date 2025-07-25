"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="w-full border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold hover:opacity-80 text-blue-600 dark:text-blue-400"
          >
            🎲 Score Up
          </Link>

          <div className="space-x-4 text-sm">
            <Link href="/about" className="hover:underline">
              À propos
            </Link>
          </div>
        </div>

        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          <span className="mx-1">/</span>
          {segments.map((segment, i) => {
            const href = "/" + segments.slice(0, i + 1).join("/");
            const label = decodeURIComponent(segment).replace(/-/g, " ");

            return (
              <span key={href}>
                <Link href={href} className="hover:underline capitalize">
                  {label}
                </Link>
              </span>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
