import React, { useState } from 'react';
import {
  Scale,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Users,
  FileCheck2,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';

export const LivingDebtsPage: React.FC = () => {
  const { settlements, recordSettlement, confirmSettlement, members, activeWorkspace } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fromMemberId, setFromMemberId] = useState(members[1]?.id || 'mem_2');
  const [toMemberId, setToMemberId] = useState(members[0]?.id || 'mem_1');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;

    const fromM = members.find((m) => m.id === fromMemberId) || members[0];
    const toM = members.find((m) => m.id === toMemberId) || members[1];

    recordSettlement({
      fromMemberId,
      fromMemberName: fromM.name,
      toMemberId,
      toMemberName: toM.name,
      amount: num,
      note: note || 'Mutual internal settlement record',
      status: 'RECORDED',
    });

    setIsModalOpen(false);
    setAmount('');
    setNote('');
  };

  // Illustrative balance relationships
  const netBalances = [
    { name: 'Sarah Lin', balance: +54.25, status: 'Owed' },
    { name: 'Marcus Vance', balance: -28.60, status: 'Owes' },
    { name: 'Elena Rostova', balance: +12.45, status: 'Owed' },
    { name: 'David Kim', balance: -38.10, status: 'Owes' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Debts, Balances & Internal Settlement Hub
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Internal ledger reconciliation and mutual debt records for {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Record Internal Settlement
        </Button>
      </div>

      {/* Compliance Notice: Internal Records Only */}
      <div className="p-4 rounded-2xl bg-[#E7EFE8]/70 dark:bg-[#354A3D]/40 border border-[#234B3A]/15 dark:border-[#8FAF9A]/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h2 className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">
            Internal Financial Ledger Specification
          </h2>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] leading-relaxed">
            Nestora strictly maintains records of shared expenses and mutual repayments. No direct bank debits, escrow accounts, or third-party payment gateways (e.g. Stripe, Plaid, ACH) are connected. Once roommates square up offline, mark the settlement as Recorded or Confirmed below.
          </p>
        </div>
      </div>

      {/* Calculated Household Balances */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {netBalances.map((item, idx) => (
          <Card key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#78847C] dark:text-[#B1BDB4]">
                {item.name}
              </span>
              <Badge
                variant={item.balance >= 0 ? 'success' : 'warning'}
                size="sm"
              >
                {item.status}
              </Badge>
            </div>
            <h3
              className={`text-2xl font-extrabold ${
                item.balance >= 0
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-amber-700 dark:text-amber-400'
              }`}
            >
              {item.balance >= 0 ? `+$${item.balance.toFixed(2)}` : `-$${Math.abs(item.balance).toFixed(2)}`}
            </h3>
            <p className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
              {item.balance >= 0 ? 'Gets back from household' : 'Owes to roommates'}
            </p>
          </Card>
        ))}
      </div>

      {/* Settlements History Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
            <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
              Settlement Records History ({settlements.length})
            </h2>
          </div>
          <span className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            Mutual Reconciliation Log
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F3F5F2]/70 dark:bg-[#1D2A23] text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <tr>
                <th className="py-3 px-4">From Member</th>
                <th className="py-3 px-4">To Member</th>
                <th className="py-3 px-4">Settled Amount</th>
                <th className="py-3 px-4">Memo / Reference</th>
                <th className="py-3 px-4">Date Logged</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Confirm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {settlements.map((set) => (
                <tr key={set.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-xs text-[#202B25] dark:text-[#F1F4F0]">
                    {set.fromMemberName}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-xs text-[#202B25] dark:text-[#F1F4F0]">
                    {set.toMemberName}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#234B3A] dark:text-[#8FAF9A]">
                    ${set.amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#78847C] dark:text-[#B1BDB4]">
                    {set.note}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#78847C] dark:text-[#B1BDB4] whitespace-nowrap">
                    {set.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={set.status === 'CONFIRMED' ? 'success' : 'warning'}
                      size="sm"
                      dot
                    >
                      {set.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {set.status !== 'CONFIRMED' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => confirmSettlement(set.id)}
                      >
                        Confirm Receipt
                      </Button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirmed</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Record Settlement Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Mutual Settlement"
        description="Log an offline reimbursement record between roommates"
      >
        <form onSubmit={handleRecord} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Payer (Reimbursing)"
              value={fromMemberId}
              onChange={(e) => setFromMemberId(e.target.value)}
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </Select>

            <Select
              label="Recipient"
              value={toMemberId}
              onChange={(e) => setToMemberId(e.target.value)}
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </Select>
          </div>

          <Input
            label="Reimbursement Amount ($)"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <Input
            label="Settlement Memo"
            placeholder="e.g. Cash repayment for grocery run"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="p-3 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
            Note: This records an internal ledger reconciliation. It does not initiate external banking transfers.
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Log Settlement
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
