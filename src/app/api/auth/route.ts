import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const SECRET_CODE = "5636";
const SESSION_VALUE = "prithay-ray-teacher-verified";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = String(body.code ?? "").trim();
    if (code !== SECRET_CODE) {
      return Response.json({ ok: false, error: "Incorrect secret code." }, { status: 401 });
    }
    const store = await cookies();
    store.set("teacher_session", SESSION_VALUE, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE() {
  const store = await cookies();
  store.delete("teacher_session");
  return Response.json({ ok: true });
}
