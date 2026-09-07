// All financial formulas used across CheckEMI calculators.
// Calculations run entirely in the browser — no data leaves the device.

export const formatINR = (value: number): string =>
  "\u20B9" + Math.round(value).toLocaleString("en-IN")

// Compact Indian currency (K / Lakh / Crore) for tight labels.
export const formatCompactINR = (value: number): string => {
  const v = Math.round(value)
  if (v >= 1_00_00_000) return "\u20B9" + (v / 1_00_00_000).toFixed(2) + " Cr"
  if (v >= 1_00_000) return "\u20B9" + (v / 1_00_000).toFixed(2) + " L"
  if (v >= 1_000) return "\u20B9" + (v / 1_000).toFixed(1) + " K"
  return "\u20B9" + v.toLocaleString("en-IN")
}

export interface EmiResult {
  emi: number
  totalInterest: number
  totalPayment: number
  principal: number
}

export function calcEMI(principal: number, annualRate: number, years: number): EmiResult {
  const r = annualRate / 12 / 100
  const n = years * 12
  if (n === 0) return { emi: 0, totalInterest: 0, totalPayment: 0, principal }
  if (r === 0) {
    const emi = principal / n
    return { emi, totalInterest: 0, totalPayment: principal, principal }
  }
  const pow = Math.pow(1 + r, n)
  const emi = (principal * r * pow) / (pow - 1)
  const totalPayment = emi * n
  return { emi, totalInterest: totalPayment - principal, totalPayment, principal }
}

export interface SipResult {
  futureValue: number
  invested: number
  gain: number
}

export function calcSIP(monthly: number, annualRate: number, years: number): SipResult {
  const i = annualRate / 12 / 100
  const n = years * 12
  const invested = monthly * n
  if (i === 0) return { futureValue: invested, invested, gain: 0 }
  const futureValue = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
  return { futureValue, invested, gain: futureValue - invested }
}

// Lumpsum one-time investment growth.
export interface LumpsumResult {
  futureValue: number
  invested: number
  gain: number
}

export function calcLumpsum(amount: number, annualRate: number, years: number): LumpsumResult {
  const futureValue = amount * Math.pow(1 + annualRate / 100, years)
  return { futureValue, invested: amount, gain: futureValue - amount }
}

export interface PpfResult {
  maturity: number
  invested: number
  interest: number
}

// PPF compounds annually; deposit made at the start of each year.
export function calcPPF(yearly: number, years: number, rate = 7.1): PpfResult {
  let balance = 0
  for (let k = 0; k < years; k++) {
    balance = (balance + yearly) * (1 + rate / 100)
  }
  const invested = yearly * years
  return { maturity: balance, invested, interest: balance - invested }
}

export interface FdResult {
  maturity: number
  invested: number
  interest: number
}

// FD with quarterly compounding (standard for Indian banks).
export function calcFD(principal: number, annualRate: number, years: number, compoundsPerYear = 4): FdResult {
  const maturity = principal * Math.pow(1 + annualRate / 100 / compoundsPerYear, compoundsPerYear * years)
  return { maturity, invested: principal, interest: maturity - principal }
}

export interface RdResult {
  maturity: number
  invested: number
  interest: number
}

// RD with quarterly compounding applied to each monthly deposit.
export function calcRD(monthly: number, annualRate: number, years: number): RdResult {
  const n = years * 12
  const i = annualRate / 400 // quarterly rate
  let maturity = 0
  for (let m = 1; m <= n; m++) {
    const quartersRemaining = (n - m + 1) / 3
    maturity += monthly * Math.pow(1 + i, quartersRemaining)
  }
  const invested = monthly * n
  return { maturity, invested, interest: maturity - invested }
}

export interface GstResult {
  base: number
  gst: number
  total: number
}

export interface BillResult {
  subtotal: number
  discount: number
  taxableAmount: number
  serviceCharge: number
  tax: number
  tip: number
  total: number
  perPerson: number
}

export function calcBill(
  subtotal: number,
  discountRate: number,
  taxRate: number,
  serviceChargeRate: number,
  tipRate: number,
  people = 1,
): BillResult {
  const discount = (subtotal * discountRate) / 100
  const taxableAmount = Math.max(0, subtotal - discount)
  const serviceCharge = (taxableAmount * serviceChargeRate) / 100
  const tax = (taxableAmount * taxRate) / 100
  const tip = (taxableAmount * tipRate) / 100
  const total = taxableAmount + serviceCharge + tax + tip
  return {
    subtotal,
    discount,
    taxableAmount,
    serviceCharge,
    tax,
    tip,
    total,
    perPerson: total / Math.max(1, people),
  }
}

export function calcGST(amount: number, rate: number, inclusive = false): GstResult {
  if (inclusive) {
    const base = amount / (1 + rate / 100)
    return { base, gst: amount - base, total: amount }
  }
  const gst = (amount * rate) / 100
  return { base: amount, gst, total: amount + gst }
}

// ---- Amortization schedule (per year) ----
export interface AmortRow {
  year: number
  principalPaid: number
  interestPaid: number
  totalPaid: number
  balance: number
}

export function amortizationSchedule(principal: number, annualRate: number, years: number): AmortRow[] {
  const r = annualRate / 12 / 100
  const n = years * 12
  const { emi } = calcEMI(principal, annualRate, years)
  const rows: AmortRow[] = []
  let balance = principal

  for (let y = 1; y <= years; y++) {
    let yearPrincipal = 0
    let yearInterest = 0
    for (let m = 0; m < 12 && (y - 1) * 12 + m < n; m++) {
      const interest = r === 0 ? 0 : balance * r
      const principalComponent = emi - interest
      yearInterest += interest
      yearPrincipal += principalComponent
      balance -= principalComponent
    }
    rows.push({
      year: y,
      principalPaid: yearPrincipal,
      interestPaid: yearInterest,
      totalPaid: yearPrincipal + yearInterest,
      balance: Math.max(0, balance),
    })
  }
  return rows
}

// ---- Income Tax (India, FY 2025-26 / AY 2026-27) ----
export type TaxRegime = "new" | "old"

export interface TaxSlabDetail {
  range: string
  rate: number
  tax: number
}

export interface TaxResult {
  grossIncome: number
  standardDeduction: number
  taxableIncome: number
  taxBeforeRebate: number
  rebate: number
  taxAfterRebate: number
  cess: number
  totalTax: number
  takeHome: number
  slabDetails: TaxSlabDetail[]
}

interface Slab {
  upTo: number
  rate: number
}

const NEW_SLABS: Slab[] = [
  { upTo: 400000, rate: 0 },
  { upTo: 800000, rate: 5 },
  { upTo: 1200000, rate: 10 },
  { upTo: 1600000, rate: 15 },
  { upTo: 2000000, rate: 20 },
  { upTo: 2400000, rate: 25 },
  { upTo: Number.POSITIVE_INFINITY, rate: 30 },
]

const OLD_SLABS: Slab[] = [
  { upTo: 250000, rate: 0 },
  { upTo: 500000, rate: 5 },
  { upTo: 1000000, rate: 20 },
  { upTo: Number.POSITIVE_INFINITY, rate: 30 },
]

export function calcIncomeTax(grossIncome: number, regime: TaxRegime, deductions = 0): TaxResult {
  const standardDeduction = regime === "new" ? 75000 : 50000
  const totalDeductions = standardDeduction + (regime === "old" ? deductions : 0)
  const taxableIncome = Math.max(0, grossIncome - totalDeductions)

  const slabs = regime === "new" ? NEW_SLABS : OLD_SLABS
  const slabDetails: TaxSlabDetail[] = []
  let tax = 0
  let lower = 0

  for (const slab of slabs) {
    if (taxableIncome > lower) {
      const taxableInSlab = Math.min(taxableIncome, slab.upTo) - lower
      const slabTax = (taxableInSlab * slab.rate) / 100
      tax += slabTax
      if (slab.rate > 0) {
        const upperLabel = slab.upTo === Number.POSITIVE_INFINITY ? "above" : formatCompactINR(slab.upTo)
        slabDetails.push({
          range: `${formatCompactINR(lower)} – ${upperLabel}`,
          rate: slab.rate,
          tax: slabTax,
        })
      }
    }
    lower = slab.upTo
  }

  // Section 87A rebate
  const rebateLimit = regime === "new" ? 1200000 : 500000
  const rebate = taxableIncome <= rebateLimit ? tax : 0
  const taxAfterRebate = tax - rebate
  const cess = taxAfterRebate * 0.04
  const totalTax = taxAfterRebate + cess

  return {
    grossIncome,
    standardDeduction: totalDeductions,
    taxableIncome,
    taxBeforeRebate: tax,
    rebate,
    taxAfterRebate,
    cess,
    totalTax,
    takeHome: grossIncome - totalTax,
    slabDetails,
  }
}

// ---- Home Loan Eligibility ----
export interface EligibilityResult {
  eligibleLoan: number
  maxEmi: number
  emiCapacity: number
}

// FOIR: share of net monthly income that can service EMIs.
export function calcEligibility(
  monthlyIncome: number,
  existingEmi: number,
  annualRate: number,
  years: number,
  foir = 0.5,
): EligibilityResult {
  const maxEmi = Math.max(0, monthlyIncome * foir - existingEmi)
  const r = annualRate / 12 / 100
  const n = years * 12
  let eligibleLoan: number
  if (r === 0) {
    eligibleLoan = maxEmi * n
  } else {
    const pow = Math.pow(1 + r, n)
    eligibleLoan = (maxEmi * (pow - 1)) / (r * pow)
  }
  return { eligibleLoan, maxEmi, emiCapacity: monthlyIncome * foir }
}

// ---- Retirement corpus ----
export interface RetirementResult {
  corpusNeeded: number
  monthlyExpenseAtRetirement: number
  yearsInRetirement: number
}

export function calcRetirement(
  currentAge: number,
  retirementAge: number,
  monthlyExpense: number,
  inflation: number,
  postReturn: number,
  lifeExpectancy: number,
): RetirementResult {
  const yearsToRetire = Math.max(0, retirementAge - currentAge)
  const yearsInRetirement = Math.max(1, lifeExpectancy - retirementAge)
  // Expense at retirement, inflated.
  const monthlyExpenseAtRetirement = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetire)
  const annualExpense = monthlyExpenseAtRetirement * 12
  // Real rate of return during retirement (post-return adjusted for inflation).
  const realRate = (1 + postReturn / 100) / (1 + inflation / 100) - 1
  let corpusNeeded: number
  if (Math.abs(realRate) < 1e-9) {
    corpusNeeded = annualExpense * yearsInRetirement
  } else {
    corpusNeeded = annualExpense * ((1 - Math.pow(1 + realRate, -yearsInRetirement)) / realRate)
  }
  return { corpusNeeded, monthlyExpenseAtRetirement, yearsInRetirement }
}

// ---- NPS ----
export interface NpsResult {
  totalCorpus: number
  invested: number
  gain: number
  lumpSum: number
  annuityCorpus: number
  monthlyPension: number
}

export function calcNPS(
  monthly: number,
  currentAge: number,
  expectedReturn: number,
  annuityPercent: number,
  annuityRate: number,
  retirementAge = 60,
): NpsResult {
  const years = Math.max(0, retirementAge - currentAge)
  const i = expectedReturn / 12 / 100
  const n = years * 12
  const invested = monthly * n
  const totalCorpus = i === 0 ? invested : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
  const annuityCorpus = (totalCorpus * annuityPercent) / 100
  const lumpSum = totalCorpus - annuityCorpus
  const monthlyPension = (annuityCorpus * (annuityRate / 100)) / 12
  return {
    totalCorpus,
    invested,
    gain: totalCorpus - invested,
    lumpSum,
    annuityCorpus,
    monthlyPension,
  }
}

export interface AgeResult {
  years: number
  months: number
  days: number
  totalDays: number
  nextBirthdayInDays: number
}

export function calcAge(dob: Date, today = new Date()): AgeResult {
  let years = today.getFullYear() - dob.getFullYear()
  let months = today.getMonth() - dob.getMonth()
  let days = today.getDate() - dob.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const totalDays = Math.floor((today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24))

  const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate())
  if (nextBirthday.getTime() < today.getTime()) {
    nextBirthday.setFullYear(today.getFullYear() + 1)
  }
  const nextBirthdayInDays = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return { years: Math.max(0, years), months, days, totalDays, nextBirthdayInDays }
}
