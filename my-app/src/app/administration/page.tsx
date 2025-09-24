"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Jeux } from "@/components/administration/Jeux";

type Profile = {
  role: string;
};

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single<Profile>();

      if (error) {
        console.error(error);
        setRole(null);
      } else {
        setRole(profile.role);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Chargement...
      </div>
    );
  }

  if (role !== "admin") {
    router.push("/");
    return null;
  }

  if (activeTab === "jeux") {
    return <Jeux onBack={() => setActiveTab(null)} />;
  }

  return (
    <main className="min-h-screen px-6 py-16 bg-white text-black dark:bg-black dark:text-white font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Espace admin</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <button
            onClick={() => setActiveTab("jeux")}
            className="group border border-zinc-200 dark:border-zinc-700 rounded-lg p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-between w-full text-left cursor-pointer"
          >
            <span className="text-lg font-medium">🎮 Jeux</span>
            <span className="text-zinc-400 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
