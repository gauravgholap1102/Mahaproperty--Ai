import React, { useState } from 'react';
import { SlidersHorizontal, Save, Bot, ShieldCheck } from 'lucide-react';

export const AIControlPanel: React.FC = () => {
  const [model, setModel] = useState('gpt-4o-mini');
  const [temperature, setTemperature] = useState(0.2);
  const [dailyLimit, setDailyLimit] = useState(500);
  const [maxTokens, setMaxTokens] = useState(1500);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are MahaProperty AI Assistant, a specialized real estate intelligence advisor for Maharashtra. Always cite sources, distinguish fact vs estimate, and NEVER fabricate transaction records."
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-8 space-y-6">
      
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-navy-900 flex items-center space-x-2">
          <Bot className="w-6 h-6 text-emerald-600" />
          <span>MahaProperty AI Assistant Engine Configuration</span>
        </h2>
        <p className="text-xs text-slate-500">
          Admin-only controls to tune system prompts, data constraints, temperature, model selection, and daily API usage limits.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* Model & Temperature Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <label className="block font-bold text-slate-700 mb-1">AI Engine Model</label>
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
            >
              <option value="gpt-4o-mini">OpenAI GPT-4o Mini (Fast & Cost Efficient)</option>
              <option value="gpt-4o">OpenAI GPT-4o (Deep Reasoning)</option>
              <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Temperature ({temperature})</label>
            <input 
              type="range"
              min="0.0"
              max="0.7"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0.0 (Strict Facts)</span>
              <span>0.7 (Creative)</span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Daily Query Limit / User</label>
            <input 
              type="number"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(parseInt(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
            />
          </div>
        </div>

        {/* System Prompt Box */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Base AI System Prompt</label>
          <textarea 
            rows={5}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs font-mono text-slate-800 leading-relaxed focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Data Source Checkboxes */}
        <div className="space-y-2">
          <label className="block font-bold text-slate-700">Allowed Data Context Sources</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <label className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
              <span className="font-semibold text-slate-800">Active Property Database Listings</span>
            </label>
            <label className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
              <span className="font-semibold text-slate-800">3-Year Ready Reckoner Market Trends</span>
            </label>
            <label className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
              <span className="font-semibold text-slate-800">Mahabhumi Document Verification Rules</span>
            </label>
            <label className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
              <span className="font-semibold text-slate-800">MahaRERA Project Registry Data</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          {saved && (
            <span className="text-emerald-700 font-bold text-xs flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span>AI Engine Parameters Saved!</span>
            </span>
          )}
          <button 
            type="submit"
            className="ml-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save AI Controls</span>
          </button>
        </div>

      </form>

    </div>
  );
};
