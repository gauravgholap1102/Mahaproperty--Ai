import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ShieldCheck, Database, FileCheck, Plus, Trash2, ExternalLink } from 'lucide-react';
import { AIAssistantService } from '../../services/aiAssistantService';
import { AIMessage, AIConversation } from '../../types';
import { PropertyCard } from '../property/PropertyCard';

export const AIChatInterface: React.FC = () => {
  const [conversations, setConversations] = useState<AIConversation[]>([
    {
      id: 'conv-1',
      title: 'Amravati 2 BHK & Pune Trends Search',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      messages: [
        {
          id: 'welcome-full',
          role: 'assistant',
          content: 'Welcome to **MahaProperty AI Assistant**! Ask me natural language questions about property availability in Maharashtra, locality market statistics, or legal record checklists.',
          timestamp: new Date().toISOString()
        }
      ]
    }
  ]);

  const [activeConvId, setActiveConvId] = useState<string>('conv-1');
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSend = async (queryText?: string) => {
    const query = queryText || inputPrompt;
    if (!query.trim()) return;

    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toISOString()
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConvId) {
        return {
          ...conv,
          messages: [...conv.messages, userMsg]
        };
      }
      return conv;
    }));

    if (!queryText) setInputPrompt('');
    setLoading(true);

    try {
      const assistantRes = await AIAssistantService.queryAssistant(query);
      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConvId) {
          return {
            ...conv,
            messages: [...conv.messages, assistantRes]
          };
        }
        return conv;
      }));
    } finally {
      setLoading(false);
    }
  };

  const createNewChat = () => {
    const newConv: AIConversation = {
      id: `conv-${Date.now()}`,
      title: 'New Conversation',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      messages: [
        {
          id: `w-${Date.now()}`,
          role: 'assistant',
          content: 'Hello! What Maharashtra property details can I analyze for you today?',
          timestamp: new Date().toISOString()
        }
      ]
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConvId(newConv.id);
  };

  const deleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (conversations.length <= 1) return;
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConvId === id) {
      setActiveConvId(conversations[0].id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-4 h-[750px]">
        
        {/* Left Sidebar: Conversations History & Prompts */}
        <div className="lg:col-span-1 bg-slate-900 text-slate-200 p-4 border-r border-slate-800 flex flex-col justify-between hidden lg:flex">
          
          <div className="space-y-4">
            <button 
              onClick={createNewChat}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl shadow flex items-center justify-center space-x-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Conversation</span>
            </button>

            <div className="pt-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Conversation History
              </div>
              <div className="space-y-1.5 overflow-y-auto max-h-[420px]">
                {conversations.map(c => (
                  <div
                    key={c.id}
                    onClick={() => setActiveConvId(c.id)}
                    className={`p-3 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      c.id === activeConvId ? 'bg-navy-800 text-emerald-400 font-semibold border border-emerald-500/30' : 'hover:bg-navy-800/60 text-slate-300'
                    }`}
                  >
                    <span className="truncate flex-1">{c.title}</span>
                    <button 
                      onClick={(e) => deleteChat(c.id, e)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Provenance Badge */}
          <div className="bg-navy-950 p-3 rounded-xl border border-navy-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Data Provenance Guard</span>
            </div>
            <p className="text-[10px]">
              AI answers are strictly tied to verified database records and public government portals. No synthetic transactions generated.
            </p>
          </div>

        </div>

        {/* Right Main Chat Interface */}
        <div className="lg:col-span-3 flex flex-col h-full bg-slate-50">
          
          {/* Top Chat Header */}
          <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-navy-900 text-sm sm:text-base">MahaProperty AI Assistant</h3>
                <p className="text-xs text-slate-500">Live Database Querying • 3-Year Analytics • Land Records Checklist</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            {activeConv.messages.map(msg => (
              <div 
                key={msg.id}
                className={`flex space-x-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                <div 
                  className={`max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-4 ${
                    msg.role === 'user'
                      ? 'bg-navy-900 text-white font-medium rounded-tr-none shadow-md'
                      : 'bg-white text-slate-900 border border-slate-200/90 shadow-sm rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.content}</div>

                  {/* Inline Matching Property Cards */}
                  {msg.inline_properties && msg.inline_properties.length > 0 && (
                    <div className="pt-3 space-y-3">
                      <div className="font-bold text-slate-900 text-xs tracking-wider uppercase text-emerald-700">
                        Matching Database Property Listings:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {msg.inline_properties.map(prop => (
                          <PropertyCard key={prop.id} property={prop} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sources Citation List */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Retrieved Sources & Data Provenance:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map(src => (
                          <span 
                            key={src.id}
                            className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-slate-200 flex items-center space-x-1"
                          >
                            <Database className="w-3 h-3 text-emerald-600" />
                            <span>{src.title}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-slate-700 rounded-xl flex items-center justify-center shrink-0 shadow">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-3 text-slate-500 text-xs italic bg-white p-3 rounded-xl border border-slate-200 w-fit">
                <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>Querying database, Ready Reckoner datasets, and land record specifications...</span>
              </div>
            )}
          </div>

          {/* Prompt Suggestions Bar */}
          <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto text-xs">
            <span className="font-bold text-slate-500 whitespace-nowrap">Try asking:</span>
            <button 
              onClick={() => handleSend('Amravati mein 50 lakh ke andar 2 BHK dikhao.')}
              className="bg-white hover:bg-emerald-50 text-slate-800 font-medium px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm whitespace-nowrap transition-colors"
            >
              "Amravati 2 BHK under ₹50 Lakh"
            </button>
            <button 
              onClick={() => handleSend('Pune ke Wakad area ka market trend batao.')}
              className="bg-white hover:bg-emerald-50 text-slate-800 font-medium px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm whitespace-nowrap transition-colors"
            >
              "Wakad 3-Year Price Trend"
            </button>
            <button 
              onClick={() => handleSend('Maharashtra mein property purchase se pehle kaunse documents check karne chahiye?')}
              className="bg-white hover:bg-emerald-50 text-slate-800 font-medium px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm whitespace-nowrap transition-colors"
            >
              "Property Document Checklist"
            </button>
          </div>

          {/* Chat Input Box */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex items-center space-x-3">
              <input 
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about properties, 3-year market prices, or 7/12 land records..."
                className="flex-1 bg-slate-50 border border-slate-300 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              <button 
                onClick={() => handleSend()}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
