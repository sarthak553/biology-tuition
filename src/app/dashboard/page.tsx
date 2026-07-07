import { db } from "@/db";
import { appointments } from "@/db/schema";
import { desc } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Teacher Dashboard — Prithay Ray Biology" };

const SESSION_VALUE = "prithay-ray-teacher-verified";

export default async function DashboardPage() {
  const store = await cookies();
  if (store.get("teacher_session")?.value !== SESSION_VALUE) {
    redirect("/unlock");
  }

  const rows = await db.select().from(appointments).orderBy(desc(appointments.createdAt));

  const today = new Date();
  const todayCount = rows.filter(
    (r) => new Date(r.createdAt).toDateString() === today.toDateString()
  ).length;
  const uniqueSchools = new Set(rows.map((r) => r.school.toLowerCase())).size;

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-8">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-[26rem] w-[26rem] rounded-full bg-lime-400/10 blur-3xl animate-float-slower" />

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-lime-300">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-500">
                🔓
              </span>
              Private · Teacher only
            </div>
            <h1
              className="mt-3 text-4xl font-black text-emerald-50"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome back, <span className="text-gradient">Prithay ma&apos;am</span>
            </h1>
            <p className="mt-2 text-emerald-100/60">All appointment requests, in one place.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-lime-300/20 px-5 py-2.5 text-sm font-medium text-emerald-100 transition hover:border-lime-300/50 hover:bg-emerald-900/30"
            >
              View Website
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Requests", value: rows.length, icon: "📋" },
            { label: "Today", value: todayCount, icon: "☀️" },
            { label: "Schools Reached", value: uniqueSchools, icon: "🏫" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-lime-300" style={{ fontFamily: "var(--font-display)" }}>
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-emerald-100/60">{s.label}</div>
                </div>
                <div className="text-3xl">{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* table */}
        <div className="glass mt-8 overflow-hidden rounded-3xl border border-lime-300/15">
          <div className="border-b border-lime-300/10 px-6 py-5">
            <h2 className="text-lg font-semibold text-emerald-50">Appointment Logs</h2>
            <p className="text-sm text-emerald-100/50">
              Every booking made through the website, newest first.
            </p>
          </div>

          {rows.length === 0 ? (
            <div className="px-6 py-16 text-center text-emerald-100/50">
              <div className="text-4xl">🌱</div>
              <p className="mt-4">No appointments yet. New bookings will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-lime-300/10 text-xs uppercase tracking-wider text-lime-300/70">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Class</th>
                    <th className="px-6 py-4">School</th>
                    <th className="px-6 py-4">Preferred Time</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-lime-300/5 transition hover:bg-emerald-900/25"
                    >
                      <td className="px-6 py-4 font-semibold text-emerald-50">{r.name}</td>
                      <td className="px-6 py-4">
                        <a
                          href={`tel:${r.phone}`}
                          className="text-lime-300 transition hover:underline"
                        >
                          {r.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-emerald-100/80">{r.studentClass}</td>
                      <td className="px-6 py-4 text-emerald-100/80">{r.school}</td>
                      <td className="px-6 py-4 text-emerald-100/70">{r.preferredTime || "—"}</td>
                      <td className="px-6 py-4 max-w-xs text-emerald-100/70">{r.message || "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-emerald-100/50">
                        {new Date(r.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
