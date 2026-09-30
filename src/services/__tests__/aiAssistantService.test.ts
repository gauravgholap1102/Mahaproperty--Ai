import { describe, it, expect } from 'vitest';
import { AIAssistantService } from '../aiAssistantService';

describe('AIAssistantService', () => {
  it('should answer natural language prompt for Amravati flats under budget', async () => {
    const res = await AIAssistantService.queryAssistant('Amravati mein 50 lakh ke andar 2 BHK dikhao');
    expect(res.role).toBe('assistant');
    expect(res.content).toContain('Amravati');
    expect(res.inline_properties).toBeDefined();
    expect(res.inline_properties?.length).toBeGreaterThan(0);
    expect(res.sources?.length).toBeGreaterThan(0);
  });

  it('should answer natural language prompt for Pune Wakad price trends', async () => {
    const res = await AIAssistantService.queryAssistant('Pune ke Wakad area ka market trend batao');
    expect(res.content).toContain('Wakad');
    expect(res.sources?.some(s => s.title.includes('Ready Reckoner'))).toBe(true);
  });
});
