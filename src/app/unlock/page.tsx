import UnlockForm from "@/components/UnlockForm";
import Link from "next/link";

export const metadata = {
  title: "Teacher Access — Prithay Ray Biology",
};

export default function UnlockPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-[26rem] w-[26rem] rounded-full bg-lime-400/10 blur-3xl animate-float-slower" />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-emerald-100/60 transition hover:text-lime-300"
        >
          ← Back to home
        </Link>
        <div className="glass rounded-[2rem] border border-lime-300/20 p-8 shadow-2xl shadow-black/40">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 text-3xl shadow-[0_0_30px_rgba(163,230,53,0.4)]">
            🔒
          </div>
          <h1
            className="mt-6 text-center text-3xl font-bold text-emerald-50"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Teacher Access
          </h1>
          <p className="mt-2 text-center text-sm text-emerald-100/60">
            Enter the secret code to open the private dashboard.
          </p>
          <UnlockForm />
        </div>
        <p className="mt-6 text-center text-xs text-emerald-100/40">
          This area is reserved for Prithay Ray ma&apos;am only.
        </p>
      </div>
    </main>
  );
}
