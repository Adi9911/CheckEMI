"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { BreakdownDonut } from "./breakdown-donut"
import { ResultHighlight, ResultRow } from "./result-panel"
import { calcPPF, formatINR } from "@/lib/formulas"

const C1 = "var(--chart-1)"
const C3 = "var(--chart-3)"

export function PpfCalculator() {
  const [yearly, setYearly] = useState(100000)
  const [years, setYears] = useState(15)
  const [rate, setRate] = useState(7.1)

  const { maturity, invested, interest } = calcPPF(yearly, years, rate)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <SliderField
          id="ppf-yearly"
          label="Yearly Investment"
          value={yearly}
          onChange={setYearly}
          min={500}
          max={150000}
          step={500}
          prefix={"\u20B9"}
        />
        <SliderField
          id="ppf-years"
          label="Time Period"
          value={years}
          onChange={setYears}
          min={15}
          max={50}
          step={1}
          suffix=" yr"
        />
        <SliderField
          id="ppf-rate"
          label="Interest Rate (p.a.)"
          value={rate}
          onChange={setRate}
          min={5}
          max={9}
          step={0.1}
          suffix="%"
        />
        <p className="text-xs text-muted-foreground">
          Current government PPF rate is 7.1% p.a. with a minimum 15-year lock-in and a yearly cap of {"\u20B9"}1.5 lakh.
        </p>
      </div>

      <div className="space-y-5">
        <ResultHighlight label="Maturity Value" value={formatINR(maturity)} />
        <BreakdownDonut
          slices={[
            { key: "invested", label: "Invested", value: invested, color: C1 },
            { key: "interest", label: "Interest", value: interest, color: C3 },
          ]}
          centerLabel="Total Value"
          centerValue={formatINR(maturity)}
        />
        <div>
          <ResultRow label="Total invested" value={formatINR(invested)} accent={C1} />
          <ResultRow label="Total interest" value={formatINR(interest)} accent={C3} />
          <ResultRow label="Maturity value" value={formatINR(maturity)} />
        </div>
      </div>
    </div>
  )
}
