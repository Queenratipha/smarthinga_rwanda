import React from 'react';
import { GlobeIcon } from './icons';

interface LanguageSwitcherProps {
    selectedLanguage: 'en' | 'rw';
    onLanguageChange: (lang: 'en' | 'rw') => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ selectedLanguage, onLanguageChange }) => {
    return (
        <div className="relative">
            <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value as 'en' | 'rw')}
                className="appearance-none bg-gray-100 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                aria-label="Select language"
            >
                <option value="en">EN</option>
                <option value="rw">RW</option>
            </select>
        </div>
    );
};