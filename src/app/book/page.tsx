import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BookingChat from "@/components/BookingChat";

export const metadata = {
  title: "Book an Appointment — Prithay Ray Biology",
};

export default function BookPage() {
  return (
    <main className="overflow-hidden">
      <NavBar />
      <section className="relative min-h-screen px-6 pt-32 pb-20">
        <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-[26rem] w-[26rem] rounded-full bg-lime-400/10 blur-3xl animate-float-slower" />

        <div className="relative mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-emerald-950/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-lime-300">
              💬 Let&apos;s talk
            </span>
            <h1
              className="mt-5 text-4xl font-black text-emerald-50 sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Book your <span className="text-gradient">free talk</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-emerald-100/70">
              Just chat with us below. Share a few details and Prithay ma&apos;am will call you back
              to plan the perfect learning journey.
            </p>
          </div>

          <div className="mt-10">
            <BookingChat />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
