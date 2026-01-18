import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
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
    const docRef = doc(db, 'profile', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ProfileData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const updateProfile = async (data: Partial<ProfileData>) => {
  try {
    const docRef = doc(db, 'profile', 'main');
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Grants
export const getGrants = async (): Promise<Grant[]> => {
  try {
    const q = query(collection(db, 'grants'), orderBy('year', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Grant[];
  } catch (error) {
    console.error('Error fetching grants:', error);
    return [];
  }
};

export const addGrant = async (grant: Omit<Grant, 'id'>) => {
  try {
    await addDoc(collection(db, 'grants'), grant);
  } catch (error) {
    console.error('Error adding grant:', error);
    throw error;
  }
};

export const updateGrant = async (id: string, grant: Partial<Grant>) => {
  try {
    const docRef = doc(db, 'grants', id);
    await updateDoc(docRef, grant);
  } catch (error) {
    console.error('Error updating grant:', error);
    throw error;
  }
};

export const deleteGrant = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'grants', id));
  } catch (error) {
    console.error('Error deleting grant:', error);
    throw error;
  }
};

// Publications
export const getPublications = async (): Promise<Publication[]> => {
  try {
    const q = query(collection(db, 'publications'), orderBy('year', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Publication[];
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
};

export const addPublication = async (publication: Omit<Publication, 'id'>) => {
  try {
    await addDoc(collection(db, 'publications'), publication);
  } catch (error) {
    console.error('Error adding publication:', error);
    throw error;
  }
};

export const updatePublication = async (id: string, publication: Partial<Publication>) => {
  try {
    const docRef = doc(db, 'publications', id);
    await updateDoc(docRef, publication);
  } catch (error) {
    console.error('Error updating publication:', error);
    throw error;
  }
};

export const deletePublication = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'publications', id));
  } catch (error) {
    console.error('Error deleting publication:', error);
    throw error;
  }
};

// Admin Roles
export const getAdminRoles = async (): Promise<AdminRole[]> => {
  try {
    const q = query(collection(db, 'adminRoles'), orderBy('period', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AdminRole[];
  } catch (error) {
    console.error('Error fetching admin roles:', error);
    return [];
  }
};

export const addAdminRole = async (role: Omit<AdminRole, 'id'>) => {
  try {
    await addDoc(collection(db, 'adminRoles'), role);
  } catch (error) {
    console.error('Error adding admin role:', error);
    throw error;
  }
};

export const updateAdminRole = async (id: string, role: Partial<AdminRole>) => {
  try {
    const docRef = doc(db, 'adminRoles', id);
    await updateDoc(docRef, role);
  } catch (error) {
    console.error('Error updating admin role:', error);
    throw error;
  }
};

export const deleteAdminRole = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'adminRoles', id));
  } catch (error) {
    console.error('Error deleting admin role:', error);
    throw error;
  }
};

// Patents
export const getPatents = async (): Promise<Patent[]> => {
  try {
    const q = query(collection(db, 'patents'), orderBy('year', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Patent[];
  } catch (error) {
    console.error('Error fetching patents:', error);
    return [];
  }
};

export const addPatent = async (patent: Omit<Patent, 'id'>) => {
  try {
    await addDoc(collection(db, 'patents'), patent);
  } catch (error) {
    console.error('Error adding patent:', error);
    throw error;
  }
};

export const updatePatent = async (id: string, patent: Partial<Patent>) => {
  try {
    const docRef = doc(db, 'patents', id);
    await updateDoc(docRef, patent);
  } catch (error) {
    console.error('Error updating patent:', error);
    throw error;
  }
};

export const deletePatent = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'patents', id));
  } catch (error) {
    console.error('Error deleting patent:', error);
    throw error;
  }
};

// Awards
export const getAwards = async (): Promise<Award[]> => {
  try {
    const q = query(collection(db, 'awards'), orderBy('year', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Award[];
  } catch (error) {
    console.error('Error fetching awards:', error);
    return [];
  }
};

export const addAward = async (award: Omit<Award, 'id'>) => {
  try {
    await addDoc(collection(db, 'awards'), award);
  } catch (error) {
    console.error('Error adding award:', error);
    throw error;
  }
};

export const updateAward = async (id: string, award: Partial<Award>) => {
  try {
    const docRef = doc(db, 'awards', id);
    await updateDoc(docRef, award);
  } catch (error) {
    console.error('Error updating award:', error);
    throw error;
  }
};

export const deleteAward = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'awards', id));
  } catch (error) {
    console.error('Error deleting award:', error);
    throw error;
  }
};

// Events
export const getEvents = async (): Promise<Event[]> => {
  try {
    const q = query(collection(db, 'events'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const addEvent = async (event: Omit<Event, 'id'>) => {
  try {
    await addDoc(collection(db, 'events'), event);
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const updateEvent = async (id: string, event: Partial<Event>) => {
  try {
    const docRef = doc(db, 'events', id);
    await updateDoc(docRef, event);
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'events', id));
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Gallery
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as GalleryImage[];
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
};

export const addGalleryImage = async (image: Omit<GalleryImage, 'id'>) => {
  try {
    await addDoc(collection(db, 'gallery'), {
      ...image,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error adding gallery image:', error);
    throw error;
  }
};

export const deleteGalleryImage = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'gallery', id));
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    throw error;
  }
};
