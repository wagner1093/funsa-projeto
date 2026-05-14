'use client';

import AdminLayout from '@/components/AdminLayout';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  if (loading) return null; // or a loading spinner
  if (!user) return null; // will redirect

  return <AdminLayout>{children}</AdminLayout>;
}
