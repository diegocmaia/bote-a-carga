export type Unit = 'kg' | 'lb'
export type RoundingMode = 'nearest' | 'up' | 'down'
export type RoundingStep = 1 | 2.5 | 5

export interface Settings {
  unit: Unit
  barWeight: number // stored in kg internally
  roundingStep: RoundingStep
  roundingMode: RoundingMode
}

export const DEFAULT_SETTINGS: Settings = {
  unit: 'kg',
  barWeight: 20,
  roundingStep: 2.5,
  roundingMode: 'nearest',
}

export const BAR_PRESETS: { label: string; kg: number }[] = [
  { label: '20 kg', kg: 20 },
  { label: '15 kg', kg: 15 },
  { label: '45 lb', kg: 20.412 },
  { label: '35 lb', kg: 15.876 },
]

export const KG_PLATES = [20, 15, 10, 5, 2.5, 1.25]
export const LB_PLATES = [45, 35, 25, 10, 5, 2.5]

export function round(value: number, step: RoundingStep, mode: RoundingMode): number {
  const divided = value / step
  let result: number
  if (mode === 'up') result = Math.ceil(divided) * step
  else if (mode === 'down') result = Math.floor(divided) * step
  else result = Math.round(divided) * step
  return Math.max(0, result)
}

export function calcWeight(base: number, pct: number): number {
  return (base * pct) / 100
}

export function kgToLb(kg: number): number {
  return kg * 2.20462
}

export function lbToKg(lb: number): number {
  return lb / 2.20462
}

export interface PlateBreakdown {
  plate: number
  count: number
}

export function calcPlates(
  totalWeight: number,
  barWeight: number,
  plates: number[],
): PlateBreakdown[] {
  let remaining = Math.max(0, (totalWeight - barWeight) / 2)
  const breakdown: PlateBreakdown[] = []

  for (const plate of plates) {
    if (remaining <= 0) break
    const count = Math.floor(remaining / plate)
    if (count > 0) {
      breakdown.push({ plate, count })
      remaining -= count * plate
    }
  }

  return breakdown
}
