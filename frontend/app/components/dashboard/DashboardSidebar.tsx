"use client";

import { isDragActive } from "motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Accounts", href: "/dashboard/accounts" },
  { label: "Transactions", href: "dashboard/transactions" },
  { label: "Budgets", href: "dashboard/budgets" },
  { label: "Reports", href: "dashboard/reports" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 border-r border-text-main/10 bg-white px-5 py-6 lg:block">
      <Link href="/" className="text-2xl font-semibold text-text-main">
        FlexFinance
      </Link>

      <nav className="mt-10 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-main/70 hover:bg-background hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
