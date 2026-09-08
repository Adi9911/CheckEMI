import type { ReactNode } from "react"
import { cn } from ""@/lib/utils""

export function ResultPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-secondary/40 p-5", className)}>{children}</div>
  )
}

export function ResultHighlight({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-primary px-5 py-4 text-primary-foreground">
      <p className="text-xs font-medium uppercase tracking-wide opacity-80">{label}</p>
      <p className="mt-1 text-3xl font-bold tabular-nums">{value}</p>
    </div>
  )
}

export function ResultRow({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 py-2.5 last:border-0">
      <div className="flex items-center gap-2">
        {accent ? <span className="size-2.5 rounded-full" style={{ backgroundColor: accent }} aria-hidden /> : null}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="text-sm font-semibold tabular-nums">{value}</span>
    </div>
  )
}
