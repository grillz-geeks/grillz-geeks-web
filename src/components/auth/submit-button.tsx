import type { ButtonHTMLAttributes } from "react";

export function SubmitButton({
  children,
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      className="w-full rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
      {...buttonProps}
    >
      {children}
    </button>
  );
}
