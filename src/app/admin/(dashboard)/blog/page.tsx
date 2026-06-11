'use client';
import { Suspense } from 'react';
import ManagePosts from '@/views/admin/ManagePosts';

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-12 opacity-40">
        <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ManagePosts />
    </Suspense>
  );
}
