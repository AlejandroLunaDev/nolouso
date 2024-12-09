import { headers } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

interface AdminUser {
  role: string;
  email: string;
}

async function getUser() {
  const headersList = await headers();
  const cookieHeader = headersList.get('cookie') || '';
  
  const accessToken = cookieHeader
    .split(';')
    .find((c: string) => c.trim().startsWith('accessToken='))
    ?.split('=')[1];

  if (!accessToken) return null;

  try {
    return jwtDecode<AdminUser>(accessToken);
  } catch {
    return null;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense fallback={<div className="p-4">Cargando...</div>}>
        <main className="p-4">{children}</main>
      </Suspense>
    </div>
  );
} 