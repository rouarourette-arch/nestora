import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Workspace,
  WorkspaceMember,
  Expense,
  InternalSettlement,
  ChoreTask,
  ShoppingItem,
  BillReminder,
  LivingRule,
  LivingMaintenanceRequest,
  RoommateOnboardingItem,
  SharedFacility,
  Building,
  Unit,
  CommonContribution,
  BuildingMaintenanceTicket,
  ServiceProvider,
  BuildingDocument,
  Announcement,
  AssemblyMeeting,
  MasterCalendarEvent,
  ProposedAction,
  CopilotMessage,
  PlatformTenant,
  PlatformUser,
  AuditLogEntry,
  SystemNotification,
  UserRole,
} from '../types';
import {
  CURRENT_USER,
  INITIAL_WORKSPACES,
  INITIAL_MEMBERS,
  INITIAL_EXPENSES,
  INITIAL_SETTLEMENTS,
  INITIAL_TASKS,
  INITIAL_SHOPPING,
  INITIAL_BILLS,
  INITIAL_LIVING_RULES,
  INITIAL_LIVING_MAINTENANCE,
  INITIAL_ONBOARDING_ITEMS,
  INITIAL_FACILITIES,
  INITIAL_BUILDINGS,
  INITIAL_UNITS,
  INITIAL_COMMON_CONTRIBUTIONS,
  INITIAL_BUILDING_TICKETS,
  INITIAL_PROVIDERS,
  INITIAL_DOCUMENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_MEETINGS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_PROPOSED_ACTIONS,
  INITIAL_COPILOT_MESSAGES,
  INITIAL_PLATFORM_TENANTS,
  INITIAL_PLATFORM_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface DataContextType {
  currentUser: User;
  updateCurrentUser: (updates: Partial<User>) => void;
  setUserRole: (role: UserRole) => void;
  
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  switchWorkspace: (workspaceId: string) => void;
  createWorkspace: (ws: Omit<Workspace, 'id' | 'membersCount' | 'activeSince'>) => void;
  
  members: WorkspaceMember[];
  inviteMember: (member: Omit<WorkspaceMember, 'id' | 'joinedDate' | 'status'>) => void;
  updateMemberRole: (memberId: string, role: UserRole) => void;
  
  // Living
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  
  settlements: InternalSettlement[];
  recordSettlement: (settlement: Omit<InternalSettlement, 'id' | 'date'>) => void;
  confirmSettlement: (id: string) => void;
  
  tasks: ChoreTask[];
  addTask: (task: Omit<ChoreTask, 'id'>) => void;
  updateTaskStatus: (id: string, status: ChoreTask['status']) => void;
  
  shoppingList: ShoppingItem[];
  addShoppingItem: (item: Omit<ShoppingItem, 'id' | 'addedById' | 'addedByName' | 'purchased'>) => void;
  toggleShoppingItem: (id: string) => void;
  deleteShoppingItem: (id: string) => void;
  
  bills: BillReminder[];
  addBill: (bill: Omit<BillReminder, 'id'>) => void;
  markBillPaid: (id: string) => void;
  
  livingRules: LivingRule[];
  addLivingRule: (rule: Omit<LivingRule, 'id' | 'updatedDate' | 'agreedByCount'>) => void;
  agreeToRule: (ruleId: string) => void;
  
  livingMaintenance: LivingMaintenanceRequest[];
  submitLivingMaintenance: (req: Omit<LivingMaintenanceRequest, 'id' | 'dateSubmitted' | 'status'>) => void;
  
  onboardingItems: RoommateOnboardingItem[];
  addOnboardingItem: (item: Omit<RoommateOnboardingItem, 'id' | 'checklistStatus'>) => void;
  facilities: SharedFacility[];
  
  // Buildings
  buildings: Building[];
  units: Unit[];
  addUnit: (unit: Omit<Unit, 'id'>) => void;
  
  contributions: CommonContribution[];
  recordContributionPaid: (id: string) => void;
  
  tickets: BuildingMaintenanceTicket[];
  addTicket: (tkt: Omit<BuildingMaintenanceTicket, 'id' | 'ticketNumber' | 'createdAt'>) => void;
  updateTicketStatus: (id: string, status: BuildingMaintenanceTicket['status']) => void;
  
  providers: ServiceProvider[];
  documents: BuildingDocument[];
  uploadDocument: (doc: Omit<BuildingDocument, 'id' | 'uploadDate'>) => void;
  
  announcements: Announcement[];
  addAnnouncement: (anc: Omit<Announcement, 'id' | 'date' | 'acknowledgedCount'>) => void;
  acknowledgeAnnouncement: (id: string) => void;
  
  meetings: AssemblyMeeting[];
  castVote: (meetingId: string, agendaItemId: string, vote: 'FOR' | 'AGAINST' | 'ABSTAIN') => void;
  
  calendarEvents: MasterCalendarEvent[];
  
  // Intelligence
  proposedActions: ProposedAction[];
  approveAction: (actionId: string) => void;
  rejectAction: (actionId: string, reason?: string) => void;
  copilotMessages: CopilotMessage[];
  sendCopilotMessage: (text: string) => void;
  
  // Admin & System
  tenants: PlatformTenant[];
  platformUsers: PlatformUser[];
  auditLogs: AuditLogEntry[];
  notifications: SystemNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addAuditLog: (action: string, category: AuditLogEntry['category'], details: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [workspaces, setWorkspaces] = useState<Workspace[]>(INITIAL_WORKSPACES);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>('ws_oakwood');

  const [members, setMembers] = useState<WorkspaceMember[]>(INITIAL_MEMBERS);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [settlements, setSettlements] = useState<InternalSettlement[]>(INITIAL_SETTLEMENTS);
  const [tasks, setTasks] = useState<ChoreTask[]>(INITIAL_TASKS);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(INITIAL_SHOPPING);
  const [bills, setBills] = useState<BillReminder[]>(INITIAL_BILLS);
  const [livingRules, setLivingRules] = useState<LivingRule[]>(INITIAL_LIVING_RULES);
  const [livingMaintenance, setLivingMaintenance] = useState<LivingMaintenanceRequest[]>(INITIAL_LIVING_MAINTENANCE);
  const [onboardingItems, setOnboardingItems] = useState<RoommateOnboardingItem[]>(INITIAL_ONBOARDING_ITEMS);
  const [facilities] = useState<SharedFacility[]>(INITIAL_FACILITIES);

  const [buildings] = useState<Building[]>(INITIAL_BUILDINGS);
  const [units, setUnits] = useState<Unit[]>(INITIAL_UNITS);
  const [contributions, setContributions] = useState<CommonContribution[]>(INITIAL_COMMON_CONTRIBUTIONS);
  const [tickets, setTickets] = useState<BuildingMaintenanceTicket[]>(INITIAL_BUILDING_TICKETS);
  const [providers] = useState<ServiceProvider[]>(INITIAL_PROVIDERS);
  const [documents, setDocuments] = useState<BuildingDocument[]>(INITIAL_DOCUMENTS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [meetings, setMeetings] = useState<AssemblyMeeting[]>(INITIAL_MEETINGS);
  const [calendarEvents] = useState<MasterCalendarEvent[]>(INITIAL_CALENDAR_EVENTS);

  const [proposedActions, setProposedActions] = useState<ProposedAction[]>(INITIAL_PROPOSED_ACTIONS);
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>(INITIAL_COPILOT_MESSAGES);

  const [tenants] = useState<PlatformTenant[]>(INITIAL_PLATFORM_TENANTS);
  const [platformUsers] = useState<PlatformUser[]>(INITIAL_PLATFORM_USERS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  const addAuditLog = (action: string, category: AuditLogEntry['category'], details: string) => {
    const newEntry: AuditLogEntry = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actorName: currentUser.name,
      actorEmail: currentUser.email,
      actorRole: currentUser.role,
      action,
      category,
      details,
      ipAddress: '192.168.1.104',
      status: 'SUCCESS',
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    addAuditLog('USER_PROFILE_UPDATED', 'AUTH', 'Updated user profile attributes and settings.');
  };

  const setUserRole = (role: UserRole) => {
    setCurrentUser((prev) => ({ ...prev, role }));
    addAuditLog('USER_ROLE_SWITCHED', 'ACCESS', `Switched active preview role to ${role}`);
  };

  const switchWorkspace = (workspaceId: string) => {
    const ws = workspaces.find((w) => w.id === workspaceId);
    if (ws) {
      setActiveWorkspaceId(workspaceId);
      setCurrentUser((prev) => ({
        ...prev,
        currentWorkspaceId: workspaceId,
        role: ws.role,
      }));
      addAuditLog('WORKSPACE_SWITCHED', 'ACCESS', `Switched active workspace context to ${ws.name}`);
    }
  };

  const createWorkspace = (wsData: Omit<Workspace, 'id' | 'membersCount' | 'activeSince'>) => {
    const newWs: Workspace = {
      ...wsData,
      id: `ws_${Date.now()}`,
      membersCount: 1,
      activeSince: 'Just now',
    };
    setWorkspaces((prev) => [...prev, newWs]);
    setActiveWorkspaceId(newWs.id);
    addAuditLog('WORKSPACE_CREATED', 'SYSTEM', `Created new workspace "${newWs.name}" of type ${newWs.type}`);
  };

  const inviteMember = (memberData: Omit<WorkspaceMember, 'id' | 'joinedDate' | 'status'>) => {
    const newMember: WorkspaceMember = {
      ...memberData,
      id: `mem_${Date.now()}`,
      joinedDate: 'Invited just now',
      status: 'INVITED',
    };
    setMembers((prev) => [...prev, newMember]);
    addAuditLog('MEMBER_INVITED', 'ACCESS', `Invited ${memberData.name} (${memberData.email}) as ${memberData.role}`);
  };

  const updateMemberRole = (memberId: string, role: UserRole) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role } : m))
    );
    addAuditLog('MEMBER_ROLE_UPDATED', 'ACCESS', `Modified role for member #${memberId} to ${role}`);
  };

  const addExpense = (expData: Omit<Expense, 'id'>) => {
    const newExp: Expense = {
      ...expData,
      id: `exp_${Date.now()}`,
    };
    setExpenses((prev) => [newExp, ...prev]);
    addAuditLog('EXPENSE_RECORDED', 'FINANCIAL_RECORD', `Recorded shared expense "${newExp.title}" for $${newExp.amount.toFixed(2)}`);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    addAuditLog('EXPENSE_DELETED', 'FINANCIAL_RECORD', `Deleted expense record #${id}`);
  };

  const recordSettlement = (settlementData: Omit<InternalSettlement, 'id' | 'date'>) => {
    const newSet: InternalSettlement = {
      ...settlementData,
      id: `set_${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
    };
    setSettlements((prev) => [newSet, ...prev]);
    addAuditLog('SETTLEMENT_RECORDED', 'FINANCIAL_RECORD', `Recorded internal debt settlement of $${newSet.amount.toFixed(2)} from ${newSet.fromMemberName} to ${newSet.toMemberName}`);
  };

  const confirmSettlement = (id: string) => {
    setSettlements((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'CONFIRMED' } : s))
    );
    addAuditLog('SETTLEMENT_CONFIRMED', 'FINANCIAL_RECORD', `Confirmed internal mutual settlement record #${id}`);
  };

  const addTask = (taskData: Omit<ChoreTask, 'id'>) => {
    const newTask: ChoreTask = {
      ...taskData,
      id: `tsk_${Date.now()}`,
    };
    setTasks((prev) => [...prev, newTask]);
    addAuditLog('CHORE_CREATED', 'TASK', `Added chore task "${newTask.title}" assigned to ${newTask.assignedToName}`);
  };

  const updateTaskStatus = (id: string, status: ChoreTask['status']) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              lastCompletedDate: status === 'COMPLETED' ? new Date().toISOString().slice(0, 10) : t.lastCompletedDate,
            }
          : t
      )
    );
    addAuditLog('CHORE_STATUS_UPDATED', 'TASK', `Updated task #${id} status to ${status}`);
  };

  const addShoppingItem = (itemData: Omit<ShoppingItem, 'id' | 'addedById' | 'addedByName' | 'purchased'>) => {
    const newItem: ShoppingItem = {
      ...itemData,
      id: `shp_${Date.now()}`,
      addedById: currentUser.id,
      addedByName: currentUser.name,
      purchased: false,
    };
    setShoppingList((prev) => [...prev, newItem]);
    addAuditLog('SHOPPING_ITEM_ADDED', 'TASK', `Added "${newItem.name}" to shared pantry restocking list`);
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, purchased: !item.purchased } : item))
    );
  };

  const deleteShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((i) => i.id !== id));
  };

  const addBill = (billData: Omit<BillReminder, 'id'>) => {
    const newBill: BillReminder = {
      ...billData,
      id: `bil_${Date.now()}`,
    };
    setBills((prev) => [...prev, newBill]);
    addAuditLog('BILL_REMINDER_ADDED', 'FINANCIAL_RECORD', `Scheduled recurring bill reminder "${newBill.title}" ($${newBill.amount})`);
  };

  const markBillPaid = (id: string) => {
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'PAID' } : b))
    );
    addAuditLog('BILL_MARKED_PAID', 'FINANCIAL_RECORD', `Marked bill #${id} as paid in household ledger`);
  };

  const addLivingRule = (ruleData: Omit<LivingRule, 'id' | 'updatedDate' | 'agreedByCount'>) => {
    const newRule: LivingRule = {
      ...ruleData,
      id: `rul_${Date.now()}`,
      updatedDate: 'Just now',
      agreedByCount: 1,
    };
    setLivingRules((prev) => [...prev, newRule]);
    addAuditLog('COMMUNITY_RULE_CREATED', 'COMMUNITY', `Added new house guideline: "${newRule.title}"`);
  };

  const agreeToRule = (ruleId: string) => {
    setLivingRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, agreedByCount: Math.min(r.totalMembers, r.agreedByCount + 1) } : r))
    );
  };

  const submitLivingMaintenance = (reqData: Omit<LivingMaintenanceRequest, 'id' | 'dateSubmitted' | 'status'>) => {
    const newReq: LivingMaintenanceRequest = {
      ...reqData,
      id: `lm_${Date.now()}`,
      dateSubmitted: new Date().toISOString().slice(0, 10),
      status: 'SUBMITTED',
    };
    setLivingMaintenance((prev) => [newReq, ...prev]);
    addAuditLog('MAINTENANCE_REQUEST_SUBMITTED', 'MAINTENANCE', `Submitted co-living maintenance ticket: "${newReq.title}"`);
  };

  const addOnboardingItem = (itemData: Omit<RoommateOnboardingItem, 'id' | 'checklistStatus'>) => {
    const newItem: RoommateOnboardingItem = {
      ...itemData,
      id: `onb_${Date.now()}`,
      checklistStatus: 'IN_PROGRESS',
    };
    setOnboardingItems((prev) => [newItem, ...prev]);
    addAuditLog('ROOMMATE_ONBOARDED', 'ACCESS', `Initiated onboarding profile for ${newItem.roommateName} (${newItem.roomOrUnit})`);
  };

  const addUnit = (unitData: Omit<Unit, 'id'>) => {
    const newUnit: Unit = {
      ...unitData,
      id: `unt_${Date.now()}`,
    };
    setUnits((prev) => [...prev, newUnit]);
    addAuditLog('BUILDING_UNIT_ADDED', 'SYSTEM', `Configured unit #${newUnit.unitNumber} in building`);
  };

  const recordContributionPaid = (id: string) => {
    setContributions((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: 'RECORDED_PAID', recordedDate: new Date().toISOString().slice(0, 10) }
          : c
      )
    );
    addAuditLog('COMMON_CONTRIBUTION_RECORDED', 'FINANCIAL_RECORD', `Recorded payment for contribution #${id}`);
  };

  const addTicket = (tktData: Omit<BuildingMaintenanceTicket, 'id' | 'ticketNumber' | 'createdAt'>) => {
    const newTkt: BuildingMaintenanceTicket = {
      ...tktData,
      id: `tkt_${Date.now()}`,
      ticketNumber: `TKT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setTickets((prev) => [newTkt, ...prev]);
    addAuditLog('BUILDING_TICKET_CREATED', 'MAINTENANCE', `Created building dispatch ticket ${newTkt.ticketNumber}`);
  };

  const updateTicketStatus = (id: string, status: BuildingMaintenanceTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    addAuditLog('BUILDING_TICKET_UPDATED', 'MAINTENANCE', `Changed ticket #${id} status to ${status}`);
  };

  const uploadDocument = (docData: Omit<BuildingDocument, 'id' | 'uploadDate'>) => {
    const newDoc: BuildingDocument = {
      ...docData,
      id: `doc_${Date.now()}`,
      uploadDate: new Date().toISOString().slice(0, 10),
    };
    setDocuments((prev) => [newDoc, ...prev]);
    addAuditLog('DOCUMENT_UPLOADED', 'SYSTEM', `Stored document "${newDoc.name}" into ${newDoc.category}`);
  };

  const addAnnouncement = (ancData: Omit<Announcement, 'id' | 'date' | 'acknowledgedCount'>) => {
    const newAnc: Announcement = {
      ...ancData,
      id: `anc_${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      acknowledgedCount: 1,
    };
    setAnnouncements((prev) => [newAnc, ...prev]);
    addAuditLog('COMMUNITY_ANNOUNCEMENT_POSTED', 'COMMUNITY', `Published announcement: "${newAnc.title}"`);
  };

  const acknowledgeAnnouncement = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, acknowledgedCount: Math.min(a.totalRecipients, a.acknowledgedCount + 1) } : a
      )
    );
  };

  const castVote = (meetingId: string, agendaItemId: string, vote: 'FOR' | 'AGAINST' | 'ABSTAIN') => {
    setMeetings((prev) =>
      prev.map((m) => {
        if (m.id !== meetingId) return m;
        return {
          ...m,
          agendaItems: m.agendaItems.map((item) => {
            if (item.id !== agendaItemId) return item;
            const prevVote = item.userVote;
            let forCount = item.votesFor || 0;
            let againstCount = item.votesAgainst || 0;
            let abstainCount = item.votesAbstain || 0;

            if (prevVote === 'FOR') forCount--;
            if (prevVote === 'AGAINST') againstCount--;
            if (prevVote === 'ABSTAIN') abstainCount--;

            if (vote === 'FOR') forCount++;
            if (vote === 'AGAINST') againstCount++;
            if (vote === 'ABSTAIN') abstainCount++;

            return {
              ...item,
              userVote: vote,
              votesFor: forCount,
              votesAgainst: againstCount,
              votesAbstain: abstainCount,
            };
          }),
        };
      })
    );
    addAuditLog('ASSEMBLY_BALLOT_CAST', 'COMMUNITY', `Cast ballot "${vote}" for assembly agenda item #${agendaItemId}`);
  };

  // Intelligence 2-Step Approval Workflow:
  // PROPOSED -> APPROVED -> EXECUTED (or REJECTED)
  const approveAction = (actionId: string) => {
    setProposedActions((prev) =>
      prev.map((act) => {
        if (act.id !== actionId) return act;
        return {
          ...act,
          status: 'APPROVED',
          reviewedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
          executedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        };
      })
    );
    addAuditLog('AI_PROPOSAL_APPROVED', 'INTELLIGENCE_APPROVAL', `Explicit 2-step approval given for proposed action #${actionId}`);
  };

  const rejectAction = (actionId: string, reason?: string) => {
    setProposedActions((prev) =>
      prev.map((act) => {
        if (act.id !== actionId) return act;
        return {
          ...act,
          status: 'REJECTED',
          reviewedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
          rejectionReason: reason || 'Declined by human supervisor.',
        };
      })
    );
    addAuditLog('AI_PROPOSAL_REJECTED', 'INTELLIGENCE_APPROVAL', `Rejected AI proposal #${actionId}: ${reason || 'Human veto'}`);
  };

  const sendCopilotMessage = (text: string) => {
    const userMsg: CopilotMessage = {
      id: `msg_${Date.now()}`,
      sender: 'USER',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Simulated responsive copilot reply with suggested actions
    const botReplyText = text.toLowerCase().includes('chore')
      ? 'I analyzed the chore completion logs. Elena and Sarah completed their tasks this week, while Marcus is up next for the recycling wheelie bins. Would you like me to draft a reminder?'
      : text.toLowerCase().includes('expense') || text.toLowerCase().includes('split')
      ? 'I can inspect your uploaded receipts and calculate equal or percentage splits. Remember that all financial adjustments require your explicit 2-step approval before ledger recording.'
      : text.toLowerCase().includes('maintenance') || text.toLowerCase().includes('elevator')
      ? 'I am monitoring all ongoing building maintenance tickets. Ticket TKT-2026-089 is dispatched with Schindler & Otis Techs.'
      : `Acknowledged: "${text}". As your Nestora Intelligence copilot, I keep all actions in a transparent human-in-the-loop state. You retain full supervisor control.`;

    const botMsg: CopilotMessage = {
      id: `msg_${Date.now() + 1}`,
      sender: 'COPILOT',
      text: botReplyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setCopilotMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DataContext.Provider
      value={{
        currentUser,
        updateCurrentUser,
        setUserRole,
        workspaces,
        activeWorkspace,
        switchWorkspace,
        createWorkspace,
        members,
        inviteMember,
        updateMemberRole,
        expenses,
        addExpense,
        deleteExpense,
        settlements,
        recordSettlement,
        confirmSettlement,
        tasks,
        addTask,
        updateTaskStatus,
        shoppingList,
        addShoppingItem,
        toggleShoppingItem,
        deleteShoppingItem,
        bills,
        addBill,
        markBillPaid,
        livingRules,
        addLivingRule,
        agreeToRule,
        livingMaintenance,
        submitLivingMaintenance,
        onboardingItems,
        addOnboardingItem,
        facilities,
        buildings,
        units,
        addUnit,
        contributions,
        recordContributionPaid,
        tickets,
        addTicket,
        updateTicketStatus,
        providers,
        documents,
        uploadDocument,
        announcements,
        addAnnouncement,
        acknowledgeAnnouncement,
        meetings,
        castVote,
        calendarEvents,
        proposedActions,
        approveAction,
        rejectAction,
        copilotMessages,
        sendCopilotMessage,
        tenants,
        platformUsers,
        auditLogs,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        addAuditLog,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
