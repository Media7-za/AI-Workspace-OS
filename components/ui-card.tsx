import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

export function Card({ title, children, className, headerAction }: CardProps) {
  return (
    <div className={cn("bg-[#0c0c0e] border border-white/5 rounded-lg flex flex-col overflow-hidden shadow-lg", className)}>
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0e0e11]">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{title}</h3>
        {headerAction}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
