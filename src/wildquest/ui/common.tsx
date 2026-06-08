import React from 'react';
import { Icons } from '../icons';

export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-emerald-100 text-emerald-700' }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${color}`}>{children}</span>
);

export const ConfidenceBadge: React.FC<{ value: number }> = ({ value }) => {
  const color = value >= 90 ? 'bg-emerald-500' : value >= 75 ? 'bg-amber-500' : 'bg-orange-500';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white ${color}`}>
      <Icons.Sparkles className="w-3 h-3" /> {value}%
    </span>
  );
};

export const EmptyState: React.FC<{ icon?: React.ReactNode; title: string; sub: string; action?: React.ReactNode }> = ({ icon, title, sub, action }) => (
  <div className="text-center py-16 px-6">
    <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 grid place-items-center text-emerald-500 mb-4">{icon || <Icons.Leaf className="w-8 h-8" />}</div>
    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">{sub}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200/70 rounded-xl ${className}`} />
);

export const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; accent: string }> = ({ icon, label, value, accent }) => (
  <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100">
    <div className={`w-10 h-10 rounded-xl grid place-items-center mb-3 ${accent}`}>{icon}</div>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
  </div>
);

export const Btn: React.FC<{ children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'outline' | 'ghost' | 'amber'; className?: string; type?: 'button' | 'submit'; disabled?: boolean }> = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled }) => {
  const v = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm',
    amber: 'bg-amber-500 hover:bg-amber-400 text-white shadow-sm',
    outline: 'border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50',
    ghost: 'text-emerald-700 hover:bg-emerald-50',
  }[variant];
  return <button type={type} disabled={disabled} onClick={onClick} className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 disabled:opacity-50 ${v} ${className}`}>{children}</button>;
};
