import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DisclaimerBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-amber-500/10 border-y border-amber-500/20 text-amber-900 px-4 py-2.5 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center space-x-2.5">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1 leading-tight">
          <span className="font-semibold text-amber-950 mr-1.5">{t('footer_disclaimer_title')}:</span>
          <span>{t('footer_disclaimer_text')}</span>
        </div>
      </div>
    </div>
  );
};
