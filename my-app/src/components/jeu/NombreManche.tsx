type NombreMancheProps = {
  nombreManche: number;
};

export const NombreManche = ({ nombreManche }: NombreMancheProps) => {
  return (
    <div className="px-4 py-1.5 border rounded-full w-fit border-zinc-300 dark:border-zinc-700 mb-4 flex items-center gap-2">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      Manche {nombreManche}
    </div>
  );
};
