import { Languages } from 'lucide-react';
import { Language, languageNames, languageFlags } from '../lib/translations';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSelection() {
  const { setLanguage } = useLanguage();

  const languages: Language[] = ['en', 'hi', 'te', 'kn', 'ta', 'mr'];

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#FFF7EA' }}>
      <div className="w-full max-w-5xl animate-fade-in">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl transition-transform hover:rotate-12"
              style={{
                background: 'linear-gradient(135deg, #F4A261 0%, #E76F51 100%)',
              }}
            >
              <Languages className="w-14 h-14 text-white" />
            </div>
          </div>
          <h1
            className="text-6xl font-bold mb-4 tracking-tight"
            style={{ color: '#3E3A37' }}
          >
            WorkerHub
          </h1>
          <p
            className="text-2xl font-semibold"
            style={{ color: '#2A9D8F', fontFamily: "'Playfair Display', serif" }}
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
                borderColor: '#FFF7EA',
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="text-7xl mb-6 transition-transform hover:scale-110">{languageFlags[lang]}</div>
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
          className="text-center mt-16 text-lg font-medium"
          style={{ color: '#3E3A37', opacity: 0.7 }}
        >
          Select your preferred language to continue
        </div>
      </div>
    </div>
  );
}
