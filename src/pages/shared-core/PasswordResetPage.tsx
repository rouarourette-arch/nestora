import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export const PasswordResetPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await resetPassword(email);
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#202B25] dark:text-[#F1F4F0]">
          Reset your password
        </h2>
        <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] mt-1">
          Enter your registered email address to receive recovery instructions
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-5 rounded-2xl bg-[#E7EFE8] dark:bg-[#354A3D]/50 border border-[#234B3A]/15 dark:border-[#8FAF9A]/30 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#234B3A] text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#202B25] dark:text-[#F1F4F0]">
            Recovery Instructions Sent
          </h3>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            If an account is associated with <span className="font-semibold">{email}</span>, a secure one-time reset link has been dispatched.
          </p>
          <div className="pt-2">
            <Link to="/auth/login">
              <Button variant="outline" size="sm" className="w-full">
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      ) : (
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

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            Send Recovery Link
          </Button>

          <div className="pt-2 text-center">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78847C] dark:text-[#B1BDB4] hover:text-[#202B25] dark:hover:text-[#F1F4F0]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}

      <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 shrink-0" />
        <span>Demo environment: Simulates security link dispatch.</span>
      </div>
    </div>
  );
};
