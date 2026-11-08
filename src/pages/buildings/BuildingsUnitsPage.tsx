import React, { useState } from 'react';
import {
  Building,
  Plus,
  Search,
  Filter,
  Users,
  CheckCircle2,
  AlertCircle,
  Percent,
  Layers,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';
import { Unit } from '../../types';

export const BuildingsUnitsPage: React.FC = () => {
  const { units, addUnit, activeWorkspace } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [unitNumber, setUnitNumber] = useState('');
  const [floor, setFloor] = useState('1');
  const [type, setType] = useState<Unit['type']>('2BR');
  const [areaSqFt, setAreaSqFt] = useState('950');
  const [ownershipSharePercentage, setOwnershipSharePercentage] = useState('4.20');
  const [residentName, setResidentName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [currentMonthlyDues, setCurrentMonthlyDues] = useState('450');

  const filteredUnits = units.filter((u) => {
    return (
      u.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitNumber) return;

    addUnit({
      buildingId: 'bld_cedar',
      unitNumber,
      floor: parseInt(floor, 10) || 1,
      type,
      areaSqFt: parseInt(areaSqFt, 10) || 800,
      ownershipSharePercentage: parseFloat(ownershipSharePercentage) || 4.0,
      residentName: residentName || 'Vacant',
      ownerName: ownerName || 'Self',
      status: residentName ? 'OCCUPIED' : 'VACANT',
      currentMonthlyDues: parseFloat(currentMonthlyDues) || 400,
    });

    setIsModalOpen(false);
    setUnitNumber('');
    setResidentName('');
    setOwnerName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Buildings & Units Management
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Unit register, ownership shares, resident assignments, and assessment quotas for {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Unit
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by unit number, resident, or owner name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Units Table Card */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F3F5F2]/70 dark:bg-[#1D2A23] text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <tr>
                <th className="py-3 px-4">Unit #</th>
                <th className="py-3 px-4">Floor / Layout</th>
                <th className="py-3 px-4">Area (Sq Ft)</th>
                <th className="py-3 px-4">Ownership Share</th>
                <th className="py-3 px-4">Current Resident</th>
                <th className="py-3 px-4">Title Deed Owner</th>
                <th className="py-3 px-4">Monthly Dues</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
              {filteredUnits.map((u) => (
                <tr key={u.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-sm text-[#234B3A] dark:text-[#8FAF9A]">
                    {u.unitNumber}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#202B25] dark:text-[#F1F4F0]">
                    Floor {u.floor} • <Badge variant="neutral" size="sm">{u.type}</Badge>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#78847C] dark:text-[#B1BDB4]">
                    {u.areaSqFt} sq ft
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-xs text-[#202B25] dark:text-[#F1F4F0]">
                    {u.ownershipSharePercentage.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-4 font-medium text-xs text-[#202B25] dark:text-[#F1F4F0]">
                    {u.residentName}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#78847C] dark:text-[#B1BDB4]">
                    {u.ownerName}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#202B25] dark:text-[#F1F4F0]">
                    ${u.currentMonthlyDues.toFixed(2)}/mo
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Badge
                      variant={
                        u.status === 'OCCUPIED'
                          ? 'success'
                          : u.status === 'MAINTENANCE'
                          ? 'warning'
                          : 'neutral'
                      }
                      size="sm"
                      dot
                    >
                      {u.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Unit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Building Unit"
        description="Add a residential or commercial condominium parcel"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Unit Number"
              placeholder="e.g. 304"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              required
            />
            <Input
              label="Floor Level"
              type="number"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Apartment Type"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <option value="Studio">Studio</option>
              <option value="1BR">1 Bedroom</option>
              <option value="2BR">2 Bedroom</option>
              <option value="3BR">3 Bedroom</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Commercial">Commercial Space</option>
            </Select>

            <Input
              label="Area (Sq Ft)"
              type="number"
              value={areaSqFt}
              onChange={(e) => setAreaSqFt(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Ownership Share (% of HOA)"
              type="number"
              step="0.01"
              value={ownershipSharePercentage}
              onChange={(e) => setOwnershipSharePercentage(e.target.value)}
              required
            />

            <Input
              label="Monthly Dues ($)"
              type="number"
              step="0.01"
              value={currentMonthlyDues}
              onChange={(e) => setCurrentMonthlyDues(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Current Resident Name"
              placeholder="e.g. Elena Vance"
              value={residentName}
              onChange={(e) => setResidentName(e.target.value)}
            />

            <Input
              label="Title Deed Owner"
              placeholder="e.g. Vance Family Trust"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Register Unit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
