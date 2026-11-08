import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building, ArrowRight, ShieldCheck } from 'lucide-react';
import { Input, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [householdType, setHouseholdType] = useState('LIVING');
  const [workspaceName, setWorkspaceName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await register(name || 'New Member', email);
    setIsLoading(false);
    navigate('/workspaces');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#202B25] dark:text-[#F1F4F0]">
          Create your Nestora profile
        </h2>
        <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] mt-1">
          Set up your shared co-living household or join a building association
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Jordan Matthews"
          leftIcon={<User className="w-4 h-4" />}
          required
        />

        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jordan@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create secure password"
          leftIcon={<Lock className="w-4 h-4" />}
          required
        />

        <Select
          label="Primary Community Type"
          value={householdType}
          onChange={(e) => setHouseholdType(e.target.value)}
        >
          <option value="LIVING">Co-Living / Roommate Shared Apartment</option>
          <option value="BUILDING">Condominium / Multi-Family Building</option>
        </Select>

        <Input
          label="Initial Workspace or Residence Name"
          type="text"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          placeholder={householdType === 'LIVING' ? 'e.g. Mission Loft 3B' : 'e.g. Redwood Tower HOA'}
          leftIcon={<Building className="w-4 h-4" />}
          required
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-2"
          isLoading={isLoading}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          Complete Onboarding
        </Button>
      </form>

      <div className="pt-4 border-t border-[#E3EAE4] dark:border-[#354A3D] text-center">
        <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="font-bold text-[#234B3A] dark:text-[#8FAF9A] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>

      <div className="p-3 bg-[#E7EFE8]/50 dark:bg-[#354A3D]/30 rounded-xl border border-[#234B3A]/10 dark:border-[#8FAF9A]/20 text-[11px] text-[#78847C] dark:text-[#B1BDB4] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#234B3A] dark:text-[#8FAF9A] shrink-0" />
        <span>Instantly boots your workspace in frontend demo mode.</span>
      </div>
    </div>
  );
};
