import React from 'react';

export interface DonutDataPoint {
  label: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  data: DonutDataPoint[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
  strokeWidth?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  centerLabel,
  centerValue,
  size = 180,
  strokeWidth = 22,
}) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
          {data.map((item, index) => {
            const percent = item.value / total;
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedPercent * circumference;
            accumulatedPercent += percent;

            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            );
          })}
        </svg>

        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            {centerValue && (
              <span className="text-xl font-bold text-[#202B25] dark:text-[#F1F4F0]">
                {centerValue}
              </span>
            )}
            {centerLabel && (
              <span className="text-[11px] font-medium text-[#78847C] dark:text-[#B1BDB4]">
                {centerLabel}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2 w-full max-w-xs">
        {data.map((item, index) => {
          const percent = Math.round((item.value / total) * 100);
          return (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#202B25] dark:text-[#F1F4F0] font-medium truncate">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#78847C] dark:text-[#B1BDB4]">{percent}%</span>
                <span className="text-[#202B25] dark:text-[#F1F4F0] font-semibold">
                  ${item.value.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
