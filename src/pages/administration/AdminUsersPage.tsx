import React, { useState } from 'react';
import {
  UserCircle,
  Search,
  Shield,
  Key,
  Lock,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Plus,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';

export const AdminUsersPage: React.FC = () => {
  const { platformUsers } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = platformUsers.filter((u) => {
    return (
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Global User Directory & IAM Console
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Identity and access governance across all multi-tenant workspaces
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Create IAM User
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search users by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F3F5F2]/70 dark:bg-[#1D2A23] text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <tr>
                <th className="py-3 px-4">User Identity</th>
                <th className="py-3 px-4">Global IAM Role</th>
                <th className="py-3 px-4">Associated Tenants</th>
                <th className="py-3 px-4">MFA Enforced</th>
                <th className="py-3 px-4">Last Verified Session</th>
                <th className="py-3 px-4 text-right">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-sm text-[#202B25] dark:text-[#F1F4F0]">
                      {user.name}
                    </p>
                    <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                      {user.email}
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="primary" size="sm">
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-[#202B25] dark:text-[#F1F4F0]">
                    {user.tenantsCount} Workspace{user.tenantsCount > 1 ? 's' : ''}
                  </td>
                  <td className="py-3.5 px-4">
                    {user.mfaEnabled ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Enforced (2FA)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Optional</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#78847C] dark:text-[#B1BDB4]">
                    {user.lastLogin}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Badge variant="success" size="sm" dot>
                      {user.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register IAM User"
        description="Provision platform credentials with granular role permissions"
      >
        <div className="space-y-4">
          <Input label="User Full Name" placeholder="e.g. Rachel Adams" required />
          <Input label="Email Address" type="email" placeholder="rachel@nestora.io" required />
          <Select label="Global IAM Role">
            <option value="PLATFORM_ADMIN">Platform Administrator</option>
            <option value="WORKSPACE_OWNER">Workspace Owner</option>
            <option value="WORKSPACE_MANAGER">Workspace Manager</option>
            <option value="RESIDENT">Resident</option>
            <option value="ROOMMATE">Roommate</option>
            <option value="PROVIDER">Service Provider</option>
          </Select>
          <div className="flex items-center gap-2 pt-1">
            <input type="checkbox" id="mfa-req" defaultChecked className="w-4 h-4 text-[#234B3A] rounded border-[#E3EAE4]" />
            <label htmlFor="mfa-req" className="text-xs font-semibold text-[#202B25] dark:text-[#F1F4F0]">
              Require Mandatory Two-Factor Authentication (TOTP / 2FA)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Save IAM Account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
