import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { canWrite } from "@/lib/db";

/**
 * Sign-in for the admin dashboard. The admin email, the password and a signing secret live in .env.local (never in the code); a
 * successful sign-in sets a signed, http-only cookie that lasts a week. The dashboard is available only on the
 * developer's machine, and only when both settings are present.
 */
export const COOKIE = "pdbs_admin";
const DAY = 24 * 60 * 60 * 1000;

export const adminAvailable = () => canWrite;
export const adminConfigured = () => Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET);

const sign = (value: string) => createHmac("sha256", process.env.ADMIN_SECRET ?? "").update(value).digest("hex");
const digest = (value: string) => createHash("sha256").update(value).digest();

/** Signing in takes the admin's email address and the password. ADMIN_EMAIL may list several addresses, separated by commas; they share the one password. */
export function credentialsOk(email: string, password: string) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real || !process.env.ADMIN_SECRET || !process.env.ADMIN_EMAIL) return false;
  const given = email.trim().toLowerCase();
  const emailGood = process.env.ADMIN_EMAIL.split(",").some((e) => e.trim() !== "" && e.trim().toLowerCase() === given);
  // both are always checked, so a wrong email and a wrong password look the same
  const passwordGood = timingSafeEqual(digest(password), digest(real));
  return emailGood && passwordGood;
}

export async function startSession() {
  const expires = String(Date.now() + 7 * DAY);
  (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

export async function isAdmin() {
  if (!adminAvailable() || !adminConfigured()) return false;
  // the expiry check reads the clock, so this has to be decided at request time
  await connection();
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const good = sign(expires);
  return signature.length === good.length && timingSafeEqual(Buffer.from(signature), Buffer.from(good));
}
