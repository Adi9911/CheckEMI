import Link from "next/link"
import { BadgeCheck } from "lucide-react"

const TOOLS = [
  { label: "EMI Calculator", href: "/calculators/emi-calculator" },
  { label: "Car Loan Calculator", href: "/calculators/car-loan-calculator" },
  { label: "Home Loan Eligibility", href: "/calculators/home-loan-eligibility-calculator" },
  { label: "Income Tax Calculator", href: "/calculators/income-tax-calculator" },
  { label: "SIP Calculator", href: "/calculators/sip-calculator" },
  { label: "Lumpsum Calculator", href: "/calculators/lumpsum-calculator" },
  { label: "Retirement Calculator", href: "/calculators/retirement-calculator" },
  { label: "NPS Calculator", href: "/calculators/nps-calculator" },
  { label: "PPF Calculator", href: "/calculators/ppf-calculator" },
  { label: "FD Calculator", href: "/calculators/fd-calculator" },
  { label: "RD Calculator", href: "/calculators/rd-calculator" },
  { label: "GST Calculator", href: "/calculators/gst-calculator" },
  { label: "Age Calculator", href: "/calculators/age-calculator" },
  { label: "Bill Split Calculator", href: "/calculators/bill-split-calculator" },
]

const PAGES = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/disclaimer", label: "Disclaimer" },
]

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/70 bg-secondary/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BadgeCheck className="size-4" aria-hidden />
            </span>
            <span className="text-base font-extrabold tracking-tight">
              Check<span className="text-primary">EMI</span>
            </span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Free, practical financial calculators for India — EMI, tax, GST, investments, bills and more. Every
            calculation runs privately in your browser. CheckEMI is an educational tool and does not offer loans or
            financial products.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Calculators</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {TOOLS.map((tool) => (
              <li key={tool.label}>
                <Link href={tool.href} className="transition-colors hover:text-foreground">
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {PAGES.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="transition-colors hover:text-foreground">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>&copy; {new Date().getFullYear()} CheckEMI. All rights reserved.</p>
          <p>
            Developed by <span className="font-semibold text-foreground">Aditya Softwares</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
