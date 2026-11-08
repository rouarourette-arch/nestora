import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  Bell,
  Palette,
  CheckCircle2,
  Save,
  Key,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useData } from '../../contexts/DataContext';

export const UserProfilePage: React.FC = () => {
  const { currentUser, updateCurrentUser, activeWorkspace } = useData();
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [emergencyName, setEmergencyName] = useState(currentUser.emergencyContact?.name || '');
  const [emergencyRelation, setEmergencyRelation] = useState(currentUser.emergencyContact?.relation || '');
  const [emergencyPhone, setEmergencyPhone] = useState(currentUser.emergencyContact?.phone || '');

  const [notifEmail, setNotifEmail] = useState(currentUser.notificationPreferences.email);
  const [notifPush, setNotifPush] = useState(currentUser.notificationPreferences.push);
  const [notifBills, setNotifBills] = useState(currentUser.notificationPreferences.billsReminders);
  const [notifMaint, setNotifMaint] = useState(currentUser.notificationPreferences.maintenanceAlerts);
  const [notifComm, setNotifComm] = useState(currentUser.notificationPreferences.communityAnnouncements);

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      phone,
      emergencyContact: {
        name: emergencyName,
        relation: emergencyRelation,
        phone: emergencyPhone,
      },
      notificationPreferences: {
        email: notifEmail,
        push: notifPush,
        billsReminders: notifBills,
        maintenanceAlerts: notifMaint,
        communityAnnouncements: notifComm,
      },
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            User Profile & Account Settings
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Manage your personal profile, household notifications, emergency contacts, and active workspace preferences
          </p>
        </div>
        {isSaved && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile settings saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Identity Overview */}
        <div className="space-y-6">
          <Card className="text-center space-y-4">
            <div className="relative inline-block">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-[#E7EFE8] dark:border-[#354A3D] shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-[#26372E] rounded-full" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#202B25] dark:text-[#F1F4F0]">
                {currentUser.name}
              </h2>
              <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                {currentUser.email}
              </p>
              <div className="flex justify-center gap-2 mt-2">
                <Badge variant="primary" size="sm">
                  {currentUser.role.replace('_', ' ')}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E3EAE4] dark:border-[#354A3D] text-left space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#78847C] dark:text-[#B1BDB4]">
                <span>Active Workspace:</span>
                <span className="font-semibold text-[#202B25] dark:text-[#F1F4F0]">
                  {activeWorkspace.name}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#78847C] dark:text-[#B1BDB4]">
                <span>Community Type:</span>
                <span className="font-semibold text-[#202B25] dark:text-[#F1F4F0]">
                  {activeWorkspace.type === 'LIVING' ? 'Co-Living Living' : 'Buildings HOA'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                icon={<Palette className="w-4 h-4 text-[#8FAF9A]" />}
                onClick={() => navigate('/settings/appearance')}
              >
                Go to Appearance Settings
              </Button>
            </div>
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#234B3A] dark:text-[#8FAF9A]" />
              <h3 className="text-sm font-bold text-[#202B25] dark:text-[#F1F4F0]">
                Security Credentials
              </h3>
            </div>
            <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
              Two-Factor Authentication is active for this demo profile session.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              icon={<Key className="w-4 h-4" />}
              onClick={() => navigate('/auth/forgot-password')}
            >
              Reset Password
            </Button>
          </Card>
        </div>

        {/* Right 2 Columns: Editable Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <UserIcon className="w-4 h-4 text-[#234B3A] dark:text-[#8FAF9A]" />
              <h2 className="text-sm font-bold text-[#202B25] dark:text-[#F1F4F0]">
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Direct Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (415) 000-0000"
              />
              <Input
                label="Default Residence / Room"
                value="Master Bedroom"
                disabled
                helperText="Assigned by Workspace Manager"
              />
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <Phone className="w-4 h-4 text-[#234B3A] dark:text-[#8FAF9A]" />
              <h2 className="text-sm font-bold text-[#202B25] dark:text-[#F1F4F0]">
                Emergency Household Contact
              </h2>
            </div>
            <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
              Used by building administration or roommates during facility emergencies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Contact Name"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                placeholder="Robert Lin"
              />
              <Input
                label="Relationship"
                value={emergencyRelation}
                onChange={(e) => setEmergencyRelation(e.target.value)}
                placeholder="e.g. Parent or Guardian"
              />
              <Input
                label="Emergency Phone"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="+1 (415) 555-0199"
              />
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <Bell className="w-4 h-4 text-[#234B3A] dark:text-[#8FAF9A]" />
              <h2 className="text-sm font-bold text-[#202B25] dark:text-[#F1F4F0]">
                Notification & Dispatch Preferences
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: 'Email Notifications & Summaries',
                  desc: 'Receive digest for monthly common dues, major assemblies, and receipts.',
                  val: notifEmail,
                  setVal: setNotifEmail,
                },
                {
                  label: 'In-App Urgent Push Alerts',
                  desc: 'Immediate notifications for contractor interventions and water/power testing.',
                  val: notifPush,
                  setVal: setNotifPush,
                },
                {
                  label: 'Upcoming Bill Reminders',
                  desc: 'Alert 3 days prior to recurring utility and internet invoice deadlines.',
                  val: notifBills,
                  setVal: setNotifBills,
                },
                {
                  label: 'Building Maintenance Dispatch Status',
                  desc: 'Real-time updates when technicians accept or complete work orders.',
                  val: notifMaint,
                  setVal: setNotifMaint,
                },
                {
                  label: 'Community & Household Announcements',
                  desc: 'Notices posted by property board members and roommates.',
                  val: notifComm,
                  setVal: setNotifComm,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#F3F5F2]/50 dark:bg-[#1D2A23]/50 border border-[#E3EAE4] dark:border-[#354A3D]">
                  <div>
                    <p className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">
                      {item.label}
                    </p>
                    <p className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
                      {item.desc}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={item.val}
                    onChange={(e) => item.setVal(e.target.checked)}
                    className="w-4 h-4 text-[#234B3A] rounded border-[#E3EAE4] focus:ring-[#234B3A]"
                  />
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              icon={<Save className="w-4 h-4" />}
            >
              Save Profile Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
