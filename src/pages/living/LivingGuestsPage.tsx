import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  CheckCircle2,
  Clock,
  Key,
  Calendar,
  Mail,
  Home,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';

export const LivingGuestsPage: React.FC = () => {
  const { onboardingItems, addOnboardingItem, activeWorkspace } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [roommateName, setRoommateName] = useState('');
  const [email, setEmail] = useState('');
  const [roomOrUnit, setRoomOrUnit] = useState('Bedroom B');
  const [moveInDate, setMoveInDate] = useState('2026-12-01');
  const [assignedKeys, setAssignedKeys] = useState('Front Door Key & Mailbox #4B');
  const [notes, setNotes] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roommateName || !email) return;

    addOnboardingItem({
      roommateName,
      email,
      roomOrUnit,
      moveInDate,
      assignedKeys,
      welcomeGuideAcknowledged: true,
      notes,
    });

    setIsModalOpen(false);
    setRoommateName('');
    setEmail('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Roommate Onboarding & Member Invitations
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Manage incoming roommate orientations, key assignments, and house guidelines onboarding for {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Onboard New Roommate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {onboardingItems.map((item) => (
          <Card key={item.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {item.roommateName}
                  </h3>
                  <p className="text-xs text-[#234B3A] dark:text-[#8FAF9A] font-semibold mt-0.5">
                    {item.roomOrUnit}
                  </p>
                </div>
                <Badge
                  variant={item.checklistStatus === 'COMPLETED' ? 'success' : 'warning'}
                  size="sm"
                  dot
                >
                  {item.checklistStatus === 'COMPLETED' ? 'Onboarded' : 'In Progress'}
                </Badge>
              </div>

              <div className="p-3 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D] space-y-1.5 text-xs text-[#78847C] dark:text-[#B1BDB4]">
                <div className="flex items-center justify-between">
                  <span>Contact:</span>
                  <span className="font-semibold text-[#202B25] dark:text-[#F1F4F0]">
                    {item.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Move-In Date:</span>
                  <span className="font-medium text-[#202B25] dark:text-[#F1F4F0]">
                    {item.moveInDate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Assigned Keys:</span>
                  <span className="font-medium text-[#202B25] dark:text-[#F1F4F0]">
                    {item.assignedKeys}
                  </span>
                </div>
              </div>

              {item.notes && (
                <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                  <strong>Orientation Note:</strong> {item.notes}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between text-xs text-[#78847C] dark:text-[#B1BDB4]">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <FileCheck className="w-3.5 h-3.5" />
                Welcome Guide Acknowledged
              </span>
              <span>Resident Record</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Onboarding Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Initiate Roommate Onboarding"
        description="Register an incoming roommate to assign room keys and house orientations"
      >
        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Roommate Full Name"
            placeholder="e.g. Julian Meyer"
            value={roommateName}
            onChange={(e) => setRoommateName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="julian@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Assigned Room"
              placeholder="e.g. Bedroom B"
              value={roomOrUnit}
              onChange={(e) => setRoomOrUnit(e.target.value)}
              required
            />
            <Input
              label="Move-In Date"
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              required
            />
          </div>

          <Input
            label="Physical Key Assignment"
            placeholder="e.g. Front Entry Key & Mailbox Key #4B"
            value={assignedKeys}
            onChange={(e) => setAssignedKeys(e.target.value)}
          />

          <Input
            label="Orientation Notes"
            placeholder="e.g. Completed walk-through of appliance instructions and recycling bins"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Complete Onboarding
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export const LivingOnboardingPage = LivingGuestsPage;
