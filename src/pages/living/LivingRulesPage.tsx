import React, { useState } from 'react';
import {
  ShieldAlert,
  Plus,
  CheckCircle2,
  Users,
  Volume2,
  UserCheck,
  Sparkles,
  Flame,
  FileCheck,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';

export const LivingRulesPage: React.FC = () => {
  const { livingRules, addLivingRule, agreeToRule, activeWorkspace } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Noise & Quiet Hours' | 'Guest Policy' | 'Shared Spaces' | 'Pets' | 'Cleaning Standards'>('Shared Spaces');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    addLivingRule({
      title,
      description,
      category,
      totalMembers: 4,
    });
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Noise & Quiet Hours':
        return <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'Guest Policy':
        return <UserCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'Cleaning Standards':
        return <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-[#234B3A] dark:text-[#8FAF9A]" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Household Rules & Community Agreement
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Mutual co-living expectations, noise hours, cleaning standards, and visitor policies in {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Propose House Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {livingRules.map((rule) => {
          const isConsensus = rule.agreedByCount >= rule.totalMembers;
          return (
            <Card key={rule.id} className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D]">
                      {getCategoryIcon(rule.category)}
                    </div>
                    <div>
                      <Badge variant="neutral" size="sm">
                        {rule.category}
                      </Badge>
                    </div>
                  </div>
                  {isConsensus ? (
                    <Badge variant="success" size="sm" dot>
                      Consensus Reached
                    </Badge>
                  ) : (
                    <Badge variant="warning" size="sm">
                      {rule.agreedByCount}/{rule.totalMembers} Agreed
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] mt-1.5 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
                <span className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
                  Updated {rule.updatedDate}
                </span>
                <Button
                  variant={isConsensus ? 'secondary' : 'primary'}
                  size="sm"
                  icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                  onClick={() => agreeToRule(rule.id)}
                  disabled={isConsensus}
                >
                  {isConsensus ? 'Acknowledged' : 'I Agree & Sign'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Propose Rule Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Propose New Household Rule"
        description="Submit a guideline for roommate consensus review"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            label="Rule Title"
            placeholder="e.g. Dishwasher Unloading Promptness"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          >
            <option value="Noise & Quiet Hours">Noise & Quiet Hours</option>
            <option value="Guest Policy">Guest Policy</option>
            <option value="Shared Spaces">Shared Spaces</option>
            <option value="Cleaning Standards">Cleaning Standards</option>
            <option value="Pets">Pets</option>
          </Select>

          <div>
            <label className="block text-xs font-semibold text-[#78847C] dark:text-[#B1BDB4] uppercase tracking-wider mb-1.5">
              Description / Policy Guidelines
            </label>
            <textarea
              className="w-full rounded-xl bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] text-[#202B25] dark:text-[#F1F4F0] text-sm p-3 outline-none"
              rows={3}
              placeholder="Explain the guideline, timing, and why it benefits shared harmony..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Proposal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
