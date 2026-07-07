"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg transition-transform duration-300 hover:scale-105 disabled:opacity-50"
    >
      {loading ? "Logging out…" : "Log out"}
    </button>
  );
}
