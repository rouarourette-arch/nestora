import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building,
  User,
  DollarSign,
  Search,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { useData } from '../../contexts/DataContext';
import { BuildingMaintenanceTicket } from '../../types';

export const BuildingsMaintenancePage: React.FC = () => {
  const { tickets, addTicket, updateTicketStatus, providers, activeWorkspace } = useData();
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Central Elevator Shaft #1');
  const [priority, setPriority] = useState<BuildingMaintenanceTicket['priority']>('HIGH');
  const [assignedProviderId, setAssignedProviderId] = useState(providers[0]?.id || 'prv_otis');
  const [estimatedCost, setEstimatedCost] = useState('500');
  const [description, setDescription] = useState('');

  const filteredTickets = tickets.filter((t) => {
    return selectedStatus === 'ALL' || t.status === selectedStatus;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    const vendor = providers.find((p) => p.id === assignedProviderId) || providers[0];

    addTicket({
      title,
      buildingName: activeWorkspace.name,
      location,
      priority,
      status: 'DISPATCHED',
      assignedProviderId: vendor.id,
      assignedProviderName: vendor.name,
      estimatedCost: parseFloat(estimatedCost) || 0,
      description,
    });

    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'CRITICAL':
      case 'HIGH':
        return <Badge variant="danger" size="sm" dot>{p}</Badge>;
      case 'MEDIUM':
        return <Badge variant="warning" size="sm" dot>{p}</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{p}</Badge>;
    }
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case 'COMPLETED':
        return <Badge variant="success" size="sm">Completed</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="warning" size="sm">In Progress</Badge>;
      case 'DISPATCHED':
        return <Badge variant="primary" size="sm">Dispatched</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{s}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Building Maintenance Dispatch Center
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Work order tracking, contractor interventions, and facility repairs for {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Create Dispatch Ticket
        </Button>
      </div>

      {/* Filter Tabs */}
      <Tabs
        activeTab={selectedStatus}
        onChange={setSelectedStatus}
        tabs={[
          { id: 'ALL', label: 'All Tickets', count: tickets.length },
          { id: 'DISPATCHED', label: 'Dispatched' },
          { id: 'IN_PROGRESS', label: 'In Progress' },
          { id: 'COMPLETED', label: 'Completed' },
        ]}
      />

      {/* Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTickets.map((tkt) => (
          <Card key={tkt.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#234B3A] dark:text-[#8FAF9A]">
                    {tkt.ticketNumber}
                  </span>
                  {getPriorityBadge(tkt.priority)}
                </div>
                {getStatusBadge(tkt.status)}
              </div>

              <div>
                <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                  {tkt.title}
                </h3>
                <p className="text-xs text-[#234B3A] dark:text-[#8FAF9A] font-medium mt-0.5">
                  Location: {tkt.location}
                </p>
                <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] mt-1 leading-relaxed">
                  {tkt.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D] space-y-1.5 text-xs text-[#78847C] dark:text-[#B1BDB4]">
                <div className="flex items-center justify-between">
                  <span>Assigned Service Vendor:</span>
                  <span className="font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {tkt.assignedProviderName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Budget / Estimated Cost:</span>
                  <span className="font-mono font-bold text-[#234B3A] dark:text-[#8FAF9A]">
                    ${tkt.estimatedCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between text-xs">
              <span className="text-[#78847C] dark:text-[#B1BDB4]">
                Opened {tkt.createdAt}
              </span>
              <div className="flex items-center gap-2">
                {tkt.status !== 'COMPLETED' ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    onClick={() => updateTicketStatus(tkt.id, 'COMPLETED')}
                  >
                    Mark Resolved
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateTicketStatus(tkt.id, 'IN_PROGRESS')}
                  >
                    Reopen Ticket
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Ticket Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Facility Work Order Ticket"
        description="Dispatch certified contractor for physical plant maintenance"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Ticket Title"
            placeholder="e.g. Underground Garage Sump Pump Sensor Inspection"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Physical Location"
              placeholder="e.g. Basement Sub-Level B2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <Select
              label="Priority Level"
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
            >
              <option value="LOW">Low (Routine maintenance)</option>
              <option value="MEDIUM">Medium (Scheduled service)</option>
              <option value="HIGH">High (Urgent intervention)</option>
              <option value="CRITICAL">Critical (Life safety / Emergency)</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Assigned Contractor"
              value={assignedProviderId}
              onChange={(e) => setAssignedProviderId(e.target.value)}
            >
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.category})
                </option>
              ))}
            </Select>

            <Input
              label="Estimated Cost ($)"
              type="number"
              step="0.01"
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#78847C] dark:text-[#B1BDB4] uppercase tracking-wider mb-1.5">
              Work Order Specifications & Access Notes
            </label>
            <textarea
              className="w-full rounded-xl bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] text-[#202B25] dark:text-[#F1F4F0] text-sm p-3 outline-none"
              rows={3}
              placeholder="Describe diagnostic steps, access keys..."
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
              Dispatch Work Order
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
