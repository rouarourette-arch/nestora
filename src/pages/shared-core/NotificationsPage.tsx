import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Filter,
  Sparkles,
  Receipt,
  Wrench,
  CheckSquare,
  Megaphone,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { useData } from '../../contexts/DataContext';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ALL');

  const filtered = notifications.filter((n) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'UNREAD') return !n.read;
    return n.category === activeTab;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'COMMUNITY':
        return <Megaphone className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'FINANCIAL':
        return <Receipt className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'TASK':
        return <CheckSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'MAINTENANCE':
        return <Wrench className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'INTELLIGENCE':
        return <Sparkles className="w-4 h-4 text-[#D9A66F]" />;
      default:
        return <Bell className="w-4 h-4 text-[#234B3A] dark:text-[#8FAF9A]" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Notifications & Activity Stream
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Centralized alerts, updates, maintenance dispatches, and intelligence notices
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<CheckCheck className="w-4 h-4" />}
          onClick={markAllNotificationsRead}
        >
          Mark All as Read
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'ALL', label: 'All Alerts', count: notifications.length },
            { id: 'UNREAD', label: 'Unread', count: notifications.filter((n) => !n.read).length },
            { id: 'COMMUNITY', label: 'Community' },
            { id: 'FINANCIAL', label: 'Financial' },
            { id: 'TASK', label: 'Tasks' },
            { id: 'MAINTENANCE', label: 'Maintenance' },
            { id: 'INTELLIGENCE', label: 'Intelligence' },
          ]}
        />
      </div>

      <Card padding="none" className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-[#78847C] dark:text-[#B1BDB4]">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors ${
                !item.read
                  ? 'bg-[#E7EFE8]/30 dark:bg-[#354A3D]/20'
                  : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#202B25] dark:text-[#F1F4F0]">
                      {item.title}
                    </h3>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#234B3A] dark:bg-[#8FAF9A]" />
                    )}
                  </div>
                  <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] max-w-xl">
                    {item.message}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-[#78847C] dark:text-[#B1BDB4] pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                    <span>•</span>
                    <Badge variant="neutral" size="sm">{item.category}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!item.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markNotificationRead(item.id)}
                  >
                    Dismiss
                  </Button>
                )}
                {item.linkUrl && (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    iconPosition="right"
                    onClick={() => {
                      markNotificationRead(item.id);
                      navigate(item.linkUrl!);
                    }}
                  >
                    View
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
};
