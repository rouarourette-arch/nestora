import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Plus,
  Home,
  Building2,
  Users,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';
import { WorkspaceType } from '../../types';

export const WorkspaceSelectionPage: React.FC = () => {
  const { workspaces, activeWorkspace, switchWorkspace, createWorkspace } = useData();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<WorkspaceType>('LIVING');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('🏡');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;
    createWorkspace({
      name,
      type,
      address,
      avatar,
      role: 'WORKSPACE_OWNER',
      plan: type === 'LIVING' ? 'Pro Resident' : 'Enterprise Property',
    });
    setIsModalOpen(false);
    setName('');
    setAddress('');
  };

  return (
    <div className="space-y-6">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Workspace Selection & Fleet Hub
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Switch between your co-living residences, multi-family buildings, and property portfolios
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Create Workspace
        </Button>
      </div>

      {/* Grid of Workspaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {workspaces.map((ws) => {
          const isActive = ws.id === activeWorkspace.id;
          return (
            <Card
              key={ws.id}
              className={`flex flex-col justify-between transition-all duration-200 ${
                isActive
                  ? 'ring-2 ring-[#234B3A] dark:ring-[#8FAF9A] bg-white dark:bg-[#26372E]'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#E7EFE8] dark:bg-[#354A3D] text-2xl flex items-center justify-center shadow-sm">
                    {ws.avatar}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isActive ? (
                      <Badge variant="success" dot size="sm">
                        Active Workspace
                      </Badge>
                    ) : (
                      <Badge variant="neutral" size="sm">
                        {ws.plan}
                      </Badge>
                    )}
                    <span className="text-[11px] font-semibold text-[#78847C] dark:text-[#B1BDB4]">
                      {ws.role.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {ws.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#78847C] dark:text-[#B1BDB4] mt-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{ws.address}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between text-xs text-[#78847C] dark:text-[#B1BDB4]">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{ws.membersCount} Members</span>
                  </div>
                  {ws.unitsCount && (
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{ws.unitsCount} Units</span>
                    </div>
                  )}
                  <span>Since {ws.activeSince}</span>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[#E3EAE4] dark:border-[#354A3D]">
                {isActive ? (
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      if (ws.type === 'LIVING') navigate('/living');
                      else navigate('/buildings');
                    }}
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Open Dashboard
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      switchWorkspace(ws.id);
                      if (ws.type === 'LIVING') navigate('/living');
                      else navigate('/buildings');
                    }}
                  >
                    Switch to Workspace
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Create Workspace Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Shared Workspace"
        description="Bootstrap a co-living apartment or building condominium association"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Workspace Name"
            placeholder="e.g. Pine Valley Co-Living 2A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Select
            label="Workspace Type"
            value={type}
            onChange={(e) => {
              const newType = e.target.value as WorkspaceType;
              setType(newType);
              setAvatar(newType === 'LIVING' ? '🏡' : '🏢');
            }}
          >
            <option value="LIVING">Nestora Living (Co-Living / Household)</option>
            <option value="BUILDING">Nestora Buildings (Multi-Family / Condominium)</option>
          </Select>

          <Input
            label="Physical Street Address"
            placeholder="e.g. 520 Franklin St, San Francisco, CA"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <Input
            label="Workspace Emoji / Avatar"
            placeholder="🏡 or 🏢"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create & Enter
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
