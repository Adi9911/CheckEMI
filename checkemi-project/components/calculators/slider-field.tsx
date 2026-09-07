"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

interface SliderFieldProps {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  prefix?: string
  suffix?: string
}

export function SliderField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: SliderFieldProps) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v))

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id} className="text-sm text-muted-foreground">
          {label}
        </Label>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/60 px-2 py-1 text-sm font-semibold tabular-nums">
          {prefix ? <span className="text-muted-foreground">{prefix}</span> : null}
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const next = Number.parseFloat(e.target.value)
              onChange(Number.isNaN(next) ? min : clamp(next))
            }}
            className="h-6 w-24 border-0 bg-transparent p-0 text-right shadow-none focus-visible:ring-0 md:w-28"
            aria-label={label}
          />
          {suffix ? <span className="text-muted-foreground">{suffix}</span> : null}
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(vals) => {
          const next = Array.isArray(vals) ? vals[0] : vals
          onChange(clamp(next))
        }}
        aria-label={label}
      />
      <div className="flex justify-between text-[11px] text-muted-foreground/70 tabular-nums">
        <span>
          {prefix}
          {min.toLocaleString("en-IN")}
          {suffix}
        </span>
        <span>
          {prefix}
          {max.toLocaleString("en-IN")}
          {suffix}
        </span>
      </div>
    </div>
  )
}
