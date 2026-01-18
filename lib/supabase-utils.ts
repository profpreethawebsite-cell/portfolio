import { supabase } from './supabase';
import {
  Grant,
  Publication,
  AdminRole,
  Patent,
  Award,
  Event,
  GalleryImage,
  ProfileData,
} from '@/types';

// Profile Data
export const getProfile = async (): Promise<ProfileData | null> => {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', 'main')
      .single();

    if (error) throw error;
    return data as ProfileData;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const updateProfile = async (data: Partial<ProfileData>) => {
  try {
    const { error } = await supabase
      .from('profile')
      .upsert({ id: 'main', ...data }, { onConflict: 'id' });
    if (error) throw error;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Grants
export const getGrants = async (): Promise<Grant[]> => {
  try {
    const { data, error } = await supabase
      .from('grants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    // Map snake_case to camelCase
    return (data || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      fundingAgency: item.funding_agency,
      amount: item.amount,
      period: item.period,
      status: item.status,
      description: item.description,
    })) as Grant[];
  } catch (error) {
    console.error('Error fetching grants:', error);
    return [];
  }
};

export const addGrant = async (grant: Omit<Grant, 'id'>) => {
  try {
    // Map camelCase to snake_case
    const { error } = await supabase.from('grants').insert({
      title: grant.title,
      funding_agency: grant.fundingAgency,
      amount: grant.amount,
      period: grant.period,
      status: grant.status,
      description: grant.description,
    });
    if (error) throw error;
  } catch (error) {
    console.error('Error adding grant:', error);
    throw error;
  }
};

export const updateGrant = async (id: string, grant: Partial<Grant>) => {
  try {
    // Map camelCase to snake_case
    const updateData: any = {};
    if (grant.title !== undefined) updateData.title = grant.title;
    if (grant.fundingAgency !== undefined) updateData.funding_agency = grant.fundingAgency;
    if (grant.amount !== undefined) updateData.amount = grant.amount;
    if (grant.period !== undefined) updateData.period = grant.period;
    if (grant.status !== undefined) updateData.status = grant.status;
    if (grant.description !== undefined) updateData.description = grant.description;

    const { error } = await supabase
      .from('grants')
      .update(updateData)
      .eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error updating grant:', error);
    throw error;
  }
};

export const deleteGrant = async (id: string) => {
  try {
    const { error } = await supabase.from('grants').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting grant:', error);
    throw error;
  }
};

// Publications
export const getPublications = async (): Promise<Publication[]> => {
  try {
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .order('year', { ascending: false });

    if (error) throw error;
    return (data || []) as Publication[];
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
};

export const addPublication = async (publication: Omit<Publication, 'id'>) => {
  try {
    const { error } = await supabase.from('publications').insert(publication);
    if (error) throw error;
  } catch (error) {
    console.error('Error adding publication:', error);
    throw error;
  }
};

export const updatePublication = async (id: string, publication: Partial<Publication>) => {
  try {
    const { error } = await supabase
      .from('publications')
      .update(publication)
      .eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error updating publication:', error);
    throw error;
  }
};

export const deletePublication = async (id: string) => {
  try {
    const { error } = await supabase.from('publications').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting publication:', error);
    throw error;
  }
};

// Admin Roles
export const getAdminRoles = async (): Promise<AdminRole[]> => {
  try {
    const { data, error } = await supabase
      .from('admin_roles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    // Column names match, but return as-is for consistency
    return (data || []) as AdminRole[];
  } catch (error) {
    console.error('Error fetching admin roles:', error);
    return [];
  }
};

export const addAdminRole = async (role: Omit<AdminRole, 'id'>) => {
  try {
    const { error } = await supabase.from('admin_roles').insert(role);
    if (error) throw error;
  } catch (error) {
    console.error('Error adding admin role:', error);
    throw error;
  }
};

export const updateAdminRole = async (id: string, role: Partial<AdminRole>) => {
  try {
    const { error } = await supabase
      .from('admin_roles')
      .update(role)
      .eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error updating admin role:', error);
    throw error;
  }
};

export const deleteAdminRole = async (id: string) => {
  try {
    const { error } = await supabase.from('admin_roles').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting admin role:', error);
    throw error;
  }
};

// Patents
export const getPatents = async (): Promise<Patent[]> => {
  try {
    const { data, error } = await supabase
      .from('patents')
      .select('*')
      .order('year', { ascending: false });

    if (error) throw error;
    // Map snake_case to camelCase
    return (data || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      patentNumber: item.patent_number,
      area: item.area,
      status: item.status,
      year: item.year,
    })) as Patent[];
  } catch (error) {
    console.error('Error fetching patents:', error);
    return [];
  }
};

export const addPatent = async (patent: Omit<Patent, 'id'>) => {
  try {
    // Map camelCase to snake_case
    const { error } = await supabase.from('patents').insert({
      title: patent.title,
      patent_number: patent.patentNumber,
      area: patent.area,
      status: patent.status,
      year: patent.year,
    });
    if (error) throw error;
  } catch (error) {
    console.error('Error adding patent:', error);
    throw error;
  }
};

export const updatePatent = async (id: string, patent: Partial<Patent>) => {
  try {
    // Map camelCase to snake_case
    const updateData: any = {};
    if (patent.title !== undefined) updateData.title = patent.title;
    if (patent.patentNumber !== undefined) updateData.patent_number = patent.patentNumber;
    if (patent.area !== undefined) updateData.area = patent.area;
    if (patent.status !== undefined) updateData.status = patent.status;
    if (patent.year !== undefined) updateData.year = patent.year;

    const { error } = await supabase
      .from('patents')
      .update(updateData)
      .eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error updating patent:', error);
    throw error;
  }
};

export const deletePatent = async (id: string) => {
  try {
    const { error } = await supabase.from('patents').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting patent:', error);
    throw error;
  }
};

// Awards
export const getAwards = async (): Promise<Award[]> => {
  try {
    const { data, error } = await supabase
      .from('awards')
      .select('*')
      .order('year', { ascending: false });

    if (error) throw error;
    return (data || []) as Award[];
  } catch (error) {
    console.error('Error fetching awards:', error);
    return [];
  }
};

export const addAward = async (award: Omit<Award, 'id'>) => {
  try {
    const { error } = await supabase.from('awards').insert(award);
    if (error) throw error;
  } catch (error) {
    console.error('Error adding award:', error);
    throw error;
  }
};

export const updateAward = async (id: string, award: Partial<Award>) => {
  try {
    const { error } = await supabase
      .from('awards')
      .update(award)
      .eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error updating award:', error);
    throw error;
  }
};

export const deleteAward = async (id: string) => {
  try {
    const { error } = await supabase.from('awards').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting award:', error);
    throw error;
  }
};

// Events
export const getEvents = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return (data || []) as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const addEvent = async (event: Omit<Event, 'id'>) => {
  try {
    const { error } = await supabase.from('events').insert(event);
    if (error) throw error;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const updateEvent = async (id: string, event: Partial<Event>) => {
  try {
    const { error } = await supabase
      .from('events')
      .update(event)
      .eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Gallery
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as GalleryImage[];
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
};

export const addGalleryImage = async (image: Omit<GalleryImage, 'id'>) => {
  try {
    const { error } = await supabase.from('gallery').insert({
      ...image,
      created_at: new Date().toISOString(),
    });
    if (error) throw error;
  } catch (error) {
    console.error('Error adding gallery image:', error);
    throw error;
  }
};

export const deleteGalleryImage = async (id: string) => {
  try {
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    throw error;
  }
};
