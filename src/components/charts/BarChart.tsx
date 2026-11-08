import React from 'react';

export interface BarDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface BarChartProps {
  data: BarDataPoint[];
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 180,
  primaryColor = '#234B3A',
  secondaryColor = '#D9A66F',
  primaryLabel = 'Actual',
  secondaryLabel = 'Budgeted',
}) => {
  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.value, d.secondaryValue || 0)),
    100
  );

  return (
    <div className="w-full">
      {(primaryLabel || secondaryLabel) && (
        <div className="flex items-center justify-end gap-4 mb-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: primaryColor }} />
            <span className="text-[#78847C] dark:text-[#B1BDB4]">{primaryLabel}</span>
          </div>
          {secondaryLabel && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: secondaryColor }} />
              <span className="text-[#78847C] dark:text-[#B1BDB4]">{secondaryLabel}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-end gap-3 sm:gap-4 justify-between" style={{ height }}>
        {data.map((item, index) => {
          const primaryHeightPercent = Math.round((item.value / maxValue) * 100);
          const secondaryHeightPercent = item.secondaryValue
            ? Math.round((item.secondaryValue / maxValue) * 100)
            : 0;

          return (
            <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div className="w-full flex items-end justify-center gap-1 h-full pb-2">
                <div
                  className="w-full max-w-[18px] rounded-t-md transition-all duration-300 relative group-hover:opacity-90"
                  style={{
                    height: `${primaryHeightPercent}%`,
                    backgroundColor: primaryColor,
                  }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#202B25] text-white text-[10px] py-1 px-1.5 rounded pointer-events-none whitespace-nowrap z-10 transition-opacity">
                    ${item.value}
                  </div>
                </div>

                {item.secondaryValue !== undefined && (
                  <div
                    className="w-full max-w-[18px] rounded-t-md transition-all duration-300 relative group-hover:opacity-90"
                    style={{
                      height: `${secondaryHeightPercent}%`,
                      backgroundColor: secondaryColor,
                    }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#202B25] text-white text-[10px] py-1 px-1.5 rounded pointer-events-none whitespace-nowrap z-10 transition-opacity">
                      ${item.secondaryValue}
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[11px] font-medium text-[#78847C] dark:text-[#B1BDB4] mt-1 truncate max-w-full text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
