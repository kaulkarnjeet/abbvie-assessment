import type { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcf0]">
      <main className="flex-1 max-w-5xl w-full mx-auto p-2 sm:p-6 lg:p-10">
        <div className="bg-white rounded-xl shadow-xs border border-slate-100 min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-5rem)] p-4 sm:p-8 relative">
           {children}
        </div>
      </main>
    </div>
  );
}
