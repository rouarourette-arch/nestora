import React from 'react';
import {
  Layers,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  Sparkles,
  Info,
  Calendar,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useData } from '../../contexts/DataContext';

export const LivingAmenitiesPage: React.FC = () => {
  const { activeWorkspace, facilities } = useData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
          Shared Facilities & Common House Spaces
        </h1>
        <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
          Operational hours, equipment status, and shared living courtesy standards for {activeWorkspace.name}
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-[#E7EFE8]/70 dark:bg-[#354A3D]/40 border border-[#234B3A]/15 dark:border-[#8FAF9A]/20 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A] shrink-0 mt-0.5" />
        <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] leading-relaxed">
          Facility information is published transparently for communal coordination and respectful shared living.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {facilities.map((fac) => (
          <Card key={fac.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-[#234B3A] dark:text-[#8FAF9A] font-semibold mt-0.5">
                    {fac.location}
                  </p>
                </div>
                <Badge variant="success" size="sm" dot>
                  {fac.status}
                </Badge>
              </div>

              <div className="p-3 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D] space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-[#78847C] dark:text-[#B1BDB4]">
                  <Clock className="w-3.5 h-3.5 text-[#234B3A] dark:text-[#8FAF9A]" />
                  <span>Hours: <strong className="text-[#202B25] dark:text-[#F1F4F0]">{fac.hours}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#78847C] dark:text-[#B1BDB4]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9A66F]" />
                  <span>Equipment: <span className="text-[#202B25] dark:text-[#F1F4F0] font-medium">{fac.equipment}</span></span>
                </div>
              </div>

              <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] leading-relaxed">
                <strong>House Etiquette:</strong> {fac.guidelines}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between text-xs text-[#78847C] dark:text-[#B1BDB4]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Sanitation Inspected
              </span>
              <span>Mutual Courtesy Policy</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const LivingFacilitiesPage = LivingAmenitiesPage;
