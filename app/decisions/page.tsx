'use client';

import React from 'react';
import { AppShell } from '@/components/app-shell';
import { useWorkspaceStore } from '@/lib/store';
import { Card } from '@/components/ui-card';
import { Database, Filter, Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DecisionsList() {
  const { decisions, projects } = useWorkspaceStore();

  return (
    <AppShell>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Database className="w-8 h-8 text-indigo-500" />
              Decision Registry
            </h1>
            <p className="text-slate-400 mt-1">Cross-project architectural decisions and system constraints.</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search decisions..."
                className="bg-[#0c0c0e] border border-white/5 rounded-md py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-indigo-500 w-64"
              />
            </div>
            <button className="p-2 bg-[#0c0c0e] border border-white/5 rounded-md hover:bg-white/5 transition-colors">
              <Filter className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        <Card title="All Decision Nodes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decisions.map((decision) => (
              <Link key={decision.id} href={`/decisions/${decision.id}`}>
                <div className="p-5 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all cursor-pointer group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className={cn(
                      "text-[9px] font-black uppercase px-1.5 py-0.5 rounded",
                      decision.status === 'accepted' ? "bg-emerald-500/20 text-emerald-500" : 
                      decision.status === 'rejected' ? "bg-red-500/20 text-red-500" : "bg-amber-500/20 text-amber-500"
                    )}>
                      {decision.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{decision.lastUpdated}</span>
                  </div>
                  <h3 className="font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors leading-tight">{decision.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-3 flex-1 mb-4 leading-relaxed">
                    {decision.rationale}
                  </p>
                  <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {decision.affectedSystems.map(system => (
                      <span key={system} className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{system}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
