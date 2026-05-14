'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/AuthContext';
import { SiteProvider } from '@/components/SiteProvider';
import { GlobalScripts } from '@/components/GlobalScripts';
import { SeoProvider } from '@/components/SeoProvider';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SeoProvider />
          <GlobalScripts />
          <SiteProvider>
            {children}
          </SiteProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
