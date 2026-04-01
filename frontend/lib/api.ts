import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type JsonObject = Record<string, any>;
type HeadersMap = Record<string, string>;

function ensureApiUrl(): string {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is missing');
  }

  return API_URL.replace(/\/+$/, '');
}

function buildUrl(endpoint: string): string {
  const base = ensureApiUrl();
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${normalizedEndpoint}`;
}

async function parseJsonSafe<T = any>(res: Response): Promise<T | null> {
  const contentType = res.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    return null;
  }

  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function parseErrorMessage(res: Response): Promise<string> {
  const data = await parseJsonSafe<JsonObject>(res);

  if (data?.message && typeof data.message === 'string') {
    return data.message;
  }

  if (data?.error && typeof data.error === 'string') {
    return data.error;
  }

  if (res.status === 401) {
    return 'Unauthorized';
  }

  if (res.status === 403) {
    return 'Forbidden';
  }

  if (res.status === 404) {
    return 'Not found';
  }

  if (res.status >= 500) {
    return 'Server error';
  }

  return 'Something went wrong';
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  if (res.status === 204) {
    return null as T;
  }

  const data = await parseJsonSafe<T>(res);

  if (data !== null) {
    return data;
  }

  return null as T;
}

async function getAccessToken(): Promise<string | null> {
  try {
    const session = await getSession();
    const token = (session as any)?.accessToken as string | undefined;

    if (token) {
      return token;
    }
  } catch {}

  if (typeof window !== 'undefined') {
    const storedToken = window.localStorage.getItem('riah_access_token');
    if (storedToken) {
      return storedToken;
    }
  }

  return null;
}

function mergeHeaders(
  baseHeaders: HeadersMap,
  extraHeaders?: HeadersInit
): HeadersMap {
  const result: HeadersMap = { ...baseHeaders };

  if (!extraHeaders) {
    return result;
  }

  if (extraHeaders instanceof Headers) {
    extraHeaders.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  if (Array.isArray(extraHeaders)) {
    for (const [key, value] of extraHeaders) {
      result[key] = value;
    }
    return result;
  }

  return {
    ...result,
    ...(extraHeaders as HeadersMap),
  };
}

async function fetchPublic<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = mergeHeaders({}, options.headers);

  const res = await fetch(buildUrl(endpoint), {
    ...options,
    headers,
    cache: options.cache ?? 'no-store',
  });

  return handleResponse<T>(res);
}

async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken();

  const headers = mergeHeaders(
    {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    options.headers
  );

  const res = await fetch(buildUrl(endpoint), {
    ...options,
    headers,
    cache: options.cache ?? 'no-store',
  });

  return handleResponse<T>(res);
}

async function uploadWithAuth(
  endpoint: string,
  file: File
): Promise<{ url: string }> {
  const token = await getAccessToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(buildUrl(endpoint), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await handleResponse<{ url?: string } & JsonObject>(res);

  if (!data?.url) {
    throw new Error('Upload failed');
  }

  return { url: data.url };
}

export const publicApi = {
  getServices: () => fetchPublic<any[]>('/services'),
  getProjects: () => fetchPublic<any[]>('/projects'),
  getMaintenance: () => fetchPublic<any>('/maintenance'),
  getTeamMembers: () => fetchPublic<any[]>('/team'),
  getServiceDetails: () => fetchPublic<any[]>('/service-details'),
  getCompanyImages: () => fetchPublic<any[]>('/company-images'),
  getSettings: () => fetchPublic<any>('/settings'),
};

export const usersApi = {
  getAll: () => fetchWithAuth<any[]>('/users'),
};

export const projectsApi = {
  getAll: () => fetchWithAuth<any[]>('/projects'),
  getOne: (id: string) => fetchWithAuth<any>(`/projects/${id}`),
  create: (data: any) =>
    fetchWithAuth<any>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchWithAuth<any>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchWithAuth<any>(`/projects/${id}`, {
      method: 'DELETE',
    }),
};

export const servicesApi = {
  getAll: () => fetchWithAuth<any[]>('/services'),
  getOne: (id: string) => fetchWithAuth<any>(`/services/${id}`),
  create: (data: any) =>
    fetchWithAuth<any>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchWithAuth<any>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchWithAuth<any>(`/services/${id}`, {
      method: 'DELETE',
    }),
};

export const companyImagesApi = {
  getAll: () => fetchWithAuth<any[]>('/company-images'),
  create: (data: any) =>
    fetchWithAuth<any>('/company-images', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchWithAuth<any>(`/company-images/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchWithAuth<any>(`/company-images/${id}`, {
      method: 'DELETE',
    }),
};

export const serviceDetailsApi = {
  getAll: () => fetchWithAuth<any[]>('/service-details'),
  create: (data: any) =>
    fetchWithAuth<any>('/service-details', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchWithAuth<any>(`/service-details/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchWithAuth<any>(`/service-details/${id}`, {
      method: 'DELETE',
    }),
};

export const uploadApi = {
  uploadImage: (file: File) => uploadWithAuth('/api/uploads/image', file),
  uploadVideo: (file: File) => uploadWithAuth('/api/uploads/video', file),
};

export const contactApi = {
  sendMessage: (data: { name: string; email: string; message: string }) =>
    fetchPublic<any>('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
};

export const maintenanceApi = {
  getStatus: () => fetchWithAuth<any>('/maintenance'),
  updateStatus: (data: { isEnabled?: boolean; message?: string }) =>
    fetchWithAuth<any>('/maintenance', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

export const settingsApi = {
  get: () => fetchWithAuth<any>('/settings'),
  update: (data: any) =>
    fetchWithAuth<any>('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

export const teamApi = {
  getAll: () => fetchWithAuth<any[]>('/team'),
  create: (data: any) =>
    fetchWithAuth<any>('/team', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchWithAuth<any>(`/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchWithAuth<any>(`/team/${id}`, {
      method: 'DELETE',
    }),
};