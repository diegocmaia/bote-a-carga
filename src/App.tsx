import { useState, useEffect, useCallback } from 'react'
import {
  calcWeight,
  calcPlates,
  round,
  kgToLb,
  lbToKg,
  KG_PLATES,
  LB_PLATES,
  type Settings,
  type RoundingStep,
  type RoundingMode,
} from './lib/calculator'
import {
  loadSettings,
  saveSettings,
  loadLastWeight,
  saveLastWeight,
  loadRecentPcts,
  saveRecentPct,
} from './lib/storage'
import './App.css'

const QUICK_PCTS = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

export default function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings)
  const [baseInput, setBaseInput] = useState(loadLastWeight)
  const [selectedPct, setSelectedPct] = useState<number | null>(null)
  const [customPct, setCustomPct] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [recentPcts, setRecentPcts] = useState<number[]>(loadRecentPcts)
  const [showPlates, setShowPlates] = useState(false)

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      saveSettings(next)
      return next
    })
  }, [])

  useEffect(() => {
    saveLastWeight(baseInput)
  }, [baseInput])

  const activePct =
    selectedPct !== null
      ? selectedPct
      : customPct !== ''
      ? parseFloat(customPct)
      : null

  const baseKg =
    baseInput !== ''
      ? settings.unit === 'kg'
        ? parseFloat(baseInput)
        : lbToKg(parseFloat(baseInput))
      : null

  const exactKg = baseKg !== null && activePct !== null ? calcWeight(baseKg, activePct) : null
  const roundedKg =
    exactKg !== null
      ? round(exactKg, settings.roundingStep, settings.roundingMode)
      : null

  const displayExact =
    exactKg !== null
      ? settings.unit === 'lb'
        ? kgToLb(exactKg)
        : exactKg
      : null

  const displayRounded =
    roundedKg !== null
      ? settings.unit === 'lb'
        ? kgToLb(roundedKg)
        : roundedKg
      : null

  const barWeightDisplay =
    settings.unit === 'lb'
      ? kgToLb(settings.barWeight)
      : settings.barWeight

  const plates = settings.unit === 'lb' ? LB_PLATES : KG_PLATES

  const platesData =
    roundedKg !== null
      ? calcPlates(
          settings.unit === 'lb' ? kgToLb(roundedKg) : roundedKg,
          barWeightDisplay,
          plates,
        )
      : []

  function handlePctClick(pct: number) {
    setSelectedPct(pct === selectedPct ? null : pct)
    setCustomPct('')
    if (pct !== selectedPct) {
      setRecentPcts((prev) => {
        const next = [pct, ...prev.filter((p) => p !== pct)].slice(0, 5)
        saveRecentPct(pct)
        return next
      })
    }
  }

  function handleCustomPct(value: string) {
    setCustomPct(value)
    setSelectedPct(null)
  }

  const unusedRecentPcts = recentPcts.filter((p) => !QUICK_PCTS.includes(p))

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="logo">🏋️ Bote a Carga</h1>
        <button className="icon-btn" onClick={() => setShowSettings((v) => !v)} aria-label="Configurações">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onChange={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <main className="main">
        {/* Base Weight Input */}
        <section className="card">
          <div className="section-label-group">
            <label className="section-label">1RM</label>
            <span className="section-sublabel">peso máximo em 1 repetição</span>
          </div>
          <div className="weight-row">
            <input
              className="weight-input"
              type="number"
              inputMode="decimal"
              placeholder="100"
              value={baseInput}
              onChange={(e) => setBaseInput(e.target.value)}
              autoFocus
            />
            <div className="unit-toggle">
              <button
                className={`unit-btn ${settings.unit === 'kg' ? 'active' : ''}`}
                onClick={() => updateSettings({ unit: 'kg' })}
              >
                kg
              </button>
              <button
                className={`unit-btn ${settings.unit === 'lb' ? 'active' : ''}`}
                onClick={() => updateSettings({ unit: 'lb' })}
              >
                lb
              </button>
            </div>
          </div>
        </section>

        {/* Percentage Selection */}
        <section className="card">
          <label className="section-label">Porcentagem</label>
          <div className="pct-grid">
            {QUICK_PCTS.map((pct) => (
              <button
                key={pct}
                className={`pct-btn ${selectedPct === pct ? 'active' : ''}`}
                onClick={() => handlePctClick(pct)}
              >
                {pct}%
              </button>
            ))}
          </div>

          {unusedRecentPcts.length > 0 && (
            <div className="recent-row">
              <span className="recent-label">Recentes:</span>
              {unusedRecentPcts.map((pct) => (
                <button
                  key={pct}
                  className={`pct-btn pct-btn-sm ${selectedPct === pct ? 'active' : ''}`}
                  onClick={() => handlePctClick(pct)}
                >
                  {pct}%
                </button>
              ))}
            </div>
          )}

          <div className="custom-pct-row">
            <span className="custom-label">Personalizado:</span>
            <input
              className="custom-pct-input"
              type="number"
              inputMode="decimal"
              placeholder="ex: 72"
              value={customPct}
              onChange={(e) => handleCustomPct(e.target.value)}
              min={1}
              max={200}
            />
            <span className="pct-symbol">%</span>
          </div>
        </section>

        {/* Result */}
        {displayExact !== null && activePct !== null ? (
          <section className="card result-card">
            <div className="result-pct-badge">{activePct}%</div>

            <div className="result-main">
              <div className="result-rounded">
                <span className="result-value">{displayRounded!.toFixed(settings.unit === 'lb' ? 1 : 1)}</span>
                <span className="result-unit">{settings.unit}</span>
              </div>
              <div className="result-sub">
                exato: {displayExact.toFixed(2)} {settings.unit}
              </div>
            </div>

            {/* Plate breakdown toggle */}
            <button
              className="plates-toggle"
              onClick={() => setShowPlates((v) => !v)}
            >
              {showPlates ? 'Ocultar anilhas' : 'Ver anilhas'}
              <svg
                className={`chevron ${showPlates ? 'open' : ''}`}
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {showPlates && (
              <>
                <div className="bar-row">
                  <span className="bar-row-label">Barra</span>
                  <div className="bar-toggle">
                    <button
                      className={`bar-btn ${Math.abs(settings.barWeight - 15) < 0.01 ? 'active' : ''}`}
                      onClick={() => updateSettings({ barWeight: 15 })}
                    >
                      <span className="bar-btn-weight">15 kg</span>
                      <span className="bar-btn-sub">feminina</span>
                    </button>
                    <button
                      className={`bar-btn ${Math.abs(settings.barWeight - 20) < 0.01 ? 'active' : ''}`}
                      onClick={() => updateSettings({ barWeight: 20 })}
                    >
                      <span className="bar-btn-weight">20 kg</span>
                      <span className="bar-btn-sub">masculina</span>
                    </button>
                  </div>
                </div>
                <PlateBreakdownView
                  plates={platesData}
                  barWeight={barWeightDisplay}
                  unit={settings.unit}
                />
              </>
            )}
          </section>
        ) : (
          <section className="card empty-card">
            <p className="empty-hint">
              {baseInput === ''
                ? 'Digite a carga base e escolha uma porcentagem'
                : 'Escolha uma porcentagem'}
            </p>
          </section>
        )}
      </main>
    </div>
  )
}

// ─── Settings Panel ───────────────────────────────────────────────────────────

function SettingsPanel({
  settings,
  onChange,
  onClose,
}: {
  settings: Settings
  onChange: (patch: Partial<Settings>) => void
  onClose: () => void
}) {
  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Configurações</h2>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="settings-section">
          <span className="settings-label">Arredondamento</span>
          <div className="settings-options">
            {([1, 2.5, 5] as RoundingStep[]).map((step) => (
              <button
                key={step}
                className={`option-btn ${settings.roundingStep === step ? 'active' : ''}`}
                onClick={() => onChange({ roundingStep: step })}
              >
                {step} {settings.unit}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <span className="settings-label">Modo de arredondamento</span>
          <div className="settings-options">
            {(
              [
                { value: 'nearest', label: 'Mais próximo' },
                { value: 'up', label: 'Para cima' },
                { value: 'down', label: 'Para baixo' },
              ] as { value: RoundingMode; label: string }[]
            ).map(({ value, label }) => (
              <button
                key={value}
                className={`option-btn ${settings.roundingMode === value ? 'active' : ''}`}
                onClick={() => onChange({ roundingMode: value })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Plate Breakdown ──────────────────────────────────────────────────────────

function PlateBreakdownView({
  plates,
  barWeight,
  unit,
}: {
  plates: { plate: number; count: number }[]
  barWeight: number
  unit: string
}) {
  if (plates.length === 0) {
    return (
      <div className="plates-view">
        <p className="plates-empty">Só a barra ({barWeight.toFixed(1)} {unit})</p>
      </div>
    )
  }

  return (
    <div className="plates-view">
      <p className="plates-bar-note">Barra: {barWeight.toFixed(1)} {unit}</p>
      <p className="plates-side-note">Por lado:</p>
      <div className="plates-list">
        {plates.map(({ plate, count }) => (
          <div key={plate} className="plate-row">
            <span className="plate-weight">{plate} {unit}</span>
            <span className="plate-times">×</span>
            <span className="plate-count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
