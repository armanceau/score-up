"use client";
import { useTranslation } from "react-i18next";

export default function AProposPage() {
  const { t } = useTranslation("commun");
  return (
    <section className="max-w-2xl mx-auto mt-10 px-4 text-center">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        {t("aPropos")}
      </h2>
      <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
        {t("aProposContenu")}
      </p>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-xs">
        {t("aProposAuteur1")}{" "}
        <a
          href="https://www.linkedin.com/in/arthur-manceau/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
        >
          Arthur Manceau
        </a>{" "}
        {t("aProposAuteur2")}
      </p>
      <a
        href="https://github.com/armanceau/score-up"
        rel="noopener nofollow noreferrer"
        target="_blank"
        className="inline-flex items-center justify-center h-9 mt-2 px-3 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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

      <div className="mt-6 flex justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
        <a
          href="/conditions-utilisation"
          className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
        >
          {t("conditionsUtilisation")}
        </a>
        <a
          href="/politique-de-confidentialite"
          className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
        >
          {t("politiqueConfidentialite")}
        </a>
      </div>
    </section>
  );
}
