import { Settings, DEFAULT_SETTINGS } from './calculator'

const SETTINGS_KEY = 'bac_settings'
const LAST_WEIGHT_KEY = 'bac_last_weight'
const RECENT_PCTS_KEY = 'bac_recent_pcts'

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(s: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
}

export function loadLastWeight(): string {
  return localStorage.getItem(LAST_WEIGHT_KEY) ?? ''
}

export function saveLastWeight(w: string): void {
  localStorage.setItem(LAST_WEIGHT_KEY, w)
}

export function loadRecentPcts(): number[] {
  try {
    const raw = localStorage.getItem(RECENT_PCTS_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveRecentPct(pct: number): void {
  const current = loadRecentPcts()
  const updated = [pct, ...current.filter((p) => p !== pct)].slice(0, 5)
  localStorage.setItem(RECENT_PCTS_KEY, JSON.stringify(updated))
}
