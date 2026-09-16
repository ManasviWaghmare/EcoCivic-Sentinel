import type {
  AuthResponse,
  CreateReportPayload,
  Report,
  ReportStatus,
} from '../types';

const BASE_URL = '/api';

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('civicreport.token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body?.message) message = body.message;
    } catch {
      /* ignore non-JSON error bodies */
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

interface ListParams {
  status?: ReportStatus | 'ALL';
  category?: string;
}

export const api = {
  register: (data: { name: string; email: string; password: string }) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getReports: (params: ListParams = {}) => {
    const search = new URLSearchParams();
    if (params.status && params.status !== 'ALL')
      search.set('status', params.status);
    if (params.category) search.set('category', params.category);
    const qs = search.toString();
    return request<Report[]>(`/reports${qs ? `?${qs}` : ''}`);
  },

  getMyReports: () => request<Report[]>('/reports/my'),

  getNearby: (lat: number, lng: number, distanceKm = 2) =>
    request<Report[]>(
      `/reports/nearby?lat=${lat}&lng=${lng}&distanceKm=${distanceKm}`
    ),

  createReport: (payload: CreateReportPayload) =>
    request<Report>('/reports', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  upvote: (id: string) =>
    request<Report>(`/reports/${id}/upvote`, { method: 'POST' }),

  updateStatus: (id: string, status: ReportStatus, note: string) =>
    request<Report>(`/reports/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note }),
    }),
};
