'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { useWorkspaceStore } from '@/lib/store';
import { Card } from '@/components/ui-card';
import { 
  GitMerge, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  MinusCircle,
  Zap,
  Split,
  MessageSquareDiff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function MergeEngine() {
  const { sessions } = useWorkspaceStore();
  const [sessionA, setSessionA] = useState(sessions[0]);
  const [sessionB, setSessionB] = useState(sessions[1]);
  const [isMerging, setIsMerging] = useState(false);

  const startMerge = () => {
    setIsMerging(true);
    setTimeout(() => setIsMerging(false), 2000);
  };

  return (
    <AppShell>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <GitMerge className="w-8 h-8 text-indigo-500" />
            Merge Engine
          </h1>
          <p className="text-slate-400 mt-1">Reconcile divergent sessions and reasoning branches into a single system truth.</p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Selection Area */}
          <div className="col-span-12 flex items-center justify-between gap-6 bg-white/5 p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none"></div>
            
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Source Session (A)</label>
              <select 
                className="w-full bg-[#0c0c0e] border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                value={sessionA.id}
                onChange={(e) => setSessionA(sessions.find(s => s.id === e.target.value)!)}
              >
                {sessions.map(s => <option key={s.id} value={s.id}>{s.title} ({s.date})</option>)}
              </select>
              <p className="text-[10px] text-slate-500 truncate">{sessionA.summary}</p>
            </div>

            <div className="flex items-center justify-center p-4">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] animate-pulse">
                <GitMerge className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Target Session (B)</label>
              <select 
                className="w-full bg-[#0c0c0e] border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                value={sessionB.id}
                onChange={(e) => setSessionB(sessions.find(s => s.id === e.target.value)!)}
              >
                {sessions.map(s => <option key={s.id} value={s.id}>{s.title} ({s.date})</option>)}
              </select>
              <p className="text-[10px] text-slate-500 truncate">{sessionB.summary}</p>
            </div>
          </div>

          {/* Analysis View */}
          <div className="col-span-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card title="Agreement Matrix" className="border-emerald-500/20 bg-emerald-500/[0.02]">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-emerald-500/5 rounded border border-emerald-500/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-emerald-400 uppercase">Sub-ledger Mutex</p>
                      <p className="text-[10px] text-slate-400 italic">Both sessions identify mutation locks as critical for consistency.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-emerald-500/5 rounded border border-emerald-500/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-emerald-400 uppercase">VAT State Mapping</p>
                      <p className="text-[10px] text-slate-400 italic">Structural consensus on &quot;Partially Healed&quot; enum addition.</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Conflict Matrix" className="border-red-500/20 bg-red-500/[0.02]">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-red-500/5 rounded border border-red-500/10">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-red-400 uppercase">Schema Contention</p>
                      <p className="text-[10px] text-slate-400 italic">Session B updates Movement Ledger schema while Session A expects legacy fields.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-500/5 rounded border border-red-500/10">
                    <MinusCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-red-400 uppercase">Latency vs Accuracy</p>
                      <p className="text-[10px] text-slate-400 italic">Session A prioritizes 100% ACID, Session B proposes Relaxed Consistency.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card title="Merge Recommendations">
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-white/5 border border-white/5 rounded-md flex justify-between items-center group">
                  <span className="text-slate-400"><span className="text-indigo-400">Adopt:</span> Event Schema v2.1 from Session B</span>
                  <button className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-white group-hover:bg-indigo-600 transition-all">Accept</button>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-md flex justify-between items-center group">
                  <span className="text-slate-400"><span className="text-indigo-400">Override:</span> Manual Mutex from Session A</span>
                  <button className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-white group-hover:bg-indigo-600 transition-all">Accept</button>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-md flex justify-between items-center group opacity-50">
                  <span className="text-slate-400"><span className="text-slate-600">Deprecated:</span> Direct SQL patching logic (Obsolete)</span>
                  <span className="text-[10px] text-slate-600 px-2 py-1 rounded">Auto-Excluded</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Merge Operations Area */}
          <div className="col-span-4 space-y-6">
            <Card title="Updated State Preview">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">New System Focus</div>
                  <div className="text-xs text-white p-3 bg-indigo-500/10 border border-indigo-500/20 rounded shadow-inner">
                    Implementing ACID transactions with Event-Driven validation for the micro-ledger.
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Risk Reduction</div>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-400">+14%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Affected Nodes</div>
                  <div className="flex flex-wrap gap-2 text-[8px] font-bold uppercase font-mono">
                    <span className="px-1.5 py-0.5 bg-white/10 text-slate-300 rounded">Ledger.java</span>
                    <span className="px-1.5 py-0.5 bg-white/10 text-slate-300 rounded">VatService.java</span>
                    <span className="px-1.5 py-0.5 bg-indigo-600 text-white rounded">NEW: TransactionMutex.java</span>
                  </div>
                </div>
              </div>
            </Card>

            <button 
              onClick={startMerge}
              disabled={isMerging}
              className={cn(
                "w-full py-6 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group",
                isMerging 
                  ? "bg-indigo-900/50 cursor-not-allowed border border-indigo-500/20" 
                  : "bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_30px_rgba(79,70,229,0.3)] border border-indigo-500"
              )}
            >
              {isMerging ? (
                <>
                  <Zap className="w-8 h-8 text-white animate-spin" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white animate-pulse">Merging Contexts...</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Split className="w-6 h-6 text-white rotate-180" />
                    <ArrowRight className="w-5 h-5 text-indigo-200 group-hover:translate-x-1 transition-transform" />
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-white">Execute Semantic Merge</span>
                </>
              )}
            </button>

            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-2 flex items-center gap-2">
                <MessageSquareDiff className="w-3 h-3" />
                Merge Log
              </div>
              <div className="h-32 overflow-y-auto space-y-1 font-mono text-[9px] text-slate-600">
                <p>[09:34:21] Comparing session structural ASTs...</p>
                <p>[09:34:22] Found 4 semantic agreements.</p>
                <p>[09:34:22] Found 2 logical conflicts in &quot;Ledger API&quot;.</p>
                <p>[09:34:23] AI Recommendation: Layer B on A.</p>
                <p className="text-indigo-500 font-bold">READY FOR USER VALIDATION.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
