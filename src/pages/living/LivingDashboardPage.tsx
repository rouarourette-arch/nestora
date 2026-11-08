import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  ShoppingCart,
  Users,
  Receipt,
  Scale,
  Sparkles,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import { useData } from '../../contexts/DataContext';

export const LivingDashboardPage: React.FC = () => {
  const {
    currentUser,
    activeWorkspace,
    members,
    tasks,
    updateTaskStatus,
    shoppingList,
    toggleShoppingItem,
    expenses,
    settlements,
    proposedActions,
  } = useData();
  const navigate = useNavigate();

  const myTasks = tasks.filter((t) => t.assignedToId === 'mem_1');
  const pendingShopping = shoppingList.filter((s) => !s.purchased);
  const totalExpensesThisMonth = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#234B3A] to-[#346550] text-white shadow-sm relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏡</span>
            <Badge variant="accent" size="sm">
              {activeWorkspace.name}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome home, {currentUser.name.split(' ')[0]}!
          </h1>
          <p className="text-xs text-[#E7EFE8]/80 max-w-lg">
            Everything is running smoothly. Your kitchen counters deep-clean is scheduled for Sunday. 3 urgent grocery items need restocking.
          </p>
        </div>

        <div className="flex items-center gap-2.5 relative z-10">
          <Button
            variant="accent"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/living/expenses')}
          >
            Log Expense
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/living/tasks')}
          >
            View Chores
          </Button>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-8 -bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Chores"
          value={tasks.filter((t) => t.status !== 'COMPLETED').length}
          subtitle={`${myTasks.filter((t) => t.status !== 'COMPLETED').length} assigned to you`}
          icon={<CheckSquare className="w-5 h-5" />}
        />
        <StatCard
          title="Household Expenses"
          value={`$${totalExpensesThisMonth.toFixed(2)}`}
          change="+8.4%"
          changeType="positive"
          subtitle="Current billing cycle"
          icon={<Receipt className="w-5 h-5" />}
        />
        <StatCard
          title="Pantry Items Needed"
          value={pendingShopping.length}
          subtitle={`${pendingShopping.filter((s) => s.urgent).length} marked urgent`}
          icon={<ShoppingCart className="w-5 h-5" />}
        />
        <StatCard
          title="House Roommates"
          value={members.length}
          subtitle="Oakwood Residence 4B"
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* Main Grid: Chore Rotation & Supplies Restocking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Chores Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="none" className="overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
                <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                  Chore Rotation & Schedule
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/living/tasks')}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                All Tasks
              </Button>
            </div>

            <div className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button
                      onClick={() =>
                        updateTaskStatus(
                          task.id,
                          task.status === 'COMPLETED' ? 'TODO' : 'COMPLETED'
                        )
                      }
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                        task.status === 'COMPLETED'
                          ? 'bg-[#234B3A] border-[#234B3A] text-white dark:bg-[#8FAF9A] dark:border-[#8FAF9A] dark:text-[#18231E]'
                          : 'border-[#78847C]/40 hover:border-[#234B3A]'
                      }`}
                    >
                      {task.status === 'COMPLETED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold truncate ${
                          task.status === 'COMPLETED'
                            ? 'line-through text-[#78847C] dark:text-[#B1BDB4]'
                            : 'text-[#202B25] dark:text-[#F1F4F0]'
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
                        <span className="font-medium text-[#234B3A] dark:text-[#8FAF9A]">
                          {task.area}
                        </span>
                        <span>•</span>
                        <span>Due {task.dueDate}</span>
                        <span>•</span>
                        <span className="text-[#D9A66F] font-semibold">{task.points} pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <img
                      src={task.assignedAvatar}
                      alt={task.assignedToName}
                      className="w-7 h-7 rounded-full object-cover border border-[#E3EAE4] dark:border-[#354A3D]"
                      title={`Assigned to ${task.assignedToName}`}
                    />
                    <Badge
                      variant={
                        task.status === 'COMPLETED'
                          ? 'success'
                          : task.status === 'IN_PROGRESS'
                          ? 'warning'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {task.status === 'IN_PROGRESS' ? 'In Progress' : task.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent House Financial & Ledger Activity */}
          <Card padding="none" className="overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
                <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                  Recent Shared Expenses & Splits
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/living/expenses')}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                Open Ledger
              </Button>
            </div>

            <div className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {expenses.slice(0, 3).map((exp) => (
                <div key={exp.id} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#202B25] dark:text-[#F1F4F0]">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
                      Paid by <span className="font-medium text-[#202B25] dark:text-[#F1F4F0]">{exp.paidByName}</span> • {exp.date} • Split across {exp.splitWith.length} roommates
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-extrabold text-[#202B25] dark:text-[#F1F4F0]">
                      ${exp.amount.toFixed(2)}
                    </p>
                    <Badge variant="primary" size="sm">
                      {exp.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: Shared Pantry & Roommate Roster */}
        <div className="space-y-6">
          {/* Shared Supplies & Groceries */}
          <Card padding="none" className="overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
                <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                  Shared Pantry Restock
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/living/shopping')}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                Pantry List
              </Button>
            </div>

            <div className="p-3 divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {shoppingList.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={item.purchased}
                      onChange={() => toggleShoppingItem(item.id)}
                      className="w-4 h-4 text-[#234B3A] rounded border-[#E3EAE4] focus:ring-[#234B3A]"
                    />
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-semibold truncate ${
                          item.purchased
                            ? 'line-through text-[#78847C] dark:text-[#B1BDB4]'
                            : 'text-[#202B25] dark:text-[#F1F4F0]'
                        }`}
                      >
                        {item.name}
                      </p>
                      <p className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
                        {item.quantity} • Added by {item.addedByName}
                      </p>
                    </div>
                  </div>
                  {item.urgent && !item.purchased && (
                    <Badge variant="danger" size="sm">
                      Urgent
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Roommates Roster Card */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
                <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                  House Roommates
                </h2>
              </div>
              <Badge variant="neutral" size="sm">
                4 Active
              </Badge>
            </div>

            <div className="space-y-3">
              {members.map((m) => (
                <div key={m.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={m.avatarUrl}
                      alt={m.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#E3EAE4] dark:border-[#354A3D]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">
                        {m.name}
                      </p>
                      <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4]">
                        {m.unitOrRoom}
                      </p>
                    </div>
                  </div>
                  <Badge variant={m.role === 'WORKSPACE_MANAGER' ? 'primary' : 'neutral'} size="sm">
                    {m.role === 'WORKSPACE_MANAGER' ? 'Manager' : 'Roommate'}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigate('/living/members')}
              >
                View Roommate Profiles
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
