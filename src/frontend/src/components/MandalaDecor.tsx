const RING1_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const RING2_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function MandalaDecor({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="100"
        cy="100"
        r="96"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="4 3"
      />
      <circle
        cx="100"
        cy="100"
        r="86"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      {RING1_ANGLES.map((deg) => {
        const angle = (deg * Math.PI) / 180;
        const cx2 = 100 + 72 * Math.cos(angle);
        const cy2 = 100 + 72 * Math.sin(angle);
        return (
          <circle
            key={`r1-${deg}`}
            cx={cx2}
            cy={cy2}
            r="8"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        );
      })}
      {RING2_ANGLES.map((deg) => {
        const angle = (deg * Math.PI) / 180;
        const cx2 = 100 + 52 * Math.cos(angle);
        const cy2 = 100 + 52 * Math.sin(angle);
        return (
          <ellipse
            key={`r2-${deg}`}
            cx={cx2}
            cy={cy2}
            rx="6"
            ry="10"
            transform={`rotate(${deg} ${cx2} ${cy2})`}
            stroke="currentColor"
            strokeWidth="0.6"
          />
        );
      })}
      <circle
        cx="100"
        cy="100"
        r="32"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <circle
        cx="100"
        cy="100"
        r="20"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <polygon
        points="100,72 111,91 132,91 121,108 132,127 111,127 100,146 89,127 68,127 79,108 68,91 89,91"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
      />
      <circle cx="100" cy="100" r="8" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="3" fill="currentColor" />
    </svg>
  );
}
