export interface Grant {
  id: string;
  title: string;
  fundingAgency: string;
  amount?: string;
  period: string;
  status: 'completed' | 'ongoing';
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  link?: string;
}

export interface AdminRole {
  id: string;
  title: string;
  organization: string;
  period: string;
  description?: string;
}

export interface Patent {
  id: string;
  title: string;
  patentNumber?: string;
  area: string;
  status: 'filed' | 'granted';
  year?: number;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  type: 'conference' | 'workshop' | 'seminar' | 'other';
  date: string;
  location?: string;
  description?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  category?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  department: string;
  university: string;
  bio?: string;
  qualifications: string[];
  experience?: string;
  yearsOfExperience?: number;
  specialization: string[];
  achievements: string[];
  researchInterests?: string;
  email?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  linkedinUrl?: string;
  collegeUrl?: string;
  scholarsCount?: number;
}
