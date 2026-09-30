export interface DataSourceRegistryItem {
  id: string;
  name: string;
  description: string;
  source_url: string;
  license: string;
  last_checked: string;
  data_type: 'Government Official' | 'Public Open Data' | 'Listing Asking Prices' | 'Regulatory';
  active: boolean;
  notes: string;
}

export const DATA_SOURCE_REGISTRY: DataSourceRegistryItem[] = [
  {
    id: 'ds-mahabhumi',
    name: 'Maharashtra Government / Mahabhumi (Bhulekh & DigiSatbara)',
    description: 'Official Maharashtra land records portal providing access to 7/12 (Satbara), 8A extracts, Property Cards, and cadastral maps.',
    source_url: 'https://mahabhumi.gov.in',
    license: 'Government Public Information / Verification Portal',
    last_checked: '2026-09-28',
    data_type: 'Government Official',
    active: true,
    notes: 'Integration operates via documented API abstractions and official referral links. No automated CAPTCHA bypass or unauthorized scraping.'
  },
  {
    id: 'ds-data-gov-in',
    name: 'Government Open Data Platform India (data.gov.in)',
    description: 'National Open Data Portal publishing Maharashtra state master village codes, district boundaries, and municipal statistics.',
    source_url: 'https://data.gov.in',
    license: 'Government Open Data License - India (GODL)',
    last_checked: '2026-09-15',
    data_type: 'Public Open Data',
    active: true,
    notes: 'Provides authoritative location hierarchy datasets for Maharashtra districts, talukas, and revenue villages.'
  },
  {
    id: 'ds-igr-maharashtra',
    name: 'Maharashtra Registration & Stamps Department (IGR)',
    description: 'Inspector General of Registration Maharashtra public reports on stamp duty collections, circle rates (Ready Reckoner), and district volume counts.',
    source_url: 'https://igrmarashtra.gov.in',
    license: 'Public Statistical Publications',
    last_checked: '2026-09-20',
    data_type: 'Government Official',
    active: true,
    notes: 'Aggregated quarterly median rate statistics sourced from public Ready Reckoner and published volume summaries.'
  },
  {
    id: 'ds-maharera',
    name: 'MahaRERA (Maharashtra Real Estate Regulatory Authority)',
    description: 'Official regulatory portal for registered real estate projects, promoter disclosures, completion dates, and project compliance statuses across Maharashtra.',
    source_url: 'https://maharera.mahaonline.gov.in',
    license: 'Regulatory Public Disclosure',
    last_checked: '2026-09-29',
    data_type: 'Regulatory',
    active: true,
    notes: 'Used to cross-reference RERA project numbers and promoter credentials.'
  },
  {
    id: 'ds-mahaproperty-portal',
    name: 'MahaProperty AI Platform Listings',
    description: 'Direct user, owner, and verified agent property listings submitted on MahaProperty AI.',
    source_url: 'https://mahaproperty.ai',
    license: 'MahaProperty Platform Data License',
    last_checked: '2026-09-30',
    data_type: 'Listing Asking Prices',
    active: true,
    notes: 'Represents seller asking prices. Clearly separated from government transaction records in analytics.'
  }
];
