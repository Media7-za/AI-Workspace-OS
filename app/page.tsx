'use client';

import React from 'react';
import { AppShell } from '@/components/app-shell';
import { useWorkspaceStore } from '@/lib/store';
import { Card } from '@/components/ui-card';
import { Activity, GitBranch, Database, AlertCircle, History, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const { projects, sessions, branches, decisions, problems } = useWorkspaceStore();

  const activeBranches = branches.filter(b => b.status === 'active');
  const recentDecisions = decisions.slice(0, 4);
  const highSeverityProblems = problems.filter(p => p.severity === 'high');

  return (
    <AppShell>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Operational Overview</h1>
            <p className="text-slate-400 mt-1">Global ecosystem state across {projects.length} active projects.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-2">
              <Zap className="w-4 h-4" />
              New AI Session
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Active Branches" 
            value={activeBranches.length.toString()} 
            icon={GitBranch}
            trend="Stable"
            color="text-indigo-400"
          />
          <StatCard 
            title="Open Decisions" 
            value={decisions.filter(d => d.status === 'pending').length.toString()} 
            icon={Database}
            trend="+2 today"
            color="text-amber-400"
          />
          <StatCard 
            title="High Risks" 
            value={highSeverityProblems.length.toString()} 
            icon={AlertCircle}
            trend="Unchanged"
            color="text-red-400"
          />
          <StatCard 
            title="Total Sessions" 
            value={sessions.length.toString()} 
            icon={History}
            trend="14.2/day"
            color="text-emerald-400"
          />
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Active Projects List */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card title="Active Projects">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {projects.map((project) => (
                  <Link href={`/projects/${project.id}`} key={project.id}>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-3 h-3 rounded-full", project.color)}></div>
                          <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{project.name}</h3>
                        </div>
                        <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-500 font-mono">{project.code}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        Currently focusing on {project.currentFocus}. Architecture: {project.architecture}.
                      </p>
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold">
                        <span className="text-slate-500">Last updated {project.lastUpdated}</span>
                        <span className="text-emerald-500">Synced</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card title="Recent Decisions">
              <div className="space-y-3 mt-4">
                {recentDecisions.map((decision) => (
                  <div key={decision.id} className="flex items-center justify-between p-3 rounded bg-[#0c0c0e] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{decision.title}</span>
                      <span className="text-[10px] text-slate-500 uppercase">{projects.find(p => p.id === decision.projectId)?.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded font-bold uppercase",
                        decision.status === 'accepted' ? "bg-emerald-500/10 text-emerald-500" : 
                        decision.status === 'rejected' ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-500"
                      )}>
                        {decision.status}
                      </span>
                      <span className="text-xs text-slate-500">{decision.lastUpdated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card title="Active Problems">
              <div className="space-y-4 mt-4">
                {problems.slice(0, 3).map((problem) => (
                  <div key={problem.id} className={cn(
                    "p-3 rounded border space-y-2",
                    problem.severity === 'high' ? "bg-red-500/5 border-red-500/20" : 
                    problem.severity === 'medium' ? "bg-amber-500/5 border-amber-500/20" : "bg-white/5 border-white/10"
                  )}>
                    <div className="flex justify-between items-center">
                      <span className={cn(
                        "text-[10px] font-bold uppercase",
                        problem.severity === 'high' ? "text-red-400" : 
                        problem.severity === 'medium' ? "text-amber-400" : "text-slate-400"
                      )}>{problem.type}</span>
                      <span className={cn(
                        "text-[8px] px-1 font-bold rounded",
                        problem.severity === 'high' ? "bg-red-400 text-red-950" : 
                        problem.severity === 'medium' ? "bg-amber-400 text-amber-950" : "bg-slate-400 text-slate-950"
                      )}>{problem.severity.toUpperCase()}</span>
                    </div>
                    <div className="text-xs text-slate-300 font-medium">{problem.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">ID: {problem.id.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Recent AI Activity">
              <div className="space-y-4 mt-4">
                {sessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono text-xs group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                      {session.tool}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs font-medium text-white truncate">{session.title}</span>
                      <span className="text-[10px] text-slate-500">{session.date} • {projects.find(p => p.id === session.projectId)?.code}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
  return (
    <div className="bg-[#0c0c0e] border border-white/5 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{title}</p>
          <p className={cn("text-2xl font-bold", color)}>{value}</p>
        </div>
        <div className="p-2 bg-white/5 rounded-md">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
      </div>
      <div className="mt-2 text-[10px] text-slate-500 font-medium">
        {trend}
      </div>
    </div>
  );
}
