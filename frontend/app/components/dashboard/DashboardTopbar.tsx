"use client";

import { removeToken } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardTopbar() {
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    removeToken();
    router.replace("/");
  }

  function getTitle() {
    if (pathname === "/dashboard") return "Financial Overview";
    if (pathname.startsWith("/dashboard/accounts")) return "Accounts";
    if (pathname.startsWith("/dashboard/transactions")) return "Transactions";
    if (pathname.startsWith("/dashboard/budgets")) return "Budgets";
    if (pathname.startsWith("/dashboard/reports")) return "Reports";

    return "Dashboard";
  }

  return (
    <header className="flex items-center justify-between border-b border-text-main/10 bg-background/80 px-6 py-5 backdrop-blur lg:px-8">
      <div>
        <p className="text-sm text-text-main/60">Welcome back</p>
        <h1 className="text-2xl font-semibold tracking-tight text-text-main">
          {getTitle()}
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-full border border-text-main/10 bg-white px-5 py-2.5 text-sm font-medium text-text-main shadow-sm transition hover:border-primary hover:text-primary"
      >
        Log Out
      </button>
    </header>
  );
}
