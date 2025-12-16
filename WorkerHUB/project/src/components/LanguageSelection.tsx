import { Languages } from 'lucide-react';
import { Language, languageNames, languageFlags } from '../lib/translations';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSelection() {
  const { setLanguage } = useLanguage();

  const languages: Language[] = ['en', 'hi', 'te', 'kn', 'ta', 'mr'];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFF7EA' }}>
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: '#F4A261' }}
            >
              <Languages className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1
            className="text-5xl font-bold mb-3"
            style={{ color: '#3E3A37' }}
          >
            WorkerHub
          </h1>
          <p
            className="text-2xl font-medium"
            style={{ color: '#2A9D8F' }}
          >
            Choose Your Language / अपनी भाषा चुनें
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-4 border-transparent hover:border-current"
              style={{
                backgroundColor: 'white',
                borderColor: '#F4A261'
              }}
            >
              <div className="text-6xl mb-4">{languageFlags[lang]}</div>
              <div
                className="text-3xl font-bold"
                style={{ color: '#3E3A37' }}
              >
                {languageNames[lang]}
              </div>
            </button>
          ))}
        </div>

        <div
          className="text-center mt-12 text-lg"
          style={{ color: '#3E3A37' }}
        >
          Select your preferred language to continue
        </div>
      </div>
    </div>
  );
}
