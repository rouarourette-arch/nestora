import React, { useState } from 'react';
import {
  Server,
  Plus,
  Search,
  Building,
  Home,
  Shield,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Globe,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';
import { PlatformTenant } from '../../types';

export const AdminTenantsPage: React.FC = () => {
  const { tenants } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = tenants.filter((t) => {
    return (
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subdomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Platform Tenant Fleet Management
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Provision, inspect, and govern multi-tenant building and co-living client workspaces
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Provision Tenant
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by tenant workspace name, subdomain, or owner email..."
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
                <th className="py-3 px-4">Workspace Tenant</th>
                <th className="py-3 px-4">Subdomain Endpoint</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Primary Custodian</th>
                <th className="py-3 px-4">Active Capacity</th>
                <th className="py-3 px-4">Health Index</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {filtered.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-sm text-[#202B25] dark:text-[#F1F4F0]">
                      {tenant.name}
                    </p>
                    <p className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
                      Created {tenant.createdDate}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#234B3A] dark:text-[#8FAF9A]">
                    {tenant.subdomain}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={tenant.type === 'BUILDING' ? 'primary' : 'success'} size="sm">
                      {tenant.type === 'BUILDING' ? 'Condominium' : 'Co-Living'}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#202B25] dark:text-[#F1F4F0]">
                    {tenant.ownerEmail}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#78847C] dark:text-[#B1BDB4]">
                    {tenant.activeUnitsOrRooms} Units/Rooms
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-[#EAECE8] dark:bg-[#1D2A23] overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${tenant.healthScore}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">
                        {tenant.healthScore}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Badge
                      variant={tenant.status === 'HEALTHY' ? 'success' : 'warning'}
                      size="sm"
                      dot
                    >
                      {tenant.status}
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
        title="Provision New Tenant Fleet Instance"
        description="Bootstrap an isolated organization workspace partition"
      >
        <div className="space-y-4">
          <Input label="Tenant Name" placeholder="e.g. Bellevue Horizon HOA" required />
          <Input label="Subdomain Route" placeholder="bellevue-horizon.nestora.io" required />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Partition Model">
              <option value="BUILDING">Nestora Buildings (Multi-Family)</option>
              <option value="LIVING">Nestora Living (Co-Living)</option>
            </Select>
            <Input label="Custodian Email" type="email" placeholder="admin@horizonhoa.org" required />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Deploy Partition
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
