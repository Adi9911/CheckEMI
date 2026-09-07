"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { BreakdownDonut } from "./breakdown-donut"
import { ResultHighlight, ResultRow } from "./result-panel"
import { AmortizationSchedule } from "./amortization-schedule"
import { calcEMI, formatINR } from "@/lib/formulas"

const C1 = "var(--chart-1)"
const C4 = "var(--chart-4)"

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(2500000)
  const [rate, setRate] = useState(9)
  const [years, setYears] = useState(20)

  const { emi, totalInterest, totalPayment } = calcEMI(principal, rate, years)

  return (
    <>
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <SliderField
          id="emi-principal"
          label="Loan Amount"
          value={principal}
          onChange={setPrincipal}
          min={50000}
           max={100000000}
          step={50000}
          prefix={"\u20B9"}
        />
        <SliderField
          id="emi-rate"
          label="Interest Rate (p.a.)"
          value={rate}
          onChange={setRate}
           min={0}
           max={50}
          step={0.05}
          suffix="%"
        />
        <SliderField
          id="emi-tenure"
          label="Loan Tenure"
          value={years}
          onChange={setYears}
          min={1}
           max={40}
          step={1}
          suffix=" yr"
        />
      </div>

      <div className="space-y-5">
        <ResultHighlight label="Monthly EMI" value={formatINR(emi)} />
        <BreakdownDonut
          slices={[
            { key: "principal", label: "Principal", value: principal, color: C1 },
            { key: "interest", label: "Interest", value: totalInterest, color: C4 },
          ]}
          centerLabel="Total Payable"
          centerValue={formatINR(totalPayment)}
        />
        <div>
          <ResultRow label="Principal amount" value={formatINR(principal)} accent={C1} />
          <ResultRow label="Total interest" value={formatINR(totalInterest)} accent={C4} />
          <ResultRow label="Total payment" value={formatINR(totalPayment)} />
        </div>
      </div>
    </div>
    <AmortizationSchedule principal={principal} rate={rate} years={years} />
    </>
  )
}
