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
      className="shadow-lg sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b animate-fade-in"
      style={{ borderColor: '#FFF7EA' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              style={{
                backgroundColor: '#F4A261',
                background: 'linear-gradient(135deg, #F4A261 0%, #E76F51 100%)',
              }}
            >
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ color: '#3E3A37' }}
              >
                {t.workerHub}
              </h1>
              <p
                className="text-sm font-medium"
                style={{ color: '#2A9D8F' }}
              >
                {t.professionalNetwork}
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all hover:shadow-lg"
              style={{
                backgroundColor: '#E9C46A',
                color: '#3E3A37',
              }}
            >
              <Globe className="w-5 h-5" />
              <span>{languageNames[language]}</span>
            </button>

            {showLanguageMenu && (
              <div
                className="absolute right-0 mt-3 w-56 rounded-xl shadow-2xl overflow-hidden animate-scale-in border-2"
                style={{ backgroundColor: 'white', borderColor: '#FFF7EA' }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLanguageMenu(false);
                    }}
                    className="w-full px-5 py-3.5 text-left transition-all border-b last:border-b-0 hover:pl-7"
                    style={{
                      backgroundColor: language === lang ? '#FFF7EA' : 'white',
                      color: '#3E3A37',
                      borderColor: '#F4F4F4'
                    }}
                  >
                    <span className="font-semibold">{languageNames[lang]}</span>
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
