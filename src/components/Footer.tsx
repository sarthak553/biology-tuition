import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-lime-300/10 bg-emerald-950/40 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 text-lg">
              🧬
            </span>
            <span
              className="text-lg font-semibold text-emerald-50"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Prithay Ray Biology
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-emerald-100/60">
            Professional Biology tuitions from Class 8 upwards. Concepts made clear, curiosity made
            contagious.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-lime-300/80">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-emerald-100/70">
            <li><Link href="/#courses" className="transition hover:text-lime-300">Courses</Link></li>
            <li><Link href="/#why" className="transition hover:text-lime-300">Why Choose Me</Link></li>
            <li><Link href="/book" className="transition hover:text-lime-300">Book Appointment</Link></li>
          </ul>
        </div>

      </div>
      <p className="mt-10 text-center text-xs text-emerald-100/40">
        © {new Date().getFullYear()} Prithay Ray Biology Tuitions. Crafted with care.
      </p>
    </footer>
  );
}
