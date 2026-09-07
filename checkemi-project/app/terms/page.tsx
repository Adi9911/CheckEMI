import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the free CheckEMI financial calculator and planning tools.",
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Terms of Use</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        CheckEMI provides free calculators for personal education and planning. By using the site, you agree that the
        results are estimates based on the information and assumptions you enter.
      </p>
      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-lg font-semibold">Educational use only</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            CheckEMI does not provide loans, investment products, tax filing, legal advice or financial advice. Always
            confirm final figures with the relevant bank, fund house, government portal or qualified professional.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Accuracy and availability</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            We aim to keep formulas and content useful, but rates, tax rules, fees and product terms can change. We do
            not guarantee that every result is suitable for your circumstances or that the site will always be available.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Acceptable use</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Do not misuse, disrupt or attempt to compromise the site. We may update these terms and calculator
            assumptions when the product or applicable rules change.
          </p>
        </section>
      </div>
    </main>
  )
}
