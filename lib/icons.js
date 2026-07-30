export function CoinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#e0a53a" stroke="#8a6b1a" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="#8a6b1a" strokeWidth="1" opacity="0.5" />
      <path d="M13.2 5.5 L7 13.5 H10.6 L9.6 18.5 L17 10 H13 Z" fill="#3a2a06" />
    </svg>
  );
}

function KeyShape({ color, accent }) {
  return (
    <>
      <circle cx="8" cy="8" r="5" fill="none" stroke={color} strokeWidth="2.4" />
      <circle cx="8" cy="8" r="1.6" fill={accent} />
      <rect x="12.2" y="6.7" width="9" height="2.6" fill={color} />
      <rect x="16.5" y="9.3" width="2.4" height="3" fill={color} />
      <rect x="19.5" y="9.3" width="2.4" height="4" fill={color} />
    </>
  );
}

export function KeyCommonIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <KeyShape color="#4ade80" accent="#123d1f" />
    </svg>
  );
}

export function KeyEpicIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <KeyShape color="#c084fc" accent="#2a0f3d" />
    </svg>
  );
}

export function KeyLegendaryIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <KeyShape color="#e0a53a" accent="#3d2a06" />
      <path d="M8 1.5 L8.9 3.4 L11 3.7 L9.5 5.1 L9.9 7.2 L8 6.2 L6.1 7.2 L6.5 5.1 L5 3.7 L7.1 3.4 Z" fill="#e0a53a" />
    </svg>
  );
}

export function LockIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="#3a3a3f" stroke="#55555c" strokeWidth="1" />
      <path d="M8 11 V8 a4 4 0 0 1 8 0 v3" fill="none" stroke="#55555c" strokeWidth="2" />
      <circle cx="12" cy="15.5" r="1.8" fill="#8a8d93" />
    </svg>
  );
}

export function CheckIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="#1f6b3a" />
      <path d="M7 12.5 L10.5 16 L17 8.5" fill="none" stroke="#eafff0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
