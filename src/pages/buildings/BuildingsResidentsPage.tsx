import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Search,
  Mail,
  Phone,
  Home,
  Shield,
  FileText,
  Percent,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';

export const BuildingsResidentsPage: React.FC = () => {
  const { units, activeWorkspace } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Residents roster mapped from units
  const roster = [
    {
      id: 'res_1',
      name: 'Thomas Wright',
      unit: '101',
      role: 'Owner-Occupant',
      email: 'twright@condo101.net',
      phone: '+1 (503) 441-2899',
      share: 3.45,
      parking: 'Stall #12 (B1)',
      status: 'Active',
    },
    {
      id: 'res_2',
      name: 'Carlos & Maya Mendez',
      unit: '204',
      role: 'Tenant Resident',
      email: 'carlos.mendez@apexrentals.com',
      phone: '+1 (503) 781-4402',
      share: 4.85,
      parking: 'Stall #18 (B1)',
      status: 'Active',
    },
    {
      id: 'res_3',
      name: 'Dr. Evelyn Reed',
      unit: '302',
      role: 'Owner-Occupant',
      email: 'e.reed@oregonhealth.edu',
      phone: '+1 (503) 992-1144',
      share: 4.95,
      parking: 'Stall #24 (B1)',
      status: 'Active',
    },
    {
      id: 'res_4',
      name: 'Nicholas Sterling',
      unit: 'Penthouse 501',
      role: 'Board Treasurer & Owner',
      email: 'nsterling@sterlingcapital.com',
      phone: '+1 (503) 601-8890',
      share: 9.15,
      parking: 'Tandem Stall #01 & #02',
      status: 'Active',
    },
  ];

  const filtered = roster.filter((r) => {
    return (
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Residents, Owners & Occupancy Directory
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Verified resident roster, ownership deed holders, and parking allocations in {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Register Resident
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by resident name, unit, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <Card key={item.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#234B3A] dark:text-[#8FAF9A] font-semibold mt-0.5">
                    <Home className="w-3.5 h-3.5" />
                    <span>Unit {item.unit}</span>
                    <span>•</span>
                    <Badge variant="neutral" size="sm">{item.role}</Badge>
                  </div>
                </div>
                <Badge variant="success" size="sm" dot>
                  {item.status}
                </Badge>
              </div>

              <div className="p-3 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D] space-y-1.5 text-xs text-[#78847C] dark:text-[#B1BDB4]">
                <div className="flex items-center justify-between">
                  <span>Ownership Share:</span>
                  <span className="font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {item.share}% (Quorum voting weight)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Parking Assignment:</span>
                  <span className="font-medium text-[#202B25] dark:text-[#F1F4F0]">
                    {item.parking}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-[#78847C] dark:text-[#B1BDB4]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{item.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{item.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between text-xs text-[#78847C] dark:text-[#B1BDB4]">
              <span>HOA Voting Member</span>
              <span>Deed Verified</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Building Resident / Owner"
        description="Add a verified resident or owner-occupant to the building registry"
      >
        <div className="space-y-4">
          <Input label="Full Name" placeholder="e.g. Sandra Bullock" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Assigned Unit" placeholder="e.g. 201" required />
            <Select label="Tenancy Classification">
              <option value="owner">Owner-Occupant</option>
              <option value="tenant">Tenant Resident</option>
              <option value="investor">Non-Resident Investor</option>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Email Address" type="email" placeholder="sandra@example.com" required />
            <Input label="Phone Number" placeholder="+1 (503) 000-0000" />
          </div>
          <Input label="Assigned Parking Stall" placeholder="e.g. Stall #14 (B1)" />

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Add to Registry
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
