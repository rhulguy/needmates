import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background font-sans selection:bg-primary selection:text-white w-full max-w-full">
      <Header />
      <main className="flex-1 flex flex-col relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}
