export type UserRole = 'USER' | 'OWNER' | 'AGENT' | 'ADMIN';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export type PropertyType = 
  | 'Apartment'
  | 'Flat'
  | 'Villa'
  | 'Independent House'
  | 'Plot'
  | 'Agricultural Land'
  | 'Commercial'
  | 'Office'
  | 'Shop'
  | 'Warehouse'
  | 'Industrial'
  | 'Farmhouse';

export type ListingType = 'Sale' | 'Rent' | 'Lease';

export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'Upcoming';

export type FurnishingStatus = 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';

export type ListingVerificationStatus = 'Verified' | 'Pending Review' | 'Unverified' | 'Rejected';

export interface Property {
  id: string;
  title: string;
  description: string;
  property_type: PropertyType;
  listing_type: ListingType;
  price: number;
  price_per_sqft: number;
  carpet_area: number;
  built_up_area?: number;
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  floor?: number;
  total_floors?: number;
  furnishing?: FurnishingStatus;
  parking?: boolean;
  possession_status: PossessionStatus;
  construction_year?: number;
  property_age_years?: number;
  facing?: string;
  amenities: string[];
  address: string;
  locality: string;
  city: string;
  district: string;
  division: string;
  latitude: number;
  longitude: number;
  images: string[];
  videos?: string[];
  owner_id: string;
  owner_name: string;
  owner_type: 'Owner' | 'Agent' | 'Builder';
  owner_phone?: string;
  verification_status: ListingVerificationStatus;
  rera_id?: string;
  is_demo_data: boolean;
  data_provenance_badge: '✓ Verified Listing' | 'Owner Listed' | 'Agent Listed' | 'Demo Data' | 'Government Data';
  created_at: string;
  updated_at: string;
}

export interface Division {
  id: string;
  name_en: string;
  name_mr: string;
  name_hi: string;
  code: string;
}

export interface District {
  id: string;
  division_id: string;
  name_en: string;
  name_mr: string;
  name_hi: string;
  code: string;
  headquarters: string;
  latitude: number;
  longitude: number;
}

export interface Locality {
  id: string;
  city_name: string;
  district_name: string;
  name_en: string;
  name_mr: string;
  name_hi: string;
  pincode: string;
  avg_price_per_sqft?: number;
  median_price?: number;
  total_listings_count?: number;
  latitude: number;
  longitude: number;
  description?: string;
  nearby_schools?: string[];
  nearby_hospitals?: string[];
  nearby_transit?: string[];
}

export type DataSourceType = 
  | 'Verified Transaction'
  | 'Government Open Data'
  | 'Portal Asking Price'
  | 'User Submitted'
  | 'AI Estimate';

export interface MarketDataRecord {
  id: string;
  district: string;
  city: string;
  locality: string;
  property_type: PropertyType;
  year: number; // 2024, 2025, 2026
  quarter?: string; // 'Q1', 'Q2', 'Q3', 'Q4'
  transaction_count?: number;
  median_price: number;
  average_price: number;
  median_price_per_sqft: number;
  average_price_per_sqft: number;
  source_name: string;
  source_type: DataSourceType;
  verification_status: 'Verified' | 'Public Dataset' | 'Asking Price' | 'Estimate';
  sample_size?: number;
  last_updated: string;
}

export type GovernmentRecordType = 
  | '7/12 Extract (Satbara)'
  | '8A Extract'
  | 'Property Card (Malmatta Patrak)'
  | 'Mutation Entry (e-Hakk)'
  | 'Cadastral Map';

export interface GovernmentRecord {
  id: string;
  district: string;
  taluka: string;
  village: string;
  survey_gat_no?: string;
  cts_no?: string;
  record_type: GovernmentRecordType;
  owner_names_masked: string; // E.g., "R**** S**** & Others" for privacy
  total_area_hectares_or_sqm: string;
  assessment_rs?: number;
  encumbrance_status: 'No Registered Encumbrance' | 'Bank Charge Registered' | 'Under Verification';
  last_mutation_date?: string;
  official_source_url: string;
  retrieved_at: string;
  verification_status: 'Official Dataset' | 'Public Portal Lookup' | 'Demo Sample';
  disclaimer: string;
}

export interface ReraProject {
  id: string;
  rera_number: string; // E.g., P50500012345
  project_name: string;
  promoter_name: string;
  district: string;
  city: string;
  locality: string;
  proposed_completion_date: string;
  project_status: 'ONGOING' | 'COMPLETED' | 'EXTENDED' | 'LAPSED';
  total_units: number;
  official_maharera_url: string;
  is_verified: boolean;
}

export interface PropertyInquiry {
  id: string;
  property_id: string;
  property_title: string;
  user_id?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  preferred_contact_time: string;
  status: 'New' | 'Read' | 'Responded' | 'Closed';
  created_at: string;
}

export interface AISourceCitation {
  id: string;
  title: string;
  type: 'Property Listing' | 'Market Data' | 'Government Dataset' | 'MahaRERA Record' | 'Public Guide';
  url_or_ref: string;
  date: string;
  confidence: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: AISourceCitation[];
  inline_properties?: Property[];
  timestamp: string;
}

export interface AIConversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages: AIMessage[];
}

export interface DataImportRecord {
  id: string;
  file_name: string;
  source_name: string;
  source_url?: string;
  import_date: string;
  dataset_version: string;
  record_count: number;
  status: 'SUCCESS' | 'FAILED' | 'PARTIAL';
  error_logs?: string;
  imported_by: string;
  checksum: string;
}
