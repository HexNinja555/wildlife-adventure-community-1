import React from 'react';
import { useWQ } from '../store';
import { Icons } from '../icons';

const Toasts: React.FC = () => {
  const { toasts } = useWQ();
  return (
    <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-[92%] max-w-sm">
      {toasts.map((t) => (
        <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md border text-sm font-medium animate-in slide-in-from-bottom-4 ${
          t.type === 'error' ? 'bg-red-50/95 border-red-200 text-red-800' :
          t.type === 'info' ? 'bg-sky-50/95 border-sky-200 text-sky-800' :
          'bg-emerald-50/95 border-emerald-200 text-emerald-800'}`}>
          <Icons.CheckCircle2 className="w-5 h-5 shrink-0" />
          {t.msg}
        </div>
      ))}
    </div>
  );
};
export default Toasts;
