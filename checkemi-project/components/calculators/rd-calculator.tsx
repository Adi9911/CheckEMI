"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { BreakdownDonut } from "./breakdown-donut"
import { ResultHighlight, ResultRow } from "./result-panel"
import { calcRD, formatINR } from "@/lib/formulas"

const C1 = "var(--chart-1)"
const C3 = "var(--chart-3)"

export function RdCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(5)

  const { maturity, invested, interest } = calcRD(monthly, rate, years)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <SliderField
          id="rd-monthly"
          label="Monthly Deposit"
          value={monthly}
          onChange={setMonthly}
          min={500}
           max={1000000}
          step={500}
          prefix={"\u20B9"}
        />
        <SliderField
          id="rd-rate"
          label="Interest Rate (p.a.)"
          value={rate}
          onChange={setRate}
           min={0}
           max={50}
          step={0.1}
          suffix="%"
        />
        <SliderField
          id="rd-years"
          label="Time Period"
          value={years}
          onChange={setYears}
          min={1}
           max={30}
          step={1}
          suffix=" yr"
        />
        <p className="text-xs text-muted-foreground">Recurring deposit with quarterly compounding.</p>
      </div>

      <div className="space-y-5">
        <ResultHighlight label="Maturity Value" value={formatINR(maturity)} />
        <BreakdownDonut
          slices={[
            { key: "invested", label: "Deposited", value: invested, color: C1 },
            { key: "interest", label: "Interest", value: interest, color: C3 },
          ]}
          centerLabel="Total Value"
          centerValue={formatINR(maturity)}
        />
        <div>
          <ResultRow label="Total deposited" value={formatINR(invested)} accent={C1} />
          <ResultRow label="Interest earned" value={formatINR(interest)} accent={C3} />
          <ResultRow label="Maturity value" value={formatINR(maturity)} />
        </div>
      </div>
    </div>
  )
}
