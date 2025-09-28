"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Linkedin } from "lucide-react";

export const Contact = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div className="fixed bottom-6 left-6" ref={containerRef}>
      <div
        className="relative"
        onMouseEnter={() => !isMobile && setOpen(true)}
        onMouseLeave={() => !isMobile && setOpen(false)}
      >
        <button
          onClick={toggleOpen}
          className={`absolute bottom-0 left-0 h-12 w-12 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 
                      bg-white dark:bg-zinc-900 text-black dark:text-white shadow-lg cursor-pointer 
                      hover:bg-zinc-100 dark:hover:bg-zinc-800 
                      transition-all duration-300 ease-in-out origin-top-left
                      ${
                        open
                          ? "opacity-0 scale-50 pointer-events-none"
                          : "opacity-100 scale-100"
                      }`}
        >
          <span className="text-xl font-bold">?</span>
        </button>

        <div
          className={`w-60 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 
                      rounded-lg shadow-lg p-4 space-y-3 text-sm z-50 
                      transition-all duration-300 ease-in-out origin-bottom-left
                      ${
                        open
                          ? "opacity-100 scale-100 translate-x-0 translate-y-0"
                          : "opacity-0 scale-50 translate-x-2 translate-y-2 pointer-events-none"
                      }`}
        >
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
        </div>
      </div>
    </div>
  );
};
