"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { BreakdownDonut } from "./breakdown-donut"
import { ResultHighlight, ResultRow } from "./result-panel"
import { calcFD, formatINR } from "@/lib/formulas"

const C1 = "var(--chart-1)"
const C3 = "var(--chart-3)"

export function FdCalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)

  const { maturity, invested, interest } = calcFD(principal, rate, years)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <SliderField
          id="fd-principal"
          label="Total Investment"
          value={principal}
          onChange={setPrincipal}
          min={5000}
           max={100000000}
          step={5000}
          prefix={"\u20B9"}
        />
        <SliderField
          id="fd-rate"
          label="Interest Rate (p.a.)"
          value={rate}
          onChange={setRate}
           min={0}
           max={50}
          step={0.1}
          suffix="%"
        />
        <SliderField
          id="fd-years"
          label="Time Period"
          value={years}
          onChange={setYears}
          min={1}
           max={30}
          step={1}
          suffix=" yr"
        />
        <p className="text-xs text-muted-foreground">Assumes quarterly compounding, as used by most Indian banks.</p>
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
          <ResultRow label="Invested amount" value={formatINR(invested)} accent={C1} />
          <ResultRow label="Interest earned" value={formatINR(interest)} accent={C3} />
          <ResultRow label="Maturity value" value={formatINR(maturity)} />
        </div>
      </div>
    </div>
  )
}
