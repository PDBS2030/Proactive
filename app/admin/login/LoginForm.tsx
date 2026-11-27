"use client";

import { useActionState } from "react";
import { login } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-7 grid gap-5">
      <div>
        <label htmlFor="password" className="block text-[13px] font-semibold tracking-[.02em] text-white/80">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-1.5 block min-h-12 w-full border border-white/25 bg-white/8 px-4 text-[16px] text-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-white/35 hover:border-white/50 focus:border-gold focus:shadow-[0_0_0_3px_rgba(181,143,72,.3)]"
        />
      </div>
      {state?.error && (
        <p role="alert" className="text-[15px] text-[#ff9b9b]">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="relative isolate inline-flex min-h-12 cursor-pointer items-center justify-center overflow-hidden border border-gold bg-gold px-6 text-[.8125rem] font-semibold tracking-[.08em] text-[#04142a] uppercase transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:origin-right before:scale-x-0 before:bg-white before:transition-transform before:duration-300 hover:before:scale-x-100 disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
