"use client";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
}: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6 max-w-md w-full animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            {title && (
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
          >
            ✖
          </button>
        </div>

        <div className="py-2">{children}</div>

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
};
