import React, { useState } from 'react';
import {
  Users,
  Search,
  Star,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  Plus,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';

export const BuildingsProvidersPage: React.FC = () => {
  const { providers, activeWorkspace } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = providers.filter((p) => {
    return (
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Service Providers & Certified Vendor Directory
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Contracted facility engineers, emergency trades, and SLA compliance records for {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Certified Vendor
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by vendor name, trade specialty, or contact person..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((vendor) => (
          <Card key={vendor.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {vendor.name}
                  </h3>
                  <Badge variant="primary" size="sm" className="mt-1">
                    {vendor.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-xl text-xs font-bold border border-amber-200/50">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{vendor.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D] space-y-1.5 text-xs text-[#78847C] dark:text-[#B1BDB4]">
                <div className="flex items-center justify-between">
                  <span>Contact Representative:</span>
                  <span className="font-semibold text-[#202B25] dark:text-[#F1F4F0]">
                    {vendor.contactPerson}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Contracted Hourly Rate:</span>
                  <span className="font-mono font-bold text-[#234B3A] dark:text-[#8FAF9A]">
                    ${vendor.hourlyRate.toFixed(2)}/hr
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active Service Contracts:</span>
                  <span className="font-medium text-[#202B25] dark:text-[#F1F4F0]">
                    {vendor.activeContracts} Building Portfolios
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-[#78847C] dark:text-[#B1BDB4]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#234B3A] dark:text-[#8FAF9A]" />
                  <span>{vendor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#234B3A] dark:text-[#8FAF9A]" />
                  <span>{vendor.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Insurance & SLA Certified
              </span>
              <Badge
                variant={
                  vendor.status === 'AVAILABLE'
                    ? 'success'
                    : vendor.status === 'ENGAGED'
                    ? 'primary'
                    : 'warning'
                }
                size="sm"
              >
                {vendor.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Vendor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Certified Trade Provider"
        description="Register a service contractor with validated commercial liability insurance"
      >
        <div className="space-y-4">
          <Input label="Company / Business Name" placeholder="e.g. Apex Electrical NW" required />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Trade Specialization">
              <option value="HVAC">HVAC & Heating</option>
              <option value="Plumbing">Plumbing & Pipes</option>
              <option value="Electrical">Electrical</option>
              <option value="Elevator">Elevator Maintenance</option>
              <option value="Roofing">Roofing & Façade</option>
              <option value="Fire">Fire Safety</option>
            </Select>
            <Input label="Hourly SLA Rate ($)" type="number" placeholder="150.00" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Direct Contact Person" placeholder="e.g. Marcus Cole" required />
            <Input label="Dispatch Phone" placeholder="+1 (503) 000-0000" required />
          </div>
          <Input label="Dispatch Email" type="email" placeholder="dispatch@company.com" required />

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Save to Directory
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
