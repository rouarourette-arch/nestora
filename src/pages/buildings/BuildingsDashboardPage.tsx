import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Building,
  Users,
  Wrench,
  Receipt,
  Vote,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Plus,
  CheckCircle2,
  TrendingUp,
  FileText,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import { BarChart } from '../../components/charts/BarChart';
import { DonutChart } from '../../components/charts/DonutChart';
import { useData } from '../../contexts/DataContext';

export const BuildingsDashboardPage: React.FC = () => {
  const {
    activeWorkspace,
    buildings,
    units,
    contributions,
    tickets,
    announcements,
    meetings,
  } = useData();
  const navigate = useNavigate();

  const activeTickets = tickets.filter((t) => t.status !== 'COMPLETED');
  const paidContributions = contributions.filter((c) => c.status === 'RECORDED_PAID');
  const totalCollected = paidContributions.reduce((acc, curr) => acc + curr.totalDue, 0);

  const trajectoryData = [
    { label: 'Jul', value: 13800, secondaryValue: 14000 },
    { label: 'Aug', value: 14100, secondaryValue: 14000 },
    { label: 'Sep', value: 14250, secondaryValue: 14500 },
    { label: 'Oct', value: 14600, secondaryValue: 14500 },
    { label: 'Nov (Mtd)', value: totalCollected, secondaryValue: 15200 },
  ];

  const allocationData = [
    { label: 'Capital Improvement Fund', value: 5400, color: '#234B3A' },
    { label: 'Elevator & Mechanical', value: 3850, color: '#8FAF9A' },
    { label: 'Common Utilities', value: 2900, color: '#D9A66F' },
    { label: 'Grounds & Sanitation', value: 1450, color: '#476553' },
    { label: 'Building Insurance', value: 1600, color: '#A9C5AF' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#234B3A] to-[#1c3c2e] text-white shadow-sm relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏢</span>
            <Badge variant="accent" size="sm">
              Condominium Association
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {activeWorkspace.name}
          </h1>
          <p className="text-xs text-[#E7EFE8]/80 max-w-xl">
            24 Units • 96% Occupancy • General Owners Assembly voting is currently open with quorum reached (83.3%).
          </p>
        </div>

        <div className="flex items-center gap-2.5 relative z-10">
          <Button
            variant="accent"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/buildings/maintenance')}
          >
            Dispatch Ticket
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/buildings/meetings')}
          >
            Assembly Voting
          </Button>
        </div>

        <div className="absolute -right-8 -bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Common Dues Recorded"
          value={`$${totalCollected.toLocaleString()}`}
          change="+4.2%"
          changeType="positive"
          subtitle="November 2026 collection"
          icon={<Receipt className="w-5 h-5" />}
        />
        <StatCard
          title="Active Maintenance Tickets"
          value={activeTickets.length}
          subtitle="1 High Priority (Elevator)"
          icon={<Wrench className="w-5 h-5" />}
        />
        <StatCard
          title="Building Occupancy"
          value="96%"
          subtitle="23 of 24 units occupied"
          icon={<Building className="w-5 h-5" />}
        />
        <StatCard
          title="Operating Capital Fund"
          value="$184,500"
          change="+2.5%"
          changeType="positive"
          subtitle="5-year capital forecast"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Charts Grid: Trajectory & Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Trajectory Chart (2 cols) */}
        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E3EAE4] dark:border-[#354A3D]">
            <div>
              <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                Expenses & Financial Trajectory
              </h2>
              <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                Monthly common assessments collected vs approved operating baseline
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/buildings/reports')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Financial Reports
            </Button>
          </div>

          <div className="pt-2">
            <BarChart
              data={trajectoryData}
              height={200}
              primaryLabel="Actual Assessment"
              secondaryLabel="Approved Budget"
            />
          </div>
        </Card>

        {/* Expense Allocation Donut (1 col) */}
        <Card className="space-y-4">
          <div className="pb-2 border-b border-[#E3EAE4] dark:border-[#354A3D]">
            <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
              Expense Allocation
            </h2>
            <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
              Common funds breakdown
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <DonutChart
              data={allocationData}
              centerValue="$15,200"
              centerLabel="Monthly Operating"
              size={170}
            />
          </div>
        </Card>
      </div>

      {/* Bottom Grid: Assembly Meetings & Priority Maintenance Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assembly Voting & Meetings */}
        <Card padding="none" className="overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Vote className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
              <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                Upcoming Meetings & Assembly Voting
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/buildings/meetings')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              All Sessions
            </Button>
          </div>

          <div className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="p-4 space-y-2 hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#202B25] dark:text-[#F1F4F0]">
                      {meeting.title}
                    </h3>
                    <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
                      {meeting.date} • {meeting.location}
                    </p>
                  </div>
                  <Badge
                    variant={meeting.status === 'VOTING_OPEN' ? 'success' : 'neutral'}
                    size="sm"
                    dot
                  >
                    {meeting.status.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs pt-1">
                  <span className="font-semibold text-[#234B3A] dark:text-[#8FAF9A]">
                    Quorum: {meeting.quorumPercentage}% Achieved
                  </span>
                  <span>•</span>
                  <span className="text-[#78847C] dark:text-[#B1BDB4]">
                    {meeting.agendaItems.length} Agenda Items to Vote
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Priority Maintenance Tickets Checklist */}
        <Card padding="none" className="overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
              <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                Priority Maintenance Dispatch
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/buildings/maintenance')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Dispatch Center
            </Button>
          </div>

          <div className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
            {tickets.map((tkt) => (
              <div key={tkt.id} className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#234B3A] dark:text-[#8FAF9A]">
                      {tkt.ticketNumber}
                    </span>
                    <Badge
                      variant={
                        tkt.priority === 'HIGH' || tkt.priority === 'CRITICAL'
                          ? 'danger'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {tkt.priority}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-[#202B25] dark:text-[#F1F4F0] truncate mt-0.5">
                    {tkt.title}
                  </p>
                  <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                    {tkt.location} • Provider: {tkt.assignedProviderName}
                  </p>
                </div>

                <Badge
                  variant={tkt.status === 'COMPLETED' ? 'success' : 'warning'}
                  size="sm"
                >
                  {tkt.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
