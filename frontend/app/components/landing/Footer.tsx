import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t border-text-main/10 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
                <div className="grid gap-10 md:grid-cols-3">
                    <div>
                        <h3 className="text-lg font-semibold text-text-main">
                            FlexFinance
                        </h3>

                        <p className="mt-4 max-w-sm text-sm text-text-main/60">
                            A modern way to track your accounts, monitor transactions, and
                            build better financial habits.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-text-main/70">
                            Navigation
                        </h4>
                        <div className="mt-4 flex flex-col gap-2 text-sm text-text-main/60">
                            <Link href="/" className="hover:text-primary">
                                Home
                            </Link>
                            <Link href="/login" className="hover:text-primary">
                                Log In
                            </Link>
                            <Link href="/register" className="hover:text-primary">
                                Get Started
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-text-main/70">
                            About
                        </h4>
                        <p className="mt-4 text-sm text-text-main/60">
                            Built to simplify personal finance and give users clarity over their money
                            through a clean and intuitive interface.
                        </p>
                    </div>
                </div>

                <div className="mt-12 border-t border-text-main/10 pt-6 text-center text-xs text-text-main/50">
                    © {new Date().getFullYear()} FlexFinance - Built by Felix Chen
                </div>
            </div>
        </footer>
    )
}