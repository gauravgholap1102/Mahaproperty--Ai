import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowUpRight } from 'lucide-react';
import { AIAssistantService } from '../../services/aiAssistantService';
import { AIMessage } from '../../types';
import { PropertyCard } from '../property/PropertyCard';
import { Link } from 'react-router-dom';

export const AIChatDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome-01',
      role: 'assistant',
      content: 'Namaste! I am your MahaProperty AI Assistant. Ask me about property prices in Amravati, Pune, Nagpur, 3-year price trends, or 7/12 land document verification.',
      timestamp: new Date().toISOString()
    }
  ]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setLoading(true);

    try {
      const assistantRes = await AIAssistantService.queryAssistant(query);
      setMessages(prev => [...prev, assistantRes]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs sm:text-sm px-4 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center space-x-2.5 border-2 border-emerald-400/40 group"
        >
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
          </div>
          <span className="tracking-wide">Ask MahaProperty AI</span>
        </button>
      )}

      {/* Floating Chat Drawer Box */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[550px] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-navy-900 text-white p-4 flex items-center justify-between border-b border-navy-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-none">MahaProperty AI</h4>
                <p className="text-[10px] text-emerald-400 font-medium mt-0.5">Maharashtra Property Intelligence</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Link 
                to="/ai-assistant" 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg text-xs flex items-center space-x-1"
                title="Open full page chat"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50">
            {messages.map(msg => (
              <div 
                key={msg.id}
                className={`flex space-x-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}

                <div 
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed space-y-2 ${
                    msg.role === 'user'
                      ? 'bg-navy-900 text-white font-medium rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-sm rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.content}</div>

                  {/* Render Inline Matching Properties */}
                  {msg.inline_properties && msg.inline_properties.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <div className="font-bold text-slate-900 text-[11px]">Matching Listings:</div>
                      <div className="space-y-2">
                        {msg.inline_properties.slice(0, 2).map(prop => (
                          <div key={prop.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-slate-900 text-[11px] truncate max-w-[180px]">{prop.title}</div>
                              <div className="text-[10px] text-emerald-700 font-bold">₹{prop.price.toLocaleString('en-IN')}</div>
                            </div>
                            <Link 
                              to={`/properties/${prop.id}`}
                              onClick={() => setIsOpen(false)}
                              className="text-[10px] bg-emerald-600 text-white px-2 py-1 rounded-md font-semibold"
                            >
                              View
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sources Citations */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 space-y-1">
                      <div className="font-bold text-slate-700">Sources:</div>
                      {msg.sources.map(src => (
                        <div key={src.id} className="flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{src.title} ({src.date})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs italic">
                <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>Querying database & verified sources...</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Pill Shortcuts */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center space-x-1.5 overflow-x-auto text-[11px]">
            <button 
              onClick={() => handleSend('Amravati mein 50 lakh ke andar 2 BHK dikhao')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              Amravati 2 BHK
            </button>
            <button 
              onClick={() => handleSend('Pune ke Wakad area ka market trend batao')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              Wakad Trend
            </button>
            <button 
              onClick={() => handleSend('Property document checklist')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              7/12 Checklist
            </button>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input 
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about Maharashtra real estate..."
              className="flex-1 bg-slate-100 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button 
              onClick={() => handleSend()}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl shadow transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
