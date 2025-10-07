"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DonAnnule() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center mt-20 px-6 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Don annulé</h1>
      <p className="mb-6 text-lg text-muted-foreground">
        Vous avez annulé votre don. Pas de problème, vous pouvez revenir quand
        vous voulez soutenir Score Up !
      </p>
      <Button onClick={() => router.push("/")}>Retour à l&apos;accueil</Button>
    </main>
  );
}
