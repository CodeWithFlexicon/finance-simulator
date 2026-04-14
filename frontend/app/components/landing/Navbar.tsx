import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link
          href="/"
          className="text-3xl font-semibold tracking-tight text-text-main"
        >
          FlexFinance
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-text-main/80 transition hover:text-primary"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm text-text-main/80 transition hover:text-primary"
          >
            How it works
          </Link>

          <Link
            href="#FAQ"
            className="text-sm text-text-main/80 transition hover:text-primary"
          >
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-3">
            <Link
                href="/login"
                className="hidden text-sm text-text-main/80 transition hover:text-primary sm:inline-block"
            >
                Log In
            </Link>
            <Link
                href="/register"
                className="hidden text-sm text-text-main/80 transition hover:text-primary sm:inline-block"
            >
                Sign Up
            </Link>
        </div>
      </nav>
    </header>
  );
}
