"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { BreakdownDonut } from "./breakdown-donut"
import { ResultHighlight, ResultRow } from "./result-panel"
import { calcBill, formatINR } from "@/lib/formulas"

const C1 = "var(--chart-1)"
const C2 = "var(--chart-2)"
const C3 = "var(--chart-3)"
const C4 = "var(--chart-4)"

export function BillCalculator() {
  const [subtotal, setSubtotal] = useState(2500)
  const [discountRate, setDiscountRate] = useState(0)
  const [taxRate, setTaxRate] = useState(18)
  const [serviceChargeRate, setServiceChargeRate] = useState(0)
  const [tipRate, setTipRate] = useState(0)
  const [people, setPeople] = useState(1)

  const result = calcBill(subtotal, discountRate, taxRate, serviceChargeRate, tipRate, people)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <SliderField
          id="bill-subtotal"
          label="Bill Subtotal"
          value={subtotal}
          onChange={setSubtotal}
          min={0}
          max={10000000}
          step={50}
          prefix={"₹"}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <SliderField
            id="bill-discount"
            label="Discount"
            value={discountRate}
            onChange={setDiscountRate}
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />
          <SliderField
            id="bill-tax"
            label="Tax / GST"
            value={taxRate}
            onChange={setTaxRate}
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />
          <SliderField
            id="bill-service"
            label="Service Charge"
            value={serviceChargeRate}
            onChange={setServiceChargeRate}
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />
          <SliderField
            id="bill-tip"
            label="Tip"
            value={tipRate}
            onChange={setTipRate}
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />
        </div>
        <SliderField
          id="bill-people"
          label="Split Between"
          value={people}
          onChange={setPeople}
          min={1}
          max={50}
          step={1}
          suffix=" people"
        />
        <p className="rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
          Discount is applied before tax, service charge and tip. Adjust every percentage to match your actual bill.
        </p>
      </div>

      <div className="space-y-5">
        <ResultHighlight label="Total Bill" value={formatINR(result.total)} />
        <BreakdownDonut
          slices={[
            { key: "base", label: "After discount", value: result.taxableAmount, color: C1 },
            { key: "tax", label: "Tax", value: result.tax, color: C2 },
            { key: "extras", label: "Charges & tip", value: result.serviceCharge + result.tip, color: C3 },
          ]}
          centerLabel="Each person"
          centerValue={formatINR(result.perPerson)}
        />
        <div>
          <ResultRow label="Bill subtotal" value={formatINR(result.subtotal)} />
          <ResultRow label="Discount" value={"-" + formatINR(result.discount)} accent={C4} />
          <ResultRow label="Tax / GST" value={formatINR(result.tax)} accent={C2} />
          <ResultRow label="Service charge + tip" value={formatINR(result.serviceCharge + result.tip)} accent={C3} />
          <ResultRow label={`Each person (${people})`} value={formatINR(result.perPerson)} />
        </div>
      </div>
    </div>
  )
}