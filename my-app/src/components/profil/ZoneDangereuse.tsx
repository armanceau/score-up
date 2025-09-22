export const ZoneDangereuse = () => {
  return (
    <div className="flex flex-col gap-2 border border-red-600 dark:border-red-700 bg-white dark:bg-zinc-900 text-sm px-3 py-2 rounded-md">
      <h2 className="text-2xl font-medium mb-2">Zone dangereuse</h2>

      <div className="space-y-2">
        <button className="border border-zinc-300 dark:border-zinc-700 w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-red-700 dark:text-red-500 bg-red-50 dark:bg-zinc-800 rounded-md hover:bg-red-500 dark:hover:bg-red-800 hover:text-red-50 transition-colors cursor-pointer">
          Supprimer le compte
        </button>
      </div>
    </div>
  );
};
