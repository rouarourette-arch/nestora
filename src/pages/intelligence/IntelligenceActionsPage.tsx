import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  FileCode,
  ArrowRight,
  Filter,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { useData } from '../../contexts/DataContext';
import { ActionStatus, ProposedAction } from '../../types';

export const IntelligenceActionsPage: React.FC = () => {
  const { proposedActions, approveAction, rejectAction, activeWorkspace } = useData();
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [inspectedAction, setInspectedAction] = useState<ProposedAction | null>(null);

  const filtered = proposedActions.filter((a) => {
    return selectedStatus === 'ALL' || a.status === selectedStatus;
  });

  const getStatusBadge = (st: ActionStatus) => {
    switch (st) {
      case 'PROPOSED':
        return <Badge variant="accent" size="sm" dot>Awaiting Approval</Badge>;
      case 'APPROVED':
        return <Badge variant="primary" size="sm" dot>Approved</Badge>;
      case 'EXECUTED':
        return <Badge variant="success" size="sm" dot>Executed</Badge>;
      case 'REJECTED':
        return <Badge variant="danger" size="sm" dot>Rejected</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{st}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🛡️</span>
            <Badge variant="primary" size="sm">
              2-Step Human Oversight
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Proposed Action Preview & Approval Hub
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Audit, inspect raw parameters, and approve or reject supervised actions for {activeWorkspace.name}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs
        activeTab={selectedStatus}
        onChange={setSelectedStatus}
        tabs={[
          { id: 'ALL', label: 'All Actions', count: proposedActions.length },
          { id: 'PROPOSED', label: 'Pending Review', count: proposedActions.filter((a) => a.status === 'PROPOSED').length },
          { id: 'APPROVED', label: 'Approved' },
          { id: 'EXECUTED', label: 'Executed' },
          { id: 'REJECTED', label: 'Rejected' },
        ]}
      />

      {/* Actions List Grid */}
      <div className="space-y-4">
        {filtered.map((action) => (
          <Card key={action.id} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {getStatusBadge(action.status)}
                  <Badge variant="neutral" size="sm">
                    {action.category}
                  </Badge>
                  <span className="text-xs font-mono text-[#78847C] dark:text-[#B1BDB4]">
                    ID: {action.id}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                  {action.title}
                </h3>
                <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                  Proposed on {action.proposedAt} • Monitored by Nestora Intelligence
                </p>
              </div>

              {/* Action Buttons for PROPOSED state */}
              {action.status === 'PROPOSED' ? (
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<XCircle className="w-3.5 h-3.5" />}
                    onClick={() => rejectAction(action.id)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    onClick={() => approveAction(action.id)}
                  >
                    Step 2: Approve & Execute
                  </Button>
                </div>
              ) : (
                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    ✓ Human Review Completed
                  </span>
                  {action.executedAt && (
                    <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4]">
                      Executed at {action.executedAt}
                    </p>
                  )}
                  {action.rejectionReason && (
                    <p className="text-[10px] text-rose-600 dark:text-rose-400">
                      Reason: {action.rejectionReason}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Impact & Scope Box */}
            <div className="p-3.5 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D] space-y-1 text-xs">
              <span className="font-bold text-[#202B25] dark:text-[#F1F4F0]">
                Proposed Impact Scope:
              </span>
              <p className="text-[#78847C] dark:text-[#B1BDB4] leading-relaxed">
                {action.impactSummary}
              </p>
            </div>

            {/* Raw Parameter Preview Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#78847C] dark:text-[#B1BDB4]">
                <span className="flex items-center gap-1.5 font-mono">
                  <FileCode className="w-3.5 h-3.5" />
                  Payload Parameters Inspection
                </span>
              </div>
              <pre className="p-3 rounded-xl bg-[#202B25] text-[#8FAF9A] font-mono text-[11px] overflow-x-auto shadow-inner">
                {JSON.stringify(action.payloadPreview, null, 2)}
              </pre>
            </div>

            <div className="pt-2 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between text-xs text-[#78847C] dark:text-[#B1BDB4]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Deterministic Verification Passed
              </span>
              <span>Workflow: PROPOSED → APPROVED → EXECUTED</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
