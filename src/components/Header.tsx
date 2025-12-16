import { useState } from 'react';
import { Globe, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Language, languageNames } from '../lib/translations';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { signOut, user } = useAuth();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages: Language[] = ['en', 'hi', 'te', 'kn', 'ta', 'mr'];

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
      alert('There was an issue logging out. Please try again.');
    }
  };

  return (
    <header
      className="shadow-md sticky top-0 z-50 backdrop-blur-lg bg-white/98 border-b animate-fade-in"
      style={{ borderColor: '#F5E6D3' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/workerhub_logo.png"
              alt="WorkerHub Logo"
              className="h-14 w-auto transition-transform hover:scale-105"
            />
            <div>
              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ color: '#2C2416' }}
              >
                {t.workerHub}
              </h1>
              <p
                className="text-sm font-medium"
                style={{ color: '#D4A574' }}
              >
                {t.professionalNetwork}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold" style={{ color: '#2C2416' }}>
                  {user.full_name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-105"
                  style={{
                    backgroundColor: '#C17A47',
                    color: 'white',
                  }}
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-105"
                style={{
                  backgroundColor: '#E8C89F',
                  color: '#2C2416',
                }}
              >
                <Globe className="w-4 h-4" />
                <span>{languageNames[language]}</span>
              </button>

              {showLanguageMenu && (
                <div
                  className="absolute right-0 mt-3 w-56 rounded-xl shadow-2xl overflow-hidden animate-scale-in border-2"
                  style={{ backgroundColor: 'white', borderColor: '#F5E6D3' }}
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
                        backgroundColor: language === lang ? '#FFF8F0' : 'white',
                        color: '#2C2416',
                        borderColor: '#F5F5F5'
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
      </div>
    </header>
  );
}
