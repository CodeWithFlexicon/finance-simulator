"use client";

import { getAccounts } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { formatCurrency } from "@/lib/format";
import { AccountResponse } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountDetailPage() {
  const router = useRouter();
  const params = useParams();

  const [account, setAccount] = useState<AccountResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadAccount() {
      try {
        const data = await getAccounts();

        const found = data.find(
          (account) => account.id.toString() === params.id,
        );

        if (!found) {
          router.replace("/dashboard/accounts");
          return;
        }

        setAccount(found);
      } catch {
        removeToken();
        router.replace("/login?error=session-expired");
      } finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, [router, params.id]);

  if (loading) {
    return <p className="text-text-main/70">Loading account...</p>;
  }

  if (!account) {
    return null;
  }

  return (
    <section>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Account
      </p>

      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text-main">
        {account.name}
      </h2>

      <p className="mt-2 text-text-main/70">{account.accountType}</p>

      <p className="mt-6 text-4xl font-semibold text-primary">
        {formatCurrency(account.balance)}
      </p>

      <div className="mt-12 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <p className="text-lg font-semibold text-text-main">Transactions</p>

        <div className="mt-6 flex flex-col gap-4">
          <p className="text-sm text-text-main/60">No transactions yet.</p>
        </div>
      </div>
    </section>
  );
}
