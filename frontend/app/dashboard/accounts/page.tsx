"use client";

import AccountCard from "@/app/components/dashboard/AccountCard";
import { getAccounts } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { p } from "motion/react-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
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
        router.replace("/login?error=session-expired");
      } finally {
        setLoading(false);
      }
    }

    loadAccounts();
  }, [router]);

  if (loading) {
    return <p className="text-text-main/70">Loading accounts...</p>;
  }

  return (
    <section>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Accounts
      </p>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-text-main">
            Your accounts
          </h2>
          <p className="mt-3 max-w-2xl text-text-main/70">
            Review all of your checking, savings, and other financial accounts
            in one place.
          </p>
        </div>

        <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
          Add Account
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </section>
  );
}
