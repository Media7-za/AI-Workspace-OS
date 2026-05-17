'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/app-shell';
import { useWorkspaceStore } from '@/lib/store';
import { Card } from '@/components/ui-card';
import { 
  FileDown, 
  Copy, 
  Check, 
  Code, 
  Package, 
  ShieldCheck,
  Binary,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ExportScreen() {
  const { projects, activeProjectId, branches, activeBranchId, decisions, problems } = useWorkspaceStore();
  const project = projects.find(p => p.id === activeProjectId) || projects[0];
  const branch = branches.find(b => b.id === activeBranchId);
  const [copied, setCopied] = useState(false);

  const markdownString = `# AI CONTEXT PACKET - ${project.code}
## DATE: 2024-05-17 | STATUS: OPERATIONAL

### CURRENT STATE SUMMARY
Architecture: ${project.architecture}
Current Focus: ${project.currentFocus}
Active Branch: ${branch?.name || 'main'}

### ACTIVE REASONING BRANCHES
${branches.map(b => `- ${b.name} (${b.status}): ${b.summary}`).join('\n')}

### ARCHITECTURAL DECISIONS (ACCEPTED)
${decisions.filter(d => d.status === 'accepted').map(d => `- ${d.title}: ${d.rationale}`).join('\n')}

### OPEN PROBLEMS & BLOCKERS
${problems.map(p => `- [${p.severity.toUpperCase()}] ${p.title}: ${p.description}`).join('\n')}

### NEXT ACTIONS
- Benchmark ledger read speeds
- Apply mutex to ReconciliationService.java
- Resolve circular dependency in Movement Ledger API
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Package className="w-8 h-8 text-indigo-500" />
              Context Export
            </h1>
            <p className="text-slate-400 mt-1">Generate optimized, high-density context packets for AI handovers.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-md text-sm font-medium transition-colors border border-white/10 flex items-center gap-2">
              <Binary className="w-4 h-4" />
              Token Optimize
            </button>
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Packet'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Optimization Indicators */}
          <div className="col-span-12 grid grid-cols-4 gap-4">
            <div className="bg-[#0c0c0e] border border-white/5 p-4 rounded-lg flex items-center gap-4">
              <div className="p-2 bg-indigo-500/10 rounded-md">
                <Maximize2 className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Density</p>
                <p className="text-lg font-bold text-white">92%</p>
              </div>
            </div>
            <div className="bg-[#0c0c0e] border border-white/5 p-4 rounded-lg flex items-center gap-4">
              <div className="p-2 bg-emerald-500/10 rounded-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Integrity</p>
                <p className="text-lg font-bold text-white">Verified</p>
              </div>
            </div>
            <div className="bg-[#0c0c0e] border border-white/5 p-4 rounded-lg flex items-center gap-4">
              <div className="p-2 bg-amber-500/10 rounded-md">
                <Code className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Token Count</p>
                <p className="text-lg font-bold text-white">4,821</p>
              </div>
            </div>
            <div className="bg-[#0c0c0e] border border-white/5 p-4 rounded-lg flex items-center gap-4">
              <div className="p-2 bg-indigo-500/10 rounded-md text-sm font-bold text-white">
                v2
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Serializer</p>
                <p className="text-lg font-bold text-white">MD-v2.1</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <Card title="Markdown Preview" className="h-[600px] flex flex-col">
              <div className="flex-1 bg-[#09090b] rounded-md border border-white/5 p-6 font-mono text-[11px] text-slate-400 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                {markdownString}
              </div>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card title="Packet Content">
              <div className="space-y-4">
                {[
                  { label: 'System Invariants', status: 'Included', active: true },
                  { label: 'Project File Tree', status: 'Included', active: true },
                  { label: 'Decision History', status: 'Diff Only', active: true },
                  { label: 'Open Problem Logs', status: 'Included', active: true },
                  { label: 'Full Chat History', status: 'Excluded', active: false },
                  { label: 'Environment Config', status: 'Included', active: true },
                  { label: 'Package Manifest', status: 'Diff Only', active: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className={cn("text-xs", item.active ? "text-slate-300" : "text-slate-600")}>{item.label}</span>
                    <span className={cn(
                      "text-[9px] font-bold uppercase",
                      item.status === 'Included' ? "text-emerald-500" : 
                      item.status === 'Diff Only' ? "text-indigo-400" : "text-slate-600"
                    )}>{item.status}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Compression Logic">
              <div className="space-y-4">
                <p className="text-xs text-slate-500 italic">
                  Currently using &quot;Semantic Distillation&quot; to remove conversational fluff while preserving decision rationale and system state.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                    <span>Raw Data</span>
                    <span>142KB</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-700" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-indigo-400 uppercase">
                    <span>Distilled Packet</span>
                    <span>18KB</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: '15%' }}></div>
                  </div>
                </div>
                <p className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 p-2 rounded text-center">
                  ~87% REDUCTION IN CONTEXT PRESSURE
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
