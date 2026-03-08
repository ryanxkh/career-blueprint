/**
 * Decorative SVG brand element — a rotated square (diamond) with internal
 * grid lines and crosshair, evoking architectural blueprint drafting.
 * Uses currentColor so it inherits the parent's text color/opacity.
 */
export function BlueprintDiamond({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable={false}
      className={className}
    >
      <defs>
        <pattern
          id="bp-grid"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45 100 100)"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.35"
          />
        </pattern>
        <clipPath id="diamond-clip">
          <rect
            x="29"
            y="29"
            width="142"
            height="142"
            transform="rotate(45 100 100)"
          />
        </clipPath>
      </defs>

      {/* Grid fill inside diamond */}
      <rect
        x="0"
        y="0"
        width="200"
        height="200"
        fill="url(#bp-grid)"
        clipPath="url(#diamond-clip)"
      />

      {/* Diamond outline */}
      <rect
        x="29"
        y="29"
        width="142"
        height="142"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(45 100 100)"
      />

      {/* Center crosshair */}
      <line
        x1="100" y1="55" x2="100" y2="145"
        stroke="currentColor" strokeWidth="0.75" opacity="0.4"
      />
      <line
        x1="55" y1="100" x2="145" y2="100"
        stroke="currentColor" strokeWidth="0.75" opacity="0.4"
      />

      {/* Corner tick marks */}
      <line x1="100" y1="2" x2="100" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="100" y1="186" x2="100" y2="198" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="2" y1="100" x2="14" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="186" y1="100" x2="198" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
