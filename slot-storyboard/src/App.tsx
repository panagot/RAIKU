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
  CheckIcon,
  OverviewIcon,
  ComparisonIcon,
  ImpactIcon,
  InfrastructureIcon,
  UseCasesIcon,
  TechnicalIcon,
  BenchmarksIcon,
  IntegrationIcon,
  FAQIcon,
  WebsiteIcon,
  TwitterIcon,
  DocsIcon
} from './Icons'

type Mode = 'raiku' | 'traditional' | 'split'
type SlotMode = 'AOT' | 'JIT'
type Phase = 'Mint' | 'Settlement' | 'Treasury'
type Status = 'Reserved' | 'Executing' | 'Confirmed' | 'Uncertain' | 'Failed'
type TabId = 'overview' | 'comparison' | 'impact' | 'infrastructure' | 'scenarios' | 'technical' | 'benchmarks' | 'integration' | 'faq'

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
  const [activeTab, setActiveTab] = useState<TabId>('overview')
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

  const tabs = [
    { id: 'overview' as TabId, label: 'Overview', icon: OverviewIcon },
    { id: 'comparison' as TabId, label: 'Comparison', icon: ComparisonIcon },
    { id: 'impact' as TabId, label: 'Impact', icon: ImpactIcon },
    { id: 'infrastructure' as TabId, label: 'Infrastructure', icon: InfrastructureIcon },
    { id: 'scenarios' as TabId, label: 'Use Cases', icon: UseCasesIcon },
    { id: 'technical' as TabId, label: 'Technical', icon: TechnicalIcon },
    { id: 'benchmarks' as TabId, label: 'Benchmarks', icon: BenchmarksIcon },
    { id: 'integration' as TabId, label: 'Integration', icon: IntegrationIcon },
    { id: 'faq' as TabId, label: 'FAQ', icon: FAQIcon }
  ]

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand">
            <span>RAIKU</span>
            <small>Slot Reservation Infrastructure</small>
          </div>
        </div>
        <nav className="sidebar-nav">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-icon">
                  <IconComponent />
                </span>
                <span className="nav-label">{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-body">
          {activeTab === 'overview' && <OverviewView setActiveTab={setActiveTab} />}
          {activeTab === 'comparison' && (
            <ComparisonView
              mode={mode}
              setMode={setMode}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              isAnimating={isAnimating}
              currentTime={currentTime}
              handlePlayPause={handlePlayPause}
              timelineLength={timelineLength}
              toGridColumn={toGridColumn}
              toGridEnd={toGridEnd}
              raikuSlots={raikuSlots}
              traditionalSlots={traditionalSlots}
            />
          )}
          {activeTab === 'impact' && <ImpactView />}
          {activeTab === 'infrastructure' && <InfrastructureView />}
          {activeTab === 'scenarios' && <ScenariosView />}
          {activeTab === 'technical' && <TechnicalView />}
          {activeTab === 'benchmarks' && <BenchmarksView />}
          {activeTab === 'integration' && <IntegrationView />}
          {activeTab === 'faq' && <FAQView />}
        </div>
      </main>

      {/* Slot Details Modal */}
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
    </div>
  )
}

// Overview Component
function OverviewView({ setActiveTab }: { setActiveTab: (tab: TabId) => void }) {
  return (
    <div className="overview-section">
      <div className="overview-hero">
        <h2>What happens when execution is <span>guaranteed?</span></h2>
        <p className="lede">
          An interactive visualization showing how Raiku's deterministic slot reservations transform
          high-stakes workflows from probabilistic chaos into predictable, institutional-grade operations.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="overview-metrics-grid">
        <div className="overview-metric-card">
          <div className="metric-icon success">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">100%</div>
            <div className="metric-label">Success Rate</div>
            <div className="metric-description">Guaranteed execution regardless of network congestion</div>
          </div>
        </div>

        <div className="overview-metric-card">
          <div className="metric-icon primary">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">&lt;30ms</div>
            <div className="metric-label">Pre-Confirmation</div>
            <div className="metric-description">Sub-30ms pre-confirmations vs 450ms-2.5s delays</div>
          </div>
        </div>

        <div className="overview-metric-card">
          <div className="metric-icon success">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">0</div>
            <div className="metric-label">Retries Needed</div>
            <div className="metric-description">Ackermann Nodes handle retries upstream</div>
          </div>
        </div>

        <div className="overview-metric-card">
          <div className="metric-icon primary">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
          <div className="metric-content">
            <div className="metric-value">500+</div>
            <div className="metric-label">Global Nodes</div>
            <div className="metric-description">Worldwide infrastructure for minimal latency</div>
          </div>
        </div>
      </div>

      {/* Quick Stats Comparison */}
      <div className="overview-comparison-card">
        <h3>Raiku vs Traditional Solana</h3>
        <div className="comparison-stats">
          <div className="stat-row">
            <span className="stat-label">Success Rate</span>
            <div className="stat-bars">
              <div className="stat-bar traditional" style={{ width: '58%' }}>
                <span>58%</span>
              </div>
              <div className="stat-bar raiku" style={{ width: '100%' }}>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div className="stat-row">
            <span className="stat-label">Avg Latency</span>
            <div className="stat-bars">
              <div className="stat-bar traditional" style={{ width: '100%' }}>
                <span>1,250ms</span>
              </div>
              <div className="stat-bar raiku" style={{ width: '3%' }}>
                <span>33ms</span>
              </div>
            </div>
          </div>
          <div className="stat-row">
            <span className="stat-label">Retry Overhead</span>
            <div className="stat-bars">
              <div className="stat-bar traditional" style={{ width: '100%' }}>
                <span>17 retries</span>
              </div>
              <div className="stat-bar raiku zero-width">
                <span>0 retries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="overview-features">
        <h3>Key Capabilities</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <BatchIcon />
            </div>
            <h4>Batched Transactions</h4>
            <p>Schedule entire transaction batches to execute at exact timestamps with AOT reservations up to 60s ahead.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <OrderingIcon />
            </div>
            <h4>Application-Controlled Ordering</h4>
            <p>Order transactions exactly as your application logic specifies, eliminating opaque priority fee auctions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <RetryIcon />
            </div>
            <h4>Zero-Retry Applications</h4>
            <p>Ackermann Nodes handle all retry orchestration upstream, keeping your dApp code clean and focused.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <GlobeIcon />
            </div>
            <h4>Global Edge Compute</h4>
            <p>500+ globally distributed nodes route execution to the nearest validator for minimal latency.</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="overview-quick-links">
        <h3>Explore More</h3>
        <div className="quick-links-grid">
          <button className="quick-link-card" onClick={() => setActiveTab('comparison')}>
            <div className="quick-link-icon">
              <ComparisonIcon />
            </div>
            <div>
              <h4>Side-by-Side Comparison</h4>
              <p>See how Raiku compares to traditional Solana execution</p>
            </div>
          </button>
          <button className="quick-link-card" onClick={() => setActiveTab('infrastructure')}>
            <div className="quick-link-icon">
              <InfrastructureIcon />
            </div>
            <div>
              <h4>Infrastructure Deep Dive</h4>
              <p>Learn about Ackermann Nodes and Sidecar architecture</p>
            </div>
          </button>
          <button className="quick-link-card" onClick={() => setActiveTab('scenarios')}>
            <div className="quick-link-icon">
              <UseCasesIcon />
            </div>
            <div>
              <h4>Use Cases</h4>
              <p>Explore applications across Finance, AI, Gaming, and DePIN</p>
            </div>
          </button>
          <button className="quick-link-card" onClick={() => setActiveTab('integration')}>
            <div className="quick-link-icon">
              <IntegrationIcon />
            </div>
            <div>
              <h4>Integration Guide</h4>
              <p>Get started with practical code examples</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

// Comparison Component - keeping the existing comparison logic
function ComparisonView({
  mode,
  setMode,
  selectedSlot,
  setSelectedSlot,
  isAnimating,
  currentTime,
  handlePlayPause,
  timelineLength,
  toGridColumn,
  toGridEnd,
  raikuSlots,
  traditionalSlots
}: {
  mode: Mode
  setMode: (mode: Mode) => void
  selectedSlot: SlotBlock | null
  setSelectedSlot: (slot: SlotBlock | null) => void
  isAnimating: boolean
  currentTime: number
  handlePlayPause: () => void
  timelineLength: number
  toGridColumn: (value: number) => number
  toGridEnd: (start: number, duration: number) => number
  raikuSlots: SlotBlock[]
  traditionalSlots: SlotBlock[]
}) {
  return (
    <div className="comparison-section">
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
              {(mode === 'raiku' ? raikuSlots : traditionalSlots).map((slot) => {
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
    </div>
  )
}

// Impact Component
function ImpactView() {
  return (
    <div className="impact-section">
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
    </div>
  )
}

// Infrastructure Component
function InfrastructureView() {
  return (
    <div className="coordination-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Ackermann v1 Infrastructure</p>
          <h2>How Ackermann Node & Sidecar Enable Deterministic Execution</h2>
          <p className="lede">
            Raiku's Ackermann v1 infrastructure routes, schedules, and confirms transactions before they reach
            the validator network, delivering transaction bundles directly to block leaders for guaranteed inclusion.
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
    </div>
  )
}

// Scenarios Component
function ScenariosView() {
  return (
    <div className="scenarios-section">
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
    </div>
  )
}

// Technical Component
function TechnicalView() {
  return (
    <div className="technical-section">
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
    </div>
  )
}

// Benchmarks Component
function BenchmarksView() {
  return (
    <div className="benchmarks-section">
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
    </div>
  )
}

// Integration Component
function IntegrationView() {
  return (
    <div className="integration-section">
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
    </div>
  )
}

// FAQ Component
function FAQView() {
  return (
    <div className="faq-section">
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
      
      {/* External Links */}
      <div className="faq-links">
        <h3>Connect with Raiku</h3>
        <div className="faq-links-grid">
          <a href="https://www.raiku.com/" target="_blank" rel="noopener noreferrer" className="faq-link-card">
            <div className="faq-link-icon">
              <WebsiteIcon />
            </div>
            <div>
              <h4>Website</h4>
              <p>Visit our website</p>
            </div>
          </a>
          <a href="https://x.com/raikucom" target="_blank" rel="noopener noreferrer" className="faq-link-card">
            <div className="faq-link-icon">
              <TwitterIcon />
            </div>
            <div>
              <h4>Twitter</h4>
              <p>Follow us on X</p>
            </div>
          </a>
          <a href="https://docs.raiku.com/" target="_blank" rel="noopener noreferrer" className="faq-link-card">
            <div className="faq-link-icon">
              <DocsIcon />
            </div>
            <div>
              <h4>Documentation</h4>
              <p>Read the docs</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
