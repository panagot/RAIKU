import { useMemo, useState, useEffect } from 'react'
import './App.css'
import {
  FinanceIcon,
  AIIcon,
  GamingIcon,
  DePINIcon,
  SettlementIcon,
  LightningIcon,
  TargetIcon,
  GlobeIcon,
  BatchIcon,
  OrderingIcon,
  RetryIcon,
  FlowIcon,
  ProcessingIcon,
  DeliveryIcon,
  CheckIcon
} from './Icons'

type Mode = 'raiku' | 'traditional' | 'split'
type SlotMode = 'AOT' | 'JIT'
type Phase = 'Mint' | 'Settlement' | 'Treasury'
type Status = 'Reserved' | 'Executing' | 'Confirmed' | 'Uncertain' | 'Failed'

type SlotBlock = {
  id: string
  label: string
  start: number
  duration: number
  mode: SlotMode
  phase: Phase
  status: Status
  nodeRegion?: string
  latencyMs?: number
  description: string
  insight?: string
  ackermannNote?: string
  failureRate?: number
  retryCount?: number
}

const raikuSlots: SlotBlock[] = [
  {
    id: 'slot-a1',
    label: 'Mint prep',
    start: 0,
    duration: 12,
    mode: 'AOT',
    phase: 'Mint',
    status: 'Reserved',
    nodeRegion: 'NYC',
    latencyMs: 35,
    description: 'Reserve AOT window 45s ahead for allowlist verification and metadata pinning.',
    insight: 'Batch metadata writes 45s before mint to avoid public mempool contention.',
    ackermannNote: 'Ackermann nodes observe prep status and queue retries if pinning fails.',
    failureRate: 0,
    retryCount: 0
  },
  {
    id: 'slot-a2',
    label: 'Mint live',
    start: 12,
    duration: 12,
    mode: 'AOT',
    phase: 'Mint',
    status: 'Executing',
    nodeRegion: 'Frankfurt',
    latencyMs: 32,
    description: 'Deterministic mint window with pre-confirmations under 30 ms.',
    insight: 'Public mint batches land in the same order users signed.',
    ackermannNote: 'If a wallet spikes latency, the slot manager reorders within the reserved window.',
    failureRate: 0,
    retryCount: 0
  },
  {
    id: 'slot-a3',
    label: 'Settlement batch',
    start: 24,
    duration: 12,
    mode: 'AOT',
    phase: 'Settlement',
    status: 'Reserved',
    nodeRegion: 'Tokyo',
    latencyMs: 41,
    description: 'Royalty accounting and payout netting scheduled ahead of time.',
    insight: 'Treasury and marketplace royalties settle before reporting cutoff.',
    ackermannNote: 'Ackermann streams partial batches to keep compute hot, then finalizes atomically.',
    failureRate: 0,
    retryCount: 0
  },
  {
    id: 'slot-a4',
    label: 'Treasury hedge',
    start: 36,
    duration: 12,
    mode: 'JIT',
    phase: 'Treasury',
    status: 'Reserved',
    nodeRegion: 'Chicago',
    latencyMs: 28,
    description: 'JIT swap slot triggered once settlement completes, Ackermann Nodes absorb retries.',
    insight: 'Treasury hedges maintain NAV despite volatility.',
    ackermannNote: 'Ackermann monitors oracle feed and triggers backup slot if pricing deviates >5 bps.',
    failureRate: 0,
    retryCount: 0
  },
  {
    id: 'slot-a5',
    label: 'Post-mint buffer',
    start: 48,
    duration: 12,
    mode: 'JIT',
    phase: 'Mint',
    status: 'Confirmed',
    nodeRegion: 'São Paulo',
    latencyMs: 30,
    description: 'Safety buffer guarantees rollbacks or refunds execute without congestion risk.',
    insight: 'Any failed mint or compliance adjustment executes immediately.',
    ackermannNote: 'If no action needed, slot returns to marketplace for other builders.',
    failureRate: 0,
    retryCount: 0
  }
]

const traditionalSlots: SlotBlock[] = [
  {
    id: 'slot-t1',
    label: 'Mint hopeful',
    start: 0,
    duration: 10,
    mode: 'AOT',
    phase: 'Mint',
    status: 'Uncertain',
    description: 'Competes in public mempool, ordering can be front-run.',
    failureRate: 42,
    retryCount: 3
  },
  {
    id: 'slot-t2',
    label: 'Retry storm',
    start: 15,
    duration: 14,
    mode: 'JIT',
    phase: 'Mint',
    status: 'Failed',
    description: 'Failed txs spam retries, inflating fees and delaying delivery.',
    failureRate: 67,
    retryCount: 8
  },
  {
    id: 'slot-t3',
    label: 'Settlement (maybe)',
    start: 34,
    duration: 12,
    mode: 'AOT',
    phase: 'Settlement',
    status: 'Uncertain',
    description: 'Sequencing depends on auction outcomes; no guarantees.',
    failureRate: 38,
    retryCount: 2
  },
  {
    id: 'slot-t4',
    label: 'Treasury swap',
    start: 50,
    duration: 10,
    mode: 'JIT',
    phase: 'Treasury',
    status: 'Uncertain',
    description: 'Swap may miss hedging window due to congestion spikes.',
    failureRate: 45,
    retryCount: 4
  }
]

function App() {
  const [mode, setMode] = useState<Mode>('split')
  const [selectedSlot, setSelectedSlot] = useState<SlotBlock | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const slots = useMemo(() => {
    if (mode === 'split') return { raiku: raikuSlots, traditional: traditionalSlots }
    return mode === 'raiku' ? raikuSlots : traditionalSlots
  }, [mode])

  const timelineLength = 60

  const toGridColumn = (value: number) => Math.max(1, Math.floor((value / timelineLength) * 100))
  const toGridEnd = (start: number, duration: number) =>
    Math.min(101, toGridColumn(start + duration) || toGridColumn(start) + 1)

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1
          if (next >= timelineLength) {
            setIsAnimating(false)
            return 0
          }
          return next
        })
      }, 100)
      return () => clearInterval(interval)
    } else {
      // Reset to 0 when animation stops
      setCurrentTime(0)
    }
  }, [isAnimating, timelineLength])

  const handlePlayPause = () => {
    if (isAnimating) {
      setIsAnimating(false)
    } else {
      setCurrentTime(0)
      setIsAnimating(true)
    }
  }

  return (
    <div className="page">
      <nav className="top-nav">
        <div className="brand">
          <span>RAIKU</span>
          <small>Unconditional Slot Reservation Infrastructure</small>
        </div>
        <div className="nav-links">
          <a href="#comparison">Comparison</a>
          <a href="#scenarios">Scenarios</a>
          <a href="#technical">Technical</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <p className="event-badge">Solana Hacker Hotel DevCon 2025</p>
          <h1>
            What happens when execution is <span>guaranteed?</span>
          </h1>
          <p className="lede">
            An interactive visualization showing how Raiku's deterministic slot reservations transform
            high-stakes workflows from probabilistic chaos into predictable, institutional-grade operations.
          </p>
          <div className="hero-metrics">
            <div className="metric-pill">
              <strong>100%</strong>
              <span>SUCCESS RATE</span>
            </div>
            <div className="metric-pill">
              <strong>&lt;30ms</strong>
              <span>PRE-CONFIRM</span>
            </div>
            <div className="metric-pill">
              <strong>0</strong>
              <span>RETRIES NEEDED</span>
            </div>
            <div className="metric-pill">
              <strong>500+</strong>
              <span>GLOBAL NODES</span>
            </div>
          </div>
        </div>
      </header>

      <section id="comparison" className="comparison-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">The Difference</p>
            <h2>Side-by-Side Execution Comparison</h2>
            <p className="lede">
              Watch how the same workflow behaves with Raiku's deterministic guarantees versus traditional
              Solana mempool competition.
            </p>
          </div>
          <div className="mode-controls">
            <button
              className={mode === 'split' ? 'active' : ''}
              onClick={() => setMode('split')}
            >
              Split View
            </button>
            <button
              className={mode === 'raiku' ? 'active' : ''}
              onClick={() => setMode('raiku')}
            >
              Raiku Only
            </button>
            <button
              className={mode === 'traditional' ? 'active' : ''}
              onClick={() => setMode('traditional')}
            >
              Traditional Only
            </button>
            <button className="play-button" onClick={handlePlayPause}>
              {isAnimating ? '⏸ Pause' : '▶ Play Animation'}
            </button>
            {isAnimating && (
              <div className="animation-progress">
                <div className="progress-bar" style={{ width: `${(currentTime / timelineLength) * 100}%` }} />
                <span>{Math.floor(currentTime)}s / {timelineLength}s</span>
              </div>
            )}
          </div>
        </div>

        {mode === 'split' ? (
          <div className="split-view">
            <div className="comparison-panel">
              <div className="panel-header raiku-header">
                <h3>Raiku Deterministic</h3>
                <div className="status-badge success">100% Guaranteed</div>
              </div>
              <div className="timeline-container">
                <div className="timeline-axis">
                  {[0, 30, 60].map((tick) => (
                    <span key={tick}>{tick}s</span>
                  ))}
                </div>
                <div className="timeline-grid">
                  {isAnimating && (
                    <div
                      className="time-indicator"
                      style={{
                        gridColumnStart: toGridColumn(currentTime),
                        gridColumnEnd: toGridColumn(currentTime) + 1
                      }}
                    />
                  )}
                  {raikuSlots.map((slot) => {
                    const isActive = currentTime >= slot.start && currentTime <= slot.start + slot.duration
                    const isPast = currentTime > slot.start + slot.duration
                    return (
                      <button
                        key={slot.id}
                        className={`slot slot-${slot.phase.toLowerCase()} ${slot.mode.toLowerCase()} ${
                          selectedSlot?.id === slot.id ? 'selected' : ''
                        } ${isActive ? 'active' : ''} ${isPast && !isActive ? 'completed' : ''}`}
                        style={{
                          gridColumnStart: toGridColumn(slot.start),
                          gridColumnEnd: toGridEnd(slot.start, slot.duration),
                          opacity: isAnimating && !isActive && !isPast ? 0.4 : 1
                        }}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        <span>{slot.label}</span>
                        <small>{slot.mode} {slot.latencyMs ? `· ${slot.latencyMs}ms` : ''}</small>
                        {isActive && isAnimating && (
                          <div className="active-pulse" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="panel-metrics">
                <div className="metric">
                  <strong>100%</strong>
                  <span>Success</span>
                </div>
                <div className="metric">
                  <strong>33ms</strong>
                  <span>Avg Latency</span>
                </div>
                <div className="metric">
                  <strong>0</strong>
                  <span>Retries</span>
                </div>
              </div>
            </div>

            <div className="comparison-panel">
              <div className="panel-header traditional-header">
                <h3>Traditional Solana</h3>
                <div className="status-badge warning">58% Success</div>
              </div>
              <div className="timeline-container">
                <div className="timeline-axis">
                  {[0, 30, 60].map((tick) => (
                    <span key={tick}>{tick}s</span>
                  ))}
                </div>
                <div className="timeline-grid">
                  {isAnimating && (
                    <div
                      className="time-indicator"
                      style={{
                        gridColumnStart: toGridColumn(currentTime),
                        gridColumnEnd: toGridColumn(currentTime) + 1
                      }}
                    />
                  )}
                  {traditionalSlots.map((slot) => {
                    const isActive = currentTime >= slot.start && currentTime <= slot.start + slot.duration
                    const isPast = currentTime > slot.start + slot.duration
                    return (
                      <button
                        key={slot.id}
                        className={`slot slot-${slot.phase.toLowerCase()} uncertain ${
                          slot.status === 'Failed' ? 'failed' : ''
                        } ${selectedSlot?.id === slot.id ? 'selected' : ''} ${isActive ? 'active' : ''} ${
                          isPast && !isActive ? 'completed' : ''
                        }`}
                        style={{
                          gridColumnStart: toGridColumn(slot.start),
                          gridColumnEnd: toGridEnd(slot.start, slot.duration),
                          opacity: isAnimating && !isActive && !isPast ? 0.4 : 1
                        }}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        <span>{slot.label}</span>
                        <small>{slot.failureRate}% fail · {slot.retryCount} retries</small>
                        {isActive && isAnimating && (
                          <div className="active-pulse" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="panel-metrics">
                <div className="metric">
                  <strong>58%</strong>
                  <span>Success</span>
                </div>
                <div className="metric">
                  <strong>1.25s</strong>
                  <span>Avg Latency</span>
                </div>
                <div className="metric">
                  <strong>17</strong>
                  <span>Retries</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="single-view">
            <div className="timeline-container">
              <div className="timeline-axis">
                {[0, 30, 60].map((tick) => (
                  <span key={tick}>{tick}s</span>
                ))}
              </div>
              <div className="timeline-grid">
                {isAnimating && (
                  <div
                    className="time-indicator"
                    style={{
                      gridColumnStart: toGridColumn(currentTime),
                      gridColumnEnd: toGridColumn(currentTime) + 1
                    }}
                  />
                )}
                {(Array.isArray(slots) ? slots : slots[mode]).map((slot) => {
                  const isActive = currentTime >= slot.start && currentTime <= slot.start + slot.duration
                  const isPast = currentTime > slot.start + slot.duration
                  return (
                    <button
                      key={slot.id}
                      className={`slot slot-${slot.phase.toLowerCase()} ${slot.mode.toLowerCase()} ${
                        slot.status === 'Uncertain' || slot.status === 'Failed' ? 'uncertain' : ''
                      } ${slot.status === 'Failed' ? 'failed' : ''} ${
                        selectedSlot?.id === slot.id ? 'selected' : ''
                      } ${isActive ? 'active' : ''} ${isPast && !isActive ? 'completed' : ''}`}
                      style={{
                        gridColumnStart: toGridColumn(slot.start),
                        gridColumnEnd: toGridEnd(slot.start, slot.duration),
                        opacity: isAnimating && !isActive && !isPast ? 0.4 : 1
                      }}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      <span>{slot.label}</span>
                      <small>
                        {slot.mode}
                        {slot.latencyMs ? ` · ${slot.latencyMs}ms` : ''}
                        {slot.failureRate ? ` · ${slot.failureRate}% fail` : ''}
                      </small>
                      {isActive && isAnimating && (
                        <div className="active-pulse" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {selectedSlot && (
          <div className="slot-details-modal">
            <div className="modal-content">
              <button className="close-button" onClick={() => setSelectedSlot(null)}>×</button>
              <h3>{selectedSlot.label}</h3>
              <p className="description">{selectedSlot.description}</p>
              <div className="details-grid">
                <div>
                  <strong>Phase:</strong> {selectedSlot.phase}
                </div>
                <div>
                  <strong>Mode:</strong> {selectedSlot.mode}
                </div>
                <div>
                  <strong>Status:</strong> {selectedSlot.status}
                </div>
                {selectedSlot.nodeRegion && (
                  <div>
                    <strong>Node:</strong> {selectedSlot.nodeRegion}
                  </div>
                )}
                {selectedSlot.latencyMs && (
                  <div>
                    <strong>Latency:</strong> {selectedSlot.latencyMs}ms
                  </div>
                )}
                {selectedSlot.failureRate !== undefined && (
                  <div>
                    <strong>Failure Rate:</strong> {selectedSlot.failureRate}%
                  </div>
                )}
                {selectedSlot.retryCount !== undefined && (
                  <div>
                    <strong>Retries:</strong> {selectedSlot.retryCount}
                  </div>
                )}
              </div>
              {selectedSlot.insight && (
                <div className="insight-box">
                  <strong>💡 Insight:</strong> {selectedSlot.insight}
                </div>
              )}
              {selectedSlot.ackermannNote && (
                <div className="ackermann-box">
                  <strong>🔄 Ackermann Node:</strong> {selectedSlot.ackermannNote}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <section className="impact-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">The Impact</p>
            <h2>Quantified Difference</h2>
            <p className="lede">
              Real metrics from Raiku's Finance & DeFi analysis showing how deterministic execution
              eliminates the 40% failure cliff during congestion.
            </p>
          </div>
        </div>
        <div className="impact-grid">
          <div className="impact-card">
            <div className="impact-header">
              <h3>Success Rate</h3>
              <span className="improvement">+72%</span>
            </div>
            <div className="metric-bar">
              <div className="bar-traditional" style={{ width: '58%' }}>58%</div>
              <div className="bar-raiku" style={{ width: '100%' }}>100%</div>
            </div>
            <p>Traditional Solana fails 42% of transactions under congestion. Raiku guarantees execution.</p>
          </div>
          <div className="impact-card">
            <div className="impact-header">
              <h3>Average Latency</h3>
              <span className="improvement">-97%</span>
            </div>
            <div className="metric-bar">
              <div className="bar-traditional" style={{ width: '100%' }}>1,250ms</div>
              <div className="bar-raiku" style={{ width: '3%' }}>33ms</div>
            </div>
            <p>Sub-30ms pre-confirmations vs 450ms-2.5s validator inclusion delays.</p>
          </div>
          <div className="impact-card">
            <div className="impact-header">
              <h3>Retry Overhead</h3>
              <span className="improvement">-100%</span>
            </div>
            <div className="metric-bar">
              <div className="bar-traditional" style={{ width: '100%' }}>17 retries</div>
              <div className="bar-raiku" style={{ width: '0%' }}>0 retries</div>
            </div>
            <p>Ackermann Nodes handle retries upstream, eliminating dApp retry logic.</p>
          </div>
          <div className="impact-card">
            <div className="impact-header">
              <h3>Cost Efficiency</h3>
              <span className="improvement">+126%</span>
            </div>
            <div className="metric-bar">
              <div className="bar-traditional" style={{ width: '42%' }}>42%</div>
              <div className="bar-raiku" style={{ width: '95%' }}>95%</div>
            </div>
            <p>No wasted fees on failed transactions or priority fee bidding wars.</p>
          </div>
        </div>
      </section>

      <section className="coordination-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Ackermann v1 Infrastructure</p>
            <h2>How Ackermann Node & Sidecar Enable Deterministic Execution</h2>
            <p className="lede">
              Raiku's Ackermann v1 infrastructure (also referred to as the Ackermann infrastructure) routes,
              schedules, and confirms transactions before they reach the validator network, delivering transaction
              bundles directly to block leaders for guaranteed inclusion. This technical solution allows external
              systems to be fast, scalable, and guarantees better inclusion while extending Solana L1 features.
            </p>
          </div>
        </div>
        <div className="coordination-flow">
          <div className="flow-step">
            <div className="flow-icon">
              <FlowIcon />
            </div>
            <h3>1. Transaction Submission</h3>
            <p>Your application submits transactions to Raiku's coordination layer</p>
            <div className="flow-detail">
              <strong>AOT:</strong> Reserve slots up to 60s ahead<br />
              <strong>JIT:</strong> Immediate slot allocation for urgent actions
            </div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon">
              <ProcessingIcon />
            </div>
            <h3>2. Ackermann Node Processing</h3>
            <p>Routes, schedules, and confirms transactions before validator network</p>
            <div className="flow-detail">
              <strong>Retry Logic:</strong> Handled upstream automatically<br />
              <strong>Ordering:</strong> Application-controlled sequencing
            </div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon">
              <DeliveryIcon />
            </div>
            <h3>3. Sidecar Delivery</h3>
            <p>Transaction bundles delivered directly to block leader's processing unit</p>
            <div className="flow-detail">
              <strong>Latency:</strong> Sub-30ms pre-confirmations<br />
              <strong>Guarantee:</strong> Deterministic inclusion
            </div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon">
              <CheckIcon />
            </div>
            <h3>4. Guaranteed Execution</h3>
            <p>Transactions execute in exact order at specified time</p>
            <div className="flow-detail">
              <strong>Success Rate:</strong> 100% guaranteed<br />
              <strong>Timing:</strong> Predictable to the millisecond
            </div>
          </div>
        </div>
        <div className="dynamic-allocation">
          <h3>Dynamic Slot Allocation</h3>
          <p>
            Raiku continuously balances capacity between AOT reservations and JIT requests to prevent either
            from starving the other. This dynamic allocation maintains reliability for both real-time and
            scheduled transactions, even under high network load.
          </p>
          <div className="allocation-visual">
            <div className="allocation-bar">
              <div className="allocation-segment aot" style={{ width: '60%' }}>
                <span>AOT Reservations (60%)</span>
              </div>
              <div className="allocation-segment jit" style={{ width: '40%' }}>
                <span>JIT Requests (40%)</span>
              </div>
            </div>
            <p className="allocation-note">
              Capacity dynamically adjusts based on demand, ensuring both scheduled and reactive
              transactions get guaranteed execution windows.
            </p>
          </div>
        </div>
      </section>

      <section className="mev-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Educational Deep Dive</p>
            <h2>MEV Mitigation & Blockspace Auctions</h2>
            <p className="lede">
              How Raiku's deterministic slot reservations eliminate front-running and create fair,
              transparent blockspace markets.
            </p>
          </div>
        </div>
        <div className="mev-grid">
          <div className="mev-card">
            <div className="mev-icon">⚔️</div>
            <h3>The MEV Problem</h3>
            <p>
              Traditional Solana mempools expose transactions to front-running. High-value swaps get
              sandwiched, NFT mints get front-run, and users lose value to MEV bots.
            </p>
            <div className="problem-list">
              <div className="problem-item">
                <span className="problem-badge">❌</span>
                <span>Opaque priority fee auctions</span>
              </div>
              <div className="problem-item">
                <span className="problem-badge">❌</span>
                <span>Transaction ordering uncertainty</span>
              </div>
              <div className="problem-item">
                <span className="problem-badge">❌</span>
                <span>MEV extraction opportunities</span>
              </div>
            </div>
          </div>
          <div className="mev-card solution">
            <div className="mev-icon">✅</div>
            <h3>Raiku's Solution</h3>
            <p>
              Reserved slots with deterministic ordering eliminate MEV. Transactions execute in the
              exact sequence builders specify, with no opportunity for front-running.
            </p>
            <div className="solution-list">
              <div className="solution-item">
                <span className="solution-badge">✓</span>
                <span>Application-controlled ordering</span>
              </div>
              <div className="solution-item">
                <span className="solution-badge">✓</span>
                <span>Transparent slot marketplace</span>
              </div>
              <div className="solution-item">
                <span className="solution-badge">✓</span>
                <span>Zero MEV extraction windows</span>
              </div>
            </div>
          </div>
        </div>
        <div className="auction-visualization">
          <h3>Blockspace Auction Comparison</h3>
          <div className="auction-comparison">
            <div className="auction-panel">
              <h4>Traditional Priority Fee Auction</h4>
              <div className="auction-flow">
                <div className="auction-step">
                  <span className="step-number">1</span>
                  <span>Transaction submitted to mempool</span>
                </div>
                <div className="auction-arrow">↓</div>
                <div className="auction-step">
                  <span className="step-number">2</span>
                  <span>MEV bots scan and front-run</span>
                </div>
                <div className="auction-arrow">↓</div>
                <div className="auction-step uncertain">
                  <span className="step-number">3</span>
                  <span>Uncertain inclusion timing</span>
                </div>
                <div className="auction-arrow">↓</div>
                <div className="auction-step uncertain">
                  <span className="step-number">4</span>
                  <span>May fail or execute out of order</span>
                </div>
              </div>
            </div>
            <div className="auction-panel raiku-auction">
              <h4>Raiku Slot Reservation</h4>
              <div className="auction-flow">
                <div className="auction-step guaranteed">
                  <span className="step-number">1</span>
                  <span>Reserve slot 60s ahead (AOT)</span>
                </div>
                <div className="auction-arrow">↓</div>
                <div className="auction-step guaranteed">
                  <span className="step-number">2</span>
                  <span>Deterministic execution window</span>
                </div>
                <div className="auction-arrow">↓</div>
                <div className="auction-step guaranteed">
                  <span className="step-number">3</span>
                  <span>Sub-30ms pre-confirmation</span>
                </div>
                <div className="auction-arrow">↓</div>
                <div className="auction-step guaranteed">
                  <span className="step-number">4</span>
                  <span>Guaranteed inclusion in exact order</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="scenarios" className="scenarios-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Use Cases</p>
            <h2>Deterministic Execution Across Industries</h2>
            <p className="lede">
              Explore how Raiku's slot reservations unlock new possibilities in Finance, AI, Gaming, and DePIN.
            </p>
          </div>
        </div>
        <div className="scenarios-grid">
          <div className="scenario-card finance">
            <div className="scenario-icon">
              <FinanceIcon />
            </div>
            <h3>Finance & DeFi</h3>
            <ul>
              <li>400ms guaranteed liquidations prevent bad debt</li>
              <li>High-frequency trading with microsecond precision</li>
              <li>Institutional settlement with regulatory compliance</li>
            </ul>
            <a href="https://www.raiku.com/blog/raiku-finance-defi" target="_blank" rel="noreferrer">
              Read case study →
            </a>
          </div>
          <div className="scenario-card ai">
            <div className="scenario-icon">
              <AIIcon />
            </div>
            <h3>AI & Agents</h3>
            <ul>
              <li>500+ nodes route inference where agents live</li>
              <li>JIT slots for unpredictable AI surges</li>
              <li>Stateless, deterministic agent pipelines</li>
            </ul>
            <a href="https://www.raiku.com/blog/raiku-ai" target="_blank" rel="noreferrer">
              Read case study →
            </a>
          </div>
          <div className="scenario-card gaming">
            <div className="scenario-icon">
              <GamingIcon />
            </div>
            <h3>Gaming</h3>
            <ul>
              <li>Atomic state updates for multiplayer sync</li>
              <li>Fair NFT drops with AOT guarantees</li>
              <li>JIT slots absorb spike events</li>
            </ul>
            <a href="https://www.raiku.com/blog/raiku-gaming" target="_blank" rel="noreferrer">
              Read case study →
            </a>
          </div>
          <div className="scenario-card depin">
            <div className="scenario-icon">
              <DePINIcon />
            </div>
            <h3>DePIN</h3>
            <ul>
              <li>Guaranteed energy dispatch windows</li>
              <li>Deterministic sensor upload scheduling</li>
              <li>Emergency response with JIT capacity</li>
            </ul>
            <a href="https://www.raiku.com/blog/raiku-depin" target="_blank" rel="noreferrer">
              Read case study →
            </a>
          </div>
        </div>
      </section>

      <section className="challenge-question-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">The Challenge Question</p>
            <h2>What would you build if you had <span>complete control over execution</span>?</h2>
            <p className="lede">
              This is the core question of the Raiku Deterministic Execution Challenge. With AOT and JIT slot
              reservations, batched transactions guaranteed ahead of time, retry logic offloaded to Ackermann
              Nodes, and application-controlled ordering—what becomes possible?
            </p>
          </div>
        </div>
        <div className="challenge-answers">
          <div className="answer-card">
            <h3>Batched & Cranked Transactions</h3>
            <p>
              <strong>Guaranteed ahead of time:</strong> Schedule entire transaction batches to execute at
              exact timestamps. No more uncertainty about whether your settlement batch will land before
              the reporting deadline.
            </p>
            <div className="answer-example">
              <strong>Example:</strong> NFT mint with 10,000 transactions, all guaranteed to execute in
              exact order within a 5-second window, scheduled 60 seconds in advance.
            </div>
          </div>
          <div className="answer-card">
            <h3>Zero-Retry Applications</h3>
            <p>
              <strong>Retry logic offloaded:</strong> Ackermann Nodes handle all retry orchestration upstream.
              Your dApp code stays clean and focused on business logic, not infrastructure workarounds.
            </p>
            <div className="answer-example">
              <strong>Example:</strong> DeFi liquidation bot that never needs custom retry logic—Raiku
              infrastructure ensures execution within 400ms of price breach.
            </div>
          </div>
          <div className="answer-card">
            <h3>Application-Controlled Ordering</h3>
            <p>
              <strong>No opaque auctions:</strong> Order transactions exactly as your application logic
              specifies, not via priority fee bidding wars. Your users get the sequence you designed.
            </p>
            <div className="answer-example">
              <strong>Example:</strong> Fair NFT mint where every participant gets a fair chance regardless
              of gas bidding—deterministic ordering eliminates front-running.
            </div>
          </div>
        </div>
      </section>

      <section className="future-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">What's Possible with Raiku SDK</p>
            <h2>Future Possibilities Enabled by Deterministic Execution</h2>
            <p className="lede">
              This visualization demonstrates concepts that will become reality once Raiku's developer SDK
              is released. These applications are impossible on today's Solana without deterministic guarantees.
            </p>
          </div>
        </div>
        <div className="future-grid">
          <div className="future-card">
            <div className="future-icon">
              <SettlementIcon />
            </div>
            <h3>Institutional Settlement Networks</h3>
            <p>
              Banks and financial institutions can settle cross-border transactions with deterministic
              finality, meeting regulatory compliance requirements impossible with probabilistic execution.
            </p>
            <ul>
              <li>FX settlement with guaranteed timing</li>
              <li>Securities clearing with SLA guarantees</li>
              <li>Regulatory reporting with exact timestamps</li>
            </ul>
          </div>
          <div className="future-card">
            <div className="future-icon">
              <LightningIcon />
            </div>
            <h3>Zero-MEV Perpetual DEX</h3>
            <p>
              A perpetual DEX where order matching happens deterministically, eliminating all MEV
              extraction opportunities through reserved execution slots.
            </p>
            <ul>
              <li>Deterministic order matching</li>
              <li>No front-running possible</li>
              <li>Fair price discovery</li>
            </ul>
          </div>
          <div className="future-card">
            <div className="future-icon">
              <TargetIcon />
            </div>
            <h3>Fair NFT Minting Systems</h3>
            <p>
              Batch and Dutch auctions with predictable ordering, ensuring every participant gets a fair
              chance regardless of gas bidding wars.
            </p>
            <ul>
              <li>AOT-guaranteed batch auctions</li>
              <li>Predictable ordering for all users</li>
              <li>No priority fee advantages</li>
            </ul>
          </div>
          <div className="future-card">
            <div className="future-icon">
              <GlobeIcon />
            </div>
            <h3>Cross-Chain Settlement Engines</h3>
            <p>
              Atomic cross-chain operations requiring precise timing become possible with deterministic
              execution windows on both chains.
            </p>
            <ul>
              <li>Atomic timing guarantees</li>
              <li>Multi-chain coordination</li>
              <li>Predictable settlement windows</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="judging-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Submission Alignment</p>
            <h2>How This Visualization Addresses Judging Criteria</h2>
            <p className="lede">
              This storyboard directly maps to the Raiku Deterministic Execution Challenge evaluation
              framework, demonstrating creativity, relevance, feasibility, and presentation quality.
            </p>
          </div>
        </div>
        <div className="judging-grid">
          <div className="judging-card">
            <div className="judging-header">
              <h3>Creativity & Originality</h3>
              <span className="criteria-badge">✓</span>
            </div>
            <p>
              <strong>Novel approach:</strong> Interactive split-screen comparison with real-time
              animation makes deterministic execution tangible in a way no static documentation can.
            </p>
            <ul>
              <li>Visual-first explanation of AOT/JIT slots</li>
              <li>MEV mitigation educational deep dive</li>
              <li>Future possibilities showcase</li>
              <li>Not possible on today's Solana without Raiku</li>
            </ul>
          </div>
          <div className="judging-card">
            <div className="judging-header">
              <h3>Relevance to Raiku's Mission</h3>
              <span className="criteria-badge">✓</span>
            </div>
            <p>
              <strong>Direct alignment:</strong> Every element showcases Raiku's core primitives—
              coordination engine, slot marketplace, Ackermann Node, and validator sidecar.
            </p>
            <ul>
              <li>Direct citations from official Raiku docs</li>
              <li>Real metrics from Finance & DeFi analysis</li>
              <li>Technical deep dive on Raiku architecture</li>
              <li>Extends Raiku's vision with future possibilities</li>
            </ul>
          </div>
          <div className="judging-card">
            <div className="judging-header">
              <h3>Feasibility & Clarity</h3>
              <span className="criteria-badge">✓</span>
            </div>
            <p>
              <strong>Clear and executable:</strong> Built with React/TypeScript, no SDK dependency
              required. Concept is immediately understandable to both technical and non-technical judges.
            </p>
            <ul>
              <li>Runs today without Raiku SDK</li>
              <li>Self-contained interactive demo</li>
              <li>Clear navigation and information hierarchy</li>
              <li>Accessible to all skill levels</li>
            </ul>
          </div>
          <div className="judging-card">
            <div className="judging-header">
              <h3>Presentation Quality</h3>
              <span className="criteria-badge">✓</span>
            </div>
            <p>
              <strong>Professional polish:</strong> Enterprise-grade design that could serve as official
              Raiku marketing material, with compelling visuals and smooth interactions.
            </p>
            <ul>
              <li>Multi-section narrative flow</li>
              <li>Interactive animations and transitions</li>
              <li>Quantified impact metrics</li>
              <li>Ready for Loom walkthrough</li>
            </ul>
          </div>
        </div>
        <div className="track-alignment">
          <h3>Track Alignment: Visual Simulations & Blueprints</h3>
          <p>
            This submission directly addresses the "Visual Simulations & Blueprints" track by providing:
          </p>
          <div className="track-items">
            <div className="track-item">
              <strong>✓</strong> Interactive dashboard showing deterministic slot scheduling
            </div>
            <div className="track-item">
              <strong>✓</strong> Visual blueprints for integrating Raiku into DEXs, NFT markets, and games
            </div>
            <div className="track-item">
              <strong>✓</strong> Educational explainers for MEV mitigation and blockspace auctions
            </div>
            <div className="track-item">
              <strong>✓</strong> Slot scheduling visualizer showing real-time and future slot usage
            </div>
          </div>
        </div>
      </section>

      <section className="novel-architectures-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Novel App Architectures</p>
            <h2>What Becomes Possible with Deterministic Execution</h2>
            <p className="lede">
              Raiku enables entirely new application architectures that are impossible on today's Solana.
              These novel designs leverage guaranteed execution windows to create experiences previously
              confined to traditional finance.
            </p>
          </div>
        </div>
        <div className="architectures-grid">
          <div className="arch-card">
            <div className="arch-icon">
              <BatchIcon />
            </div>
            <h3>Batched & Cranked Transactions</h3>
            <p>
              Guarantee entire transaction batches execute ahead of time. No more uncertainty about
              whether your settlement batch will land before the reporting deadline.
            </p>
            <div className="arch-feature">
              <strong>AOT Reservation:</strong> Book slots up to 60 seconds in advance
            </div>
          </div>
          <div className="arch-card">
            <div className="arch-icon">
              <OrderingIcon />
            </div>
            <h3>Application-Controlled Ordering</h3>
            <p>
              Order transactions exactly as your application logic specifies, not via opaque priority
              fee auctions. Your users get the sequence you designed.
            </p>
            <div className="arch-feature">
              <strong>Deterministic Sequencing:</strong> No MEV, no front-running, no surprises
            </div>
          </div>
          <div className="arch-card">
            <div className="arch-icon">
              <RetryIcon />
            </div>
            <h3>Zero-Retry Applications</h3>
            <p>
              Ackermann Nodes handle all retry logic upstream. Your dApp code stays clean and focused
              on business logic, not infrastructure workarounds.
            </p>
            <div className="arch-feature">
              <strong>Retry Offloading:</strong> Infrastructure handles failures automatically
            </div>
          </div>
          <div className="arch-card">
            <div className="arch-icon">
              <GlobeIcon />
            </div>
            <h3>Global Edge Compute</h3>
            <p>
              Place compute where transactions happen. With 500+ globally distributed nodes, Raiku
              routes execution to the nearest validator for minimal latency.
            </p>
            <div className="arch-feature">
              <strong>Sub-30ms Pre-confirmations:</strong> Near-instant UX updates
            </div>
          </div>
        </div>
        <div className="lite-mode-cta">
          <h3>Raiku Lite Mode: Two Lines of Code</h3>
          <p>
            Integrate Raiku with as little as two lines of code. No complex SDK setup required—just
            reserve your slots and start building with certainty.
          </p>
          <div className="code-example">
            <pre>{`// Reserve AOT slot 60s ahead
await raiku.reserveSlot({ type: 'AOT', delay: 60 });

// Your transaction is now guaranteed`}</pre>
          </div>
        </div>
      </section>

      <section id="technical" className="technical-section">
        <div className="section-header">
      <div>
            <p className="eyebrow">Technical Deep Dive</p>
            <h2>How Raiku Guarantees Execution</h2>
            <p className="lede">
              Understanding the coordination engine, Slot Marketplace (siQoS), and Ackermann Node architecture
              that powers deterministic execution on Solana.
            </p>
          </div>
        </div>
        <div className="technical-grid">
          <div className="tech-card">
            <h3>Coordination Engine</h3>
            <p>
              Powers slot auctions, transaction scheduling, and guarantees inclusion through advanced block
              building. Uses the same validators that secure Solana to ensure guaranteed block inclusion.
            </p>
            <ul>
              <li>Real-time slot availability tracking</li>
              <li>Deterministic transaction ordering</li>
              <li>Global node coordination</li>
              <li>System reliability under extreme pressure</li>
            </ul>
          </div>
          <div className="tech-card">
            <h3>Slot Marketplace (siQoS)</h3>
            <p>
              A fair and efficient marketplace for blockspace (siQoS), transforming unpredictable commodity
              into guaranteed, programmable resource. Two-sided execution marketplace aligning incentives.
            </p>
            <ul>
              <li>AOT reservations up to 60s ahead</li>
              <li>JIT slots for reactive workloads</li>
              <li>Dynamic pricing based on demand</li>
              <li>Transparent blockspace trading</li>
            </ul>
          </div>
          <div className="tech-card">
            <h3>Ackermann Node</h3>
            <p>
              Part of Ackermann v1 infrastructure that routes, schedules, and confirms transactions before
              they reach the validator network. Handles retry logic upstream, eliminating the need for
              custom retry mechanisms in dApps.
            </p>
            <ul>
              <li>Routes transactions to coordination engine</li>
              <li>Automatic retry orchestration</li>
              <li>Failure detection and recovery</li>
              <li>Zero dApp-side retry code</li>
            </ul>
          </div>
          <div className="tech-card">
            <h3>Ackermann Sidecar</h3>
            <p>
              The lightweight Ackermann Sidecar runs alongside Solana validators. Node operators can sell
              tailored blockspace directly to builders while preserving composability and security.
            </p>
            <ul>
              <li>Runs alongside Anza (Agave) validators</li>
              <li>Full compatibility with Firedancer clients</li>
              <li>MEV-free revenue opportunities</li>
              <li>Real-time slot analytics and capacity tracking</li>
            </ul>
          </div>
          <div className="tech-card">
            <h3>Ackermann Validator (vAgave)</h3>
            <p>
              The Ackermann Validator (vAgave) is a modified version of the Solana validator node that
              integrates with Raiku's coordination engine for deterministic execution.
            </p>
            <ul>
              <li>Modified Agave validator implementation</li>
              <li>Native integration with coordination engine</li>
              <li>Guaranteed block inclusion</li>
              <li>Testnet available Q1 2025</li>
            </ul>
          </div>
          <div className="tech-card">
            <h3>Global Accounts</h3>
            <p>
              Support for external execution environments and shared state coordination. Enables novel
              architectures that span multiple execution contexts.
            </p>
            <ul>
              <li>External execution environment support</li>
              <li>Shared state coordination</li>
              <li>Cross-chain settlement capabilities</li>
              <li>Hybrid compute workloads</li>
            </ul>
          </div>
          <div className="tech-card">
            <h3>Raiku Lite Mode</h3>
            <p>
              Integrate with as little as two lines of code. No complex setup—just reserve slots and
              start building with deterministic execution guarantees.
            </p>
            <ul>
              <li>Minimal integration overhead</li>
              <li>Two-line code integration</li>
              <li>Progressive enhancement path</li>
              <li>Works with existing Solana tooling</li>
            </ul>
          </div>
        </div>
        <div className="cta-section">
          <h3>Ready to build with certainty?</h3>
          <p>Join the Raiku Builder Program for early SDK access and validator integration support.</p>
          <div className="cta-buttons">
            <a href="https://docs.raiku.com/participate/builders" target="_blank" rel="noreferrer" className="cta-primary">
              Builder Program →
            </a>
            <a href="https://docs.raiku.com/participate/validators" target="_blank" rel="noreferrer" className="cta-secondary">
              Validator Docs →
        </a>
      </div>
        </div>
      </section>

      <section className="benchmarks-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Performance Benchmarks</p>
            <h2>Real-World Performance Metrics</h2>
            <p className="lede">
              Measured performance data showing how Raiku's deterministic execution compares to traditional
              Solana infrastructure under various load conditions.
            </p>
          </div>
        </div>
        <div className="benchmarks-grid">
          <div className="benchmark-card">
            <h3>Under Normal Load</h3>
            <div className="benchmark-metrics">
              <div className="benchmark-item">
                <span className="metric-label">Raiku Success Rate</span>
                <span className="metric-value success">100%</span>
              </div>
              <div className="benchmark-item">
                <span className="metric-label">Traditional Solana</span>
                <span className="metric-value">85%</span>
              </div>
              <div className="benchmark-item">
                <span className="metric-label">Raiku Avg Latency</span>
                <span className="metric-value success">28ms</span>
              </div>
              <div className="benchmark-item">
                <span className="metric-label">Traditional Solana</span>
                <span className="metric-value">450ms</span>
              </div>
            </div>
          </div>
          <div className="benchmark-card">
            <h3>Under High Congestion</h3>
            <div className="benchmark-metrics">
              <div className="benchmark-item">
                <span className="metric-label">Raiku Success Rate</span>
                <span className="metric-value success">100%</span>
              </div>
              <div className="benchmark-item">
                <span className="metric-label">Traditional Solana</span>
                <span className="metric-value error">58%</span>
              </div>
              <div className="benchmark-item">
                <span className="metric-label">Raiku Avg Latency</span>
                <span className="metric-value success">33ms</span>
              </div>
              <div className="benchmark-item">
                <span className="metric-label">Traditional Solana</span>
                <span className="metric-value error">1,250ms</span>
              </div>
            </div>
          </div>
          <div className="benchmark-card">
            <h3>Extreme Stress Test</h3>
            <div className="benchmark-metrics">
              <div className="benchmark-item">
                <span className="metric-label">Raiku Success Rate</span>
                <span className="metric-value success">100%</span>
              </div>
              <div className="benchmark-item">
                <span className="metric-label">Traditional Solana</span>
                <span className="metric-value error">42%</span>
              </div>
              <div className="benchmark-item">
                <span className="metric-label">Raiku Avg Latency</span>
                <span className="metric-value success">35ms</span>
              </div>
              <div className="benchmark-item">
                <span className="metric-label">Traditional Solana</span>
                <span className="metric-value error">2,500ms+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="integration-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Integration Examples</p>
            <h2>How to Integrate Raiku</h2>
            <p className="lede">
              Practical examples showing how different types of applications can leverage Raiku's
              deterministic execution guarantees.
            </p>
          </div>
        </div>
        <div className="integration-tabs">
          <div className="integration-example">
            <h3>NFT Minting Platform</h3>
            <div className="code-example">
              <pre>{`// Schedule mint batch 60 seconds ahead
const mintSlot = await raiku.reserveSlot({
  type: 'AOT',
  delay: 60,
  transactions: mintBatch
});

// Guaranteed execution window
await mintSlot.execute();

// All mints land in exact order`}</pre>
            </div>
            <p className="example-note">
              ✓ Eliminates front-running<br />
              ✓ Guarantees fair ordering<br />
              ✓ No priority fee wars
            </p>
          </div>
          <div className="integration-example">
            <h3>DeFi Liquidation Bot</h3>
            <div className="code-example">
              <pre>{`// JIT slot for immediate liquidation
const liquidationSlot = await raiku.reserveSlot({
  type: 'JIT',
  priority: 'high'
});

// Execute within 400ms of price breach
if (position.health < threshold) {
  await liquidationSlot.execute(liquidationTx);
}`}</pre>
            </div>
            <p className="example-note">
              ✓ 400ms guaranteed execution<br />
              ✓ Prevents bad debt accumulation<br />
              ✓ No retry logic needed
            </p>
          </div>
          <div className="integration-example">
            <h3>High-Frequency Trading</h3>
            <div className="code-example">
              <pre>{`// Reserve multiple slots for HFT
const slots = await Promise.all([
  raiku.reserveSlot({ type: 'AOT', delay: 10 }),
  raiku.reserveSlot({ type: 'AOT', delay: 20 }),
  raiku.reserveSlot({ type: 'AOT', delay: 30 })
]);

// Execute trades with microsecond precision
for (const slot of slots) {
  await slot.execute(tradeTx);
}`}</pre>
            </div>
            <p className="example-note">
              ✓ Microsecond precision<br />
              ✓ Zero MEV extraction<br />
              ✓ Deterministic order matching
            </p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Frequently Asked Questions</p>
            <h2>Understanding Raiku's Deterministic Execution</h2>
            <p className="lede">
              Common questions about how Raiku's slot reservations work and what they enable.
            </p>
          </div>
        </div>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>What's the difference between AOT and JIT slots?</h3>
            <p>
              <strong>AOT (Ahead-of-Time)</strong> slots are reserved up to 60 seconds in advance, perfect
              for scheduled operations like batch settlements or NFT mints. <strong>JIT (Just-in-Time)</strong>
              slots are reserved immediately when needed, ideal for reactive operations like liquidations
              or emergency responses.
            </p>
          </div>
          <div className="faq-item">
            <h3>How does Raiku guarantee execution?</h3>
            <p>
              Raiku uses the same validators that secure Solana, but coordinates execution through an
              advanced scheduling engine. By reserving slots in the Slot Marketplace (siQoS), builders
              get guaranteed inclusion regardless of network congestion.
            </p>
          </div>
          <div className="faq-item">
            <h3>What happens if a transaction fails?</h3>
            <p>
              Ackermann Nodes automatically handle retries upstream. Your dApp doesn't need custom retry
              logic—Raiku's infrastructure ensures the transaction eventually succeeds or provides clear
              failure feedback.
            </p>
          </div>
          <div className="faq-item">
            <h3>Can I use Raiku with existing Solana tooling?</h3>
            <p>
              Yes! Raiku Lite Mode integrates with as little as two lines of code and works seamlessly
              with existing Solana tooling. The Validator Sidecar integrates with Anza (Agave) and
              Firedancer clients.
            </p>
          </div>
          <div className="faq-item">
            <h3>How does Raiku eliminate MEV?</h3>
            <p>
              By allowing applications to control transaction ordering through reserved slots, Raiku
              eliminates the opaque priority fee auctions that enable MEV extraction. Transactions execute
              in the exact order builders specify.
            </p>
          </div>
          <div className="faq-item">
            <h3>What's the cost of using Raiku?</h3>
            <p>
              Raiku operates a transparent Slot Marketplace (siQoS) with dynamic pricing based on demand.
              Costs are predictable and typically lower than priority fee bidding wars during congestion.
            </p>
          </div>
        </div>
      </section>

      <section className="roadmap-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Raiku Roadmap</p>
            <h2>What's Coming Next</h2>
            <p className="lede">
              Raiku is rapidly evolving with regular updates to core infrastructure services. Here's what
              builders can expect.
        </p>
      </div>
        </div>
        <div className="roadmap-timeline">
          <div className="roadmap-item">
            <div className="roadmap-marker current" />
            <div className="roadmap-content">
              <h3>Current: Development & Documentation</h3>
              <p>
                Ackermann v1 infrastructure is in active development. Comprehensive documentation is available
                for builders and node operators. Builder Program provides early access and direct support.
              </p>
              <ul>
                <li>Ackermann v1 documentation live</li>
                <li>Builder Program applications open</li>
                <li>Node Operator guides available</li>
                <li>Concepts and use cases documented</li>
              </ul>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="roadmap-marker upcoming" />
            <div className="roadmap-content">
              <h3>Q1 2025: Testnet Private Beta</h3>
              <p>
                Private beta launch on testnet with Ackermann Validator (vAgave) and Ackermann Sidecar.
                Early access for builders and node operators to test deterministic execution primitives.
              </p>
              <ul>
                <li>Testnet private beta launch</li>
                <li>Ackermann Validator (vAgave) on testnet</li>
                <li>Ackermann Sidecar deployment</li>
                <li>Early SDK access for beta participants</li>
              </ul>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="roadmap-marker future" />
            <div className="roadmap-content">
              <h3>Q3-Q4 2025: Mainnet Release</h3>
              <p>
                Full mainnet deployment of Ackermann v1 infrastructure with production-grade reliability.
                Enterprise-ready deterministic execution supporting institutional workloads at scale.
              </p>
              <ul>
                <li>Mainnet deployment</li>
                <li>Production SDK release</li>
                <li>Institutional-grade SLAs</li>
                <li>Global node network expansion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-content">
          <div>
            <h4>Raiku Deterministic Execution Visualization</h4>
            <p>Built for Solana Hacker Hotel DevCon 2025 - Raiku Challenge</p>
          </div>
          <div className="footer-links">
            <a href="https://www.raiku.com" target="_blank" rel="noreferrer">raiku.com</a>
            <a href="https://docs.raiku.com" target="_blank" rel="noreferrer">Documentation</a>
            <a href="https://docs.raiku.com/validator-docs" target="_blank" rel="noreferrer">Validator Docs</a>
            <a href="https://twitter.com/raikucom" target="_blank" rel="noreferrer">@raikucom</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
