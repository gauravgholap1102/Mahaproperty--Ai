import { GovernmentRecord, ReraProject } from '../types';

export const OFFICIAL_GOVT_DISCLAIMER = "Government record information is displayed for informational purposes only. Verify the latest official record on the official Maharashtra government portals (Mahabhumi / Mahakosh / MahaRERA) before making any legal or financial decision.";

export const SEED_GOVERNMENT_RECORDS: GovernmentRecord[] = [
  {
    id: 'gov-rec-01',
    district: 'Amravati',
    taluka: 'Amravati',
    village: 'Mahuli',
    survey_gat_no: '142/1A',
    record_type: '7/12 Extract (Satbara)',
    owner_names_masked: 'R**** D**** Deshmukh & 2 Others',
    total_area_hectares_or_sqm: '0.4500 Hectares (Irrigated Agricultural / Non-Agricultural Converted)',
    assessment_rs: 125,
    encumbrance_status: 'Bank Charge Registered',
    last_mutation_date: '2025-04-12',
    official_source_url: 'https://bhulekh.mahabhumi.gov.in',
    retrieved_at: '2026-09-15T14:30:00Z',
    verification_status: 'Official Dataset',
    disclaimer: OFFICIAL_GOVT_DISCLAIMER
  },
  {
    id: 'gov-rec-02',
    district: 'Pune',
    taluka: 'Haveli',
    village: 'Wakad',
    survey_gat_no: '88/2B',
    cts_no: 'CTS 1042',
    record_type: 'Property Card (Malmatta Patrak)',
    owner_names_masked: 'V**** K**** Builders & Developers LLP',
    total_area_hectares_or_sqm: '1,250.00 Sq.Mtrs',
    encumbrance_status: 'No Registered Encumbrance',
    last_mutation_date: '2026-02-18',
    official_source_url: 'https://digisatbara.mahabhumi.gov.in',
    retrieved_at: '2026-09-20T10:15:00Z',
    verification_status: 'Public Portal Lookup',
    disclaimer: OFFICIAL_GOVT_DISCLAIMER
  },
  {
    id: 'gov-rec-03',
    district: 'Nagpur',
    taluka: 'Nagpur Urban',
    village: 'Civil Lines',
    cts_no: 'CTS 412',
    record_type: 'Mutation Entry (e-Hakk)',
    owner_names_masked: 'S**** S**** Sharma',
    total_area_hectares_or_sqm: '480.00 Sq.Mtrs',
    encumbrance_status: 'No Registered Encumbrance',
    last_mutation_date: '2025-11-05',
    official_source_url: 'https://mahabhumi.gov.in/e-Hakk',
    retrieved_at: '2026-09-18T16:00:00Z',
    verification_status: 'Official Dataset',
    disclaimer: OFFICIAL_GOVT_DISCLAIMER
  }
];

export const SEED_RERA_PROJECTS: ReraProject[] = [
  {
    id: 'rera-01',
    rera_number: 'P50500098765',
    project_name: 'Rajapeth Elegance Phase 1',
    promoter_name: 'Deshmukh Developers & Infra',
    district: 'Amravati',
    city: 'Amravati',
    locality: 'Rajapeth',
    proposed_completion_date: '2026-12-31',
    project_status: 'ONGOING',
    total_units: 36,
    official_maharera_url: 'https://maharera.mahaonline.gov.in',
    is_verified: true
  },
  {
    id: 'rera-02',
    rera_number: 'P52100024680',
    project_name: 'Wakad Green Heights',
    promoter_name: 'Skyline Buildcon Pune',
    district: 'Pune',
    city: 'Pune',
    locality: 'Wakad',
    proposed_completion_date: '2025-06-30',
    project_status: 'COMPLETED',
    total_units: 120,
    official_maharera_url: 'https://maharera.mahaonline.gov.in',
    is_verified: true
  },
  {
    id: 'rera-03',
    rera_number: 'P50500045678',
    project_name: 'Civil Lines Heritage Towers',
    promoter_name: 'Vidarbha Premium Housing Corp',
    district: 'Nagpur',
    city: 'Nagpur',
    locality: 'Civil Lines',
    proposed_completion_date: '2026-03-31',
    project_status: 'ONGOING',
    total_units: 48,
    official_maharera_url: 'https://maharera.mahaonline.gov.in',
    is_verified: true
  }
];
