"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthCard from "../components/auth/AuthCard";
import AuthField from "../components/auth/AuthField";
import Navbar from "../components/landing/Navbar";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { getToken, saveToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const data = await login(email, password);
      saveToken(data.token);
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-6 py-12">
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center justify-center">
          <AuthCard
            title="Welcome back"
            subtitle="Log in to continue tracking your accounts, budgets, and financial activity."
          >
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <AuthField
                id="email"
                label="Email"
                type="email"
                placeholder="flexfinance@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <AuthField
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p className="mt-6 text-sm text-text-main/65">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary transition hover:opacity-80"
              >
                Create one
              </Link>
            </p>
          </AuthCard>
        </div>
      </main>
    </>
  );
}
