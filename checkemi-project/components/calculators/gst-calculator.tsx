"use client"

import { useState } from "react"
import { SliderField } from "./slider-field"
import { BreakdownDonut } from "./breakdown-donut"
import { ResultHighlight, ResultRow } from "./result-panel"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { calcGST, formatINR } from "@/lib/formulas"
import { cn } from "@/lib/utils"

const C1 = "var(--chart-1)"
const C5 = "var(--chart-5)"
const GST_SLABS = [3, 5, 12, 18, 28]

export function GstCalculator() {
  const [amount, setAmount] = useState(25000)
  const [rate, setRate] = useState(18)
  const [inclusive, setInclusive] = useState(false)

  const { base, gst, total } = calcGST(amount, rate, inclusive)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Amount type</Label>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-secondary/60 p-1">
            <button
              type="button"
              onClick={() => setInclusive(false)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                !inclusive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground",
              )}
            >
              Exclusive of GST
            </button>
            <button
              type="button"
              onClick={() => setInclusive(true)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                inclusive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground",
              )}
            >
              Inclusive of GST
            </button>
          </div>
        </div>

        <SliderField
          id="gst-amount"
          label={inclusive ? "Gross Amount (with GST)" : "Net Amount (before GST)"}
          value={amount}
          onChange={setAmount}
          min={100}
          max={1000000}
          step={100}
          prefix={"\u20B9"}
        />

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">GST Slab</Label>
          <div className="flex flex-wrap gap-2">
            {GST_SLABS.map((slab) => (
              <Button
                key={slab}
                type="button"
                variant={rate === slab ? "default" : "outline"}
                size="sm"
                onClick={() => setRate(slab)}
              >
                {slab}%
              </Button>
            ))}
          </div>
        </div>

        <SliderField
          id="gst-rate"
          label="GST Rate"
          value={rate}
          onChange={setRate}
          min={0}
          max={100}
          step={0.5}
          suffix="%"
        />
        <p className="text-xs text-muted-foreground">
          Choose a common GST slab above or type any custom rate for your invoice.
        </p>
      </div>

      <div className="space-y-5">
        <ResultHighlight label={inclusive ? "Base Amount" : "Total (incl. GST)"} value={formatINR(inclusive ? base : total)} />
        <BreakdownDonut
          slices={[
            { key: "base", label: "Base Amount", value: base, color: C1 },
            { key: "gst", label: `GST (${rate}%)`, value: gst, color: C5 },
          ]}
          centerLabel="Total"
          centerValue={formatINR(total)}
        />
        <div>
          <ResultRow label="Base amount" value={formatINR(base)} accent={C1} />
          <ResultRow label={`GST @ ${rate}% (CGST + SGST)`} value={formatINR(gst)} accent={C5} />
          <ResultRow label="Total amount" value={formatINR(total)} />
        </div>
      </div>
    </div>
  )
}
