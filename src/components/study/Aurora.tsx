"use client";

/** Floating gradient orbs + subtle moving grid — the ambient motion layer. */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 grid-bg" />
      <div
        className="animate-drift absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.12 85 / 0.22), transparent 65%)" }}
      />
      <div
        className="animate-drift absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.12 200 / 0.16), transparent 65%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="animate-drift absolute -bottom-48 right-1/4 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.13 162 / 0.13), transparent 65%)",
          animationDelay: "-12s",
        }}
      />
      <div
        className="animate-floaty absolute top-[22%] left-[12%] h-2.5 w-2.5 rounded-full bg-gold/70"
        style={{ boxShadow: "0 0 18px 4px oklch(0.82 0.12 85 / 0.5)" }}
      />
      <div
        className="animate-floaty absolute top-[58%] right-[18%] h-2 w-2 rounded-full bg-emerald-400/70"
        style={{ animationDelay: "-2.5s", boxShadow: "0 0 16px 4px oklch(0.75 0.15 162 / 0.5)" }}
      />
      <div
        className="animate-floaty absolute top-[13%] right-[5%] h-1.5 w-1.5 rounded-full bg-rose-400/50"
        style={{ animationDelay: "-4.5s", boxShadow: "0 0 14px 3px oklch(0.68 0.19 22 / 0.4)" }}
      />
    </div>
  );
}
