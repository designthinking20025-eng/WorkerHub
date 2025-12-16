import { Users, Briefcase } from 'lucide-react';
import { useAuth, UserType } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface UserChoiceProps {
  onChoice: (type: UserType) => void;
}

export function UserChoice({ onChoice }: UserChoiceProps) {
  const { t } = useLanguage();

  const handleJobSeekerClick = () => {
    onChoice('job_seeker');
  };

  const handleEmployerClick = () => {
    onChoice('employer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="w-full max-w-6xl animate-fade-in">
        <div className="text-center mb-16">
          <h1
            className="text-6xl font-bold mb-5 tracking-tight"
            style={{ color: '#2C2416' }}
          >
            Welcome to WorkerHub
          </h1>
          <p
            className="text-3xl font-semibold"
            style={{ color: '#B8874B', fontFamily: "'Playfair Display', serif", letterSpacing: '0.5px' }}
          >
            Choose your role to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <button
            onClick={handleJobSeekerClick}
            className="p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 border-4 group relative overflow-hidden"
            style={{
              backgroundColor: 'white',
              borderColor: '#D4A574',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #D4A574 0%, #C17A47 100%)' }}
            ></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div
                className="w-28 h-28 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-xl"
                style={{ background: 'linear-gradient(135deg, #D4A574 0%, #C17A47 100%)' }}
              >
                <Users className="w-14 h-14 text-white" />
              </div>
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: '#2C2416' }}
              >
                Looking for Work
              </h2>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: '#4A4237', opacity: 0.85 }}
              >
                Find job opportunities, build your profile, and showcase your skills to employers
              </p>
              <div
                className="px-8 py-3 rounded-xl text-white font-bold text-lg shadow-lg"
                style={{ backgroundColor: '#D4A574' }}
              >
                Job Seeker
              </div>
            </div>
          </button>

          <button
            onClick={handleEmployerClick}
            className="p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 border-4 group relative overflow-hidden"
            style={{
              backgroundColor: 'white',
              borderColor: '#8B6F47',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #8B6F47 0%, #6D5838 100%)' }}
            ></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div
                className="w-28 h-28 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-xl"
                style={{ background: 'linear-gradient(135deg, #8B6F47 0%, #6D5838 100%)' }}
              >
                <Briefcase className="w-14 h-14 text-white" />
              </div>
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: '#2C2416' }}
              >
                Hire Workers
              </h2>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: '#4A4237', opacity: 0.85 }}
              >
                Post job opportunities and find skilled blue-collar workers for your projects
              </p>
              <div
                className="px-8 py-3 rounded-xl text-white font-bold text-lg shadow-lg"
                style={{ backgroundColor: '#8B6F47' }}
              >
                Employer
              </div>
            </div>
          </button>
        </div>

        <div
          className="text-center text-lg font-medium"
          style={{ color: '#6B5D4F', opacity: 0.8 }}
        >
          You can change your role anytime in your settings
        </div>
      </div>
    </div>
  );
}
