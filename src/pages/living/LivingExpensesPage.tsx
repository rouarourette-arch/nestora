import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Filter,
  DollarSign,
  PieChart,
  Users,
  Calendar,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';
import { Expense } from '../../types';

export const LivingExpensesPage: React.FC = () => {
  const { expenses, addExpense, deleteExpense, members, currentUser } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Form states
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Expense['category']>('Groceries');
  const [paidById, setPaidById] = useState(currentUser.id);
  const [splitType, setSplitType] = useState<Expense['splitType']>('EQUAL');
  const [notes, setNotes] = useState('');

  const filteredExpenses = expenses.filter((e) => {
    return selectedCategory === 'ALL' || e.category === selectedCategory;
  });

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title || isNaN(numAmount) || numAmount <= 0) return;

    const payer = members.find((m) => m.userId === paidById) || members[0];
    const shareAmount = numAmount / members.length;

    const splitWith = members.map((m) => ({
      memberId: m.id,
      memberName: m.name,
      shareAmount,
      settled: m.userId === paidById,
    }));

    addExpense({
      title,
      category,
      amount: numAmount,
      paidById: payer.id,
      paidByName: payer.name,
      date: new Date().toISOString().slice(0, 10),
      splitType,
      splitWith,
      notes,
    });

    setIsModalOpen(false);
    setTitle('');
    setAmount('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Shared Expenses & Splits Ledger
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Log household receipts, calculate fair equal or weighted splits, and track internal debt shares
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Shared Expense
        </Button>
      </div>

      {/* Overview Totals & Category Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E7EFE8] dark:bg-[#354A3D] text-[#234B3A] dark:text-[#8FAF9A] flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
              Total Recorded Expenses
            </p>
            <h3 className="text-2xl font-extrabold text-[#202B25] dark:text-[#F1F4F0]">
              ${totalSpent.toFixed(2)}
            </h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E7EFE8] dark:bg-[#354A3D] text-[#234B3A] dark:text-[#8FAF9A] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
              Your Average Share
            </p>
            <h3 className="text-2xl font-extrabold text-[#202B25] dark:text-[#F1F4F0]">
              ${(totalSpent / (members.length || 1)).toFixed(2)}
            </h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fbf4ea] dark:bg-[#3f3123] text-[#D9A66F] flex items-center justify-center shrink-0">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-[#78847C] dark:text-[#B1BDB4]">
              Active Transactions
            </p>
            <h3 className="text-2xl font-extrabold text-[#202B25] dark:text-[#F1F4F0]">
              {expenses.length} Records
            </h3>
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] text-xs font-semibold text-[#202B25] dark:text-[#F1F4F0] py-2 px-3 outline-none"
        >
          <option value="ALL">All Categories ({expenses.length})</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Supplies">Supplies</option>
          <option value="Maintenance">Maintenance</option>
        </select>
        <span className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
          Showing {filteredExpenses.length} entries
        </span>
      </div>

      {/* Ledger Table Card */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F3F5F2]/70 dark:bg-[#1D2A23] text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <tr>
                <th className="py-3 px-4">Expense Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Paid By</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Split Breakdown</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-sm text-[#202B25] dark:text-[#F1F4F0]">
                      {exp.title}
                    </p>
                    {exp.notes && (
                      <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
                        {exp.notes}
                      </p>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="primary" size="sm">
                      {exp.category}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-xs text-[#202B25] dark:text-[#F1F4F0]">
                    {exp.paidByName}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-sm text-[#202B25] dark:text-[#F1F4F0]">
                    ${exp.amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {exp.splitWith.map((s, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                            s.settled
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                          }`}
                          title={`${s.memberName}: $${s.shareAmount.toFixed(2)} (${s.settled ? 'Settled' : 'Pending'})`}
                        >
                          {s.memberName.split(' ')[0]}: ${s.shareAmount.toFixed(2)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#78847C] dark:text-[#B1BDB4] whitespace-nowrap">
                    {exp.date}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete expense entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Shared Household Expense"
        description="Add a store receipt or invoice to calculate fair roommate shares"
      >
        <form onSubmit={handleAddExpense} className="space-y-4">
          <Input
            label="Expense Title / Merchant"
            placeholder="e.g. Trader Joe's Supplies & Pantry"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Total Cost ($)"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
            >
              <option value="Groceries">Groceries</option>
              <option value="Utilities">Utilities</option>
              <option value="Supplies">Supplies</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Paid By"
              value={paidById}
              onChange={(e) => setPaidById(e.target.value)}
            >
              {members.map((m) => (
                <option key={m.id} value={m.userId}>
                  {m.name} ({m.unitOrRoom})
                </option>
              ))}
            </Select>

            <Select
              label="Split Method"
              value={splitType}
              onChange={(e) => setSplitType(e.target.value as any)}
            >
              <option value="EQUAL">Equal Split (1/N)</option>
              <option value="PERCENTAGE">Custom Percentage</option>
              <option value="EXACT">Exact Amounts</option>
            </Select>
          </div>

          <Input
            label="Notes or Items (Optional)"
            placeholder="e.g. Olive oil, detergent, oat milk"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save to Ledger
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
