// Custom SVG Icons for Raiku Storyboard

export const FinanceIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 8L12 20V32C12 42.5 20.5 51 32 56C43.5 51 52 42.5 52 32V20L32 8Z"
      fill="url(#financeGrad)"
      stroke="rgba(125, 241, 255, 0.3)"
      strokeWidth="2"
    />
    <path
      d="M32 24V40M24 32H40"
      stroke="#7df1ff"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="32" cy="32" r="4" fill="#00ff88" />
    <defs>
      <linearGradient id="financeGrad" x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7df1ff" stopOpacity="0.2" />
        <stop offset="1" stopColor="#5c5cff" stopOpacity="0.1" />
      </linearGradient>
    </defs>
  </svg>
)

export const AIIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="24" r="12" fill="url(#aiGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="2" />
    <path
      d="M20 40L16 56H48L44 40H20Z"
      fill="url(#aiGrad)"
      stroke="rgba(125, 241, 255, 0.3)"
      strokeWidth="2"
    />
    <circle cx="26" cy="20" r="2" fill="#7df1ff" />
    <circle cx="38" cy="20" r="2" fill="#7df1ff" />
    <path
      d="M28 28C28 29.5 29.5 30.5 32 30.5C34.5 30.5 36 29.5 36 28"
      stroke="#5c5cff"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="aiGrad" x1="32" y1="12" x2="32" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#c7a6ff" stopOpacity="0.3" />
        <stop offset="1" stopColor="#9475ff" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
)

export const GamingIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="20" width="32" height="24" rx="4" fill="url(#gamingGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="2" />
    <circle cx="24" cy="32" r="3" fill="#ff6b6b" />
    <circle cx="40" cy="32" r="3" fill="#4ecdc4" />
    <rect x="28" y="28" width="8" height="8" rx="1" fill="#ffd93d" />
    <path
      d="M20 16L24 20M44 20L48 16M20 48L24 44M44 44L48 48"
      stroke="#7df1ff"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="gamingGrad" x1="32" y1="20" x2="32" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff6b6b" stopOpacity="0.2" />
        <stop offset="1" stopColor="#4ecdc4" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
)

export const DePINIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="28" width="8" height="20" rx="1" fill="url(#depinGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="1.5" />
    <rect x="24" y="20" width="8" height="28" rx="1" fill="url(#depinGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="1.5" />
    <rect x="36" y="24" width="8" height="24" rx="1" fill="url(#depinGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="1.5" />
    <rect x="48" y="16" width="8" height="32" rx="1" fill="url(#depinGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="1.5" />
    <circle cx="16" cy="32" r="1.5" fill="#7df1ff" />
    <circle cx="28" cy="24" r="1.5" fill="#7df1ff" />
    <circle cx="40" cy="28" r="1.5" fill="#7df1ff" />
    <circle cx="52" cy="20" r="1.5" fill="#7df1ff" />
    <path
      d="M8 12L32 8L56 12"
      stroke="#5c5cff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="2 2"
    />
    <defs>
      <linearGradient id="depinGrad" x1="32" y1="16" x2="32" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4ac3ff" stopOpacity="0.3" />
        <stop offset="1" stopColor="#7df1ff" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
)

export const SettlementIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="20" width="32" height="28" rx="3" fill="url(#settlementGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="2" />
    <path
      d="M24 32L30 38L40 26"
      stroke="#00ff88"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="16" r="4" fill="#7df1ff" />
    <path
      d="M28 16H36M32 12V20"
      stroke="#050114"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="settlementGrad" x1="32" y1="20" x2="32" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9475ff" stopOpacity="0.25" />
        <stop offset="1" stopColor="#5c5cff" stopOpacity="0.15" />
      </linearGradient>
    </defs>
  </svg>
)

export const LightningIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M36 8L20 36H32L28 56L44 28H32L36 8Z"
      fill="url(#lightningGrad)"
      stroke="rgba(255, 200, 87, 0.4)"
      strokeWidth="2"
    />
    <defs>
      <linearGradient id="lightningGrad" x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffc857" stopOpacity="0.8" />
        <stop offset="1" stopColor="#ff9500" stopOpacity="0.6" />
      </linearGradient>
    </defs>
  </svg>
)

export const TargetIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="24" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="2" />
    <circle cx="32" cy="32" r="16" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="2" />
    <circle cx="32" cy="32" r="8" fill="#7df1ff" />
    <circle cx="32" cy="32" r="4" fill="#00ff88" />
    <path
      d="M32 8V16M32 48V56M8 32H16M48 32H56"
      stroke="#5c5cff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export const GlobeIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="20" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="2" />
    <path
      d="M12 32C12 32 18 24 32 24C46 24 52 32 52 32C52 32 46 40 32 40C18 40 12 32 12 32Z"
      stroke="rgba(125, 241, 255, 0.2)"
      strokeWidth="1.5"
    />
    <path
      d="M32 12C32 12 24 18 24 32C24 46 32 52 32 52C32 52 40 46 40 32C40 18 32 12 32 12Z"
      stroke="rgba(125, 241, 255, 0.2)"
      strokeWidth="1.5"
    />
    <circle cx="32" cy="32" r="3" fill="#7df1ff" />
    <path
      d="M20 20L24 24M44 24L48 20M20 44L24 40M44 40L48 44"
      stroke="#5c5cff"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export const BatchIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="16" width="12" height="12" rx="2" fill="url(#batchGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="2" />
    <rect x="28" y="20" width="12" height="12" rx="2" fill="url(#batchGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="2" />
    <rect x="44" y="24" width="12" height="12" rx="2" fill="url(#batchGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="2" />
    <path
      d="M18 22L26 26L50 30"
      stroke="#00ff88"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="22" r="2" fill="#00ff88" />
    <circle cx="26" cy="26" r="2" fill="#00ff88" />
    <circle cx="50" cy="30" r="2" fill="#00ff88" />
    <defs>
      <linearGradient id="batchGrad" x1="32" y1="16" x2="32" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7df1ff" stopOpacity="0.25" />
        <stop offset="1" stopColor="#4ac3ff" stopOpacity="0.15" />
      </linearGradient>
    </defs>
  </svg>
)

export const OrderingIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="12" width="32" height="8" rx="2" fill="url(#orderGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="1.5" />
    <rect x="16" y="24" width="32" height="8" rx="2" fill="url(#orderGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="1.5" />
    <rect x="16" y="36" width="32" height="8" rx="2" fill="url(#orderGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="1.5" />
    <rect x="16" y="48" width="32" height="8" rx="2" fill="url(#orderGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="1.5" />
    <path
      d="M20 16L24 20L28 16M20 28L24 32L28 28M20 40L24 44L28 40M20 52L24 56L28 52"
      stroke="#7df1ff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="orderGrad" x1="32" y1="12" x2="32" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5c5cff" stopOpacity="0.2" />
        <stop offset="1" stopColor="#9475ff" stopOpacity="0.15" />
      </linearGradient>
    </defs>
  </svg>
)

export const RetryIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 32C20 26 25 21 32 21C36 21 39.5 23 41.5 26"
      stroke="rgba(125, 241, 255, 0.4)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M44 26L41.5 26L41.5 22"
      stroke="rgba(125, 241, 255, 0.4)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M44 32C44 38 39 43 32 43C28 43 24.5 41 22.5 38"
      stroke="#00ff88"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M20 38L22.5 38L22.5 42"
      stroke="#00ff88"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="32" r="16" stroke="rgba(125, 241, 255, 0.2)" strokeWidth="1.5" />
    <circle cx="32" cy="32" r="4" fill="#00ff88" />
    <defs>
      <linearGradient id="retryGrad" x1="32" y1="16" x2="32" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ff88" stopOpacity="0.2" />
        <stop offset="1" stopColor="#7df1ff" stopOpacity="0.1" />
      </linearGradient>
    </defs>
  </svg>
)

export const FlowIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="20" width="32" height="24" rx="3" fill="url(#flowGrad)" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="2" />
    <path
      d="M24 28L32 24L40 28M24 36L32 40L40 36"
      stroke="#7df1ff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="28" cy="32" r="2" fill="#7df1ff" />
    <circle cx="36" cy="32" r="2" fill="#5c5cff" />
    <defs>
      <linearGradient id="flowGrad" x1="32" y1="20" x2="32" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7df1ff" stopOpacity="0.15" />
        <stop offset="1" stopColor="#4ac3ff" stopOpacity="0.1" />
      </linearGradient>
    </defs>
  </svg>
)

export const ProcessingIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="20" stroke="rgba(125, 241, 255, 0.3)" strokeWidth="2" />
    <path
      d="M20 32C20 26 25 21 32 21C36 21 39.5 23 41.5 26M44 32C44 38 39 43 32 43C28 43 24.5 41 22.5 38"
      stroke="#7df1ff"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="32" cy="32" r="8" fill="url(#processGrad)" />
    <circle cx="32" cy="32" r="4" fill="#5c5cff" />
    <defs>
      <linearGradient id="processGrad" x1="32" y1="24" x2="32" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#c7a6ff" stopOpacity="0.3" />
        <stop offset="1" stopColor="#9475ff" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
)

export const DeliveryIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 40L20 28H36L40 40H16Z"
      fill="url(#deliveryGrad)"
      stroke="rgba(125, 241, 255, 0.3)"
      strokeWidth="2"
    />
    <path
      d="M20 28L28 20L36 28"
      stroke="#ffc857"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="36" r="3" fill="#7df1ff" />
    <circle cx="32" cy="36" r="3" fill="#5c5cff" />
    <path
      d="M28 20V12M32 20V12"
      stroke="#00ff88"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="deliveryGrad" x1="28" y1="28" x2="28" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffc857" stopOpacity="0.25" />
        <stop offset="1" stopColor="#ff9500" stopOpacity="0.15" />
      </linearGradient>
    </defs>
  </svg>
)

export const CheckIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="20" fill="url(#checkGrad)" stroke="rgba(0, 255, 136, 0.4)" strokeWidth="2" />
    <path
      d="M24 32L30 38L40 26"
      stroke="#00ff88"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="checkGrad" x1="32" y1="12" x2="32" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00ff88" stopOpacity="0.2" />
        <stop offset="1" stopColor="#7df1ff" stopOpacity="0.1" />
      </linearGradient>
    </defs>
  </svg>
)

// Sidebar Navigation Icons
export const OverviewIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

export const ComparisonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6L12 2L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M8 18L12 22L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

export const ImpactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 20L9 14L13 18L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M21 10V4H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

export const InfrastructureIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="2" y="10" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="2" y="16" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="6" cy="6" r="1" fill="currentColor" />
    <circle cx="12" cy="6" r="1" fill="currentColor" />
    <circle cx="18" cy="6" r="1" fill="currentColor" />
    <circle cx="6" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="18" cy="12" r="1" fill="currentColor" />
    <circle cx="6" cy="18" r="1" fill="currentColor" />
    <circle cx="12" cy="18" r="1" fill="currentColor" />
    <circle cx="18" cy="18" r="1" fill="currentColor" />
  </svg>
)

export const UseCasesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M8 12H16M8 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const TechnicalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const BenchmarksIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="18" width="4" height="4" rx="0.5" fill="currentColor" />
    <rect x="8" y="14" width="4" height="8" rx="0.5" fill="currentColor" />
    <rect x="13" y="10" width="4" height="12" rx="0.5" fill="currentColor" />
    <rect x="18" y="6" width="4" height="16" rx="0.5" fill="currentColor" />
    <line x1="2" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IntegrationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="14" y="8" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
)

export const FAQIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M9 9C9 7.89543 9.89543 7 11 7H12C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
)

// Social/External Link Icons
export const WebsiteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 12H4M20 12H22M12 2V4M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 4.01C21.35 4.3 20.66 4.5 19.94 4.61C20.68 4.15 21.26 3.5 21.55 2.7C20.86 3.12 20.08 3.42 19.24 3.57C18.58 2.87 17.6 2.4 16.5 2.4C14.42 2.4 12.74 4.08 12.74 6.16C12.74 6.42 12.77 6.67 12.82 6.91C9.28 6.75 6.11 5.16 3.78 2.86C3.5 3.28 3.34 3.8 3.34 4.36C3.34 5.42 3.87 6.35 4.66 6.94C4.08 6.92 3.53 6.77 3.05 6.52V6.57C3.05 8.38 4.22 9.93 5.84 10.26C5.58 10.34 5.3 10.38 5.01 10.38C4.8 10.38 4.6 10.36 4.4 10.32C4.81 11.85 6.18 12.99 7.84 13.01C6.55 14.03 4.87 14.62 3.05 14.62C2.78 14.62 2.52 14.6 2.26 14.57C3.94 15.68 5.99 16.3 8.17 16.3C16.5 16.3 21.28 10.46 21.28 5.48C21.28 5.32 21.28 5.16 21.27 5C21.98 4.52 22.59 3.93 23.08 3.25L22 4.01Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

export const DocsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M8 12H16M8 16H16M8 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

