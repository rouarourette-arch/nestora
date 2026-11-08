import React from 'react';
import {
  Activity,
  Server,
  Cpu,
  Database,
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  HardDrive,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import { BarChart } from '../../components/charts/BarChart';

export const AdminMonitoringPage: React.FC = () => {
  const serverLatencyData = [
    { label: '00:00', value: 24 },
    { label: '04:00', value: 22 },
    { label: '08:00', value: 38 },
    { label: '12:00', value: 45 },
    { label: '16:00', value: 41 },
    { label: '20:00', value: 28 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Platform System Monitoring Console
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Fleet runtime health, edge node latencies, and global workspace telemetry
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" size="md" dot>
            All Clusters Operational
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Fleet SLA Uptime"
          value="99.98%"
          change="30 Days"
          changeType="positive"
          subtitle="Zero critical downtime"
          icon={<Activity className="w-5 h-5" />}
        />
        <StatCard
          title="Avg Query Latency"
          value="32 ms"
          change="-4 ms"
          changeType="positive"
          subtitle="Regional cache hit rate 96%"
          icon={<Server className="w-5 h-5" />}
        />
        <StatCard
          title="Active Tenant Clusters"
          value="42"
          subtitle="Distributed across US-West & East"
          icon={<Globe className="w-5 h-5" />}
        />
        <StatCard
          title="Security Perimeter"
          value="100%"
          changeType="positive"
          subtitle="MFA enforced for all admins"
          icon={<ShieldCheck className="w-5 h-5" />}
        />
      </div>

      {/* Realtime Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E3EAE4] dark:border-[#354A3D]">
            <div>
              <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                API & Query Round-Trip Latency (ms)
              </h2>
              <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                Hourly median response times across multi-tenant gateway
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              Optimal (&lt; 50ms)
            </span>
          </div>

          <div className="pt-2">
            <BarChart
              data={serverLatencyData}
              height={180}
              primaryLabel="Latency (ms)"
            />
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="pb-2 border-b border-[#E3EAE4] dark:border-[#354A3D]">
            <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
              Infrastructure Nodes
            </h2>
            <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
              High-availability edge status
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { node: 'us-west-edge-01 (Oregon)', load: '28% CPU', status: 'Healthy' },
              { node: 'us-west-edge-02 (SF Bay)', load: '42% CPU', status: 'Healthy' },
              { node: 'us-east-edge-01 (Virginia)', load: '31% CPU', status: 'Healthy' },
              { node: 'eu-central-01 (Frankfurt)', load: '19% CPU', status: 'Healthy' },
            ].map((n, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#202B25] dark:text-[#F1F4F0]">{n.node}</p>
                  <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4]">{n.load}</p>
                </div>
                <Badge variant="success" size="sm" dot>
                  {n.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
