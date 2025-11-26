"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function DonAnnule() {
  const router = useRouter();
  const { t } = useTranslation("commun");

  return (
    <main className="flex flex-col items-center justify-center mt-20 px-6 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">{t("donAnnule")}</h1>
      <p className="mb-6 text-lg text-muted-foreground">
        {t("donAnnuleDescription")}
      </p>
      <Button onClick={() => router.push("/")}>{t("retourAccueil")}</Button>
    </main>
  );
}
