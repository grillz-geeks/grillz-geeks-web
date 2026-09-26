import type { InputHTMLAttributes } from "react";

export function FormField({
  id,
  label,
  ...inputProps
}: { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm text-neutral-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        {...inputProps}
      />
    </div>
  );
}
