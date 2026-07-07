import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";
import LockButton from "@/components/LockButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "900"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Prithay Ray — Professional Biology Tuitions",
  description:
    "Learn Biology the elegant way. Professional online & offline Biology tuitions from Class 8 upwards with Prithay Ray ma'am.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
      >
        <LockButton />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
