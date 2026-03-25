export function LotusDecor({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="30"
        x2="72"
        y2="30"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <line
        x1="168"
        y1="30"
        x2="240"
        y2="30"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <polygon
        points="56,30 62,24 68,30 62,36"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
      />
      <polygon
        points="172,30 178,24 184,30 178,36"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
      />
      <path
        d="M120,45 C108,36 104,20 120,14 C136,20 132,36 120,45Z"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M120,45 C104,40 96,24 108,16 C118,18 124,30 120,45Z"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
      />
      <path
        d="M120,45 C136,40 144,24 132,16 C122,18 116,30 120,45Z"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
      />
      <path
        d="M120,45 C100,44 92,30 100,20 C108,16 116,28 120,45Z"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
      />
      <path
        d="M120,45 C140,44 148,30 140,20 C132,16 124,28 120,45Z"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
      />
      <circle
        cx="120"
        cy="32"
        r="2.5"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
      />
      <circle cx="120" cy="32" r="1" fill="currentColor" />
    </svg>
  );
}
