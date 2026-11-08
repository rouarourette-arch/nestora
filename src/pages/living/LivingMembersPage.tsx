import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Mail,
  Phone,
  Home,
  CheckCircle2,
  Award,
  Calendar,
  DollarSign,
  Sparkles,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';
import { WorkspaceMember, UserRole } from '../../types';

export const LivingMembersPage: React.FC = () => {
  const { members, activeWorkspace, inviteMember, tasks } = useData();
  const [selectedMember, setSelectedMember] = useState<WorkspaceMember | null>(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('Bedroom E');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    inviteMember({
      userId: `usr_${Date.now()}`,
      name,
      email,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'ROOMMATE',
      unitOrRoom: room,
    });
    setIsInviteOpen(false);
    setName('');
    setEmail('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Roommates & Members Profile Roster
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Profiles, room assignments, chore points, and contacts for {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<UserPlus className="w-4 h-4" />}
          onClick={() => setIsInviteOpen(true)}
        >
          Add Roommate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {members.map((member) => {
          const memberTasks = tasks.filter((t) => t.assignedToId === member.id);
          const completedPoints = memberTasks
            .filter((t) => t.status === 'COMPLETED')
            .reduce((acc, curr) => acc + curr.points, 0);

          return (
            <Card
              key={member.id}
              className="flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#E7EFE8] dark:border-[#354A3D] shadow-sm"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#26372E]" />
                  </div>
                  <Badge
                    variant={member.role === 'WORKSPACE_MANAGER' ? 'primary' : 'neutral'}
                    size="sm"
                  >
                    {member.role.replace('_', ' ')}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#234B3A] dark:text-[#8FAF9A] font-semibold mt-0.5">
                    <Home className="w-3.5 h-3.5" />
                    <span>{member.unitOrRoom}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E3EAE4] dark:border-[#354A3D] text-xs text-[#78847C] dark:text-[#B1BDB4]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#78847C]" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#78847C]" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#78847C]" />
                    <span>Joined {member.joinedDate}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#202B25] dark:text-[#F1F4F0] font-medium">
                    <Award className="w-3.5 h-3.5 text-[#D9A66F]" />
                    <span>Chore Score:</span>
                  </div>
                  <span className="font-bold text-[#234B3A] dark:text-[#8FAF9A]">
                    {completedPoints + 25} pts
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E3EAE4] dark:border-[#354A3D]">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedMember(member)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedMember(null)}
          title={selectedMember.name}
          description={`Roommate Profile in ${activeWorkspace.name}`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedMember.avatarUrl}
                alt={selectedMember.name}
                className="w-16 h-16 rounded-2xl object-cover border"
              />
              <div>
                <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                  {selectedMember.name}
                </h3>
                <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                  {selectedMember.email}
                </p>
                <div className="mt-1">
                  <Badge variant="primary" size="sm">
                    {selectedMember.role.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D]">
              <div className="p-3 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23]">
                <span className="text-[#78847C] dark:text-[#B1BDB4]">Assigned Quarters</span>
                <p className="font-bold text-sm text-[#202B25] dark:text-[#F1F4F0] mt-0.5">
                  {selectedMember.unitOrRoom}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23]">
                <span className="text-[#78847C] dark:text-[#B1BDB4]">Tenancy Status</span>
                <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Verified Resident
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="secondary" onClick={() => setSelectedMember(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Invite Modal */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite New Roommate"
        description="Add a new resident to the shared living ledger and chore rotation"
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <Input
            label="Roommate Name"
            placeholder="e.g. Liam Evans"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="liam@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Room Assignment"
            placeholder="e.g. Bedroom B"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" type="button" onClick={() => setIsInviteOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
