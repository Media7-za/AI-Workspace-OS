'use client';

import React, { use } from 'react';
import { AppShell } from '@/components/app-shell';
import { useWorkspaceStore } from '@/lib/store';
import { Card } from '@/components/ui-card';
import { 
  ChevronLeft, 
  Database, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Zap,
  ShieldCheck,
  History,
  Scale
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DecisionNodeDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { decisions, projects } = useWorkspaceStore();
  const decision = decisions.find(d => d.id === resolvedParams.id) || decisions[0];
  const project = projects.find(p => p.id === decision.projectId);

  return (
    <AppShell>
      <div className="p-8 space-y-8 max-w-5xl mx-auto">
        <Link href={project ? `/projects/${project.id}` : '/'} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group mb-4">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest text-[10px]">Back to Workspace</span>
        </Link>

        <div className="flex justify-between items-start border-b border-white/5 pb-8">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider",
                decision.status === 'accepted' ? "bg-emerald-500/20 text-emerald-500" : 
                decision.status === 'rejected' ? "bg-red-500/20 text-red-500" : "bg-amber-500/20 text-amber-500"
              )}>
                {decision.status.toUpperCase()}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Last Modified: {decision.lastUpdated}</span>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">{decision.title}</h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">{decision.rationale}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-[#0c0c0e] border border-white/5 p-4 rounded-lg flex flex-col items-center justify-center min-w-[140px]">
              <span className="text-[10px] text-slate-500 uppercase font-bold mb-1">Confidence</span>
              <span className={cn(
                "text-xl font-bold",
                decision.confidence === 'high' ? "text-emerald-400" : 
                decision.confidence === 'medium' ? "text-amber-400" : "text-red-400"
              )}>{decision.confidence.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-8">
            <Card title="Architecture Implication">
              <div className="p-6 bg-indigo-500/5 rounded-xl border border-indigo-500/10 flex gap-6">
                <div className="w-12 h-12 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-sm">System Compliance Verified</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This decision confirms adherence to the <span className="text-white">Hexagonal Architecture</span> principles. 
                    Domain logic for the Movement Ledger is strictly isolated from the columnar storage implementation.
                  </p>
                </div>
              </div>
            </Card>

            <Card title="Rejected Alternatives">
              <div className="space-y-4">
                {decision.alternatives.map((alt, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all group">
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 shrink-0 mt-0.5 group-hover:bg-red-900 group-hover:text-red-400 transition-colors">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-400 font-medium group-hover:text-slate-200 uppercase tracking-tight">{alt}</p>
                      <p className="text-[10px] text-slate-600 line-clamp-1 italic">Discarded due to scalability constraints and operational overhead.</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Downstream Impact">
              <div className="grid grid-cols-2 gap-4">
                {decision.affectedSystems.map((system, i) => (
                  <div key={i} className="p-4 bg-[#0c0c0e] border border-white/5 rounded-md flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
                    <span className="text-xs text-white font-mono">{system}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="col-span-4 space-y-6">
            <Card title="Decision History">
              <div className="space-y-4 relative">
                <div className="absolute left-2.5 top-2.5 bottom-2.5 w-px bg-white/5"></div>
                {[
                  { event: 'Initial Proposal', date: '3 days ago', status: 'Draft' },
                  { event: 'AI Peer Review (GPT-4)', date: '2 days ago', status: 'Challenged' },
                  { event: 'Refinement Session', date: '1 day ago', status: 'Updated' },
                  { event: 'Final Consensus', date: '12 hours ago', status: 'Accepted' },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center gap-6 ml-1">
                    <div className={cn(
                      "w-3 h-3 rounded-full border-2 bg-[#0c0c0e] relative z-10",
                      i === 3 ? "border-emerald-500 bg-emerald-500" : "border-slate-700"
                    )}></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white uppercase tracking-tight leading-none">{item.event}</span>
                      <span className="text-[9px] text-slate-500">{item.date} • {item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Related Sessions">
              <div className="space-y-3">
                <div className="p-3 bg-white/5 border border-white/5 rounded hover:border-indigo-500/30 transition-all cursor-pointer flex items-center gap-3">
                  <History className="w-4 h-4 text-slate-500" />
                  <span className="text-[10px] text-slate-400 font-medium">GPT-4 Architecture Audit</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded hover:border-indigo-500/30 transition-all cursor-pointer flex items-center gap-3">
                  <Scale className="w-4 h-4 text-slate-500" />
                  <span className="text-[10px] text-slate-400 font-medium">Consensus Evaluation S-09</span>
                </div>
              </div>
            </Card>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Pending Challenge</span>
              </div>
              <p className="text-[10px] text-amber-500/70 leading-relaxed italic">
                A recent session in &quot;orders-refactor-v2&quot; has suggested a potential bypass to this strategy. Review may be required.
              </p>
              <button className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold rounded uppercase tracking-widest transition-colors">
                Open Review Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
