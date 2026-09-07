"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { BreakdownDonut } from "./breakdown-donut"
import { ResultHighlight, ResultRow } from "./result-panel"
import { calcEligibility, calcEMI, formatINR } from "@/lib/formulas"

const C1 = "var(--chart-1)"
const C4 = "var(--chart-4)"

export function EligibilityCalculator() {
  const [income, setIncome] = useState(80000)
  const [existingEmi, setExistingEmi] = useState(0)
  const [rate, setRate] = useState(9)
  const [years, setYears] = useState(20)

  const { eligibleLoan, maxEmi } = calcEligibility(income, existingEmi, rate, years)
  const { totalInterest, totalPayment } = calcEMI(eligibleLoan, rate, years)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <SliderField
          id="elig-income"
          label="Net Monthly Income"
          value={income}
          onChange={setIncome}
          min={15000}
           max={10000000}
          step={5000}
          prefix={"\u20B9"}
        />
        <SliderField
          id="elig-existing"
          label="Existing Monthly EMIs"
          value={existingEmi}
          onChange={setExistingEmi}
          min={0}
           max={10000000}
          step={1000}
          prefix={"\u20B9"}
        />
        <SliderField
          id="elig-rate"
          label="Interest Rate (p.a.)"
          value={rate}
          onChange={setRate}
           min={0}
           max={50}
          step={0.05}
          suffix="%"
        />
        <SliderField
          id="elig-tenure"
          label="Loan Tenure"
          value={years}
          onChange={setYears}
          min={1}
           max={40}
          step={1}
          suffix=" yr"
        />
        <p className="rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
          Based on a 50% FOIR — lenders typically allow up to half of your net income to service all EMIs combined.
        </p>
      </div>

      <div className="space-y-5">
        <ResultHighlight label="Eligible Loan Amount" value={formatINR(eligibleLoan)} />
        <BreakdownDonut
          slices={[
            { key: "principal", label: "Loan amount", value: eligibleLoan, color: C1 },
            { key: "interest", label: "Interest", value: totalInterest, color: C4 },
          ]}
          centerLabel="Total Payable"
          centerValue={formatINR(totalPayment)}
        />
        <div>
          <ResultRow label="Max affordable EMI" value={formatINR(maxEmi)} />
          <ResultRow label="Eligible loan" value={formatINR(eligibleLoan)} accent={C1} />
          <ResultRow label="Total interest" value={formatINR(totalInterest)} accent={C4} />
          <ResultRow label="Total repayment" value={formatINR(totalPayment)} />
        </div>
      </div>
    </div>
  )
}
