"use client";

import { getAccounts, getRecentTransactions } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { AccountResponse, TransactionResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountCard from "../components/dashboard/AccountCard";
import { formatCurrency } from "@/lib/format";
import TransactionItem from "../components/dashboard/TransactionItem";

export default function Dashboard() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<
    TransactionResponse[]
  >([]);
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

    async function loadDashboard() {
      try {
        const [accountsData, transactionsData] = await Promise.all([
          getAccounts(),
          getRecentTransactions(),
        ]);

        setAccounts(accountsData);
        setRecentTransactions(transactionsData);
      } catch {
        removeToken();
        router.replace("/login?error=session-expired");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
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
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  showAccount
                />
              ))
            ) : (
              <p className="py-6 text-center text-sm text-text-main/60">
                No recent transactions yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
