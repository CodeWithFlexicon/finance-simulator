"use client";

import TransactionItem from "@/app/components/dashboard/TransactionItem";
import { getTransactions } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { TransactionResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransactionPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadTransactions() {
      try {
        const data = await getTransactions();

        setTransactions(data);
      } catch {
        removeToken();
        router.replace("/login?error=session-expired");
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, [router]);

  if (loading) {
    return <p className="text-text-main/70">Loading transactions...</p>;
  }

  return (
    <section>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Transactions
      </p>

      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text-main">
        All transactions
      </h2>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex flex-col gap-3">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                showAccount
              />
            ))
          ) : (
            <p className="py-6 text-center text-sm text-text-main/60">
              No transactions yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
