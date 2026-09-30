import { describe, it, expect } from 'vitest';
import { GovernmentDataProvider } from '../governmentDataProvider';

describe('GovernmentDataProvider', () => {
  it('should search Maharashtra location records', async () => {
    const results = await GovernmentDataProvider.searchLocation('Amravati');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].district).toBe('Amravati');
  });

  it('should return official 7/12 record for Mahuli village', async () => {
    const res = await GovernmentDataProvider.getRecordOfRights('Amravati', 'Amravati', 'Mahuli', '142/1A');
    expect(res.is_available_online).toBe(true);
    expect(res.record).not.toBeNull();
    expect(res.record?.survey_gat_no).toBe('142/1A');
  });

  it('should return official Property Card for Wakad CTS 1042', async () => {
    const res = await GovernmentDataProvider.getPropertyCard('Pune', 'CTS 1042');
    expect(res.is_available_online).toBe(true);
    expect(res.record?.cts_no).toBe('CTS 1042');
  });
});
