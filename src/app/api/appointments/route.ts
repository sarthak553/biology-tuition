import { db } from "@/db";
import { appointments } from "@/db/schema";
import { desc } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const SESSION_VALUE = "prithay-ray-teacher-verified";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const studentClass = String(body.studentClass ?? "").trim();
    const school = String(body.school ?? "").trim();
    const message = String(body.message ?? "").trim();
    const preferredTime = String(body.preferredTime ?? "").trim();

    if (!name || !phone || !studentClass || !school) {
      return Response.json(
        { ok: false, error: "Please fill in your name, phone, class and school." },
        { status: 400 }
      );
    }

    const [row] = await db
      .insert(appointments)
      .values({ name, phone, studentClass, school, message, preferredTime })
      .returning();

    return Response.json({ ok: true, appointment: row });
  } catch {
    return Response.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  const store = await cookies();
  if (store.get("teacher_session")?.value !== SESSION_VALUE) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const rows = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
    return Response.json({ ok: true, appointments: rows });
  } catch {
    return Response.json({ ok: false, error: "Failed to load appointments." }, { status: 500 });
  }
}
