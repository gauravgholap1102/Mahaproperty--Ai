import type { GovernmentRecord } from '../types';
import { SEED_GOVERNMENT_RECORDS } from '../data/seedGovernmentRecords';

export interface LocationSearchResult {
  district: string;
  taluka: string;
  village: string;
  official_lgd_code?: string;
}

export class GovernmentDataProvider {
  /**
   * Search Maharashtra Village / Taluka location records
   */
  static async searchLocation(query: string): Promise<LocationSearchResult[]> {
    const q = query.toLowerCase();
    const mockLocations: LocationSearchResult[] = [
      { district: 'Amravati', taluka: 'Amravati', village: 'Mahuli', official_lgd_code: '531092' },
      { district: 'Amravati', taluka: 'Amravati', village: 'Rajapeth Revenue Block', official_lgd_code: '531095' },
      { district: 'Pune', taluka: 'Haveli', village: 'Wakad', official_lgd_code: '556210' },
      { district: 'Pune', taluka: 'Haveli', village: 'Baner', official_lgd_code: '556214' },
      { district: 'Nagpur', taluka: 'Nagpur Urban', village: 'Civil Lines Circle', official_lgd_code: '534112' },
      { district: 'Thane', taluka: 'Thane', village: 'Majiwada', official_lgd_code: '551890' },
    ];
    return mockLocations.filter(
      loc => loc.district.toLowerCase().includes(q) || loc.village.toLowerCase().includes(q) || loc.taluka.toLowerCase().includes(q)
    );
  }

  /**
   * Search 7/12 (Record of Rights) by Survey/Gat Number or Village
   */
  static async getRecordOfRights(district: string, taluka: string, _village: string, surveyGatNo?: string): Promise<{
    record: GovernmentRecord | null;
    official_portal_link: string;
    is_available_online: boolean;
  }> {
    const officialPortal = 'https://bhulekh.mahabhumi.gov.in';
    const found = SEED_GOVERNMENT_RECORDS.find(
      r => r.district.toLowerCase() === district.toLowerCase() && 
           r.record_type.includes('7/12') &&
           (!surveyGatNo || r.survey_gat_no === surveyGatNo)
    );

    if (found) {
      return {
        record: found,
        official_portal_link: officialPortal,
        is_available_online: true
      };
    }

    return {
      record: null,
      official_portal_link: `${officialPortal}/?dist=${encodeURIComponent(district)}&tal=${encodeURIComponent(taluka)}`,
      is_available_online: false
    };
  }

  /**
   * Search Urban Property Card (Malmatta Patrak) by CTS Number
   */
  static async getPropertyCard(district: string, ctsNo: string): Promise<{
    record: GovernmentRecord | null;
    official_portal_link: string;
    is_available_online: boolean;
  }> {
    const officialPortal = 'https://digisatbara.mahabhumi.gov.in';
    const found = SEED_GOVERNMENT_RECORDS.find(
      r => r.district.toLowerCase() === district.toLowerCase() && 
           r.record_type.includes('Property Card') &&
           r.cts_no === ctsNo
    );

    if (found) {
      return {
        record: found,
        official_portal_link: officialPortal,
        is_available_online: true
      };
    }

    return {
      record: null,
      official_portal_link: officialPortal,
      is_available_online: false
    };
  }

  /**
   * Search Mutation Entry (e-Hakk)
   */
  static async getMutationInformation(_district: string, _mutationNoOrCts: string): Promise<{
    record: GovernmentRecord | null;
    official_portal_link: string;
    is_available_online: boolean;
  }> {
    const officialPortal = 'https://mahabhumi.gov.in/e-Hakk';
    const found = SEED_GOVERNMENT_RECORDS.find(
      r => r.record_type.includes('Mutation')
    );

    return {
      record: found || null,
      official_portal_link: officialPortal,
      is_available_online: !!found
    };
  }
}
