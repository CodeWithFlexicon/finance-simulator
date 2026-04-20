import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-4xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
          FlexFinance
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-text-main sm:text-4xl">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-text-main/65 sm:text-base">
          {subtitle}
        </p>
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
