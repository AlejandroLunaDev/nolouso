import { useAuthStore } from '../stores/useAuthStore';

export async function fetchWithInterceptor(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });

  if (response.status === 401) {
    // Intenta refrescar el token
    const refreshSuccess = await useAuthStore.getState().refreshToken();
    
    if (!refreshSuccess) {
      // Si el refresh falla, hacer logout
      await useAuthStore.getState().logout();
      throw new Error('Session expired');
    }

    // Reintenta la petición original con el nuevo token
    return fetch(url, {
      ...options,
      credentials: 'include',
    });
  }

  return response;
} 