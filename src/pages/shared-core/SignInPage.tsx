import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export const SignInPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('sarah.lin@nestora.app');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/living');
    } catch {
      setError('Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#202B25] dark:text-[#F1F4F0]">
          Sign in to your household
        </h2>
        <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] mt-1">
          Access your shared living spaces, expenses, and building management
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />

        <div>
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />
          <div className="flex justify-end mt-1.5">
            <Link
              to="/auth/forgot-password"
              className="text-xs font-semibold text-[#234B3A] dark:text-[#8FAF9A] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-2"
          isLoading={isLoading}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          Enter Workspace
        </Button>
      </form>

      <div className="pt-4 border-t border-[#E3EAE4] dark:border-[#354A3D] text-center">
        <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className="font-bold text-[#234B3A] dark:text-[#8FAF9A] hover:underline"
          >
            Register / Onboard
          </Link>
        </p>
      </div>

      <div className="p-3 bg-[#E7EFE8]/50 dark:bg-[#354A3D]/30 rounded-xl border border-[#234B3A]/10 dark:border-[#8FAF9A]/20 text-[11px] text-[#78847C] dark:text-[#B1BDB4] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#234B3A] dark:text-[#8FAF9A] shrink-0" />
        <span>Pre-filled with demo manager credentials for quick evaluation.</span>
      </div>
    </div>
  );
};
