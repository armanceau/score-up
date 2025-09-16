"use client";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  titre?: string;
  regles: string;
  lienExterneRegle?: string;
};

export default function ModalRegle({
  isOpen,
  onClose,
  titre,
  regles,
  lienExterneRegle,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6 max-w-md w-full animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Règles du jeu {titre}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
          >
            ✖
          </button>
        </div>
        <div className="text-zinc-700 dark:text-zinc-300 text-sm">
          {Array.isArray(regles) ? (
            <ul className="list-disc list-inside space-y-1">
              {regles.map((ligne, i) => (
                <li key={i}>{ligne}</li>
              ))}
            </ul>
          ) : (
            <div className="whitespace-pre-line">{regles}</div>
          )}
        </div>
        {lienExterneRegle && (
          <a
            href={lienExterneRegle}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer select-none mt-2"
          >
            Lien des règles
            <span className="text-zinc-400">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}
