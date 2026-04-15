export default function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-4xl bg-primary-dark p-6 text-white shadow-sm">
          <p className="text-sm text-white/70">Total Balance</p>
          <h3 className="mt-4 text-4xl font-semibold tracking-tight">
            $24,580
          </h3>

          <div className="mt-10 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Checking</span>
              <span>$6,420</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Savings</span>
              <span>$12,160</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Investments</span>
              <span>$6,000</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-4xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-main/60">Monthly Budget</p>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                On track
              </span>
            </div>

            <p className="mt-4 text-3xl font-semibold text-text-main">$1,840</p>
            <p className="mt-1 text-sm text-text-main/60">
              Remaining this month
            </p>

            <div className="mt-5 h-3 w-full rounded-full bg-background">
              <div className="h-3 w-2/3 rounded-full bg-primary" />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-text-main/60">
              <span>66% used</span>
              <span>$3,560 / $5,400</span>
            </div>
          </div>

          <div className="rounded-4xl bg-primary p-6 text-white shadow-sm">
            <p className="text-sm text-white/70">Spending Trend</p>

            <div className="mt-6 flex h-28 items-end gap-2">
              <div className="h-10 w-6 rounded-full bg-white/35" />
              <div className="h-14 w-6 rounded-full bg-white/45" />
              <div className="h-20 w-6 rounded-full bg-white/60" />
              <div className="h-12 w-6 rounded-full bg-white/45" />
              <div className="h-24 w-6 rounded-full bg-white/80" />
              <div className="h-16 w-6 rounded-full bg-white/55" />
            </div>

            <p className="mt-4 text-sm text-white/80">
              Spending is down 8% from last month
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 left-6 rounded-2xl broder border-text-main/5 bg-white px-4 py-3 shadow-md">
        <p className="text-xs text-text-main/60">Latest Activity</p>
        <p className="mt-1 text-sm font-medium text-text-main">
            Groceries • $128.40
        </p>
      </div>
    </div>
  );
}
