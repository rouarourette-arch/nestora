import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Building,
  User,
  Image as ImageIcon,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';
import { LivingMaintenanceRequest } from '../../types';

export const LivingMaintenancePage: React.FC = () => {
  const { livingMaintenance, submitLivingMaintenance, currentUser, activeWorkspace } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<LivingMaintenanceRequest['category']>('Plumbing');
  const [urgency, setUrgency] = useState<LivingMaintenanceRequest['urgency']>('Medium');
  const [room, setRoom] = useState('Main Shared Bath');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    submitLivingMaintenance({
      title,
      category,
      urgency,
      requestedByName: currentUser.name,
      room,
      description,
    });

    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const getUrgencyBadge = (urg: string) => {
    switch (urg) {
      case 'Emergency':
      case 'High':
        return <Badge variant="danger" size="sm" dot>{urg}</Badge>;
      case 'Medium':
        return <Badge variant="warning" size="sm" dot>{urg}</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{urg}</Badge>;
    }
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'RESOLVED':
        return <Badge variant="success" size="sm">Resolved</Badge>;
      case 'DISPATCHED':
        return <Badge variant="primary" size="sm">Tech Dispatched</Badge>;
      case 'LANDLORD_NOTIFIED':
        return <Badge variant="info" size="sm">Landlord Notified</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Submitted</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Household Maintenance & Landlord Dispatch Flow
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Log shared appliance defects, plumbing repairs, and track landlord communication for {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Submit Repair Request
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {livingMaintenance.map((req) => (
          <Card key={req.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">
                    {req.category}
                  </Badge>
                  {getUrgencyBadge(req.urgency)}
                </div>
                {getStatusBadge(req.status)}
              </div>

              <div>
                <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                  {req.title}
                </h3>
                <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] mt-1 leading-relaxed">
                  {req.description}
                </p>
              </div>

              {/* Dispatch Workflow Stepper Indicator */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[10px] font-semibold text-[#78847C] dark:text-[#B1BDB4] mb-1">
                  <span>1. Submitted</span>
                  <span>2. Landlord Alert</span>
                  <span>3. Dispatched</span>
                  <span>4. Resolved</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#EAECE8] dark:bg-[#1D2A23] overflow-hidden flex">
                  <div
                    className={`h-full bg-[#234B3A] dark:bg-[#8FAF9A] transition-all duration-300 ${
                      req.status === 'RESOLVED'
                        ? 'w-full'
                        : req.status === 'DISPATCHED'
                        ? 'w-3/4'
                        : req.status === 'LANDLORD_NOTIFIED'
                        ? 'w-1/2'
                        : 'w-1/4'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between text-xs text-[#78847C] dark:text-[#B1BDB4]">
              <span>Requested by {req.requestedByName} ({req.room})</span>
              <span>Logged {req.dateSubmitted}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Submit Repair Request Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Household Maintenance Request"
        description="Notify roommates and dispatch maintenance ticket to property management"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Issue Summary"
            placeholder="e.g. Garbage Disposal Humming but Not Spinning"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Trade Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
            >
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Appliance">Appliance</option>
              <option value="Structural">Structural</option>
              <option value="HVAC">HVAC / Heating</option>
            </Select>

            <Select
              label="Urgency Level"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as any)}
            >
              <option value="Low">Low (Routine maintenance)</option>
              <option value="Medium">Medium (Attention needed)</option>
              <option value="High">High (Impacting daily living)</option>
              <option value="Emergency">Emergency (Active water leak / hazard)</option>
            </Select>
          </div>

          <Input
            label="Location in House"
            placeholder="e.g. Kitchen Sink or Main Shared Bath"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-[#78847C] dark:text-[#B1BDB4] uppercase tracking-wider mb-1.5">
              Defect Description
            </label>
            <textarea
              className="w-full rounded-xl bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] text-[#202B25] dark:text-[#F1F4F0] text-sm p-3 outline-none"
              rows={3}
              placeholder="Describe symptoms, troubleshooting attempted..."
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
              Dispatch to Landlord
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
