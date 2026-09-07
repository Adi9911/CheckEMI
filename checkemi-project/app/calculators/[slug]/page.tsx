import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CalculatorHub } from "@/components/calculators/calculator-hub"
import { CALCULATOR_SEO_PAGES } from "@/lib/calculator-seo"
import { SITE_URL } from "@/lib/site"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return CALCULATOR_SEO_PAGES.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = CALCULATOR_SEO_PAGES.find((item) => item.slug === slug)
  if (!page) return {}

  return {
    title: page.title,
    description: page.description,
    keywords: [page.name, "India", "online calculator", "CheckEMI"],
    alternates: { canonical: `${SITE_URL}/calculators/${page.slug}` },
    openGraph: {
      title: `${page.title} | CheckEMI`,
      description: page.description,
      url: `${SITE_URL}/calculators/${page.slug}`,
      type: "article",
    },
  }
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params
  const page = CALCULATOR_SEO_PAGES.find((item) => item.slug === slug)
  if (!page) notFound()

  const faq = {
    "@type": "Question",
    name: `Is the CheckEMI ${page.name.toLowerCase()} result exact?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: `${page.name} results are estimates based on the values and assumptions you enter. Confirm final figures with your bank, fund house, tax professional or service provider.`,
    },
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/#calculators" className="hover:text-foreground">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{page.name}</span>
      </nav>

      <header className="mx-auto mt-8 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Free India calculator</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">{page.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{page.intro}</p>
      </header>

      <section className="mt-10" aria-label={`${page.name} tool`}>
        <CalculatorHub initialActive={page.id} />
      </section>

      <article className="mx-auto mt-14 max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-bold tracking-tight">How this {page.name.toLowerCase()} works</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{page.howItWorks}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-tight">What you can calculate</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {page.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="text-primary" aria-hidden>✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6">
          <h2 className="text-lg font-semibold">Important planning note</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            CheckEMI is a free educational tool. Results depend on your inputs and simplified assumptions. Actual bank,
            investment, tax, GST or bill amounts can differ because of product rules, rounding, dates, fees and legal
            changes. Verify important decisions with the relevant institution or a qualified professional.
          </p>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `CheckEMI ${page.name}`,
            url: `${SITE_URL}/calculators/${page.slug}`,
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            description: page.description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            mainEntity: faq,
          }),
        }}
      />
    </main>
  )
}