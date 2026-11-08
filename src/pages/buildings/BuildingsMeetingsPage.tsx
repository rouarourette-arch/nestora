import React, { useState } from 'react';
import {
  Vote,
  Calendar,
  MapPin,
  CheckCircle2,
  Users,
  ShieldCheck,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MinusCircle,
  AlertCircle,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useData } from '../../contexts/DataContext';

export const BuildingsMeetingsPage: React.FC = () => {
  const { meetings, castVote, activeWorkspace } = useData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
          Owners Assembly & Digital Voting Hub
        </h1>
        <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
          General meetings, formal resolutions, and electronic ballots for {activeWorkspace.name}
        </p>
      </div>

      <div className="space-y-6">
        {meetings.map((meeting) => {
          const isVotingOpen = meeting.status === 'VOTING_OPEN';

          return (
            <Card key={meeting.id} className="space-y-6">
              {/* Meeting Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#E3EAE4] dark:border-[#354A3D]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={isVotingOpen ? 'success' : 'neutral'} size="sm" dot>
                      {meeting.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant="primary" size="sm">
                      {meeting.type}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-bold text-[#202B25] dark:text-[#F1F4F0]">
                    {meeting.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-[#78847C] dark:text-[#B1BDB4] pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {meeting.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {meeting.location}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#E7EFE8]/80 dark:bg-[#354A3D]/50 border border-[#234B3A]/15 dark:border-[#8FAF9A]/20 text-center sm:text-right shrink-0">
                  <span className="text-[11px] font-semibold text-[#78847C] dark:text-[#B1BDB4] uppercase">
                    Quorum Status
                  </span>
                  <p className="text-lg font-mono font-extrabold text-[#234B3A] dark:text-[#8FAF9A]">
                    {meeting.quorumPercentage}% Achieved
                  </p>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ Exceeds 50% Legal Statutory Requirement
                  </span>
                </div>
              </div>

              {/* Agenda & Ballot Items */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#202B25] dark:text-[#F1F4F0] uppercase tracking-wider">
                  Resolutions on the Ballot ({meeting.agendaItems.length})
                </h3>

                <div className="space-y-3">
                  {meeting.agendaItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-[#E3EAE4] dark:border-[#354A3D] bg-[#F3F5F2]/40 dark:bg-[#1D2A23]/40 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-[#78847C] dark:text-[#B1BDB4] uppercase">
                            Resolution #{idx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-[#202B25] dark:text-[#F1F4F0]">
                            {item.topic}
                          </h4>
                        </div>
                        {item.requiresVote ? (
                          <Badge variant="accent" size="sm">
                            Requires Vote
                          </Badge>
                        ) : (
                          <Badge variant="neutral" size="sm">
                            Discussion Only
                          </Badge>
                        )}
                      </div>

                      {item.requiresVote && (
                        <div className="pt-2 border-t border-[#E3EAE4]/60 dark:border-[#354A3D]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-4 text-xs font-mono">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                              FOR: {item.votesFor || 0}
                            </span>
                            <span className="text-rose-700 dark:text-rose-400 font-bold">
                              AGAINST: {item.votesAgainst || 0}
                            </span>
                            <span className="text-[#78847C] dark:text-[#B1BDB4]">
                              ABSTAIN: {item.votesAbstain || 0}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              disabled={!isVotingOpen}
                              onClick={() => castVote(meeting.id, item.id, 'FOR')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                item.userVote === 'FOR'
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 hover:bg-emerald-100'
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>Vote FOR</span>
                            </button>

                            <button
                              disabled={!isVotingOpen}
                              onClick={() => castVote(meeting.id, item.id, 'AGAINST')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                item.userVote === 'AGAINST'
                                  ? 'bg-rose-600 text-white shadow-sm'
                                  : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 hover:bg-rose-100'
                              }`}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                              <span>Vote AGAINST</span>
                            </button>

                            <button
                              disabled={!isVotingOpen}
                              onClick={() => castVote(meeting.id, item.id, 'ABSTAIN')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                item.userVote === 'ABSTAIN'
                                  ? 'bg-[#234B3A] text-white dark:bg-[#8FAF9A] dark:text-[#18231E]'
                                  : 'bg-[#EAECE8] text-[#78847C] dark:bg-[#304338] dark:text-[#B1BDB4] hover:bg-black/5'
                              }`}
                            >
                              Abstain
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#78847C] dark:text-[#B1BDB4]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Encrypted Digital Ballot Audit Trail Active
                </span>
                <span>Statutory HOA Meeting Record</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
