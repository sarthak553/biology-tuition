import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const courses = [
  {
    tag: "Class 8 – 10",
    title: "Foundation Biology",
    desc: "Build rock-solid basics — cells, life processes, ecosystems — with visual, story-driven teaching.",
    icon: "🌱",
  },
  {
    tag: "Class 11 – 12",
    title: "Advanced Biology",
    desc: "Deep conceptual mastery of genetics, human physiology, botany & evolution for board excellence.",
    icon: "🧫",
  },
  {
    tag: "NEET / Competitive",
    title: "Exam Sprint",
    desc: "High-yield revision, diagram drills, and MCQ mastery designed to maximise your rank.",
    icon: "🏆",
  },
];

const reasons = [
  { icon: "🎯", title: "Personalised Attention", desc: "Small batches so every doubt is heard and every student thrives." },
  { icon: "🧠", title: "Concept-First Teaching", desc: "No rote learning. We understand the 'why' behind every process." },
  { icon: "🎨", title: "Visual & Interactive", desc: "Diagrams, models and analogies that make biology unforgettable." },
  { icon: "📈", title: "Proven Results", desc: "Consistent board toppers and improved school grades year after year." },
];

const reviews = [
  {
    name: "Rupkatha Das",
    text: "Prithay ma'am didn't just teach me Biology — she taught me to be curious about life itself. Every class felt like a warm conversation, and somewhere along the way my fear turned into pure love for the subject. I'll always be grateful to her.",
  },
  {
    name: "Sarthak Das",
    text: "I struggled with Biology for years until I met ma'am. Her patience is endless and her explanations just stay with you. She believed in me even on days I didn't believe in myself, and that changed everything.",
  },
  {
    name: "Srijata",
    text: "There's a special kind of magic in the way Prithay ma'am teaches. She makes the hardest chapters feel simple and beautiful. Thanks to her guidance and constant encouragement, Biology became the subject I look forward to the most.",
  },
];

const stats = [
  { value: "10+", label: "Years Teaching" },
  { value: "500+", label: "Students Mentored" },
  { value: "98%", label: "Score Improvement" },
  { value: "4.9★", label: "Average Rating" },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <NavBar />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center px-6 pt-28 pb-16">
        {/* floating blobs */}
        <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-[28rem] w-[28rem] rounded-full bg-lime-400/10 blur-3xl animate-float-slower" />
        <div className="pointer-events-none absolute right-1/3 top-10 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl animate-float-slow" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <span className="fade-up inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-emerald-950/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-lime-300">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-400" /> Now enrolling · Class 8 & above
            </span>
            <h1
              className="fade-up mt-6 text-5xl font-black leading-[1.05] tracking-tight text-emerald-50 sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)", animationDelay: "0.1s" }}
            >
              Fall in love <br />
              with <span className="text-gradient">Biology.</span>
            </h1>
            <p
              className="fade-up mt-6 max-w-md text-lg leading-relaxed text-emerald-100/75"
              style={{ animationDelay: "0.2s" }}
            >
              Professional, personalised Biology tuitions with{" "}
              <span className="font-semibold text-lime-200">Prithay Ray ma&apos;am</span> — where
              complex concepts become beautifully simple.
            </p>
            <div className="fade-up mt-8 flex flex-wrap gap-4" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/book"
                className="btn-sheen relative overflow-hidden rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 px-7 py-3.5 font-semibold text-emerald-950 shadow-xl shadow-emerald-900/40 transition-transform duration-300 hover:scale-105"
              >
                Book a Free Talk →
              </Link>
              <Link
                href="#courses"
                className="rounded-full border border-lime-300/25 px-7 py-3.5 font-semibold text-emerald-100 transition-all duration-300 hover:border-lime-300/60 hover:bg-emerald-900/30"
              >
                Explore Courses
              </Link>
            </div>

            <div className="fade-up mt-12 flex gap-8" style={{ animationDelay: "0.4s" }}>
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-lime-300" style={{ fontFamily: "var(--font-display)" }}>
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-emerald-100/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up relative" style={{ animationDelay: "0.25s" }}>
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-lime-400/20 via-transparent to-emerald-400/20 blur-2xl" />
            <div className="glass relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] border border-lime-300/20 shadow-2xl shadow-black/50">
              {/* orbiting biology motifs */}
              <div className="absolute inset-0 opacity-70">
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime-300/15 animate-spin-slow" />
                <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/15 animate-spin-slow" style={{ animationDirection: "reverse" }} />
              </div>
              <span className="absolute left-10 top-12 text-4xl animate-float-slow">🧬</span>
              <span className="absolute right-12 top-20 text-3xl animate-float-slower">🔬</span>
              <span className="absolute bottom-16 left-16 text-3xl animate-float-slower">🌿</span>
              <span className="absolute bottom-12 right-14 text-4xl animate-float-slow">🧫</span>
              <div className="relative text-center">
                <div className="text-8xl drop-shadow-[0_0_35px_rgba(163,230,53,0.4)]">🧠</div>
                <div className="mt-4 text-lg font-semibold text-lime-200" style={{ fontFamily: "var(--font-display)" }}>
                  The Living World
                </div>
                <div className="text-sm text-emerald-100/60">made simple &amp; beautiful</div>
              </div>
            </div>
            <div className="glass pop absolute -bottom-6 -left-6 rounded-2xl px-5 py-4 shadow-xl">
              <div className="text-sm font-semibold text-lime-200">Live Doubt Sessions</div>
              <div className="text-xs text-emerald-100/60">Every week · Zero doubts left behind</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-lime-300/10 bg-emerald-950/30 py-4">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10 pr-10 text-sm font-medium uppercase tracking-widest text-emerald-100/40">
              <span>🧬 Genetics</span><span>·</span>
              <span>🔬 Cell Biology</span><span>·</span>
              <span>🌿 Botany</span><span>·</span>
              <span>❤️ Human Physiology</span><span>·</span>
              <span>🦋 Evolution</span><span>·</span>
              <span>🌍 Ecology</span><span>·</span>
              <span>🧫 Microbiology</span><span>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="relative px-6 py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <div className="reveal relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-emerald-400/15 to-lime-400/15 blur-xl" />
            <div className="glass relative flex aspect-[5/6] flex-col items-center justify-center rounded-[2rem] border border-lime-300/20 p-10 text-center shadow-2xl shadow-black/40">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 text-6xl shadow-[0_0_40px_rgba(163,230,53,0.4)]">
                👩‍🔬
              </div>
              <div className="mt-6 text-2xl font-bold text-emerald-50" style={{ fontFamily: "var(--font-display)" }}>
                Prithay Ray
              </div>
              <div className="mt-1 text-sm uppercase tracking-widest text-lime-300">Biology Educator</div>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["Genetics", "Physiology", "Botany", "Ecology"].map((t) => (
                  <span key={t} className="rounded-full border border-lime-300/20 bg-emerald-900/40 px-3 py-1 text-xs text-emerald-100/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="reveal">
            <span className="text-sm font-semibold uppercase tracking-widest text-lime-300">Meet your mentor</span>
            <h2
              className="mt-3 text-4xl font-bold text-emerald-50 sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Prithay Ray
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-emerald-100/75">
              With over a decade of teaching experience, Prithay ma&apos;am has helped hundreds of
              students transform their relationship with Biology. Her approach blends deep subject
              expertise with warmth, patience and a genuine love for the living world.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-emerald-100/75">
              From your very first cell diagram in Class 8 to acing competitive exams, she guides
              every learner with a personalised roadmap — because no two minds are the same.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl px-5 py-4 transition-transform duration-300 hover:-translate-y-1">
                  <div className="text-2xl font-bold text-lime-300" style={{ fontFamily: "var(--font-display)" }}>
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-emerald-100/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-lime-300">What I teach</span>
            <h2 className="mt-3 text-4xl font-bold text-emerald-50 sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Courses for every stage
            </h2>
            <p className="mt-4 text-emerald-100/70">
              Structured programmes designed to meet you exactly where you are.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {courses.map((c, i) => (
              <div
                key={c.title}
                className="reveal group relative overflow-hidden rounded-3xl border border-lime-300/12 bg-emerald-950/40 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-lime-300/40 hover:shadow-2xl hover:shadow-emerald-900/40"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-lime-400/10 blur-2xl transition-all duration-500 group-hover:bg-lime-400/25" />
                <div className="text-4xl">{c.icon}</div>
                <div className="mt-5 inline-block rounded-full bg-emerald-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-lime-300">
                  {c.tag}
                </div>
                <h3 className="mt-4 text-2xl font-bold text-emerald-50" style={{ fontFamily: "var(--font-display)" }}>
                  {c.title}
                </h3>
                <p className="mt-3 leading-relaxed text-emerald-100/65">{c.desc}</p>
                <Link
                  href="/book"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lime-300 transition-all duration-300 group-hover:gap-2"
                >
                  Enroll now <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-lime-300">The difference</span>
            <h2 className="mt-3 text-4xl font-bold text-emerald-50 sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Why students choose me
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="reveal glass rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/40"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-400/20 to-emerald-500/20 text-3xl">
                  {r.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-emerald-50">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-100/65">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-lime-300">Loved by students</span>
            <h2 className="mt-3 text-4xl font-bold text-emerald-50 sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Words that warm my heart
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {reviews.map((r, i) => (
              <div
                key={r.name}
                className="reveal rounded-3xl border border-lime-300/12 bg-emerald-950/40 p-8 transition-all duration-500 hover:border-lime-300/30"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="text-lime-300">★★★★★</div>
                <p className="mt-4 text-lg leading-relaxed text-emerald-100/85">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-4 text-sm font-semibold text-lime-200">— {r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24">
        <div className="reveal mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-lime-300/20 bg-gradient-to-br from-emerald-800/50 to-emerald-950/60 p-12 text-center shadow-2xl">
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-lime-400/15 blur-3xl animate-float-slow" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl animate-float-slower" />
          <h2 className="relative text-4xl font-bold text-emerald-50 sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Ready to begin your journey?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-emerald-100/75">
            Book a free introductory talk. Share your details and Prithay ma&apos;am will reach out
            personally to plan your path forward.
          </p>
          <Link
            href="/book"
            className="btn-sheen relative mt-8 inline-block overflow-hidden rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 px-9 py-4 text-lg font-semibold text-emerald-950 shadow-xl transition-transform duration-300 hover:scale-105"
          >
            Book an Appointment →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
