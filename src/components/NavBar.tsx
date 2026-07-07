"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 pl-20 transition-all duration-500 sm:px-6 sm:pl-24 ${
          scrolled ? "glass shadow-lg shadow-black/30" : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 text-lg shadow-[0_0_18px_rgba(163,230,53,0.5)]">
            🧬
          </span>
          <span
            className="text-lg font-semibold tracking-tight text-emerald-50"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Prithay Ray <span className="text-lime-300">Biology</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-emerald-100/80 md:flex">
          <Link href="/#about" className="transition hover:text-lime-300">
            About
          </Link>
          <Link href="/#courses" className="transition hover:text-lime-300">
            Courses
          </Link>
          <Link href="/#why" className="transition hover:text-lime-300">
            Why Me
          </Link>
          <Link href="/#reviews" className="transition hover:text-lime-300">
            Reviews
          </Link>
        </nav>

        <Link
          href="/book"
          className="btn-sheen relative overflow-hidden rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-900/40 transition-transform duration-300 hover:scale-105"
        >
          Book a Session
        </Link>
      </div>
    </header>
  );
}
