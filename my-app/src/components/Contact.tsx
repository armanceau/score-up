"use client";

import { Mail, Linkedin } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 text-xl font-bold border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white shadow-lg transition-colors cursor-pointer"
          >
            ?
          </Button>
        </PopoverTrigger>
        <PopoverContent className="space-y-3" side="top" align="start">
          <p className="text-sm text-gray-500">
            Une question, un bug, une remarque ?
          </p>
          <a
            href="mailto:arthur.manceau1@outlook.fr"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <Mail size={18} /> arthur.manceau1@outlook.fr
          </a>
          <a
            href="https://www.linkedin.com/in/arthur-manceau/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <Linkedin size={18} /> Mon LinkedIn
          </a>
        </PopoverContent>
      </Popover>
    </div>
  );
}
