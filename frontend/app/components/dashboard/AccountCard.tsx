import { AccountResponse } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

export default function AccountCard({ account }: { account: AccountResponse }) {
  return (
    <div className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md">
      <p className="text-sm text-text-main/60">{account.accountType}</p>

      <h3 className="mt-3 text-xl font-semibold text-text-main">
        {account.name}
      </h3>

      <p className="mt-6 text-3xl font-semibold text-primary">
        {formatCurrency(account.balance)}
      </p>
    </div>
  );
}
