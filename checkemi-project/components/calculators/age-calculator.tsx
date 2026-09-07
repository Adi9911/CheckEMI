"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResultHighlight } from "./result-panel"
import { calcAge } from "@/lib/formulas"

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-4 text-center">
      <p className="text-2xl font-bold tabular-nums">{value.toLocaleString("en-IN")}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

export function AgeCalculator() {
  const [dob, setDob] = useState("2000-01-01")
  const today = new Date().toISOString().slice(0, 10)

  const result = useMemo(() => {
    const d = new Date(dob)
    if (Number.isNaN(d.getTime())) return null
    if (d.getTime() > Date.now()) return null
    return calcAge(d)
  }, [dob])

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="age-dob" className="text-sm text-muted-foreground">
            Date of Birth
          </Label>
          <Input
            id="age-dob"
            type="date"
            value={dob}
            max={today}
            onChange={(e) => setDob(e.target.value)}
            className="h-11"
          />
        </div>
        {result ? (
          <div className="grid grid-cols-3 gap-3">
            <Stat value={result.years} label="Years" />
            <Stat value={result.months} label="Months" />
            <Stat value={result.days} label="Days" />
          </div>
        ) : (
          <p className="text-sm text-destructive">Please choose a valid date that is not in the future.</p>
        )}
      </div>

      <div className="space-y-5">
        {result ? (
          <>
            <ResultHighlight
              label="Your Age"
              value={`${result.years} yr ${result.months} mo ${result.days} d`}
            />
            <div className="grid gap-3">
              <div className="rounded-xl border border-border bg-secondary/40 p-4">
                <p className="text-xs text-muted-foreground">Total days lived</p>
                <p className="mt-1 text-xl font-bold tabular-nums">{result.totalDays.toLocaleString("en-IN")}</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/40 p-4">
                <p className="text-xs text-muted-foreground">Next birthday in</p>
                <p className="mt-1 text-xl font-bold tabular-nums">{result.nextBirthdayInDays.toLocaleString("en-IN")} days</p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
