"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { BreakdownDonut } from "./breakdown-donut"
import { ResultHighlight, ResultRow } from "./result-panel"
import { calcSIP, formatINR } from "@/lib/formulas"

const C1 = "var(--chart-1)"
const C2 = "var(--chart-2)"

export function SipCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(15)

  const { futureValue, invested, gain } = calcSIP(monthly, rate, years)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <SliderField
          id="sip-monthly"
          label="Monthly Investment"
          value={monthly}
          onChange={setMonthly}
          min={500}
           max={1000000}
          step={500}
          prefix={"\u20B9"}
        />
        <SliderField
          id="sip-rate"
          label="Expected Return (p.a.)"
          value={rate}
          onChange={setRate}
           min={0}
           max={100}
          step={0.5}
          suffix="%"
        />
        <SliderField
          id="sip-years"
          label="Time Period"
          value={years}
          onChange={setYears}
          min={1}
           max={60}
          step={1}
          suffix=" yr"
        />
      </div>

      <div className="space-y-5">
        <ResultHighlight label="Maturity Value" value={formatINR(futureValue)} />
        <BreakdownDonut
          slices={[
            { key: "invested", label: "Invested", value: invested, color: C1 },
            { key: "gain", label: "Est. Returns", value: gain, color: C2 },
          ]}
          centerLabel="Total Value"
          centerValue={formatINR(futureValue)}
        />
        <div>
          <ResultRow label="Invested amount" value={formatINR(invested)} accent={C1} />
          <ResultRow label="Estimated returns" value={formatINR(gain)} accent={C2} />
          <ResultRow label="Maturity value" value={formatINR(futureValue)} />
        </div>
      </div>
    </div>
  )
}
