"use client"

import { useMemo, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChevronDown } from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { amortizationSchedule, formatCompactINR, formatINR } from "@/lib/formulas"
import { cn } from "@/lib/utils"

const chartConfig: ChartConfig = {
  principalPaid: { label: "Principal", color: "var(--chart-1)" },
  interestPaid: { label: "Interest", color: "var(--chart-4)" },
}

interface AmortizationScheduleProps {
  principal: number
  rate: number
  years: number
}

export function AmortizationSchedule({ principal, rate, years }: AmortizationScheduleProps) {
  const [open, setOpen] = useState(false)
  const rows = useMemo(() => amortizationSchedule(principal, rate, years), [principal, rate, years])

  const chartData = rows.map((r) => ({
    year: `Y${r.year}`,
    principalPaid: Math.round(r.principalPaid),
    interestPaid: Math.round(r.interestPaid),
  }))

  return (
    <div className="mt-8 space-y-5 border-t border-border pt-8">
      <div>
        <h3 className="text-lg font-semibold">Amortization schedule</h3>
        <p className="text-sm text-muted-foreground">
          How each year&apos;s payments split between principal and interest as your balance shrinks.
        </p>
      </div>

      <ChartContainer config={chartConfig} className="h-[240px] w-full">
        <AreaChart data={chartData} margin={{ left: 4, right: 8, top: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={11}
            width={54}
            tickFormatter={(v) => formatCompactINR(Number(v))}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="text-muted-foreground">{chartConfig[name as string]?.label ?? name}</span>
                    <span className="font-semibold tabular-nums">{formatINR(Number(value))}</span>
                  </div>
                )}
              />
            }
          />
          <defs>
            <linearGradient id="fillPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-principalPaid)" stopOpacity={0.7} />
              <stop offset="95%" stopColor="var(--color-principalPaid)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-interestPaid)" stopOpacity={0.7} />
              <stop offset="95%" stopColor="var(--color-interestPaid)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="interestPaid"
            type="natural"
            stackId="a"
            stroke="var(--color-interestPaid)"
            fill="url(#fillInterest)"
          />
          <Area
            dataKey="principalPaid"
            type="natural"
            stackId="a"
            stroke="var(--color-principalPaid)"
            fill="url(#fillPrincipal)"
          />
        </AreaChart>
      </ChartContainer>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary/70"
      >
        <span>{open ? "Hide" : "Show"} year-by-year table</span>
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {open ? (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-2.5 font-medium">Year</th>
                <th className="px-4 py-2.5 text-right font-medium">Principal</th>
                <th className="px-4 py-2.5 text-right font-medium">Interest</th>
                <th className="px-4 py-2.5 text-right font-medium">Total paid</th>
                <th className="px-4 py-2.5 text-right font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.year} className="border-b border-border/50 last:border-0 tabular-nums">
                  <td className="px-4 py-2.5 font-medium">{r.year}</td>
                  <td className="px-4 py-2.5 text-right">{formatINR(r.principalPaid)}</td>
                  <td className="px-4 py-2.5 text-right">{formatINR(r.interestPaid)}</td>
                  <td className="px-4 py-2.5 text-right">{formatINR(r.totalPaid)}</td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">{formatINR(r.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}
