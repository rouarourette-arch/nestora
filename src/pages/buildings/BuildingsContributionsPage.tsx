import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  DollarSign,
  Download,
  Calendar,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';

export const BuildingsContributionsPage: React.FC = () => {
  const { contributions, recordContributionPaid, activeWorkspace } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const totalBilled = contributions.reduce((acc, curr) => acc + curr.totalDue, 0);
  const totalPaid = contributions
    .filter((c) => c.status === 'RECORDED_PAID')
    .reduce((acc, curr) => acc + curr.totalDue, 0);
  const totalPending = totalBilled - totalPaid;

  const filtered = contributions.filter((c) => {
    return (
      c.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Common Contributions & Assessment Dues
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            HOA operating assessments, capital contributions, and payment records for {activeWorkspace.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="md">
            November 2026 Cycle
          </Badge>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="p-4 rounded-2xl bg-[#E7EFE8]/70 dark:bg-[#354A3D]/40 border border-[#234B3A]/15 dark:border-[#8FAF9A]/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h2 className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">
            Financial Assessment Recording Policy
          </h2>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] leading-relaxed">
            Nestora maintains certified accounting records of property contributions. No banking APIs or automated payment gateways (e.g. Stripe Treasury, Chase, ACH auto-pay) are connected. Once checks or bank wires are verified by property custodians, payments are recorded below.
          </p>
        </div>
      </div>

      {/* Collection Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E7EFE8] dark:bg-[#354A3D] text-[#234B3A] dark:text-[#8FAF9A] flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
              Total Assessed
            </p>
            <h3 className="text-2xl font-extrabold text-[#202B25] dark:text-[#F1F4F0]">
              ${totalBilled.toFixed(2)}
            </h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
              Recorded Paid
            </p>
            <h3 className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
              ${totalPaid.toFixed(2)}
            </h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100/60 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
              Pending Receipt
            </p>
            <h3 className="text-2xl font-extrabold text-amber-700 dark:text-amber-400">
              ${totalPending.toFixed(2)}
            </h3>
          </div>
        </Card>
      </div>

      {/* Contributions Table Card */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
            <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
              Unit Common Assessments Ledger
            </h2>
          </div>
          <span className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            Monthly Quota Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F3F5F2]/70 dark:bg-[#1D2A23] text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <tr>
                <th className="py-3 px-4">Unit #</th>
                <th className="py-3 px-4">Title Deed Owner</th>
                <th className="py-3 px-4">Base Operating Dues</th>
                <th className="py-3 px-4">Capital Fund Share</th>
                <th className="py-3 px-4">Total Assessed</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {filtered.map((c) => {
                const isPaid = c.status === 'RECORDED_PAID';
                return (
                  <tr key={c.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-sm text-[#234B3A] dark:text-[#8FAF9A]">
                      Unit {c.unitNumber}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-xs text-[#202B25] dark:text-[#F1F4F0]">
                      {c.ownerName}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[#78847C] dark:text-[#B1BDB4]">
                      ${c.baseDues.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[#78847C] dark:text-[#B1BDB4]">
                      ${c.reserveFundContribution.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-sm text-[#202B25] dark:text-[#F1F4F0]">
                      ${c.totalDue.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={isPaid ? 'success' : 'warning'} size="sm" dot>
                        {isPaid ? 'Recorded Paid' : 'Pending'}
                      </Badge>
                      {c.recordedDate && (
                        <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
                          Paid {c.recordedDate}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {!isPaid ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                          onClick={() => recordContributionPaid(c.id)}
                        >
                          Record Paid
                        </Button>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          Reconciled
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
