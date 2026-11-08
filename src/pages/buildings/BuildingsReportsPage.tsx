import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  TrendingUp,
  ShieldCheck,
  Calendar,
  DollarSign,
  PieChart as PieIcon,
  Layers,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { BarChart } from '../../components/charts/BarChart';
import { DonutChart } from '../../components/charts/DonutChart';
import { useData } from '../../contexts/DataContext';

export const BuildingsReportsPage: React.FC = () => {
  const { activeWorkspace } = useData();

  const capitalTrajectory = [
    { label: '2024', value: 145000, secondaryValue: 150000 },
    { label: '2025', value: 168000, secondaryValue: 170000 },
    { label: '2026', value: 184500, secondaryValue: 190000 },
    { label: '2027 (Proj)', value: 215000, secondaryValue: 210000 },
    { label: '2028 (Proj)', value: 248000, secondaryValue: 235000 },
  ];

  const capitalProjects = [
    {
      item: 'North Passenger Elevator Modernization',
      projectedYear: '2028',
      estimatedCost: 65000,
      fundedPercentage: 100,
      urgency: 'Medium',
    },
    {
      item: 'Rooftop Membrane Sealant Replacement',
      projectedYear: '2029',
      estimatedCost: 48000,
      fundedPercentage: 92,
      urgency: 'Planned',
    },
    {
      item: 'Underground Garage LED Retrofit & EV Conduit',
      projectedYear: '2027',
      estimatedCost: 18500,
      fundedPercentage: 100,
      urgency: 'Scheduled',
    },
    {
      item: 'Exterior Façade Pressure Wash & Repointing',
      projectedYear: '2027',
      estimatedCost: 22000,
      fundedPercentage: 100,
      urgency: 'Scheduled',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Financial Reports, Operating Expenditure & Capital Budget Forecasting
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Audited balance statements, operating expenditures, and 5-year capital replacement forecasts for {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="outline"
          icon={<Download className="w-4 h-4" />}
          onClick={() => {
            const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(capitalProjects, null, 2));
            const dl = document.createElement('a');
            dl.setAttribute('href', dataStr);
            dl.setAttribute('download', 'cedar_heights_financial_report_2026.json');
            dl.click();
          }}
        >
          Export Financial Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="space-y-1">
          <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
            Operating Capital Fund
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-[#234B3A] dark:text-[#8FAF9A]">
              $184,500
            </h3>
            <Badge variant="success" size="sm">
              Healthy
            </Badge>
          </div>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            Allocated for planned property improvements and physical plant maintenance
          </p>
        </Card>

        <Card className="space-y-1">
          <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
            Annual Capital Contribution
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-[#202B25] dark:text-[#F1F4F0]">
              $36,800 / yr
            </h3>
          </div>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            Allocated automatically from monthly unit common dues
          </p>
        </Card>

        <Card className="space-y-1">
          <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
            Special Assessment Risk
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
              Low (0.0%)
            </h3>
          </div>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            Zero emergency assessments anticipated through 2029
          </p>
        </Card>
      </div>

      {/* 5-Year Capital Budget & Operating Trajectory Bar Chart */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E3EAE4] dark:border-[#354A3D]">
          <div>
            <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
              5-Year Capital Budget & Operating Trajectory
            </h2>
            <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
              Comparison of projected capital investments against operating allocations
            </p>
          </div>
        </div>

        <div className="pt-2">
          <BarChart
            data={capitalTrajectory}
            height={220}
            primaryLabel="Capital Allocation ($)"
            secondaryLabel="Projected Expenditure ($)"
          />
        </div>
      </Card>

      {/* Capital Replacement Schedule Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
            <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
              Upcoming Major Capital Improvements
            </h2>
          </div>
          <span className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            5-Year Capital Plan
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F3F5F2]/70 dark:bg-[#1D2A23] text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <tr>
                <th className="py-3 px-4">Component / Physical Plant</th>
                <th className="py-3 px-4">Target Year</th>
                <th className="py-3 px-4">Projected Cost</th>
                <th className="py-3 px-4">Budget Allocation</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {capitalProjects.map((p, idx) => (
                <tr key={idx} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-sm text-[#202B25] dark:text-[#F1F4F0]">
                    {p.item}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-[#234B3A] dark:text-[#8FAF9A]">
                    {p.projectedYear}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#202B25] dark:text-[#F1F4F0]">
                    ${p.estimatedCost.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-xs">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {p.fundedPercentage}% Allocated
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Badge variant="primary" size="sm">
                      {p.urgency}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
