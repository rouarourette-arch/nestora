/**
 * Nestora Platform Core Types & Domain Models
 */

export type UserRole =
  | 'PLATFORM_ADMIN'
  | 'WORKSPACE_OWNER'
  | 'WORKSPACE_MANAGER'
  | 'RESIDENT'
  | 'ROOMMATE'
  | 'PROVIDER';

export type WorkspaceType = 'LIVING' | 'BUILDING';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  phone?: string;
  role: UserRole;
  currentWorkspaceId: string;
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
  notificationPreferences: {
    email: boolean;
    push: boolean;
    billsReminders: boolean;
    maintenanceAlerts: boolean;
    communityAnnouncements: boolean;
  };
}

export interface Workspace {
  id: string;
  name: string;
  type: WorkspaceType;
  role: UserRole;
  address: string;
  unitsCount?: number;
  membersCount: number;
  avatar: string;
  plan: 'Community Free' | 'Pro Resident' | 'Enterprise Property';
  activeSince: string;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  unitOrRoom: string;
  joinedDate: string;
  status: 'ACTIVE' | 'INVITED' | 'PAUSED';
  phone?: string;
}

// =================== NESTORA LIVING ===================

export interface Expense {
  id: string;
  title: string;
  category: 'Groceries' | 'Utilities' | 'Rent' | 'Supplies' | 'Maintenance' | 'Entertainment' | 'Other';
  amount: number;
  paidById: string;
  paidByName: string;
  date: string;
  splitType: 'EQUAL' | 'PERCENTAGE' | 'EXACT';
  splitWith: {
    memberId: string;
    memberName: string;
    shareAmount: number;
    settled: boolean;
  }[];
  receiptUrl?: string;
  notes?: string;
}

export interface InternalSettlement {
  id: string;
  fromMemberId: string;
  fromMemberName: string;
  toMemberId: string;
  toMemberName: string;
  amount: number;
  note: string;
  date: string;
  status: 'RECORDED' | 'CONFIRMED' | 'PENDING';
}

export interface ChoreTask {
  id: string;
  title: string;
  description: string;
  area: 'Kitchen' | 'Bathroom' | 'Living Room' | 'Trash & Recycling' | 'Yard / Balcony';
  frequency: 'Daily' | 'Weekly' | 'Bi-weekly' | 'Monthly';
  assignedToId: string;
  assignedToName: string;
  assignedAvatar: string;
  dueDate: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  lastCompletedDate?: string;
  points: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: 'Pantry' | 'Cleaning' | 'Produce' | 'Household' | 'Beverages';
  quantity: string;
  addedById: string;
  addedByName: string;
  urgent: boolean;
  purchased: boolean;
  estimatedCost?: number;
  assignedToId?: string;
  assignedToName?: string;
}

export interface BillReminder {
  id: string;
  title: string;
  provider: string;
  amount: number;
  dueDate: string;
  frequency: 'Monthly' | 'Quarterly' | 'Annual' | 'One-Time';
  category: 'Electricity' | 'Water' | 'Internet' | 'Gas' | 'Insurance' | 'Waste';
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  autoRemindDays: number;
}

export interface LivingRule {
  id: string;
  category: 'Noise & Quiet Hours' | 'Guest Policy' | 'Shared Spaces' | 'Pets' | 'Cleaning Standards';
  title: string;
  description: string;
  updatedDate: string;
  agreedByCount: number;
  totalMembers: number;
}

export interface LivingMaintenanceRequest {
  id: string;
  title: string;
  category: 'Plumbing' | 'Electrical' | 'Appliance' | 'Structural' | 'HVAC';
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  requestedByName: string;
  room: string;
  status: 'SUBMITTED' | 'LANDLORD_NOTIFIED' | 'DISPATCHED' | 'RESOLVED';
  dateSubmitted: string;
  description: string;
  images?: string[];
}

export interface RoommateOnboardingItem {
  id: string;
  roommateName: string;
  email: string;
  roomOrUnit: string;
  moveInDate: string;
  checklistStatus: 'IN_PROGRESS' | 'COMPLETED' | 'PENDING';
  assignedKeys: string;
  welcomeGuideAcknowledged: boolean;
  notes?: string;
}

export interface SharedFacility {
  id: string;
  name: string;
  location: string;
  hours: string;
  status: string;
  guidelines: string;
  equipment: string;
}

// =================== NESTORA BUILDINGS ===================

export interface Building {
  id: string;
  name: string;
  address: string;
  unitsCount: number;
  occupancyRate: number;
  managerName: string;
  yearBuilt: number;
  floors: number;
  image: string;
}

export interface Unit {
  id: string;
  buildingId: string;
  unitNumber: string;
  floor: number;
  type: 'Studio' | '1BR' | '2BR' | '3BR' | 'Penthouse' | 'Commercial';
  areaSqFt: number;
  ownershipSharePercentage: number;
  residentName: string;
  ownerName: string;
  status: 'OCCUPIED' | 'VACANT' | 'MAINTENANCE';
  currentMonthlyDues: number;
}

export interface CommonContribution {
  id: string;
  unitNumber: string;
  ownerName: string;
  period: string; // e.g., "Nov 2026"
  baseDues: number;
  reserveFundContribution: number;
  specialAssessments: number;
  totalDue: number;
  status: 'RECORDED_PAID' | 'PENDING' | 'OVERDUE';
  recordedDate?: string;
}

export interface BuildingMaintenanceTicket {
  id: string;
  ticketNumber: string;
  title: string;
  buildingName: string;
  location: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'NEW' | 'TRIAGED' | 'DISPATCHED' | 'IN_PROGRESS' | 'COMPLETED';
  assignedProviderId?: string;
  assignedProviderName?: string;
  createdAt: string;
  estimatedCost: number;
  description: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: 'HVAC & Heating' | 'Plumbing & Pipes' | 'Electrical' | 'Elevator Maintenance' | 'Roofing' | 'Landscaping' | 'Fire Safety' | 'Cleaning & Sanitization';
  contactPerson: string;
  phone: string;
  email: string;
  rating: number;
  activeContracts: number;
  complianceVerified: boolean;
  hourlyRate: number;
  status: 'AVAILABLE' | 'ON_CALL' | 'ENGAGED';
}

export interface BuildingDocument {
  id: string;
  name: string;
  category: 'HOA Bylaws' | 'Assembly Minutes' | 'Insurance Policies' | 'Audit & Balance Sheets' | 'Service Contracts' | 'Safety Inspections';
  uploadDate: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX';
  uploadedBy: string;
  accessLevel: 'ALL_RESIDENTS' | 'OWNERS_ONLY' | 'BOARD_ONLY';
}

export interface Announcement {
  id: string;
  title: string;
  category: 'General Notice' | 'Maintenance Window' | 'Community Event' | 'Urgent Alert' | 'Policy Update';
  author: string;
  authorRole: string;
  date: string;
  content: string;
  pinned: boolean;
  acknowledgedCount: number;
  totalRecipients: number;
}

export interface AssemblyMeeting {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'Annual General Assembly' | 'Extraordinary Meeting' | 'Board Session' | 'Budget Review';
  status: 'SCHEDULED' | 'VOTING_OPEN' | 'CONCLUDED';
  quorumAchieved: boolean;
  quorumPercentage: number;
  agendaItems: {
    id: string;
    topic: string;
    requiresVote: boolean;
    votesFor?: number;
    votesAgainst?: number;
    votesAbstain?: number;
    userVote?: 'FOR' | 'AGAINST' | 'ABSTAIN';
  }[];
}

export interface MasterCalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'MAINTENANCE' | 'MEETING' | 'COMMUNITY' | 'INSPECTION' | 'QUIET_HOURS';
  location: string;
  organizer: string;
}

// =================== INTELLIGENCE ===================

export type ActionStatus = 'PROPOSED' | 'APPROVED' | 'REJECTED' | 'EXECUTED' | 'FAILED';

export interface ProposedAction {
  id: string;
  title: string;
  category: 'Expense Split' | 'Chore Reassignment' | 'Maintenance Escalation' | 'Meeting Notice' | 'Vendor Inquiry';
  description: string;
  impactSummary: string;
  proposedAt: string;
  status: ActionStatus;
  reviewedAt?: string;
  executedAt?: string;
  rejectionReason?: string;
  payloadPreview: Record<string, any>;
}

export interface CopilotMessage {
  id: string;
  sender: 'USER' | 'COPILOT';
  text: string;
  timestamp: string;
  proposedAction?: ProposedAction;
}

// =================== PLATFORM ADMIN & AUDIT ===================

export interface PlatformTenant {
  id: string;
  name: string;
  subdomain: string;
  type: WorkspaceType;
  ownerEmail: string;
  activeUnitsOrRooms: number;
  monthlyRevenueEstimate: number;
  healthScore: number;
  status: 'HEALTHY' | 'WARNING' | 'SUSPENDED';
  createdDate: string;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantsCount: number;
  mfaEnabled: boolean;
  lastLogin: string;
  status: 'ACTIVE' | 'LOCKED' | 'PENDING_VERIFICATION';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorEmail: string;
  actorRole: UserRole;
  action: string;
  category: 'AUTH' | 'FINANCIAL_RECORD' | 'MAINTENANCE' | 'ACCESS' | 'INTELLIGENCE_APPROVAL' | 'SYSTEM' | 'TASK' | 'COMMUNITY';
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  category: 'MAINTENANCE' | 'FINANCIAL' | 'TASK' | 'COMMUNITY' | 'INTELLIGENCE';
  timestamp: string;
  read: boolean;
  linkUrl?: string;
}
