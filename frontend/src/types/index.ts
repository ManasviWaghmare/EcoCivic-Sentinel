export type Role = 'CITIZEN' | 'AUTHORITY';

export type ReportStatus = 'SUBMITTED' | 'IN_REVIEW' | 'IN_PROGRESS' | 'RESOLVED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  photoUrl: string | null;
  latitude: number;
  longitude: number;
  status: ReportStatus;
  upvoteCount: number;
  userId: string;
  authorityNote: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportPayload {
  title: string;
  description: string;
  category: string;
  photoUrl?: string;
  latitude: number;
  longitude: number;
}

export const REPORT_STATUSES: ReportStatus[] = [
  'SUBMITTED',
  'IN_REVIEW',
  'IN_PROGRESS',
  'RESOLVED',
];

export const REPORT_CATEGORIES = [
  'Pothole',
  'Garbage',
  'Streetlight',
  'Water Leak',
  'Road Damage',
  'Graffiti',
  'Other',
] as const;
