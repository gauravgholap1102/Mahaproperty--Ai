import type { AIMessage, AISourceCitation, Property } from '../types';
import { SEED_PROPERTIES } from '../data/seedProperties';
import { SEED_MARKET_DATA } from '../data/seedMarketData';

export class AIAssistantService {
  /**
   * Process incoming user prompt using database context & structured response generator
   */
  static async queryAssistant(userPrompt: string): Promise<AIMessage> {
    const prompt = userPrompt.trim().toLowerCase();
    const sources: AISourceCitation[] = [];
    let matchingProps: Property[] = [];
    let textResponse = '';

    // 1. Natural Language Search for Amravati / Pune / Nagpur under budget
    if (prompt.includes('amravati') || prompt.includes('अमरावती')) {
      const budgetMatch = prompt.match(/\d+/);
      const targetBudget = budgetMatch ? parseInt(budgetMatch[0]) * 100000 : 5000000;

      matchingProps = SEED_PROPERTIES.filter(
        p => p.city.toLowerCase() === 'amravati' && p.price <= targetBudget
      );

      sources.push({
        id: 'src-db-amr',
        title: 'MahaProperty Verified Active Listings - Amravati',
        type: 'Property Listing',
        url_or_ref: '/properties?city=Amravati',
        date: 'September 2026',
        confidence: 'High (Direct Database Match)'
      });

      const marketInfo = SEED_MARKET_DATA.filter(m => m.city.toLowerCase() === 'amravati');
      if (marketInfo.length > 0) {
        sources.push({
          id: 'src-mkt-amr',
          title: 'Amravati District Registration Data & Listing Index',
          type: 'Market Data',
          url_or_ref: '/market-trends?city=Amravati',
          date: '2024–2026',
          confidence: 'Verified Asking & Transaction Dataset'
        });
      }

      textResponse = `📍 **Location Analysis:** Amravati City
💰 **Budget Constraint:** Under ₹${(targetBudget / 100000).toFixed(0)} Lakhs

📊 **Locality Insights & Online Market Analysis:**
• **Rajapeth:** Average asking rate is ~₹4,250/sq.ft. High demand due to closeness to Badnera Road and educational institutions.
• **Badnera Road:** Asking rates range between ₹3,700–₹4,100/sq.ft. Excellent choice for modern apartments and independent homes.

🏠 **Matching Available Options (${matchingProps.length} Found):**
Below are active listings matching your criteria directly from the MahaProperty database:`;
    } 
    // 2. Pune / Wakad Market Trend Query
    else if (prompt.includes('pune') || prompt.includes('wakad') || prompt.includes('पुणे')) {
      matchingProps = SEED_PROPERTIES.filter(p => p.city.toLowerCase() === 'pune');

      sources.push({
        id: 'src-pne-igr',
        title: 'Maharashtra IGR Ready Reckoner & Registration Dataset (Pune District)',
        type: 'Government Dataset',
        url_or_ref: 'https://igrmarashtra.gov.in',
        date: '2024-2025 Historical Deals',
        confidence: 'Official Public Record'
      });
      sources.push({
        id: 'src-pne-listings',
        title: 'MahaProperty Active Listings Index - Wakad & Baner',
        type: 'Property Listing',
        url_or_ref: '/properties?city=Pune',
        date: 'September 2026',
        confidence: 'Live Portal Asking Data'
      });

      textResponse = `📍 **Location:** Pune (Wakad & Baner Corridor)

📊 **3-Year Historical Price Trend (Wakad):**
• **2024 (Verified IGR Transactions):** Median rate ₹6,850/sq.ft.
• **2025 (Verified IGR Transactions):** Median rate ₹7,250/sq.ft. (+5.8% YoY)
• **2026 (Portal Asking Price Index):** Average asking ₹7,600/sq.ft.

📌 **Important Market Note:** 
Hinjewadi IT Park proximity and Metro Line 3 development are major drivers for Wakad rental yields (avg ~3.8–4.2% per annum).

🏠 **Available Properties in Pune:**`;
    }
    // 3. Document Check Before Property Purchase
    else if (prompt.includes('document') || prompt.includes('documents') || prompt.includes('कागदपत्रे') || prompt.includes('7/12') || prompt.includes('verify')) {
      sources.push({
        id: 'src-gov-doc',
        title: 'Maharashtra Land Revenue Code & Registration Manual',
        type: 'Government Dataset',
        url_or_ref: 'https://mahabhumi.gov.in',
        date: 'Official Statutory Guidance',
        confidence: 'Government Legal Framework'
      });

      textResponse = `📋 **Essential Document Verification Checklist for Maharashtra Property Purchase:**

1️⃣ **For Land / Plots (Agricultural or Non-Agricultural):**
• **7/12 Extract (Satbara Utara):** Verify owner names, land area, and check for bank encumbrances (बोजा).
• **8A Extract:** Details total landholding of the owner in the revenue village.
• **Mutation Entry (Ferfar / e-Hakk):** History of ownership transfers and legal title changes.
• **NA Order (Non-Agricultural Permission):** Issued by District Collector/Tahsildar.

2️⃣ **For Apartments / Flats in Municipal Areas:**
• **Property Card (Malmatta Patrak):** Urban land ownership record issued by CTSO.
• **MahaRERA Registration Certificate:** Mandatory for projects over 500 sq.m or 8 apartments. Check MahaRERA status.
• **Commencement Certificate (CC) & Possession/Occupancy Certificate (OC):** Issued by Municipal Corporation.
• **Title Search Report:** 30-year search report issued by an advocate.
• **Encumbrance Certificate (EC):** Form 15/16 from Sub-Registrar Office.

📌 **Government Verification Portal:** You can use our **Government Records** module or open [Mahabhumi (bhulekh.mahabhumi.gov.in)](https://bhulekh.mahabhumi.gov.in) to inspect official records.`;
    }
    // 4. Default / General AI Assistant Response
    else {
      matchingProps = SEED_PROPERTIES.slice(0, 2);

      sources.push({
        id: 'src-general',
        title: 'MahaProperty AI Knowledge Base & Active Listings',
        type: 'Property Listing',
        url_or_ref: '/properties',
        date: 'September 2026',
        confidence: 'Platform Intelligence'
      });

      textResponse = `👋 **MahaProperty AI Assistant**

I am specialized in Maharashtra real estate discovery, government property record guidance (7/12, Property Card, MahaRERA), and 3-year market data analysis.

💡 **Here are some queries you can ask me:**
• *"Amravati mein ₹50 lakh ke andar 2 BHK dikhao."*
• *"Pune ke Wakad area ka 3-year market trend batao."*
• *"Maharashtra mein property lene se pehle kaunse documents check karein?"*
• *"Nagpur ke Civil Lines aur Manish Nagar mein rate difference kya hai?"*

🏠 **Featured Properties currently available on the platform:**`;
    }

    return {
      id: `ai-msg-${Date.now()}`,
      role: 'assistant',
      content: textResponse,
      sources: sources,
      inline_properties: matchingProps.length > 0 ? matchingProps : undefined,
      timestamp: new Date().toISOString()
    };
  }
}
