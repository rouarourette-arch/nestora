import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Calendar,
  RotateCw,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { useData } from '../../contexts/DataContext';
import { ChoreTask } from '../../types';

export const LivingTasksPage: React.FC = () => {
  const { tasks, addTask, updateTaskStatus, members, activeWorkspace } = useData();
  const [selectedArea, setSelectedArea] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState<ChoreTask['area']>('Kitchen');
  const [frequency, setFrequency] = useState<ChoreTask['frequency']>('Weekly');
  const [assignedToId, setAssignedToId] = useState(members[0]?.id || 'mem_1');
  const [dueDate, setDueDate] = useState('2026-11-15');
  const [points, setPoints] = useState('15');

  const filteredTasks = tasks.filter((t) => {
    return selectedArea === 'ALL' || t.area === selectedArea;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const assignee = members.find((m) => m.id === assignedToId) || members[0];
    addTask({
      title,
      description,
      area,
      frequency,
      assignedToId: assignee.id,
      assignedToName: assignee.name,
      assignedAvatar: assignee.avatarUrl,
      dueDate,
      status: 'TODO',
      points: parseInt(points, 10) || 10,
    });
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Tasks, Chores & Rotation Rules
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Household chore rotations, fair assignment rules, and reward points in {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Assign New Chore
        </Button>
      </div>

      {/* Area Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          activeTab={selectedArea}
          onChange={setSelectedArea}
          tabs={[
            { id: 'ALL', label: 'All House Areas', count: tasks.length },
            { id: 'Kitchen', label: 'Kitchen' },
            { id: 'Bathroom', label: 'Bathroom' },
            { id: 'Trash & Recycling', label: 'Trash / Bins' },
            { id: 'Living Room', label: 'Living Room' },
          ]}
        />
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => {
          const isDone = task.status === 'COMPLETED';
          return (
            <Card
              key={task.id}
              className={`flex flex-col justify-between transition-all ${
                isDone
                  ? 'bg-white/60 dark:bg-[#26372E]/40 border-emerald-200/50 dark:border-emerald-900/30'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">
                      {task.area}
                    </Badge>
                    <span className="text-xs text-[#78847C] dark:text-[#B1BDB4] flex items-center gap-1">
                      <RotateCw className="w-3 h-3 text-[#234B3A] dark:text-[#8FAF9A]" />
                      {task.frequency}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#D9A66F]">
                    <Award className="w-4 h-4" />
                    <span>+{task.points} pts</span>
                  </div>
                </div>

                <div>
                  <h3
                    className={`text-base font-bold ${
                      isDone
                        ? 'line-through text-[#78847C] dark:text-[#B1BDB4]'
                        : 'text-[#202B25] dark:text-[#F1F4F0]'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] mt-1 leading-relaxed">
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={task.assignedAvatar}
                    alt={task.assignedToName}
                    className="w-7 h-7 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#202B25] dark:text-[#F1F4F0] leading-none">
                      {task.assignedToName}
                    </p>
                    <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
                      Due {task.dueDate}
                    </p>
                  </div>
                </div>

                <Button
                  variant={isDone ? 'secondary' : 'primary'}
                  size="sm"
                  icon={isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : undefined}
                  onClick={() =>
                    updateTaskStatus(task.id, isDone ? 'TODO' : 'COMPLETED')
                  }
                >
                  {isDone ? 'Completed' : 'Mark Done'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Chore Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Assign New Household Chore"
        description="Schedule a task with automated rotation rules"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Chore Title"
            placeholder="e.g. Wipe Down Microwave & Clean Oven"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Area / Zone"
              value={area}
              onChange={(e) => setArea(e.target.value as any)}
            >
              <option value="Kitchen">Kitchen</option>
              <option value="Bathroom">Bathroom</option>
              <option value="Living Room">Living Room</option>
              <option value="Trash & Recycling">Trash & Recycling</option>
              <option value="Yard / Balcony">Yard / Balcony</option>
            </Select>

            <Select
              label="Rotation Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as any)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Initial Assignee"
              value={assignedToId}
              onChange={(e) => setAssignedToId(e.target.value)}
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </Select>

            <Input
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <Input
            label="Chore Score Points Reward"
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold text-[#78847C] dark:text-[#B1BDB4] uppercase tracking-wider mb-1.5">
              Task Checklist Instructions
            </label>
            <textarea
              className="w-full rounded-xl bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] text-[#202B25] dark:text-[#F1F4F0] text-sm p-3 outline-none"
              rows={2}
              placeholder="Provide clean steps..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Schedule Chore
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
