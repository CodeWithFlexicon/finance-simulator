import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Smarter personal finance
          </p>

          <h1 className="max-w-xl text-5xl leading-tight font-semibold tracking-tight text-text-main sm:text-6xl">
            Change the way you use your money
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-text-main/70 sm:text-lg">
            Track accounts, monitor transactions, set budgets, and understand
            your financial habits through one clean, modern dashboard.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="rounded-full border border-text-main/10 bg-white px-6 py-3 text-sm font-medium text-text-main transition hover:border-primary hover:text-primary"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
