import { LoginForm } from "./LoginForm";
import { grid } from "../ui";
import { BrandLockup } from "@/components/BrandLockup";
import { adminConfigured } from "@/lib/admin-auth";

export default function LoginPage() {
  return (
    <main className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-[#04142a] px-5 py-16 text-white">
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={grid("dark")} />
      <span aria-hidden="true" className="absolute -right-32 -bottom-48 -z-10 h-[520px] w-[80%] rounded-full opacity-90 blur-[130px]" style={{ background: "linear-gradient(270deg,#f7bd2f 0%,#e3a93a 9%,#2a5cf0 38%,#123f9e 70%,#082b52 100%)" }} />
      <div className="w-full max-w-[440px] border border-white/15 bg-[#04142a]/70 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] backdrop-blur-md min-[520px]:p-10">
        <BrandLockup light className="w-[220px]" />
        <p className="mt-10 text-[12px] font-semibold tracking-[.22em] text-gold uppercase">Admin</p>
        <h1 className="mt-2 font-sans text-[40px] leading-[1.05] font-extralight">Welcome back.</h1>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="mt-4 text-[15px] leading-[1.6] text-white/80">
            The dashboard needs three settings: <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD</code> and <code>ADMIN_SECRET</code>. Add them to <code>.env.local</code> (or to the host&apos;s environment) and restart.
          </p>
        )}
      </div>
    </main>
  );
}
