"use client";

interface AnimatedBarProps {
  label: string;
  percentage: number;
  color: string;
}

export default function AnimatedBar({ label, percentage, color }: AnimatedBarProps) {
  return (
    <div className="flex items-center gap-4 group">
      <span className="text-gray-300 text-sm font-sans w-44 shrink-0 text-right">
        {label}
      </span>
      <div className="flex-1 h-10 bg-white/5 rounded-sm overflow-hidden relative">
        <div
          data-bar={`${percentage}%`}
          className="h-full rounded-sm"
          style={{ backgroundColor: color, width: "0%" }}
        />
      </div>
      <span className="text-white text-sm font-bold font-sans w-12 shrink-0">
        {percentage}%
      </span>
    </div>
  );
}
