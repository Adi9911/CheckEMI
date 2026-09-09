"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { BreakdownDonut } from "./breakdown-donut"
import { ResultHighlight, ResultRow } from "./result-panel"
import { calcIncomeTax, formatINR, type TaxRegime } from "@/lib/formulas"
import { cn } from "../../lib/utils"

const C1 = "var(--chart-1)"
const C4 = "var(--chart-4)"

export function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1200000)
  const [deductions, setDeductions] = useState(150000)
  const [regime, setRegime] = useState<TaxRegime>("new")

  const result = calcIncomeTax(income, regime, deductions)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="space-y-2.5">
          <span className="text-sm text-muted-foreground">Tax Regime (FY 2025-26 / AY 2026-27)</span>
          <div className="grid grid-cols-2 gap-2">
            {(["new", "old"] as TaxRegime[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegime(r)}
                aria-pressed={regime === r}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-sm font-medium capitalize transition-all",
                  regime === r
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {r} Regime
              </button>
            ))}
          </div>
        </div>
        <SliderField
          id="tax-income"
          label="Gross Annual Income"
          value={income}
          onChange={setIncome}
          min={300000}
          max={10000000}
          step={50000}
          prefix={"\u20B9"}
        />
        <SliderField
          id="tax-deductions"
          label="Deductions (80C, 80D, etc.)"
          value={deductions}
          onChange={setDeductions}
          min={0}
          max={500000}
          step={5000}
          prefix={"\u20B9"}
        />
        {regime === "new" ? (
            <p className="rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
              The new regime ignores most deductions but applies a {formatINR(75000)} standard deduction and a
              Section 87A rebate up to {formatINR(1200000)} taxable income. Use this as an estimate, not tax advice.
          </p>
        ) : null}
      </div>

      <div className="space-y-5">
        <ResultHighlight label="Total Tax Payable" value={formatINR(result.totalTax)} />
        <BreakdownDonut
          slices={[
            { key: "takehome", label: "Take-home", value: result.takeHome, color: C1 },
            { key: "tax", label: "Tax", value: result.totalTax, color: C4 },
          ]}
          centerLabel="Take-home"
          centerValue={formatINR(result.takeHome)}
        />
        <div>
          <ResultRow label="Taxable income" value={formatINR(result.taxableIncome)} />
          <ResultRow label="Tax before rebate" value={formatINR(result.taxBeforeRebate)} />
          {result.rebate > 0 ? <ResultRow label="Rebate (87A)" value={"-" + formatINR(result.rebate)} /> : null}
          <ResultRow label="Health & edu cess (4%)" value={formatINR(result.cess)} accent={C4} />
          <ResultRow label="Total tax" value={formatINR(result.totalTax)} accent={C4} />
          <ResultRow label="Net take-home" value={formatINR(result.takeHome)} accent={C1} />
        </div>
      </div>
    </div>
  )
}
