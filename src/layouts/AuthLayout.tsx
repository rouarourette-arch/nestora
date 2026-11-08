import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F3F5F2] dark:bg-[#18231E]">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#234B3A] dark:bg-[#8FAF9A] flex items-center justify-center text-white dark:text-[#18231E] font-black text-xl shadow-md">
              N
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
              NESTORA
            </span>
          </Link>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] font-medium tracking-wide">
            One platform. Better shared living.
          </p>
        </div>

        {/* Auth Card Box */}
        <div className="bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] rounded-2xl shadow-xl p-6 sm:p-8">
          <Outlet />
        </div>

        {/* Demo Disclaimer */}
        <div className="text-center">
          <p className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
            Frontend Demonstration Adapter • No real payment or database sync connected
          </p>
        </div>
      </div>
    </div>
  );
};
