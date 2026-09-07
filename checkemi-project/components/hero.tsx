import Link from "next/link"
import { ArrowDown, ArrowRight, ShieldCheck, Zap, IndianRupee } from "lucide-react"

const BADGES = [
  { icon: IndianRupee, label: "Built for India" },
  { icon: Zap, label: "Instant results" },
  { icon: ShieldCheck, label: "100% private" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--primary) 22%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <ShieldCheck className="size-3.5" aria-hidden />
          Free financial calculators for India
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Check before you <span className="text-primary">pay</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Make confident money decisions with fast, accurate calculators for loans, investments, taxes and everyday
          planning. See the numbers clearly, with nothing leaving your device.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#calculators"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
          >
            Explore calculators
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="#why-checkemi"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Why CheckEMI?
            <ArrowDown className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {BADGES.map((b) => {
            const Icon = b.icon
            return (
              <span
                key={b.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
              >
                <Icon className="size-4 text-primary" aria-hidden />
                {b.label}
              </span>
            )
          })}
        </div>
        <p className="mt-7 text-xs text-muted-foreground">
          Developed by <span className="font-semibold text-foreground">Aditya Softwares</span>
        </p>
      </div>
    </section>
  )
}
