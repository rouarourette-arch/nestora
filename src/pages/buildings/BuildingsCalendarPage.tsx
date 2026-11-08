import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  Clock,
  MapPin,
  Users,
  Wrench,
  Megaphone,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { useData } from '../../contexts/DataContext';
import { MasterCalendarEvent } from '../../types';

export const BuildingsCalendarPage: React.FC = () => {
  const { calendarEvents, activeWorkspace } = useData();
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = calendarEvents.filter((ev) => {
    return selectedType === 'ALL' || ev.type === selectedType;
  });

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'MAINTENANCE':
        return <Badge variant="warning" size="sm" dot>Maintenance Window</Badge>;
      case 'MEETING':
        return <Badge variant="primary" size="sm" dot>Owners Assembly</Badge>;
      case 'COMMUNITY':
        return <Badge variant="success" size="sm" dot>Community Event</Badge>;
      default:
        return <Badge variant="neutral" size="sm" dot>{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Master Calendar & Operations Schedule
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Maintenance interventions, general assemblies, and community events for {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Schedule Event
        </Button>
      </div>

      <Tabs
        activeTab={selectedType}
        onChange={setSelectedType}
        tabs={[
          { id: 'ALL', label: 'All Events', count: calendarEvents.length },
          { id: 'MAINTENANCE', label: 'Maintenance' },
          { id: 'MEETING', label: 'Assemblies' },
          { id: 'COMMUNITY', label: 'Community' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <Card key={item.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#234B3A] dark:text-[#8FAF9A] font-semibold mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                </div>
                {getEventBadge(item.type)}
              </div>

              <div className="p-3 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D] space-y-1.5 text-xs text-[#78847C] dark:text-[#B1BDB4]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#234B3A] dark:text-[#8FAF9A]" />
                    Date:
                  </span>
                  <span className="font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {item.date}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#234B3A] dark:text-[#8FAF9A]" />
                    Time Window:
                  </span>
                  <span className="font-medium text-[#202B25] dark:text-[#F1F4F0]">
                    {item.time} PST
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between text-xs text-[#78847C] dark:text-[#B1BDB4]">
              <span>Organizer: {item.organizer}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Confirmed Window
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Calendar Event"
        description="Publish a maintenance intervention window or community meeting"
      >
        <div className="space-y-4">
          <Input label="Event Title" placeholder="e.g. Annual Fire Alarm Strobe Testing" required />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Event Classification">
              <option value="MAINTENANCE">Maintenance Window</option>
              <option value="MEETING">General Assembly</option>
              <option value="COMMUNITY">Community Event</option>
            </Select>
            <Input label="Location" placeholder="e.g. All Units & Common Corridors" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Event Date" type="date" defaultValue="2026-11-25" required />
            <Input label="Time Window" placeholder="10:00 - 13:00" required />
          </div>
          <Input label="Organizing Entity" placeholder="e.g. Sentinel Fire & Board of Directors" />

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Add to Calendar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
