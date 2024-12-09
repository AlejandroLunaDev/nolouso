'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { Suspense } from 'react';

function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl mb-4">
          {user ? `Bienvenido, ${user.firstName}` : 'Cargando...'}
        </h2>
        <p>Panel de administración</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
