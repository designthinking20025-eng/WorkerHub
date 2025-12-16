import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isLanguageSelected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('workerhub-language');
    return (saved as Language) || 'en';
  });

  const [isLanguageSelected, setIsLanguageSelected] = useState(() => {
    return localStorage.getItem('workerhub-language') !== null;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('workerhub-language', lang);
    setIsLanguageSelected(true);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLanguageSelected }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
