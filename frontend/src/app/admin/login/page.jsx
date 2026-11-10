"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <div className="w-9 h-9 rounded-full border-2 border-[#e06d84]/30 border-t-[#e06d84] animate-spin" />
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
        Redirecting to Admin Control Portal...
      </p>
    </div>
  );
}

