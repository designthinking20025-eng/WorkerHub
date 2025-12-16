import { useState } from 'react';
import { Briefcase, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language, languageNames } from '../lib/translations';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages: Language[] = ['en', 'hi', 'te', 'kn', 'ta', 'mr'];

  return (
    <header
      className="shadow-md sticky top-0 z-50"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#F4A261' }}
            >
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: '#3E3A37' }}
              >
                {t.workerHub}
              </h1>
              <p
                className="text-xs"
                style={{ color: '#2A9D8F' }}
              >
                {t.professionalNetwork}
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#E9C46A', color: '#3E3A37' }}
            >
              <Globe className="w-5 h-5" />
              <span className="font-medium">{languageNames[language]}</span>
            </button>

            {showLanguageMenu && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden"
                style={{ backgroundColor: 'white' }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLanguageMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:opacity-80 transition-opacity border-b last:border-b-0"
                    style={{
                      backgroundColor: language === lang ? '#FFF7EA' : 'white',
                      color: '#3E3A37',
                      borderColor: '#E9C46A'
                    }}
                  >
                    <span className="font-medium">{languageNames[lang]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
