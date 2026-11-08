import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Bot,
  User,
  AlertCircle,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useData } from '../../contexts/DataContext';

export const IntelligenceCopilotPage: React.FC = () => {
  const {
    copilotMessages,
    sendCopilotMessage,
    proposedActions,
    approveAction,
    rejectAction,
    activeWorkspace,
  } = useData();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendCopilotMessage(inputText);
    setInputText('');
  };

  const pendingActions = proposedActions.filter((a) => a.status === 'PROPOSED');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">✨</span>
            <Badge variant="accent" size="sm">
              Supervised Copilot Engine
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Nestora Intelligence Command Center
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Human-in-the-loop operational copilot for utility alerts, chore fairness, and vendor dispatch in {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="secondary"
          icon={<Clock className="w-4 h-4" />}
          onClick={() => navigate('/intelligence/actions')}
        >
          View Approval Queue ({pendingActions.length})
        </Button>
      </div>

      {/* Safety & Compliance Notice */}
      <div className="p-4 rounded-2xl bg-[#fbf4ea] dark:bg-[#3f3123]/40 border border-[#D9A66F]/30 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#D9A66F] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">
            2-Step Human-in-the-Loop Supervision Workflow
          </p>
          <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            All automated actions strictly follow <strong>PROPOSED → APPROVED/REJECTED → EXECUTED/FAILED</strong>. Nestora Intelligence cannot mutate financial records or dispatch contractors without your explicit manual approval.
          </p>
        </div>
      </div>

      {/* Chat & Proposals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Conversation Stream */}
        <div className="lg:col-span-2 flex flex-col h-[580px] rounded-2xl border border-[#E3EAE4] dark:border-[#354A3D] bg-white dark:bg-[#26372E] shadow-sm overflow-hidden">
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {copilotMessages.map((msg) => {
              const isCopilot = msg.sender === 'COPILOT';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${
                    isCopilot ? '' : 'ml-auto flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm shadow-sm ${
                      isCopilot
                        ? 'bg-[#E7EFE8] dark:bg-[#354A3D] text-[#234B3A] dark:text-[#8FAF9A]'
                        : 'bg-[#234B3A] text-white dark:bg-[#8FAF9A] dark:text-[#18231E]'
                    }`}
                  >
                    {isCopilot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="space-y-2">
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isCopilot
                          ? 'bg-[#F3F5F2] dark:bg-[#1D2A23] text-[#202B25] dark:text-[#F1F4F0] border border-[#E3EAE4] dark:border-[#354A3D]'
                          : 'bg-[#234B3A] text-white dark:bg-[#8FAF9A] dark:text-[#18231E]'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>

                    {/* Proposed Action Card embedded in Copilot message */}
                    {msg.proposedAction && (
                      <div className="p-3.5 rounded-xl border-2 border-[#D9A66F]/40 bg-[#fbf4ea]/80 dark:bg-[#3f3123]/60 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#D9A66F] uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Action Proposed for Human Approval
                          </span>
                          <Badge variant="accent" size="sm">
                            {msg.proposedAction.status}
                          </Badge>
                        </div>

                        <h4 className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">
                          {msg.proposedAction.title}
                        </h4>
                        <p className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
                          {msg.proposedAction.impactSummary}
                        </p>

                        <div className="flex items-center gap-2 pt-1">
                          {msg.proposedAction.status === 'PROPOSED' ? (
                            <>
                              <Button
                                variant="primary"
                                size="sm"
                                icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                                onClick={() => approveAction(msg.proposedAction!.id)}
                              >
                                Approve Action
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => rejectAction(msg.proposedAction!.id)}
                              >
                                Decline
                              </Button>
                            </>
                          ) : (
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              ✓ {msg.proposedAction.status} by human supervisor
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <span className="text-[10px] text-[#78847C] dark:text-[#B1BDB4] block px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prompt Input Box */}
          <form
            onSubmit={handleSend}
            className="p-3 sm:p-4 border-t border-[#E3EAE4] dark:border-[#354A3D] bg-[#F3F5F2]/40 dark:bg-[#1D2A23]/40 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Copilot about chores, split expenses, maintenance, or vendor contracts..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 rounded-xl bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] text-[#202B25] dark:text-[#F1F4F0] text-xs sm:text-sm py-2.5 px-3.5 outline-none focus:ring-2 focus:ring-[#234B3A]/15"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Send className="w-4 h-4" />}
            >
              Send
            </Button>
          </form>
        </div>

        {/* Right Col: Active Proposed Actions Queue */}
        <div className="space-y-4">
          <Card className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3EAE4] dark:border-[#354A3D]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D9A66F]" />
                <h3 className="text-sm font-bold text-[#202B25] dark:text-[#F1F4F0]">
                  Pending Human Approvals
                </h3>
              </div>
              <Badge variant="accent" size="sm">
                {pendingActions.length} Pending
              </Badge>
            </div>

            {pendingActions.length === 0 ? (
              <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] py-4 text-center">
                All proposed actions have been reviewed and resolved.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingActions.map((act) => (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-xl border border-[#E3EAE4] dark:border-[#354A3D] bg-[#F3F5F2]/50 dark:bg-[#1D2A23]/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="neutral" size="sm">
                        {act.category}
                      </Badge>
                      <span className="text-[10px] text-[#78847C] dark:text-[#B1BDB4]">
                        {act.proposedAt}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">
                      {act.title}
                    </h4>
                    <p className="text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
                      {act.impactSummary}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => approveAction(act.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => rejectAction(act.id)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
