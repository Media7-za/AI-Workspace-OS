'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MapPin, 
  GitBranch, 
  Database, 
  Archive, 
  Settings,
  Circle,
  Activity,
  History,
  FileDown
} from 'lucide-react';
import { useWorkspaceStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { projects, activeProjectId } = useWorkspaceStore();
  const activeProject = projects.find(p => p.id === activeProjectId);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Decision Nodes', href: '/decisions', icon: Database },
    { name: 'Merge Engine', href: '/merge', icon: GitBranch },
    { name: 'Export Context', href: '/export', icon: FileDown },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <nav className="w-64 border-r border-white/5 flex flex-col bg-[#0c0c0e]">
        <div className="p-6 flex items-center gap-3 border-b border-white/5 mb-4">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white">OS</div>
          <span className="font-semibold tracking-tight text-white">AI Workspace</span>
        </div>

        <div className="px-4 space-y-1 flex-1 overflow-y-auto">
          <div className="px-2 py-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            Operations
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive 
                      ? "bg-white/5 text-white" 
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 px-2 py-1 text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">
            Active Projects
          </div>
          <div className="space-y-1">
            {projects.map((proj) => (
              <Link
                key={proj.id}
                href={`/projects/${proj.id}`}
                className={cn(
                  "px-3 py-1.5 flex items-center justify-between text-xs cursor-pointer group rounded-md",
                  activeProjectId === proj.id 
                    ? "bg-white/5 text-white" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <span className="flex items-center gap-2 truncate">
                  <span className={cn("w-2 h-2 rounded-full", proj.color)}></span>
                  {proj.name}
                </span>
                <span className="opacity-0 group-hover:opacity-100 text-[10px] text-slate-500">
                  {proj.code}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/5 text-[10px] text-slate-500 flex justify-between uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            State Synced
          </span>
          <span>v1.0.4-dev</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-[#09090b]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="text-slate-500">Projects</span>
            <span className="text-slate-600">/</span>
            <span className="text-white">{activeProject?.name || 'Dashboard'}</span>
            {activeProject && (
              <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ml-2">
                Active: vat-healing-experiment
              </span>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Active Context</span>
              <span className="text-xs font-mono text-slate-300">18,442 Tokens (82%)</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-slate-900 text-xs font-bold text-slate-300">
              JD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-grid-white/[0.02]">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
