-- MAHABHARATA / MAHARASHTRA REAL ESTATE DATABASE SCHEMA
-- Database: PostgreSQL 15+ / Supabase Compatible
-- Enforces Row Level Security (RLS) & Data Provenance Standards

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ROLES & PROFILES
CREATE TYPE user_role AS ENUM ('USER', 'OWNER', 'AGENT', 'ADMIN');

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role DEFAULT 'USER',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MAHARASHTRA LOCATION HIERARCHY
CREATE TABLE divisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE districts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    division_id UUID REFERENCES divisions(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    headquarters TEXT NOT NULL,
    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6)
);

CREATE TABLE talukas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id UUID REFERENCES districts(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    code VARCHAR(10)
);

CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id UUID REFERENCES districts(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    name_hi TEXT NOT NULL
);

CREATE TABLE localities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    pincode VARCHAR(10),
    avg_price_per_sqft NUMERIC(10,2),
    median_price NUMERIC(12,2),
    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6),
    description TEXT
);

CREATE TABLE villages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    taluka_id UUID REFERENCES talukas(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    official_lgd_code VARCHAR(20)
);

-- 3. PROPERTY MARKETPLACE
CREATE TYPE property_type_enum AS ENUM (
    'Apartment', 'Flat', 'Villa', 'Independent House', 'Plot', 
    'Agricultural Land', 'Commercial', 'Office', 'Shop', 'Warehouse', 'Industrial', 'Farmhouse'
);

CREATE TYPE listing_type_enum AS ENUM ('Sale', 'Rent', 'Lease');

CREATE TYPE listing_verification_enum AS ENUM ('Verified', 'Pending Review', 'Unverified', 'Rejected');

CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    property_type property_type_enum NOT NULL,
    listing_type listing_type_enum NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    price_per_sqft NUMERIC(10,2) NOT NULL,
    carpet_area NUMERIC(10,2) NOT NULL,
    built_up_area NUMERIC(10,2),
    bedrooms INT,
    bathrooms INT,
    balconies INT,
    floor INT,
    total_floors INT,
    furnishing TEXT,
    parking BOOLEAN DEFAULT FALSE,
    possession_status TEXT NOT NULL,
    construction_year INT,
    facing TEXT,
    address TEXT NOT NULL,
    locality TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    division TEXT NOT NULL,
    latitude NUMERIC(9,6) NOT NULL,
    longitude NUMERIC(9,6) NOT NULL,
    owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    owner_type TEXT DEFAULT 'Owner',
    verification_status listing_verification_enum DEFAULT 'Pending Review',
    rera_id TEXT,
    is_demo_data BOOLEAN DEFAULT FALSE,
    data_provenance_badge TEXT DEFAULT 'Owner Listed',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    icon_name TEXT
);

CREATE TABLE property_amenities (
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (property_id, amenity_id)
);

-- 4. USER INTERACTIONS & INQUIRIES
CREATE TABLE favorites (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, property_id)
);

CREATE TABLE saved_searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    search_name TEXT NOT NULL,
    filters_json JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE property_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    preferred_contact_time TEXT,
    status TEXT DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. HISTORICAL MARKET DATA & SOURCES
CREATE TABLE market_data_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    source_url TEXT,
    license TEXT,
    last_checked DATE,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE market_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district TEXT NOT NULL,
    city TEXT NOT NULL,
    locality TEXT NOT NULL,
    property_type property_type_enum NOT NULL,
    year INT NOT NULL,
    quarter VARCHAR(5),
    transaction_count INT,
    median_price NUMERIC(12,2) NOT NULL,
    average_price NUMERIC(12,2) NOT NULL,
    median_price_per_sqft NUMERIC(10,2) NOT NULL,
    average_price_per_sqft NUMERIC(10,2) NOT NULL,
    source_name TEXT NOT NULL,
    source_type TEXT NOT NULL,
    verification_status TEXT NOT NULL,
    sample_size INT,
    last_updated DATE DEFAULT CURRENT_DATE
);

-- 6. GOVERNMENT LAND RECORDS & MAHARERA
CREATE TABLE government_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district TEXT NOT NULL,
    taluka TEXT NOT NULL,
    village TEXT NOT NULL,
    survey_gat_no TEXT,
    cts_no TEXT,
    record_type TEXT NOT NULL,
    owner_names_masked TEXT NOT NULL,
    total_area_hectares_or_sqm TEXT NOT NULL,
    assessment_rs NUMERIC(10,2),
    encumbrance_status TEXT NOT NULL,
    last_mutation_date DATE,
    official_source_url TEXT NOT NULL,
    retrieved_at TIMESTAMPTZ DEFAULT NOW(),
    verification_status TEXT NOT NULL,
    disclaimer TEXT NOT NULL
);

CREATE TABLE rera_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rera_number VARCHAR(50) UNIQUE NOT NULL,
    project_name TEXT NOT NULL,
    promoter_name TEXT NOT NULL,
    district TEXT NOT NULL,
    city TEXT NOT NULL,
    locality TEXT NOT NULL,
    proposed_completion_date DATE,
    project_status VARCHAR(20) DEFAULT 'ONGOING',
    total_units INT,
    official_maharera_url TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE
);

-- 7. AI ASSISTANT & CONVERSATIONS
CREATE TABLE ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role VARCHAR(10) NOT NULL,
    content TEXT NOT NULL,
    sources_json JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. AUDIT LOGS & IMPORTS
CREATE TABLE data_imports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name TEXT NOT NULL,
    source_name TEXT NOT NULL,
    source_url TEXT,
    import_date TIMESTAMPTZ DEFAULT NOW(),
    dataset_version VARCHAR(20),
    record_count INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'SUCCESS',
    error_logs TEXT,
    imported_by UUID REFERENCES profiles(id),
    checksum VARCHAR(64)
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id),
    action TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Public Read Access for Approved Properties
CREATE POLICY "Public properties read" ON properties 
    FOR SELECT USING (verification_status = 'Verified' OR is_demo_data = true);

-- Owners can modify their own listings
CREATE POLICY "Owner edit property" ON properties 
    FOR ALL USING (auth.uid() = owner_id);

-- Admin full access
CREATE POLICY "Admin full access" ON properties 
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND role = 'ADMIN')
    );
