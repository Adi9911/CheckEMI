"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { ResultHighlight, ResultRow } from "./result-panel"
import { calcRetirement, formatINR } from "@/lib/formulas"

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [monthlyExpense, setMonthlyExpense] = useState(50000)
  const [inflation, setInflation] = useState(6)
  const [postReturn, setPostReturn] = useState(8)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)

  const { corpusNeeded, monthlyExpenseAtRetirement, yearsInRetirement } = calcRetirement(
    currentAge,
    retirementAge,
    monthlyExpense,
    inflation,
    postReturn,
    lifeExpectancy,
  )

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <SliderField id="ret-current" label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={59} step={1} suffix=" yr" />
          <SliderField id="ret-retire" label="Retirement Age" value={retirementAge} onChange={setRetirementAge} min={40} max={70} step={1} suffix=" yr" />
        </div>
        <SliderField
          id="ret-expense"
          label="Current Monthly Expense"
          value={monthlyExpense}
          onChange={setMonthlyExpense}
          min={10000}
          max={500000}
          step={5000}
          prefix={"\u20B9"}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <SliderField id="ret-infl" label="Inflation" value={inflation} onChange={setInflation} min={2} max={12} step={0.5} suffix="%" />
          <SliderField id="ret-return" label="Post-retire Return" value={postReturn} onChange={setPostReturn} min={4} max={15} step={0.5} suffix="%" />
        </div>
        <SliderField id="ret-life" label="Life Expectancy" value={lifeExpectancy} onChange={setLifeExpectancy} min={70} max={100} step={1} suffix=" yr" />
      </div>

      <div className="space-y-5">
        <ResultHighlight label="Corpus Needed at Retirement" value={formatINR(corpusNeeded)} />
        <div>
          <ResultRow label="Years to retirement" value={`${Math.max(0, retirementAge - currentAge)} yr`} />
          <ResultRow label="Years in retirement" value={`${yearsInRetirement} yr`} />
          <ResultRow label="Monthly expense at retirement" value={formatINR(monthlyExpenseAtRetirement)} />
          <ResultRow label="Required corpus" value={formatINR(corpusNeeded)} />
        </div>
        <p className="rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
          Assumes your expenses grow with inflation until retirement, then your corpus earns a post-retirement return
          while funding an inflation-adjusted income for life.
        </p>
      </div>
    </div>
  )
}
