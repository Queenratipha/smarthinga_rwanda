import { useState, useCallback, useEffect } from 'react';
import { translations, TranslationKey } from '../i18n/locales';

export type TFunction = (key: TranslationKey) => string;

export const useLocalization = () => {
    const [language, setLanguageState] = useState<'en' | 'rw'>(() => {
        return (localStorage.getItem('language') as 'en' | 'rw') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const setLanguage = useCallback((lang: 'en' | 'rw') => {
        setLanguageState(lang);
    }, []);

    const t = useCallback<TFunction>((key: TranslationKey) => {
        return translations[language][key] || key;
    }, [language]);

    return { t, setLanguage, language };
};