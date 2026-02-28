// frontend/lib/api.ts
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchPublic(endpoint: string) {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is missing');
  const res = await fetch(`${API_URL}${endpoint}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export const publicApi = {
  getServices: () => fetchPublic('/services'),
  getProjects: () => fetchPublic('/projects'),
  getMaintenance: () => fetchPublic('/maintenance'),
  getTeamMembers: () => fetchPublic('/team'),
  getServiceDetails: () => fetchPublic('/service-details'),
  getCompanyImages: () => fetchPublic('/company-images'),
  getSettings: () => fetchPublic('/settings'),
};

// ✅ مهم: توكن مضمون (Session ثم localStorage)
async function getAccessToken(): Promise<string | null> {
  try {
    const session = await getSession();
    const t = (session as any)?.accessToken as string | undefined;
    if (t) return t;
  } catch {}

  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('riah_access_token');
    if (stored) return stored;
  }

  return null;
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is missing');

  const token = await getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ? (options.headers as Record<string, string>) : {}),
  };

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    if (res.status === 401) throw new Error('Unauthorized');
    throw new Error(error.message || 'Something went wrong');
  }

  return res.json();
}

export const usersApi = {
  getAll: () => fetchWithAuth('/users'),
};

export const projectsApi = {
  getAll: () => fetchWithAuth('/projects'),
  getOne: (id: string) => fetchWithAuth(`/projects/${id}`),
  create: (data: any) =>
    fetchWithAuth('/projects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    fetchWithAuth(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchWithAuth(`/projects/${id}`, { method: 'DELETE' }),
};

export const servicesApi = {
  getAll: () => fetchWithAuth('/services'),
  getOne: (id: string) => fetchWithAuth(`/services/${id}`),
  create: (data: any) =>
    fetchWithAuth('/services', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    fetchWithAuth(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchWithAuth(`/services/${id}`, { method: 'DELETE' }),
};

export const companyImagesApi = {
  getAll: () => fetchWithAuth('/company-images'),
  create: (data: any) =>
    fetchWithAuth('/company-images', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    fetchWithAuth(`/company-images/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchWithAuth(`/company-images/${id}`, { method: 'DELETE' }),
};

export const serviceDetailsApi = {
  getAll: () => fetchWithAuth('/service-details'),
  create: (data: any) =>
    fetchWithAuth('/service-details', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    fetchWithAuth(`/service-details/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchWithAuth(`/service-details/${id}`, { method: 'DELETE' }),
};

export const uploadApi = {
  uploadImage: async (file: File) => {
    if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is missing');

    const token = await getAccessToken();
    if (!token) throw new Error('Unauthorized');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_URL}/api/uploads/image`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      if (res.status === 401) throw new Error('Unauthorized');
      throw new Error(error.message || 'Upload failed');
    }

    const data = await res.json();
    return { url: data.url };
  },

  uploadVideo: async (file: File) => {
    if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is missing');

    const token = await getAccessToken();
    if (!token) throw new Error('Unauthorized');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_URL}/api/uploads/video`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      if (res.status === 401) throw new Error('Unauthorized');
      throw new Error(error.message || 'Upload failed');
    }

    const data = await res.json();
    return { url: data.url };
  },
};

export const contactApi = {
  sendMessage: async (data: { name: string; email: string; message: string }) => {
    if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is missing');

    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to send message');
    }
    return res.json();
  },
};

export const maintenanceApi = {
  getStatus: () => fetchWithAuth('/maintenance'),
  updateStatus: (data: { isEnabled?: boolean; message?: string }) =>
    fetchWithAuth('/maintenance', { method: 'PATCH', body: JSON.stringify(data) }),
};

export const settingsApi = {
  get: () => fetchWithAuth('/settings'),
  update: (data: any) => fetchWithAuth('/settings', { method: 'PUT', body: JSON.stringify(data) }),
};

export const teamApi = {
  getAll: () => fetchWithAuth('/team'),
  create: (data: any) => fetchWithAuth('/team', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    fetchWithAuth(`/team/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchWithAuth(`/team/${id}`, { method: 'DELETE' }),
};