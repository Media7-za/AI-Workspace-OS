'use client';

import React, { use } from 'react';
import { AppShell } from '@/components/app-shell';
import { useWorkspaceStore } from '@/lib/store';
import { Card } from '@/components/ui-card';
import { 
  Plus, 
  GitBranch, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Code2,
  ChevronRight,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ProjectWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { projects, sessions, branches, decisions, problems, activeProjectId } = useWorkspaceStore();
  const project = projects.find(p => p.id === resolvedParams.id) || projects[0];
  
  const projectBranches = branches.filter(b => b.projectId === project.id);
  const projectSessions = sessions.filter(s => s.projectId === project.id);
  const projectDecisions = decisions.filter(d => d.projectId === project.id);
  const projectProblems = problems.filter(p => p.projectId === project.id);

  return (
    <AppShell>
      <div className="p-6 grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        {/* Current State Panel (Pinned at top) */}
        <div className="col-span-12 bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col gap-4 shadow-xl mb-2 backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Current System State</h2>
              <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide", project.color.replace('bg-', 'bg-opacity-20 text-'))}>
                {project.status}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Last consistency check: {project.lastUpdated}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Current Focus</div>
              <div className="text-sm font-medium text-white flex items-center gap-2">
                <Target className="w-3 h-3 text-indigo-400" />
                {project.currentFocus}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Active Architecture</div>
              <div className="text-sm font-medium text-white flex items-center gap-2">
                <Code2 className="w-3 h-3 text-emerald-400" />
                {project.architecture}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Branch Integrity</div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '78%' }}></div>
                </div>
                <span className="text-xs font-mono text-emerald-400">78%</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Unresolved Blockers</div>
              <div className="text-sm font-medium text-red-400 flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                {projectProblems.filter(p => p.severity === 'high').length} Architecture Conflicts
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Reasoning Branches */}
          <Card 
            title="Reasoning Branches" 
            headerAction={
              <button className="text-[10px] bg-indigo-600 px-2 py-1 rounded hover:bg-indigo-500 text-white font-bold transition-colors flex items-center gap-1.5">
                <Plus className="w-3 h-3" />
                New Branch
              </button>
            }
          >
            <div className="space-y-6 relative mt-2">
              <div className="absolute left-4 top-4 bottom-4 w-px bg-white/5"></div>
              {projectBranches.map((branch, idx) => (
                <div key={branch.id} className={cn(
                  "relative flex items-center gap-6 group transition-all",
                  branch.status === 'stale' ? "opacity-50" : "opacity-100"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full border-2 z-10 flex items-center justify-center bg-[#0c0c0e] transition-colors",
                    branch.status === 'active' ? "border-emerald-500 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" : 
                    branch.status === 'idle' ? "border-slate-700 text-slate-500" : "border-red-900 text-red-950"
                  )}>
                    <GitBranch className="w-4 h-4" />
                  </div>
                  
                  <div className={cn(
                    "flex-1 border p-4 rounded-lg transition-all",
                    branch.status === 'active' ? "border-emerald-500/30 bg-emerald-500/[0.03]" : "border-white/10 bg-white/[0.02]"
                  )}>
                    <div className="flex justify-between mb-2">
                      <span className={cn(
                        "text-xs font-mono font-bold",
                        branch.status === 'active' ? "text-emerald-400 underline underline-offset-4" : "text-slate-500"
                      )}>branch/{branch.name}</span>
                      <div className="flex items-center gap-2">
                        {branch.isMergeReady && (
                          <span className="text-[8px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold">READY TO MERGE</span>
                        )}
                        <span className={cn(
                          "text-[10px] px-1.5 rounded font-bold uppercase",
                          branch.status === 'active' ? "bg-emerald-500/20 text-emerald-400" : 
                          branch.status === 'idle' ? "bg-slate-500/20 text-slate-500" : "bg-red-500/20 text-red-500"
                        )}>{branch.status}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{branch.summary}</p>
                    <div className="mt-4 flex items-center justify-between text-[10px]">
                      <div className="flex gap-4 text-slate-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated 2h ago</span>
                        <span className="flex items-center gap-1 font-mono tracking-tighter">Confidence: {branch.confidence}%</span>
                      </div>
                      <button className="text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider flex items-center">
                        Explore <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Decision Nodes Area */}
          <div className="grid grid-cols-2 gap-6">
            <Card title="Decision Nodes">
              <div className="space-y-2">
                {projectDecisions.map(decision => (
                  <div key={decision.id} className="text-xs flex justify-between p-3 bg-white/5 rounded-md border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                    <span className="text-slate-300 group-hover:text-white">{decision.title}</span>
                    <span className={cn(
                      "font-bold",
                      decision.status === 'accepted' ? "text-emerald-400" : decision.status === 'rejected' ? "text-red-500" : "text-amber-500"
                    )}>
                      {decision.status === 'accepted' ? '✓' : decision.status === 'rejected' ? 'REJ' : 'PEND'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Recent Sessions">
              <div className="space-y-4">
                {projectSessions.map(session => (
                    <div key={session.id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-md transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono text-xs group-hover:bg-indigo-500 group-hover:text-white transition-all">
                        {session.tool}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-bold text-white truncate">{session.title}</span>
                        <span className="text-[9px] text-slate-500 truncate">{session.date} • {session.toolDetails}</span>
                      </div>
                    </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Problems & Risks Sidebar */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <Card 
            title="Open Problems & Risks"
            className="flex-1"
          >
            <div className="space-y-4">
              {projectProblems.map(problem => (
                <div key={problem.id} className={cn(
                  "p-4 rounded-lg border space-y-3 transition-all cursor-pointer hover:translate-x-1",
                  problem.severity === 'high' ? "bg-red-500/[0.03] border-red-500/20" : 
                  problem.severity === 'medium' ? "bg-amber-500/[0.03] border-amber-500/20" : "bg-white/[0.02] border-white/10"
                )}>
                  <div className="flex justify-between items-center">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      problem.severity === 'high' ? "text-red-400" : 
                      problem.severity === 'medium' ? "text-amber-400" : "text-slate-400"
                    )}>{problem.type}</span>
                    <span className={cn(
                      "text-[8px] px-1.5 py-0.5 font-black rounded uppercase",
                      problem.severity === 'high' ? "bg-red-500 text-white" : 
                      problem.severity === 'medium' ? "bg-amber-500 text-black" : "bg-slate-500 text-white"
                    )}>{problem.severity}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-200 leading-tight">{problem.title}</div>
                  <p className="text-[10px] text-slate-500 leading-normal">{problem.description}</p>
                  <div className="text-[9px] text-slate-600 font-mono flex justify-between items-center uppercase tracking-widest pt-2 border-t border-white/5">
                    ID: ERR-402-CIRC
                    <span className="text-indigo-400 font-bold">Investigate</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="p-4 bg-indigo-600/10 border-t border-white/10 rounded-lg">
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded shadow-lg transition-all active:scale-[0.98]">
              Prepare AI Context Export
            </button>
            <p className="text-[10px] text-slate-500 text-center mt-3 font-medium uppercase tracking-tighter italic">
              &quot;Ensuring operational continuity&quot;
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
