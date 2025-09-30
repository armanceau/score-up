"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setIsDark(html.classList.contains("dark"));
  };

  return (
    <div className="flex items-center gap-1">
      <Sun className="h-4 w-4 text-yellow-400" />
      <Switch
        checked={isDark}
        onCheckedChange={toggleDark}
        className="bg-zinc-200 dark:bg-zinc-700 data-[state=checked]:bg-blue-500 cursor-pointer"
      >
        <span className="sr-only">Toggle Dark Mode</span>
      </Switch>
      <Moon className="h-4 w-4 text-blue-400" />
    </div>
  );
}
