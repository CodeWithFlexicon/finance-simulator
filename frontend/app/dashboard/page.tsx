"use client";

import { getAccounts } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { AccountResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountCard from "../components/dashboard/AccountCard";

export default function Dashboard() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadAccounts() {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch {
        removeToken();
        setError("Your session has expired. Please log in again.");

        setTimeout(() => {
          router.replace("/login");
        }, 1200);
      } finally {
        setLoading(false);
      }
    }

    loadAccounts();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-6 py-12">
        <div className="mx-auto max-w-7xl">Loading dashboard...</div>
      </main>
    );
  }

  return (
    <section>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Overview
      </p>

      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text-main">
        Your financial snapshot
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </section>
  );
}
