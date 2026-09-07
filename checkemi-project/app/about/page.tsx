import type { Metadata } from "next"
import { Target, ShieldCheck, HeartHandshake } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about CheckEMI — a free suite of accurate, private financial calculators built to help Indians make smarter money decisions.",
}

const VALUES = [
  {
    icon: Target,
    title: "Accuracy first",
    desc: "Every calculator uses the exact formulas banks and financial institutions rely on, so you can trust the numbers.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by design",
    desc: "We never collect your financial inputs. All computation happens locally in your browser.",
  },
  {
    icon: HeartHandshake,
    title: "Always free",
    desc: "No subscriptions, no paywalls, no sign-ups. Good financial tools should be available to everyone.",
  },
]

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About CheckEMI</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        CheckEMI is a modern collection of financial calculators built for India. Whether you are planning a home loan,
        starting a SIP, or working out the maturity of a fixed deposit, our goal is to give you clear, accurate answers
        in seconds — with visual breakdowns that actually make sense.
      </p>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        We started CheckEMI because most calculators online are cluttered, slow, or hard to trust. We wanted something
        fast, beautiful and completely private. There is no account to create and nothing to install — just open the
        page and start planning your finances.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {VALUES.map((v) => {
          const Icon = v.icon
          return (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-semibold">{v.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6">
        <h2 className="font-semibold">A note on accuracy</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          CheckEMI is an educational tool. Results are estimates based on the inputs and assumptions you provide, and
          actual figures from your bank or fund house may differ slightly due to rounding, processing fees, or exact
          compounding dates. Always confirm final numbers with your financial institution before making a decision.
        </p>
      </div>
    </main>
  )
}
