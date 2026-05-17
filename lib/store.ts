import { create } from 'zustand';

export type Status = 'active' | 'idle' | 'stale' | 'completed' | 'rejected' | 'pending';
export type Confidence = 'high' | 'medium' | 'low';

export interface Project {
  id: string;
  name: string;
  code: string;
  status: string;
  color: string;
  currentFocus: string;
  architecture: string;
  lastUpdated: string;
}

export interface Branch {
  id: string;
  projectId: string;
  name: string;
  status: Status;
  summary: string;
  originSessionId: string;
  confidence: number;
  isMergeReady: boolean;
}

export interface Session {
  id: string;
  projectId: string;
  title: string;
  date: string;
  tool: string;
  toolDetails: string;
  stance: string;
  summary: string;
  insights: string[];
  conflicts: string[];
  nextActions: string[];
  branchId: string;
}

export interface DecisionNode {
  id: string;
  projectId: string;
  title: string;
  status: 'accepted' | 'rejected' | 'pending';
  confidence: Confidence;
  rationale: string;
  alternatives: string[];
  affectedSystems: string[];
  lastUpdated: string;
}

export interface Problem {
  id: string;
  projectId: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  type: string;
  description: string;
}

interface WorkspaceState {
  projects: Project[];
  branches: Branch[];
  sessions: Session[];
  decisions: DecisionNode[];
  problems: Problem[];
  activeProjectId: string | null;
  activeBranchId: string | null;
  
  setActiveProject: (id: string) => void;
  setActiveBranch: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  projects: [
    {
      id: 'proj-01',
      name: 'LPG Delivery System',
      code: 'PROJ-01',
      status: 'Active',
      color: 'bg-emerald-500',
      currentFocus: 'Inventory Reconciliation API',
      architecture: 'Hexagonal / Event-Driven',
      lastUpdated: '4 mins ago',
    },
    {
      id: 'proj-02',
      name: 'Reconciliation Engine',
      code: 'PROJ-02',
      status: 'Paused',
      color: 'bg-indigo-500',
      currentFocus: 'Transaction Hashing',
      architecture: 'Disturbed Ledger',
      lastUpdated: '2 hours ago',
    },
    {
      id: 'proj-03',
      name: 'Media7',
      code: 'PROJ-03',
      status: 'Maintenance',
      color: 'bg-slate-600',
      currentFocus: 'Legacy Migration',
      architecture: 'Monolithic / Strangler Pattern',
      lastUpdated: '1 day ago',
    },
  ],
  branches: [
    {
      id: 'branch-01',
      projectId: 'proj-01',
      name: 'vat-healing-experiment',
      status: 'active',
      summary: 'Exploring automated VAT reconciliation via healing loops. Confidence high on core engine.',
      originSessionId: 'sess-01',
      confidence: 78,
      isMergeReady: false,
    },
    {
      id: 'branch-02',
      projectId: 'proj-01',
      name: 'orders-refactor-v2',
      status: 'idle',
      summary: 'Structural changes to order pipeline. Blocked by ledger API inconsistency.',
      originSessionId: 'sess-02',
      confidence: 45,
      isMergeReady: false,
    },
    {
      id: 'branch-03',
      projectId: 'proj-01',
      name: 'allocation-ui-v1',
      status: 'stale',
      summary: 'Deprecated approach for dynamic allocation rendering.',
      originSessionId: 'sess-01',
      confidence: 12,
      isMergeReady: false,
    },
  ],
  sessions: [
    {
      id: 'sess-01',
      projectId: 'proj-01',
      branchId: 'branch-01',
      title: 'Claude Code Debugging',
      date: '10 mins ago',
      tool: 'CL',
      toolDetails: 'Claude Code • 142 tools used',
      stance: 'Corrective',
      summary: 'Identified race condition in VAT calculation engine during high-concurrency partial drops.',
      insights: [
        'Mutation lock required on sub-ledger entries',
        'State machine transition missing for "Partially Healed"'
      ],
      conflicts: [
        'Overlaps with orders-refactor-v2 ledger schema changes'
      ],
      nextActions: [
        'Apply mutex to ReconciliationService.java',
        'Merge healing-loop-v0.4'
      ]
    },
    {
      id: 'sess-02',
      projectId: 'proj-01',
      branchId: 'branch-02',
      title: 'GPT-4 Architecture Audit',
      date: '2 hours ago',
      tool: 'G4',
      toolDetails: 'GPT-4o • Structural Analysis',
      stance: 'Advisory',
      summary: 'Audit of the proposed micro-ledger strategy for distributed LPG canisters tracking.',
      insights: [
        'Strong isolation but increases latency on bulk reconciliation',
        'Query pattern needs optimization for hot-path'
      ],
      conflicts: [],
      nextActions: [
        'Benchmark ledger read speeds',
        'Implement caching layer'
      ]
    }
  ],
  decisions: [
    {
      id: 'dec-01',
      projectId: 'proj-01',
      title: 'Movement Ledger Strategy',
      status: 'accepted',
      confidence: 'high',
      rationale: 'Preferred transactional integrity over sheer throughput given financial nature of the logs.',
      alternatives: ['Event Sourcing (Only)', 'Direct Columnar Storage'],
      affectedSystems: ['Ledger API', 'Inventory Service'],
      lastUpdated: '12 hours ago'
    },
    {
      id: 'dec-02',
      projectId: 'proj-01',
      title: 'Auth Pattern (JWT vs Session)',
      status: 'rejected',
      confidence: 'medium',
      rationale: 'JWT statelessness caused too many revoked-session edge cases in long-running AI agents.',
      alternatives: ['OAuth2 Redirects', 'Standard Session Cookies'],
      affectedSystems: ['Identity Service'],
      lastUpdated: '2 days ago'
    }
  ],
  problems: [
    {
      id: 'prob-01',
      projectId: 'proj-01',
      title: 'Circular dependency in Movement Ledger API',
      severity: 'high',
      type: 'Architecture Gap',
      description: 'Occurs during partial reconciliation when both source and target canisters are in same subnet.'
    },
    {
      id: 'prob-02',
      projectId: 'proj-01',
      title: 'Tax calculation lacks EU coverage',
      severity: 'medium',
      type: 'Validation Risk',
      description: 'EU intra-community VAT edge cases are missing specific calculation triggers.'
    },
    {
      id: 'prob-03',
      projectId: 'proj-01',
      title: 'Latency in bulk allocation updates',
      severity: 'low',
      type: 'UX Constraint',
      description: 'Slow real-time updates when batch size exceeds 10k units.'
    }
  ],
  activeProjectId: 'proj-01',
  activeBranchId: 'branch-01',
  
  setActiveProject: (id) => set({ activeProjectId: id }),
  setActiveBranch: (id) => set({ activeBranchId: id }),
}));
