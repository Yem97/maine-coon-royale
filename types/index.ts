export interface Kitten {
  id: string;
  name: string;
  gender: 'male' | 'female';
  age_weeks: number;
  color: string;
  pattern?: string;
  price_usd: number;
  status: 'available' | 'reserved' | 'sold';
  description?: string;
  image_url?: string;
  gallery_images?: string[];
  is_featured?: boolean;
  created_at?: string;
}

export interface GalleryPhoto {
  id: string;
  title?: string;
  description?: string;
  image_url: string;
  category?: string;
  created_at?: string;
}

export interface Review {
  id: string;
  reviewer_name: string;
  reviewer_country: string;
  reviewer_email?: string;
  rating: number;
  review_text: string;
  kitten_name?: string;
  is_approved: boolean;
  admin_reply?: string;
  created_at?: string;
}

export interface Inquiry {
  id: string;
  full_name: string;
  email: string;
  whatsapp?: string;
  country: string;
  interest: string;
  kitten_name?: string;
  message?: string;
  is_read: boolean;
  created_at?: string;
}

export interface FacebookPost {
  id: string;
  content: string;
  image_url?: string;
  post_url?: string;
  likes?: number;
  posted_at?: string;
  created_at?: string;
}

export interface AdminProfile {
  id: string;
  full_name: string;
  tagline: string;
  bio: string;
  location: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  facebook_url?: string;
  instagram_url?: string;
  avatar_url?: string;
  years_breeding: number;
  kittens_placed: number;
  certifications?: string[];
  updated_at?: string;
}

export interface AdminStats {
  totalKittens: number;
  availableCount: number;
  reservedCount: number;
  totalInquiries: number;
  unreadInquiries: number;
  pendingReviews: number;
  totalGallery: number;
}
