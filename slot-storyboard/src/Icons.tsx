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

