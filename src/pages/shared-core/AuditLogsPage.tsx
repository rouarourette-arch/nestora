import React, { useState } from 'react';
import {
  Lock,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  FileText,
  Download,
  Calendar,
  Layers,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';

export const AuditLogsPage: React.FC = () => {
  const { auditLogs } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesCategory = selectedCategory === 'ALL' || log.category === selectedCategory;
    const matchesSearch =
      log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: 'SUCCESS' | 'WARNING' | 'FAILED') => {
    switch (status) {
      case 'SUCCESS':
        return (
          <Badge variant="success" size="sm" dot>
            Verified
          </Badge>
        );
      case 'WARNING':
        return (
          <Badge variant="warning" size="sm" dot>
            Warning
          </Badge>
        );
      case 'FAILED':
        return (
          <Badge variant="danger" size="sm" dot>
            Denied
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Audit Logs & Compliance Forensic Inspector
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Immutable trace of user authentication, financial ledger events, AI approvals, and administrative actions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-4 h-4" />}
            onClick={() => {
              const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute('href', dataStr);
              downloadAnchor.setAttribute('download', `nestora_audit_logs_${Date.now()}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
          >
            Export JSON
          </Button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <Input
            placeholder="Search by actor, action name, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto rounded-xl bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] text-[#202B25] dark:text-[#F1F4F0] text-sm py-2.5 px-3.5 outline-none font-medium"
          >
            <option value="ALL">All Categories</option>
            <option value="AUTH">Authentication & Sessions</option>
            <option value="FINANCIAL_RECORD">Financial Ledger Records</option>
            <option value="INTELLIGENCE_APPROVAL">AI 2-Step Approvals</option>
            <option value="MAINTENANCE">Maintenance & Repairs</option>
            <option value="ACCESS">Access & Membership</option>
            <option value="SYSTEM">System & Config</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F3F5F2]/70 dark:bg-[#1D2A23] text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <tr>
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Forensic Details</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {filteredLogs.map((entry) => (
                <tr key={entry.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-xs font-mono text-[#78847C] dark:text-[#B1BDB4] whitespace-nowrap">
                    {entry.timestamp}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-xs text-[#202B25] dark:text-[#F1F4F0]">
                      {entry.actorName}
                    </p>
                    <p className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
                      {entry.actorRole}
                    </p>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs font-semibold text-[#234B3A] dark:text-[#8FAF9A]">
                    {entry.action}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="neutral" size="sm">
                      {entry.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-xs text-[#78847C] dark:text-[#B1BDB4] max-w-sm">
                    {entry.details}
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-[#78847C] dark:text-[#B1BDB4]">
                    {entry.ipAddress}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {getStatusBadge(entry.status)}
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
