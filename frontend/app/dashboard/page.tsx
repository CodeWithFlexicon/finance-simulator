"use client";

import { getAccounts } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { AccountResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountCard from "../components/dashboard/AccountCard";
import { formatCurrency } from "@/lib/format";

export default function Dashboard() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const highestAccount =
    accounts.length > 0
      ? accounts.reduce((max, acc) => (acc.balance > max.balance ? acc : max))
      : null;

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
    return <p className="text-text-main/70">Loading dashboard...</p>;
  }

  return (
    <>
      <section className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="text-sm text-text-main/60">Total Balance</p>
          <h3 className="mt-3 text-3xl font-semibold text-primary">
            {formatCurrency(totalBalance)}
          </h3>
        </div>

        <div className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="text-sm text-text-main/60">Accounts</p>
          <h3 className="mt-3 text-3xl font-semibold text-text-main">
            {accounts.length}
          </h3>
        </div>

        <div className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="text-sm text-text-main/60">Top Account</p>
          <h3 className="mt-3 text-lg font-semibold text-text-main">
            {highestAccount
              ? `${highestAccount.name} (${highestAccount.accountType})`
              : "No accounts"}
          </h3>
        </div>
      </section>
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

      <section className="mt-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Activity
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text-main">
          Recent transactions
        </h2>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="flex flex-col gap-4">
            {[
              { name: "Netflix", amount: -24.99, date: "Jan 18" },
              { name: "Grocery Store", amount: -84.23, date: "Jan 12" },
              { name: "Salary", amount: 2400, date: "Jan 10" },
            ].map((txn, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-text-main/5 pb-4 last:border-none last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-text-main">
                    {txn.name}
                  </p>
                  <p className="text-xs text-text-main/60">{txn.date}</p>
                </div>

                <p
                  className={`text-sm font-semibold ${txn.amount < 0 ? "text-red-500" : "text-green-500"}`}
                >
                  {txn.amount < 0 ? "-" : "+"}
                  {formatCurrency(Math.abs(txn.amount))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
