import { Languages } from 'lucide-react';
import { Language, languageNames, languageFlags } from '../lib/translations';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSelection() {
  const { setLanguage } = useLanguage();

  const languages: Language[] = ['en', 'hi', 'te', 'kn', 'ta', 'mr'];

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="w-full max-w-5xl animate-fade-in">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl transition-transform hover:rotate-12"
              style={{
                background: 'linear-gradient(135deg, #D4A574 0%, #C17A47 100%)',
              }}
            >
              <Languages className="w-14 h-14 text-white" />
            </div>
          </div>
          <h1
            className="text-6xl font-bold mb-4 tracking-tight"
            style={{ color: '#2C2416' }}
          >
            WorkerHub
          </h1>
          <p
            className="text-2xl font-semibold"
            style={{ color: '#B8874B', fontFamily: "'Playfair Display', serif" }}
          >
            Choose Your Language / अपनी भाषा चुनें
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {languages.map((lang, index) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className="p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-4 card-hover"
              style={{
                backgroundColor: 'white',
                borderColor: '#F5E6D3',
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="text-7xl mb-6 transition-transform hover:scale-110">{languageFlags[lang]}</div>
              <div
                className="text-3xl font-bold"
                style={{ color: '#2C2416' }}
              >
                {languageNames[lang]}
              </div>
            </button>
          ))}
        </div>

        <div
          className="text-center mt-16 text-lg font-medium"
          style={{ color: '#6B5D4F', opacity: 0.8 }}
        >
          Select your preferred language to continue
        </div>
      </div>
    </div>
  );
}
