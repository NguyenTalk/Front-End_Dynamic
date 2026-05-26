export default function DynamicLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 50"
      className={`w-auto h-7 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Chữ D với style Netflix đỏ */}
      <text
        x="5"
        y="38"
        fontSize="36"
        fontWeight="900"
        fontFamily="Gotham, 'Arial Black', sans-serif"
        fill="#E50914"
        letterSpacing="1"
      >
        D
      </text>

      {/* Chữ YNAMIC với style Netflix trắng - spaced out */}
      <text
        x="48"
        y="38"
        fontSize="36"
        fontWeight="900"
        fontFamily="Gotham, 'Arial Black', sans-serif"
        fill="white"
        letterSpacing="2"
      >
        YNAMIC
      </text>

      {/* Line decoration dưới chữ - style Netflix */}
      <line
        x1="5"
        y1="45"
        x2="215"
        y2="45"
        stroke="#E50914"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
