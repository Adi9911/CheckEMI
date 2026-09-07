import { Gauge, Lock, LineChart, Smartphone } from "lucide-react"

const FEATURES = [
  {
    icon: Gauge,
    title: "Accurate formulas",
    desc: "Standard banking formulas with monthly and quarterly compounding done right.",
  },
  {
    icon: LineChart,
    title: "Visual breakdowns",
    desc: "Interactive donut charts show exactly where your money goes.",
  },
  {
    icon: Lock,
    title: "Completely private",
    desc: "Every calculation runs in your browser. We store nothing.",
  },
  {
    icon: Smartphone,
    title: "Works everywhere",
    desc: "Responsive, fast and touch-friendly on phone, tablet and desktop.",
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Why CheckEMI</h2>
        <p className="mt-3 text-muted-foreground">
          A modern take on the everyday calculators millions of Indians rely on.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => {
          const Icon = f.icon
          return (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
