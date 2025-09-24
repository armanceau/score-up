"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const segments = pathname.split("/").filter(Boolean);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const hiddenPaths = ["/reset-password"];

  if (hiddenPaths.includes(pathname)) return null;

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

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4 items-center text-sm">
            <Link href="/apropos" className="hover:underline">
              À propos
            </Link>

            {user ? (
              <>
                <Link href="/historique" className="hover:underline">
                  Historique
                </Link>
                <Link href="/profil" className="hover:underline">
                  Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900 text-red-700 cursor-pointer dark:text-red-300 border border-red-200 dark:border-red-700 px-2 h-9 rounded-md text-sm font-medium shadow-sm hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link href="/authentification" className="hover:underline">
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden px-2 py-1 border rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="flex flex-col mt-2 space-y-2 md:hidden text-sm items-center">
            <Link href="/apropos" className="hover:underline">
              À propos
            </Link>
            {user && (
              <>
                <Link href="/historique" className="hover:underline">
                  Historique
                </Link>
                <Link href="/profil" className="hover:underline">
                  Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900 text-red-700 cursor-pointer dark:text-red-300 border border-red-200 dark:border-red-700 px-2 h-9 rounded-md text-sm font-medium shadow-sm hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            )}
            {!user && (
              <Link href="/authentification" className="hover:underline">
                Connexion
              </Link>
            )}
          </div>
        )}

        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          <span className="mx-1">/</span>
          {segments.map((segment, i) => {
            if (segment === "jeu") return null;

            const href = "/" + segments.slice(0, i + 1).join("/");

            const label = decodeURIComponent(segment)
              .replace(/^jeu-/, "")
              .replace(/-/g, " ");

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
