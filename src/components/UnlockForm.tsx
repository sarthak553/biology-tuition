"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function UnlockForm() {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const setDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    setError(null);
    if (clean && i < 3) refs[i + 1].current?.focus();
    if (clean && i === 3) submit(next.join(""));
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs[i - 1].current?.focus();
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (text.length) {
      const arr = text.split("");
      const next = ["", "", "", ""].map((_, idx) => arr[idx] ?? "");
      setDigits(next);
      if (text.length === 4) submit(text);
    }
  };

  const submit = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Incorrect code.");
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setDigits(["", "", "", ""]);
        refs[0].current?.focus();
        setLoading(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div
        className={`flex justify-center gap-3 ${shake ? "animate-[shake_0.4s]" : ""}`}
        style={
          shake
            ? ({ animation: "shake 0.4s" } as React.CSSProperties)
            : undefined
        }
        onPaste={onPaste}
      >
        {digits.map((d, i) => (
          <input
            key={i}
            ref={refs[i]}
            value={d}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            inputMode="numeric"
            type="password"
            maxLength={1}
            disabled={loading}
            autoFocus={i === 0}
            className={`h-16 w-14 rounded-2xl border bg-emerald-950/60 text-center text-2xl font-bold text-lime-200 outline-none transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-lime-300/40 ${
              error ? "border-rose-400/60" : "border-lime-300/20 focus:border-lime-300/60"
            }`}
          />
        ))}
      </div>

      {error && <p className="mt-4 text-center text-sm text-rose-300">{error}</p>}
      {loading && <p className="mt-4 text-center text-sm text-lime-300">Verifying…</p>}

      <button
        onClick={() => submit(digits.join(""))}
        disabled={loading || digits.some((d) => !d)}
        className="btn-sheen relative mt-6 w-full overflow-hidden rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 py-3.5 font-semibold text-emerald-950 shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:opacity-40"
      >
        Unlock Dashboard
      </button>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
