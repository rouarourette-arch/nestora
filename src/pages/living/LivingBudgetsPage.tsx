import React, { useState } from 'react';
import {
  PieChart as PieIcon,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Sliders,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DonutChart } from '../../components/charts/DonutChart';
import { BarChart } from '../../components/charts/BarChart';
import { useData } from '../../contexts/DataContext';

export const LivingBudgetsPage: React.FC = () => {
  const { expenses, activeWorkspace } = useData();

  // Illustrative category budgets
  const [budgets, setBudgets] = useState([
    { category: 'Groceries', limit: 650, spent: 480.50, color: '#234B3A' },
    { category: 'Utilities', limit: 320, spent: 222.59, color: '#8FAF9A' },
    { category: 'Supplies', limit: 120, spent: 96.20, color: '#D9A66F' },
    { category: 'Maintenance', limit: 150, spent: 32.40, color: '#476553' },
    { category: 'Entertainment', limit: 200, spent: 85.00, color: '#A9C5AF' },
  ]);

  const totalLimit = budgets.reduce((acc, curr) => acc + curr.limit, 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + curr.spent, 0);
  const percentUsed = Math.round((totalSpent / totalLimit) * 100);

  const donutData = budgets.map((b) => ({
    label: b.category,
    value: b.spent,
    color: b.color,
  }));

  const barData = [
    { label: 'Aug', value: 890, secondaryValue: 1200 },
    { label: 'Sep', value: 940, secondaryValue: 1200 },
    { label: 'Oct', value: 1020, secondaryValue: 1400 },
    { label: 'Nov (Mtd)', value: totalSpent, secondaryValue: totalLimit },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Household Budgets & Financial Analytics
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Spending ceilings, monthly trajectories, and category distribution for {activeWorkspace.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="md">
            November 2026 Cycle
          </Badge>
        </div>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4]">
            Total Household Budget
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-[#202B25] dark:text-[#F1F4F0]">
              ${totalLimit.toLocaleString()}
            </h3>
            <span className="text-xs text-[#78847C] dark:text-[#B1BDB4]">Monthly Cap</span>
          </div>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] pt-1">
            Split across 4 roommates (~${(totalLimit / 4).toFixed(0)}/person)
          </p>
        </Card>

        <Card className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4]">
            Spent Month-to-Date
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-[#234B3A] dark:text-[#8FAF9A]">
              ${totalSpent.toFixed(2)}
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              {percentUsed}% Used
            </span>
          </div>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] pt-1">
            ${(totalLimit - totalSpent).toFixed(2)} remaining under target
          </p>
        </Card>

        <Card className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4]">
            Projected End of Month
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-[#202B25] dark:text-[#F1F4F0]">
              $1,280.00
            </h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              On Track
            </span>
          </div>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] pt-1">
            Well within the $1,440 household ceiling
          </p>
        </Card>
      </div>

      {/* Visual Analytics Grid: Donut + Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
            Category Expense Allocation
          </h2>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            Actual recorded spending across major household accounts this cycle
          </p>
          <div className="pt-2 flex justify-center">
            <DonutChart
              data={donutData}
              centerValue={`$${totalSpent.toFixed(0)}`}
              centerLabel="Total Spent"
            />
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
            Multi-Month Spending vs Budget Cap
          </h2>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            Historical trajectory comparison over the last 4 billing cycles
          </p>
          <div className="pt-4">
            <BarChart
              data={barData}
              primaryLabel="Actual Spend"
              secondaryLabel="Agreed Budget Cap"
            />
          </div>
        </Card>
      </div>

      {/* Category Budget Ceilings Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
            Category Spending Caps & Progress
          </h2>
          <span className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            Ceiling Thresholds
          </span>
        </div>

        <div className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
          {budgets.map((b, idx) => {
            const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
            const isNearCap = pct >= 85;

            return (
              <div key={idx} className="p-4 sm:p-5 space-y-2 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: b.color }}
                    />
                    <span className="font-bold text-sm text-[#202B25] dark:text-[#F1F4F0]">
                      {b.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-[#202B25] dark:text-[#F1F4F0]">
                      ${b.spent.toFixed(2)}
                    </span>
                    <span className="text-[#78847C] dark:text-[#B1BDB4] ml-1">
                      / ${b.limit} cap ({pct}%)
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-[#EAECE8] dark:bg-[#1D2A23] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: isNearCap ? '#D9A66F' : b.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
