type BotanicalSaplingProps = {
  className?: string;
};

export default function BotanicalSapling({ className = 'h-auto w-full max-w-[280px]' }: BotanicalSaplingProps) {
  return (
    <svg
      viewBox="0 0 260 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Hand-drawn botanical seedling illustration"
    >
      {/* Root base ground mound */}
      <path
        d="M 75 320 C 105 306 145 306 185 320"
        stroke="#1F3D2B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Delicate root hairs */}
      <path
        d="M 125 312 C 118 322 108 332 98 340"
        stroke="#1F3D2B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M 135 312 C 142 322 152 332 162 340"
        stroke="#1F3D2B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Central slender stem */}
      <line
        x1="130"
        y1="312"
        x2="130"
        y2="100"
        stroke="#1F3D2B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Floating botanical seed / pollen dots */}
      <circle cx="92" cy="218" r="2" fill="#C8861D" opacity="0.8" />
      <circle cx="172" cy="168" r="1.8" fill="#8A5A0B" opacity="0.75" />
      <circle cx="178" cy="235" r="1.6" fill="#C8861D" opacity="0.7" />

      {/* Top seed pods / buds */}
      <ellipse
        cx="120"
        cy="104"
        rx="5.5"
        ry="10.5"
        fill="#E5DDD0"
        stroke="#1F3D2B"
        strokeWidth="1.5"
      />
      <ellipse
        cx="140"
        cy="104"
        rx="5.5"
        ry="10.5"
        fill="#E5DDD0"
        stroke="#1F3D2B"
        strokeWidth="1.5"
      />
      <ellipse
        cx="130"
        cy="94"
        rx="5"
        ry="9.5"
        fill="#EEE7D9"
        stroke="#1F3D2B"
        strokeWidth="1.5"
      />

      {/* Bottom-left leaf (warm amber / ochre fill) */}
      <path
        d="M 130 236 C 96 230 76 242 70 256 C 74 268 96 274 130 256 Z"
        fill="#E4C58B"
        stroke="#1F3D2B"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Middle-left leaf (soft muted sage green) */}
      <path
        d="M 130 200 C 86 182 62 162 52 148 C 68 144 98 160 130 180 Z"
        fill="#DCE5DC"
        stroke="#1F3D2B"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Upper-right leaf (longer, graceful curve to right) */}
      <path
        d="M 130 190 C 172 158 206 138 216 128 C 200 150 170 180 130 174 Z"
        fill="#DCE5DC"
        stroke="#1F3D2B"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

