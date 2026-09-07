"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { BreakdownDonut } from "./breakdown-donut"
import { ResultHighlight, ResultRow } from "./result-panel"
import { calcNPS, formatINR } from "@/lib/formulas"

const C1 = "var(--chart-1)"
const C2 = "var(--chart-2)"
const C4 = "var(--chart-4)"

export function NpsCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [currentAge, setCurrentAge] = useState(30)
  const [expectedReturn, setExpectedReturn] = useState(10)
  const [annuityPercent, setAnnuityPercent] = useState(40)
  const [annuityRate, setAnnuityRate] = useState(6)

  const { totalCorpus, invested, gain, lumpSum, annuityCorpus, monthlyPension } = calcNPS(
    monthly,
    currentAge,
    expectedReturn,
    annuityPercent,
    annuityRate,
  )

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <SliderField
          id="nps-monthly"
          label="Monthly Contribution"
          value={monthly}
          onChange={setMonthly}
          min={500}
          max={200000}
          step={500}
          prefix={"\u20B9"}
        />
        <SliderField id="nps-age" label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={59} step={1} suffix=" yr" />
        <SliderField id="nps-return" label="Expected Return (p.a.)" value={expectedReturn} onChange={setExpectedReturn} min={0} max={30} step={0.5} suffix="%" />
        <div className="grid gap-6 sm:grid-cols-2">
          <SliderField id="nps-annuity" label="Annuity Portion" value={annuityPercent} onChange={setAnnuityPercent} min={40} max={100} step={5} suffix="%" />
          <SliderField id="nps-arate" label="Annuity Rate" value={annuityRate} onChange={setAnnuityRate} min={3} max={10} step={0.5} suffix="%" />
        </div>
        <p className="rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
          At 60 you must invest at least 40% of the corpus in an annuity for a monthly pension; the rest can be withdrawn
          tax-free as a lump sum.
        </p>
      </div>

      <div className="space-y-5">
        <ResultHighlight label="Monthly Pension" value={formatINR(monthlyPension)} />
        <BreakdownDonut
          slices={[
            { key: "invested", label: "Invested", value: invested, color: C1 },
            { key: "gain", label: "Returns", value: gain, color: C2 },
          ]}
          centerLabel="Total Corpus"
          centerValue={formatINR(totalCorpus)}
        />
        <div>
          <ResultRow label="Total invested" value={formatINR(invested)} accent={C1} />
          <ResultRow label="Wealth gained" value={formatINR(gain)} accent={C2} />
          <ResultRow label="Corpus at 60" value={formatINR(totalCorpus)} />
          <ResultRow label="Lump sum withdrawal" value={formatINR(lumpSum)} />
          <ResultRow label="Annuity investment" value={formatINR(annuityCorpus)} accent={C4} />
        </div>
      </div>
    </div>
  )
}
