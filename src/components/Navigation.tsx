'use client';

import { Trophy, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeModule: 'contest' | 'referral';
  setActiveModule: (module: 'contest' | 'referral') => void;
}

export function Navigation({ activeModule, setActiveModule }: NavigationProps) {
  return (
    <nav className="flex space-x-1 bg-slate-100/80 backdrop-blur-sm rounded-xl p-1.5 border border-slate-200/50">
      <button
        onClick={() => setActiveModule('contest')}
        className={cn(
          'flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300',
          activeModule === 'contest'
            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 transform scale-105'
            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 hover:shadow-sm'
        )}
        aria-label="Switch to Contest Module"
      >
        <Trophy className="h-4 w-4" />
        <span>Contest</span>
      </button>
      
      <button
        onClick={() => setActiveModule('referral')}
        className={cn(
          'flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300',
          activeModule === 'referral'
            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25 transform scale-105'
            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 hover:shadow-sm'
        )}
        aria-label="Switch to Referral Module"
      >
        <Gift className="h-4 w-4" />
        <span>Referral</span>
      </button>
    </nav>
  );
}