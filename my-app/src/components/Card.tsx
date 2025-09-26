"use client";

import Link from "next/link";

type CardProps = {
  key?: string;
  href: string;
  emoji: string;
  name: string;
  description?: string;
};

export default function Card({ href, emoji, name, description }: CardProps) {
  return (
    <Link
      key={href}
      href={href}
      title={description}
      className="group border border-zinc-200 dark:border-zinc-700 rounded-lg p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-between"
    >
      <span className="text-lg font-medium">
        {emoji} {name}
      </span>
      <span className="text-zinc-400 group-hover:translate-x-1 transition-transform">
        →
      </span>
    </Link>
  );
}
