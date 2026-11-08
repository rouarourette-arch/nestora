import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Pin,
  CheckCircle2,
  Users,
  Calendar,
  AlertTriangle,
  User,
  Sparkles,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { useData } from '../../contexts/DataContext';
import { Announcement } from '../../types';

export const BuildingsAnnouncementsPage: React.FC = () => {
  const { announcements, addAnnouncement, acknowledgeAnnouncement, currentUser, activeWorkspace } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Announcement['category']>('General Notice');
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addAnnouncement({
      title,
      category,
      author: currentUser.name,
      authorRole: currentUser.role.replace('_', ' '),
      content,
      pinned,
      totalRecipients: 24,
    });

    setIsModalOpen(false);
    setTitle('');
    setContent('');
    setPinned(false);
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Maintenance Window':
        return <Badge variant="warning" size="sm" dot>{cat}</Badge>;
      case 'Community Event':
        return <Badge variant="success" size="sm" dot>{cat}</Badge>;
      case 'Urgent Alert':
        return <Badge variant="danger" size="sm" dot>{cat}</Badge>;
      default:
        return <Badge variant="primary" size="sm" dot>{cat}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Announcements & Community Notices
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Building-wide broadcasts, scheduled service outages, and community updates for {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Post Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.map((anc) => (
          <Card
            key={anc.id}
            className={`space-y-4 transition-all ${
              anc.pinned
                ? 'border-[#234B3A]/40 dark:border-[#8FAF9A]/40 bg-gradient-to-r from-white to-[#E7EFE8]/20 dark:from-[#26372E] dark:to-[#354A3D]/20'
                : ''
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {anc.pinned && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D9A66F]">
                      <Pin className="w-3.5 h-3.5 fill-[#D9A66F]" />
                      PINNED NOTICE
                    </span>
                  )}
                  {getCategoryBadge(anc.category)}
                </div>
                <h3 className="text-lg font-bold text-[#202B25] dark:text-[#F1F4F0]">
                  {anc.title}
                </h3>
                <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                  Posted by <span className="font-semibold text-[#202B25] dark:text-[#F1F4F0]">{anc.author}</span> ({anc.authorRole}) • {anc.date}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-semibold text-[#234B3A] dark:text-[#8FAF9A] bg-[#E7EFE8] dark:bg-[#354A3D] px-2.5 py-1 rounded-full">
                  {anc.acknowledgedCount} / {anc.totalRecipients} Read
                </span>
              </div>
            </div>

            <p className="text-sm text-[#202B25] dark:text-[#F1F4F0] leading-relaxed">
              {anc.content}
            </p>

            <div className="pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
              <span className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                Broadcast to all 24 Condominium Units
              </span>
              <Button
                variant="secondary"
                size="sm"
                icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                onClick={() => acknowledgeAnnouncement(anc.id)}
              >
                Acknowledge & Confirm Read
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Post Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Publish Community Notice"
        description="Broadcast an announcement to residents and property owners"
      >
        <form onSubmit={handlePost} className="space-y-4">
          <Input
            label="Notice Title"
            placeholder="e.g. Scheduled Fire Sprinkler Flow Test"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          >
            <option value="General Notice">General Notice</option>
            <option value="Maintenance Window">Maintenance Window</option>
            <option value="Community Event">Community Event</option>
            <option value="Urgent Alert">Urgent Alert</option>
            <option value="Policy Update">Policy Update</option>
          </Select>

          <div>
            <label className="block text-xs font-semibold text-[#78847C] dark:text-[#B1BDB4] uppercase tracking-wider mb-1.5">
              Notice Content
            </label>
            <textarea
              className="w-full rounded-xl bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] text-[#202B25] dark:text-[#F1F4F0] text-sm p-3 outline-none"
              rows={4}
              placeholder="State the time window, contractor details, actions required..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="pin-check"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="w-4 h-4 text-[#234B3A] rounded border-[#E3EAE4]"
            />
            <label htmlFor="pin-check" className="text-xs font-semibold text-[#202B25] dark:text-[#F1F4F0]">
              Pin to top of announcement feed
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Broadcast Notice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
