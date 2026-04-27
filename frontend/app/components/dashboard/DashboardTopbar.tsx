"use client";

import { removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function DashboardTopbar() {
  const router = useRouter();

  function handleLogout() {
    removeToken();
    router.replace("/");
  }

  return (
    <header className="flex items-center justify-between border-b border-text-main/10 bg-background px-6 py-5 lg:px-8">
      <div>
        <p className="text-sm text-text-main/60">Welcome back</p>
        <h1 className="text-2xl font-semibold tracking-tight text-text-main">
          Dashboard
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-full border border-text-main/10 bg-white px-5 py-2.5 text-sm font-medium text-text-main transition hover:border-primary hover:text-primary"
      >
        Log Out
      </button>
    </header>
  );
}
