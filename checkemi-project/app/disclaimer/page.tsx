import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Financial Disclaimer",
  description: "Important disclaimer for CheckEMI loan, tax, GST and investment calculator results.",
}

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Financial Disclaimer</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        CheckEMI is an independent educational website. The calculators are intended to help you understand possible
        scenarios; they are not a substitute for official statements, tax filings or professional advice.
      </p>
      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-lg font-semibold">Loans and EMIs</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Actual EMI can vary because of lender policies, processing fees, insurance, taxes, prepayments, daily
            balances, rate changes and rounding.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Investments and pensions</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            SIP, lumpsum, NPS, PPF, FD, RD and retirement results use assumptions. Market-linked returns are not
            guaranteed, and government or bank rates can change.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Tax and GST</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Tax and GST calculations are simplified estimates. Rules, slabs, exemptions and compliance requirements can
            change. Check the latest official guidance before submitting a return or invoice.
          </p>
        </section>
      </div>
    </main>
  )
}