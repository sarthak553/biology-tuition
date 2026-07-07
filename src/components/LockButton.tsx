"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LockButton() {
  const pathname = usePathname();
  if (pathname === "/unlock" || pathname === "/dashboard") return null;

  return (
    <Link
      href="/unlock"
      aria-label="Teacher secret access"
      title="Teacher access"
      className="group fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-lime-300/25 bg-emerald-950/60 text-lime-200 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-lime-300/60 hover:text-lime-100 hover:shadow-[0_0_25px_rgba(163,230,53,0.4)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <rect x="4" y="10" width="16" height="11" rx="2.5" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <circle cx="12" cy="15.5" r="1.4" />
      </svg>
    </Link>
  );
}
