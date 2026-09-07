"use client"

import { Cell, Label as RechartsLabel, Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { formatCompactINR } from "@/lib/formulas"

export interface DonutSlice {
  key: string
  label: string
  value: number
  color: string
}

interface BreakdownDonutProps {
  slices: DonutSlice[]
  centerLabel: string
  centerValue: string
}

export function BreakdownDonut({ slices, centerLabel, centerValue }: BreakdownDonutProps) {
  const config: ChartConfig = slices.reduce((acc, s) => {
    acc[s.key] = { label: s.label, color: s.color }
    return acc
  }, {} as ChartConfig)

  const data = slices.map((s) => ({ name: s.key, label: s.label, value: Math.max(0, s.value), fill: s.color }))

  return (
    <div className="flex flex-col items-center gap-4">
      <ChartContainer config={config} className="mx-auto aspect-square h-[190px] w-full max-w-[240px]">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name) => (
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="text-muted-foreground">{config[name as string]?.label ?? name}</span>
                    <span className="font-semibold tabular-nums">{formatCompactINR(Number(value))}</span>
                  </div>
                )}
              />
            }
          />
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} strokeWidth={3} paddingAngle={2}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
            <RechartsLabel
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) - 8} className="fill-muted-foreground text-[11px]">
                        {centerLabel}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 12} className="fill-foreground text-lg font-bold">
                        {centerValue}
                      </tspan>
                    </text>
                  )
                }
                return null
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {slices.map((s) => (
          <div key={s.key} className="flex items-center gap-2 text-sm">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: s.color }} aria-hidden />
            <span className="text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
