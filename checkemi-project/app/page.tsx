import { Hero } from "@/components/hero"
import { CalculatorHub } from "@/components/calculators/calculator-hub"
import { Features } from "@/components/features"
import { Faq } from "@/components/faq"

export default function Page() {
  return (
    <main>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="calculators">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Your money toolkit</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Choose a calculator</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              From your first home-loan estimate to long-term retirement planning, get a useful answer in seconds.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">14 free tools · no sign-up</p>
        </div>
        <CalculatorHub />
      </section>
      <Features />
      <section id="why-checkemi" className="border-y border-border/60 bg-primary/[0.045]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Built for clarity</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Numbers you can understand, not just numbers you can copy.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              CheckEMI brings home-loan EMI, car-loan EMI, personal-loan EMI, SIP, PPF, FD, RD, GST and age planning
              into one calm, focused workspace.
            </p>
            <p>
              Use the results as a planning estimate, compare scenarios, and then confirm final terms with your bank,
              fund house or tax professional. CheckEMI is an educational tool — we do not offer loans or financial
              products.
            </p>
          </div>
        </div>
      </section>
      <div className="border-t border-border/60 bg-secondary/20">
        <Faq />
      </div>
    </main>
  )
}
