import React from "react";

interface DangerButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const BoutonDanger: React.FC<DangerButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        border border-red-100 dark:border-zinc-700 w-full inline-flex justify-center shadow-sm items-center px-2 py-1.5 text-sm font-medium text-red-700 dark:text-red-500 dark:hover:text-red-300 bg-red-50 dark:bg-zinc-800 rounded-md hover:bg-red-500 dark:hover:bg-red-800 hover:text-red-50 transition-colors cursor-pointer
        ${
          disabled
            ? "opacity-50 cursor-not-allowed hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-300"
            : ""
        }
        ${className} 
      `}
    >
      {children}
    </button>
  );
};
