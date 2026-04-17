import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="rounded-[2.5rem] bg-primary-dark px-8 py-12 text-white shadow-sm sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
              Get started
            </p>

            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Build better financial habits with FlexFinance
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Track accounts, monitor transactions, and plan your monthly
              budgets through one clean, modern experience.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-primary-dark transition hover:opacity-90"
              >
                Create Account
              </Link>

              <Link
                href="/login"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
