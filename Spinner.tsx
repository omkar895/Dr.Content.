import React from 'react';
import { Loader2 } from 'lucide-react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 rounded-full animate-pulse"></div>
        <Loader2 className="relative w-12 h-12 text-indigo-600 animate-spin" />
      </div>
      <p className="text-slate-500 font-semibold animate-pulse tracking-wide">Crafting your strategy...</p>
    </div>
  );
};