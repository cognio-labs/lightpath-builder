import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { adminConfigured, isAdmin } from "@/lib/admin-auth.server";
import { login } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  const configured = adminConfigured();

  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <form
        action={login}
        className="w-full max-w-sm space-y-4 rounded-3xl border border-[#E8D6B5] bg-white p-8 shadow-xl"
      >
        <div className="text-center">
          <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#521623] text-white">
            <LockKeyhole size={20} />
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#521623]">Donations Admin</h1>
          <p className="mt-1 text-xs text-[#7A6165]">Shiksha · Annapurna · Nirman Sewa</p>
        </div>

        {!configured && (
          <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Set <code>ADMIN_USERNAME</code> and <code>ADMIN_PASSWORD</code> in the environment, then restart the server.
          </p>
        )}
        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
            {error === "config" ? "Admin login is not configured." : "Wrong username or password."}
          </p>
        )}

        <label className="block text-xs font-semibold text-[#5A4448]">
          Username
          <input
            name="username"
            autoComplete="username"
            required
            className="mt-1 w-full rounded-xl border border-[#E8D6B5] px-4 py-2.5 text-sm focus:border-[#521623] focus:outline-none"
          />
        </label>
        <label className="block text-xs font-semibold text-[#5A4448]">
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-xl border border-[#E8D6B5] px-4 py-2.5 text-sm focus:border-[#521623] focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={!configured}
          className="w-full rounded-full bg-[#521623] py-3 text-sm font-bold text-white hover:bg-[#3B0910] disabled:opacity-50"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
