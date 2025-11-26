"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useTranslation } from "react-i18next";

export default function DonSucces() {
  const router = useRouter();
  const [launchConfetti, setLaunchConfetti] = useState(false);
  const { t } = useTranslation("commun");

  const handleTypingComplete = () => {
    setLaunchConfetti(true);
  };

  useEffect(() => {
    if (!launchConfetti) return;

    const duration = 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    const end = Date.now() + duration;

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 3,
        startVelocity: 60,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, [launchConfetti]);

  return (
    <main className="relative flex flex-col items-center justify-center mt-30 px-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        <TypingAnimation
          words={[t("merciPourVotreDon")]}
          duration={100}
          showCursor
        />
      </h1>

      <TypingWatcher
        text={t("merciPourVotreDon")}
        duration={100}
        onComplete={handleTypingComplete}
      />

      <p className="mb-6 text-lg text-muted-foreground">
        {t("donSuccesDescription")}
      </p>

      <Button onClick={() => router.push("/")}>{t("retourAccueil")}</Button>
    </main>
  );
}

function TypingWatcher({
  text,
  duration,
  onComplete,
}: {
  text: string;
  duration?: number;
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= text.length) {
      onComplete();
      return;
    }

    const timeout = setTimeout(() => setIndex(index + 1), duration ?? 100);
    return () => clearTimeout(timeout);
  }, [index, text, duration, onComplete]);

  return null;
}
