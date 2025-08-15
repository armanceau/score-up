"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const pathname = usePathname();
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
  };

  console.log("user connecté : " + user);

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

            <a
              href="https://github.com/armanceau/score-up"
              rel="noopener nofollow noreferrer"
              target="_blank"
              className="inline-flex items-center justify-center h-9 px-3 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
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
              <Link href="/historique" className="hover:underline">
                Historique
              </Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                style={{ width: "fit-content" }}
                className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 px-2 py-1 rounded-md text-sm font-medium shadow-sm hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
              >
                Déconnexion
              </button>
            )}
            {!user && (
              <Link href="/authentification" className="hover:underline">
                Connexion
              </Link>
            )}
            <a
              href="https://github.com/armanceau/score-up"
              rel="noopener nofollow noreferrer"
              target="_blank"
              style={{ width: "fit-content" }}
              className="inline-flex items-center justify-center h-9 px-3 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        )}

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
