export const FAQS = [
  {
    q: "How is the EMI calculated?",
    a: "EMI uses the standard reducing-balance formula: EMI = P \u00D7 r \u00D7 (1+r)^n / ((1+r)^n \u2212 1), where P is the principal, r is the monthly interest rate, and n is the number of monthly instalments.",
  },
  {
    q: "Are the SIP and lumpsum returns guaranteed?",
    a: "No. Market-linked investments do not guarantee returns. The expected return you enter is only an assumption used to project a possible future value for planning purposes.",
  },
  {
    q: "Do you store my financial data?",
    a: "Never. Every calculation happens entirely inside your browser. No amounts, rates or results are sent to a server or saved anywhere.",
  },
  {
    q: "Which compounding does the FD and RD calculator use?",
    a: "Both use quarterly compounding, which is the standard followed by most Indian banks for fixed and recurring deposits.",
  },
  {
    q: "Is CheckEMI free to use?",
    a: "Yes, every calculator on CheckEMI is completely free with no sign-up required.",
  },
]

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Frequently asked questions</h2>
      </div>
      <dl className="mt-10 space-y-3">
        {FAQS.map((item) => (
          <div key={item.q} className="rounded-2xl border border-border bg-card p-5">
            <dt className="font-semibold">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </section>
  )
}
