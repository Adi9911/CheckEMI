"use client"

import { useState } from "react"
import { Landmark, TrendingUp, Coins, PiggyBank, Banknote, Repeat, Receipt, CalendarClock, ReceiptIndianRupee, BadgeIndianRupee, Car, Umbrella, ShieldCheck, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from ""@/lib/utils""
import { EmiCalculator } from "./emi-calculator"
import { SipCalculator } from "./sip-calculator"
import { LumpsumCalculator } from "./lumpsum-calculator"
import { PpfCalculator } from "./ppf-calculator"
import { FdCalculator } from "./fd-calculator"
import { RdCalculator } from "./rd-calculator"
import { GstCalculator } from "./gst-calculator"
import { AgeCalculator } from "./age-calculator"
import { IncomeTaxCalculator } from "./income-tax-calculator"
import { EligibilityCalculator } from "./eligibility-calculator"
import { CarLoanCalculator } from "./car-loan-calculator"
import { RetirementCalculator } from "./retirement-calculator"
import { NpsCalculator } from "./nps-calculator"
import { BillCalculator } from "./bill-calculator"

const TABS = [
  { id: "emi", label: "EMI", icon: Landmark, title: "EMI Calculator", desc: "Estimate the monthly instalment for any home, car or personal loan.", Comp: EmiCalculator },
  { id: "carloan", label: "Car Loan", icon: Car, title: "Car Loan Calculator", desc: "Work out the EMI on a vehicle loan after your down payment.", Comp: CarLoanCalculator },
  { id: "eligibility", label: "Eligibility", icon: BadgeIndianRupee, title: "Home Loan Eligibility", desc: "Find out how much loan you qualify for based on your income.", Comp: EligibilityCalculator },
  { id: "tax", label: "Income Tax", icon: ReceiptIndianRupee, title: "Income Tax Calculator", desc: "Compare the new and old regime and estimate your tax for FY 2025-26.", Comp: IncomeTaxCalculator },
  { id: "sip", label: "SIP", icon: TrendingUp, title: "SIP Calculator", desc: "Project the future value of your monthly mutual fund investments.", Comp: SipCalculator },
  { id: "lumpsum", label: "Lumpsum", icon: Coins, title: "Lumpsum Calculator", desc: "See how a one-time investment grows over time.", Comp: LumpsumCalculator },
  { id: "retirement", label: "Retirement", icon: Umbrella, title: "Retirement Calculator", desc: "Estimate the corpus you need to retire comfortably.", Comp: RetirementCalculator },
  { id: "nps", label: "NPS", icon: ShieldCheck, title: "NPS Calculator", desc: "Project your National Pension System corpus and monthly pension.", Comp: NpsCalculator },
  { id: "ppf", label: "PPF", icon: PiggyBank, title: "PPF Calculator", desc: "Plan your tax-free Public Provident Fund savings.", Comp: PpfCalculator },
  { id: "fd", label: "FD", icon: Banknote, title: "FD Calculator", desc: "Calculate maturity on a fixed deposit with quarterly compounding.", Comp: FdCalculator },
  { id: "rd", label: "RD", icon: Repeat, title: "RD Calculator", desc: "Find the maturity value of a recurring deposit.", Comp: RdCalculator },
  { id: "gst", label: "GST", icon: Receipt, title: "GST Calculator", desc: "Add or remove GST and split the tax instantly.", Comp: GstCalculator },
  { id: "age", label: "Age", icon: CalendarClock, title: "Age Calculator", desc: "Work out your exact age in years, months and days.", Comp: AgeCalculator },
  { id: "bill", label: "Bill Split", icon: Calculator, title: "Bill, Tip & Split Calculator", desc: "Apply discount, GST, service charge and tip, then split the bill your way.", Comp: BillCalculator },
]

export function CalculatorHub({ initialActive = "emi" }: { initialActive?: string }) {
  const [active, setActive] = useState(initialActive)
  const current = TABS.find((t) => t.id === active) ?? TABS[0]
  const Comp = current.Comp

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7" aria-label="Calculator choices">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              aria-pressed={isActive}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-all",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              <Icon className="size-5" aria-hidden />
              {tab.label}
            </button>
          )
        })}
      </div>

      <Card className="border-primary/20 shadow-md shadow-primary/5">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="text-xl">{current.title}</CardTitle>
              <CardDescription className="mt-1">{current.desc}</CardDescription>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Instant results</span>
          </div>
        </CardHeader>
        <CardContent>
          <Comp />
        </CardContent>
      </Card>
    </div>
  )
}
