import type { InputHTMLAttributes } from "react";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function AuthField({ label, id, ...props }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-text-main/80">
        {label}
      </label>

      <input
        id={id}
        {...props}
        className="rounded-2xl border border-text-main/10 bg-white px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-main/35 focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
    </div>
  );
}
