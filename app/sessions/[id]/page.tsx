'use client';

import React, { use } from 'react';
import { AppShell } from '@/components/app-shell';
import { useWorkspaceStore } from '@/lib/store';
import { Card } from '@/components/ui-card';
import { 
  ChevronLeft, 
  History, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Terminal,
  MessageSquare,
  Code2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SessionDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { sessions, projects } = useWorkspaceStore();
  const session = sessions.find(s => s.id === resolvedParams.id) || sessions[0];
  const project = projects.find(p => p.id === session.projectId);

  return (
    <AppShell>
      <div className="p-8 space-y-8 max-w-5xl mx-auto">
        <Link href={`/projects/${session.projectId}`} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group mb-4">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest text-[10px]">Back to Workspace</span>
        </Link>

        <div className="flex justify-between items-start border-b border-white/5 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{session.toolDetails}</span>
              <span className="text-[10px] text-slate-500 font-mono">{session.date}</span>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">{session.title}</h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">{session.summary}</p>
          </div>
          <div className="bg-[#0c0c0e] border border-white/5 p-4 rounded-lg flex flex-col items-center justify-center min-w-[120px]">
            <span className="text-[10px] text-slate-500 uppercase font-bold mb-1">Stance</span>
            <span className="text-xl font-bold text-indigo-400">{session.stance}</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-8">
            <Card title="Key Insights">
              <div className="space-y-4">
                {session.insights.map((insight, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Conflicts & Divergence">
              {session.conflicts.length > 0 ? (
                <div className="space-y-4">
                  {session.conflicts.map((conflict, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-red-500/5 rounded-lg border border-red-500/10">
                      <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 mt-0.5">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <p className="text-sm text-red-100/80 leading-relaxed font-medium">{conflict}</p>
                    </div>
                  ))}
                  <Link href="/merge" className="block p-3 text-center bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 text-xs font-bold rounded uppercase hover:bg-indigo-600/20 transition-all">
                    Initiate Semantic Merge
                  </Link>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No structural conflicts detected in this session.</p>
              )}
            </Card>

            <Card title="Next Actions">
              <div className="space-y-3">
                {session.nextActions.map((action, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded hover:border-white/10 transition-all">
                    <span className="text-sm text-slate-300 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      {action}
                    </span>
                    <button className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300">Queue</button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="col-span-4 space-y-6">
            <Card title="Session Metadata">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Tool Chain</div>
                  <div className="text-xs text-white bg-slate-900 p-2 rounded flex items-center gap-2 border border-white/5">
                    <Terminal className="w-3 h-3 text-emerald-400" />
                    {session.toolDetails}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Project State context</div>
                  <div className="text-xs text-indigo-400 font-mono">18.4KB Compressed</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Latency / Cost</div>
                  <div className="text-xs text-slate-300">0.42s Avg • $0.08 Estimated</div>
                </div>
              </div>
            </Card>

            <Card title="Related Files">
              <div className="space-y-2">
                {['Ledger.java', 'VatService.java', 'HealingLoop.java'].map(file => (
                  <div key={file} className="flex items-center justify-between p-2 hover:bg-white/5 rounded text-[10px] text-slate-400 group cursor-pointer transition-all">
                    <span className="flex items-center gap-2 group-hover:text-white">
                      <Code2 className="w-3 h-3 text-slate-500" />
                      {file}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 text-indigo-400">View</span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="p-4 bg-indigo-600 border border-indigo-500 rounded-lg shadow-xl shadow-indigo-600/20 text-center space-y-1 cursor-pointer hover:bg-indigo-500 transition-colors">
              <div className="text-xs font-bold text-white uppercase tracking-widest">Branch to Active</div>
              <div className="text-[10px] text-indigo-200">Set this session as the current truth</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
