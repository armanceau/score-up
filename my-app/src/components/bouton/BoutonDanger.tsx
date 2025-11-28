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
        w-full inline-flex justify-center shadow-sm items-center px-2 py-1.5 text-sm font-medium text-white 
        bg-red-500 rounded-md transition
        hover:bg-red-400 dark:hover:bg-red-800
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500 disabled:dark:hover:bg-red-500
        ${!disabled ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
