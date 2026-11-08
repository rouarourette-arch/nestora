import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  MoreVertical,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';
import { UserRole } from '../../types';

export const WorkspaceMembersPage: React.FC = () => {
  const { members, activeWorkspace, inviteMember, updateMemberRole } = useData();

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('ROOMMATE');
  const [inviteUnit, setInviteUnit] = useState('Room B');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;
    inviteMember({
      userId: `usr_${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
      role: inviteRole,
      unitOrRoom: inviteUnit,
    });
    setIsInviteOpen(false);
    setInviteName('');
    setInviteEmail('');
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'PLATFORM_ADMIN':
        return 'danger';
      case 'WORKSPACE_OWNER':
        return 'accent';
      case 'WORKSPACE_MANAGER':
        return 'primary';
      case 'RESIDENT':
        return 'info';
      case 'ROOMMATE':
        return 'success';
      case 'PROVIDER':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Workspace Members & Access Control
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Manage member rosters, invitations, and role-based permissions in {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<UserPlus className="w-4 h-4" />}
          onClick={() => setIsInviteOpen(true)}
        >
          Invite Member
        </Button>
      </div>

      {/* Members Table Card */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
            <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
              Active Members ({members.length})
            </h2>
          </div>
          <span className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            {activeWorkspace.name} Directory
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F3F5F2]/70 dark:bg-[#1D2A23] text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <tr>
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Unit / Space</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4 text-right">Role Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#E3EAE4] dark:border-[#354A3D]"
                      />
                      <div>
                        <p className="font-semibold text-[#202B25] dark:text-[#F1F4F0]">
                          {member.name}
                        </p>
                        <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#202B25] dark:text-[#F1F4F0] font-medium text-xs">
                    {member.unitOrRoom}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={getRoleBadgeVariant(member.role)} size="sm">
                      {member.role.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    {member.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Invited</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#78847C] dark:text-[#B1BDB4]">
                    {member.joinedDate}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={member.role}
                      onChange={(e) => updateMemberRole(member.id, e.target.value as UserRole)}
                      className="text-xs rounded-lg bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D] text-[#202B25] dark:text-[#F1F4F0] py-1 px-2 outline-none font-medium"
                    >
                      <option value="WORKSPACE_MANAGER">Manager</option>
                      <option value="WORKSPACE_OWNER">Owner</option>
                      <option value="ROOMMATE">Roommate</option>
                      <option value="RESIDENT">Resident</option>
                      <option value="PROVIDER">Provider</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Role Permission Matrix Card */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
          <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
            Permissions & Access Rules Matrix
          </h2>
        </div>
        <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
          Role-based governance within this workspace. In frontend demo mode, you can toggle roles in the header to preview user experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-xl border border-[#E3EAE4] dark:border-[#354A3D] bg-[#F3F5F2]/40 dark:bg-[#1D2A23]/40 space-y-2">
            <Badge variant="primary" size="sm">Workspace Manager</Badge>
            <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
              Full operational control: Dispatch repairs, draft announcements, configure budget caps, invite roommates, approve AI actions.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-[#E3EAE4] dark:border-[#354A3D] bg-[#F3F5F2]/40 dark:bg-[#1D2A23]/40 space-y-2">
            <Badge variant="success" size="sm">Resident / Roommate</Badge>
            <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
              Standard participation: Log expenses, complete chore rotations, restock pantry, submit maintenance requests, vote in assembly.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-[#E3EAE4] dark:border-[#354A3D] bg-[#F3F5F2]/40 dark:bg-[#1D2A23]/40 space-y-2">
            <Badge variant="warning" size="sm">Service Provider</Badge>
            <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
              Intervention partner: View assigned work orders, update ticket status, review building schematics and access instructions.
            </p>
          </div>
        </div>
      </Card>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite New Member"
        description={`Send a digital invitation to join ${activeWorkspace.name}`}
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Samantha Hayes"
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="samantha@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
          />
          <Input
            label="Unit or Room Assignment"
            placeholder="e.g. Room C or Unit 202"
            value={inviteUnit}
            onChange={(e) => setInviteUnit(e.target.value)}
          />
          <Select
            label="Initial Role"
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value as UserRole)}
          >
            <option value="ROOMMATE">Roommate</option>
            <option value="RESIDENT">Resident</option>
            <option value="WORKSPACE_MANAGER">Workspace Manager</option>
            <option value="WORKSPACE_OWNER">Workspace Owner</option>
            <option value="PROVIDER">Service Provider</option>
          </Select>

          <div className="flex justify-end gap-3 pt-4">
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
