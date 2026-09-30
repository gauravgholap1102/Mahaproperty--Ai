import { describe, it, expect } from 'vitest';
import { MarketAnalyticsService } from '../marketAnalytics';
import { SEED_PROPERTIES } from '../../data/seedProperties';

describe('MarketAnalyticsService', () => {
  it('should retrieve historical market data for Wakad Pune', () => {
    const data = MarketAnalyticsService.getHistoricalData('Pune', 'Wakad');
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].city).toBe('Pune');
    expect(data[0].locality).toBe('Wakad');
  });

  it('should compute price intelligence for Amravati property', () => {
    const sampleProp = SEED_PROPERTIES[0];
    const intel = MarketAnalyticsService.getPriceIntelligence(sampleProp);
    
    expect(intel.askingPriceSqft).toBe(sampleProp.price_per_sqft);
    expect(intel.dataProvenances.length).toBeGreaterThan(0);
    expect(['Competitive', 'Above Locality Average', 'Fair Market Rate', 'Insufficient Data']).toContain(intel.comparisonStatus);
  });
});
