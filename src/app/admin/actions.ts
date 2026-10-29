"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, createSessionToken, credentialsMatch } from "@/lib/admin-auth.server";

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!credentialsMatch(username, password)) {
    // Small delay to slow down password guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    redirect("/admin/login?error=1");
  }

  const session = createSessionToken();
  if (!session) redirect("/admin/login?error=config");

  const store = await cookies();
  store.set(ADMIN_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    expires: session.expires,
  });
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin/login");
}
