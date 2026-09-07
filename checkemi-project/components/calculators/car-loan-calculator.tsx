"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { BreakdownDonut } from "./breakdown-donut"
import { ResultHighlight, ResultRow } from "./result-panel"
import { AmortizationSchedule } from "./amortization-schedule"
import { calcEMI, formatINR } from "@/lib/formulas"

const C1 = "var(--chart-1)"
const C4 = "var(--chart-4)"

export function CarLoanCalculator() {
  const [price, setPrice] = useState(1200000)
  const [downPayment, setDownPayment] = useState(200000)
  const [rate, setRate] = useState(9.5)
  const [years, setYears] = useState(7)

  const loanAmount = Math.max(0, price - downPayment)
  const { emi, totalInterest, totalPayment } = calcEMI(loanAmount, rate, years)

  return (
    <>
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <SliderField
          id="car-price"
          label="On-road Price"
          value={price}
          onChange={(next) => {
            setPrice(next)
            setDownPayment((current) => Math.min(current, next))
          }}
          min={100000}
          max={100000000}
          step={25000}
          prefix={"\u20B9"}
        />
        <SliderField
          id="car-down"
          label="Down Payment"
          value={downPayment}
          onChange={setDownPayment}
          min={0}
          max={price}
          step={25000}
          prefix={"\u20B9"}
        />
        <SliderField
          id="car-rate"
          label="Interest Rate (p.a.)"
          value={rate}
          onChange={setRate}
          min={0}
          max={50}
          step={0.05}
          suffix="%"
        />
        <SliderField
          id="car-tenure"
          label="Loan Tenure"
          value={years}
          onChange={setYears}
          min={1}
          max={15}
          step={1}
          suffix=" yr"
        />
      </div>

      <div className="space-y-5">
        <ResultHighlight label="Monthly EMI" value={formatINR(emi)} />
        <BreakdownDonut
          slices={[
            { key: "principal", label: "Loan amount", value: loanAmount, color: C1 },
            { key: "interest", label: "Interest", value: totalInterest, color: C4 },
          ]}
          centerLabel="Total Payable"
          centerValue={formatINR(totalPayment)}
        />
        <div>
          <ResultRow label="Down payment" value={formatINR(downPayment)} />
          <ResultRow label="Loan amount" value={formatINR(loanAmount)} accent={C1} />
          <ResultRow label="Total interest" value={formatINR(totalInterest)} accent={C4} />
          <ResultRow label="Total payment" value={formatINR(totalPayment)} />
        </div>
      </div>
    </div>
    <AmortizationSchedule principal={loanAmount} rate={rate} years={years} />
    </>
  )
}
