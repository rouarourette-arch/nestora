import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Wifi,
  Trash2,
  Shield,
  DollarSign,
  BellRing,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';
import { BillReminder } from '../../types';

export const LivingBillsPage: React.FC = () => {
  const { bills, addBill, markBillPaid, activeWorkspace } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [provider, setProvider] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('2026-11-28');
  const [category, setCategory] = useState<BillReminder['category']>('Electricity');
  const [frequency, setFrequency] = useState<BillReminder['frequency']>('Monthly');
  const [autoRemindDays, setAutoRemindDays] = useState('3');

  const totalUpcoming = bills
    .filter((b) => b.status === 'PENDING')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!title || isNaN(num) || num <= 0) return;

    addBill({
      title,
      provider: provider || title,
      amount: num,
      dueDate,
      frequency,
      category,
      status: 'PENDING',
      autoRemindDays: parseInt(autoRemindDays, 10) || 3,
    });

    setIsModalOpen(false);
    setTitle('');
    setProvider('');
    setAmount('');
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Electricity':
      case 'Gas':
        return <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Internet':
        return <Wifi className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'Waste':
        return <Trash2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <CalendarDays className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Bills & Recurring Calendar Reminders
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Track utility cycles, recurring service dues, and roommate notifications in {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Bill Reminder
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fbf4ea] dark:bg-[#3f3123] text-[#D9A66F] flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
              Upcoming Due Bills
            </p>
            <h3 className="text-2xl font-extrabold text-[#202B25] dark:text-[#F1F4F0]">
              ${totalUpcoming.toFixed(2)}
            </h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E7EFE8] dark:bg-[#354A3D] text-[#234B3A] dark:text-[#8FAF9A] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
              Paid This Month
            </p>
            <h3 className="text-2xl font-extrabold text-[#202B25] dark:text-[#F1F4F0]">
              ${bills
                .filter((b) => b.status === 'PAID')
                .reduce((acc, curr) => acc + curr.amount, 0)
                .toFixed(2)}
            </h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E7EFE8] dark:bg-[#354A3D] text-[#234B3A] dark:text-[#8FAF9A] flex items-center justify-center shrink-0">
            <BellRing className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
              Auto-Alert Threshold
            </p>
            <h3 className="text-2xl font-extrabold text-[#202B25] dark:text-[#F1F4F0]">
              3 Days Ahead
            </h3>
          </div>
        </Card>
      </div>

      {/* Bills Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {bills.map((bill) => {
          const isPaid = bill.status === 'PAID';
          return (
            <Card
              key={bill.id}
              className={`flex flex-col justify-between transition-all ${
                isPaid
                  ? 'bg-white/60 dark:bg-[#26372E]/40 border-emerald-200/50 dark:border-emerald-900/30'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D]">
                      {getCategoryIcon(bill.category)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                        {bill.title}
                      </h3>
                      <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                        {bill.provider} • {bill.frequency}
                      </p>
                    </div>
                  </div>
                  <Badge variant={isPaid ? 'success' : 'warning'} size="sm" dot>
                    {bill.status}
                  </Badge>
                </div>

                <div className="p-3 rounded-xl bg-[#F3F5F2]/60 dark:bg-[#1D2A23]/60 border border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
                      Due Date:
                    </span>
                    <p className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">
                      {bill.dueDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
                      Invoice Amount:
                    </span>
                    <p className="text-lg font-mono font-black text-[#234B3A] dark:text-[#8FAF9A]">
                      ${bill.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
                <span className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
                  Automated alert sent to all 4 roommates
                </span>
                {!isPaid ? (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    onClick={() => markBillPaid(bill.id)}
                  >
                    Mark Paid
                  </Button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Settled for this cycle
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Bill Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Recurring Bill Reminder"
        description="Add a recurring utility invoice or monthly subscription"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Bill Name"
            placeholder="e.g. Sonic Gigabit Fiber"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Service Provider"
              placeholder="e.g. Sonic Telecom"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            />
            <Input
              label="Amount ($)"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
            >
              <option value="Electricity">Electricity</option>
              <option value="Internet">Internet</option>
              <option value="Water">Water</option>
              <option value="Gas">Gas</option>
              <option value="Waste">Waste</option>
              <option value="Insurance">Insurance</option>
            </Select>

            <Select
              label="Billing Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as any)}
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annual">Annual</option>
              <option value="One-Time">One-Time</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Next Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
            <Input
              label="Auto Remind (Days Prior)"
              type="number"
              value={autoRemindDays}
              onChange={(e) => setAutoRemindDays(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Schedule Reminder
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
