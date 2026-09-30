import type { Property, MarketDataRecord } from '../types';
import { SEED_PROPERTIES } from '../data/seedProperties';
import { SEED_MARKET_DATA } from '../data/seedMarketData';

export class MarketAnalyticsService {
  /**
   * Get historical market trend records for a locality / city
   */
  static getHistoricalData(city: string, locality?: string): MarketDataRecord[] {
    return SEED_MARKET_DATA.filter(m => {
      const matchCity = m.city.toLowerCase() === city.toLowerCase();
      if (!locality) return matchCity;
      return matchCity && m.locality.toLowerCase() === locality.toLowerCase();
    });
  }

  /**
   * Get price intelligence for a specific property compared to locality median
   */
  static getPriceIntelligence(property: Property): {
    askingPriceSqft: number;
    localityMedianSqft?: number;
    localitySampleCount: number;
    historicalTrend: MarketDataRecord[];
    comparisonStatus: 'Competitive' | 'Above Locality Average' | 'Fair Market Rate' | 'Insufficient Data';
    dataProvenances: string[];
  } {
    const localityProps = SEED_PROPERTIES.filter(
      p => p.city.toLowerCase() === property.city.toLowerCase() &&
           p.locality.toLowerCase() === property.locality.toLowerCase()
    );

    const historical = this.getHistoricalData(property.city, property.locality);

    let localityMedianSqft: number | undefined;
    if (localityProps.length > 0) {
      const pricesSqft = localityProps.map(p => p.price_per_sqft).sort((a, b) => a - b);
      const mid = Math.floor(pricesSqft.length / 2);
      localityMedianSqft = pricesSqft.length % 2 !== 0 ? pricesSqft[mid] : (pricesSqft[mid - 1] + pricesSqft[mid]) / 2;
    }

    let comparisonStatus: 'Competitive' | 'Above Locality Average' | 'Fair Market Rate' | 'Insufficient Data' = 'Fair Market Rate';
    if (localityMedianSqft) {
      if (property.price_per_sqft < localityMedianSqft * 0.95) {
        comparisonStatus = 'Competitive';
      } else if (property.price_per_sqft > localityMedianSqft * 1.08) {
        comparisonStatus = 'Above Locality Average';
      }
    } else {
      comparisonStatus = 'Insufficient Data';
    }

    const provenances = Array.from(new Set(historical.map(h => h.source_name)));
    if (provenances.length === 0) {
      provenances.push('MahaProperty Portal Asking Listings');
    }

    return {
      askingPriceSqft: property.price_per_sqft,
      localityMedianSqft,
      localitySampleCount: localityProps.length,
      historicalTrend: historical,
      comparisonStatus,
      dataProvenances: provenances
    };
  }
}
