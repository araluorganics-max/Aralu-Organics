type IconProps = { className?: string };

const base = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export function LeafIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 38C10 20 20 10 40 8c-1 20-11 30-30 30z" />
      <path d="M10 38L28 20" />
    </svg>
  );
}

export function SeedIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M24 6c8 8 10 18 0 36-10-18-8-28 0-36z" />
      <path d="M24 14v22" />
    </svg>
  );
}

export function PodIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14 14c-4 10-2 22 8 26 10-4 12-16 8-26-5-4-11-4-16 0z" />
      <path d="M22 16v22" />
      <path d="M22 16c2-4 6-6 10-6" />
    </svg>
  );
}

export function DropIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M24 6c-7 10-12 17-12 24a12 12 0 0 0 24 0c0-7-5-14-12-24z" />
      <path d="M18 30a6 6 0 0 0 6 6" />
    </svg>
  );
}

export function BotanicalSprig({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth={1.4} className={className} aria-hidden="true" focusable="false">
      <path d="M60 156V20" strokeLinecap="round" />
      <path d="M60 130c-26 0-38-14-40-34 22 0 36 12 40 34z" />
      <path d="M60 100c24 0 38-14 40-34-22 0-36 12-40 34z" />
      <path d="M60 70c-22 0-32-12-32-30 20 0 30 10 32 30z" />
      <path d="M60 46c18 0 28-10 28-26-18 0-28 9-28 26z" />
    </svg>
  );
}
