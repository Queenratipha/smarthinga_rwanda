import React from 'react';
import { LeafIcon } from './icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { TFunction } from '../hooks/useLocalization';

interface HeaderProps {
    language: 'en' | 'rw';
    setLanguage: (lang: 'en' | 'rw') => void;
    t: TFunction;
}


export const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <LeafIcon className="w-8 h-8 text-[#2C5234]" />
            <span className="text-2xl font-bold text-[#2C5234]">SmartHinga Rwanda</span>
          </div>
          <LanguageSwitcher selectedLanguage={language} onLanguageChange={setLanguage} />
        </div>
      </div>
    </header>
  );
};