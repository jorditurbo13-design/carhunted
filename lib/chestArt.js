const PALETTE = {
  common: { base: '#2fae5c', dark: '#136b34', light: '#7cf0a6', metal: '#cdeede' },
  epic: { base: '#9b4fe0', dark: '#5a1f8a', light: '#d9aefc', metal: '#e9d4fc' },
  legendary: { base: '#e0a53a', dark: '#8a5a10', light: '#ffe08a', metal: '#fff2cf' },
};

// Caja cerrada, con cara, para las tarjetas de la pantalla "Cajas" y para la fase de temblor
export function ChestIdle({ tier = 'common', size = 90 }) {
  const p = PALETTE[tier];
  const uid = tier;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id={`lidGrad-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.light} />
          <stop offset="100%" stopColor={p.base} />
        </linearGradient>
        <linearGradient id={`bodyGrad-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.base} />
          <stop offset="100%" stopColor={p.dark} />
        </linearGradient>
      </defs>

      {tier === 'legendary' && (
        <g fill={p.light} opacity="0.9">
          <path d="M12 18 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" />
          <path d="M86 14 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6 Z" />
        </g>
      )}

      {/* Cuerpo */}
      <rect x="14" y="46" width="72" height="42" rx="9" fill={`url(#bodyGrad-${uid})`} stroke={p.dark} strokeWidth="2" />
      {/* Banda metálica */}
      <rect x="14" y="63" width="72" height="7" fill={p.metal} opacity="0.85" />
      <circle cx="20" cy="66.5" r="2.6" fill={p.dark} />
      <circle cx="80" cy="66.5" r="2.6" fill={p.dark} />
      {/* Cerradura */}
      <circle cx="50" cy="76" r="5.5" fill={p.metal} stroke={p.dark} strokeWidth="1.5" />
      <rect x="48.5" y="79" width="3" height="5" fill={p.dark} />

      {/* Tapa */}
      <path d="M12 46 Q12 24 50 22 Q88 24 88 46 Z" fill={`url(#lidGrad-${uid})`} stroke={p.dark} strokeWidth="2" />
      <rect x="16" y="38" width="68" height="6" fill={p.metal} opacity="0.7" rx="3" />

      {/* Ojos */}
      <g>
        <ellipse cx="38" cy="36" rx="8" ry="9" fill="#fff" />
        <ellipse cx="62" cy="36" rx="8" ry="9" fill="#fff" />
        <circle cx="39.5" cy="37.5" r="4" fill="#1a1a1a" />
        <circle cx="63.5" cy="37.5" r="4" fill="#1a1a1a" />
        <circle cx="41" cy="35.5" r="1.3" fill="#fff" />
        <circle cx="65" cy="35.5" r="1.3" fill="#fff" />
      </g>
      {/* Sonrisa */}
      <path d="M40 46 Q50 52 60 46" stroke={p.dark} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Caja con la tapa saltando y un haz de luz saliendo, para el instante justo antes de la silueta
export function ChestBursting({ tier = 'common', size = 130 }) {
  const p = PALETTE[tier];
  const uid = 'burst-' + tier;
  return (
    <svg width={size} height={size} viewBox="0 0 100 120">
      <defs>
        <linearGradient id={`bodyGradB-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.base} />
          <stop offset="100%" stopColor={p.dark} />
        </linearGradient>
        <radialGradient id={`beam-${uid}`} cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor={p.light} stopOpacity="0.95" />
          <stop offset="100%" stopColor={p.light} stopOpacity="0" />
        </radialGradient>
      </defs>

      <polygon points="50,0 35,60 65,60" fill={`url(#beam-${uid})`} />

      <rect x="14" y="70" width="72" height="42" rx="9" fill={`url(#bodyGradB-${uid})`} stroke={p.dark} strokeWidth="2" />
      <rect x="14" y="87" width="72" height="7" fill={p.metal} opacity="0.85" />
      <circle cx="20" cy="90.5" r="2.6" fill={p.dark} />
      <circle cx="80" cy="90.5" r="2.6" fill={p.dark} />

      {/* Tapa saltada hacia atrás */}
      <g transform="translate(50,58) rotate(-35) translate(-50,-30)">
        <path d="M12 46 Q12 24 50 22 Q88 24 88 46 Z" fill={p.base} stroke={p.dark} strokeWidth="2" />
      </g>
    </svg>
  );
}
