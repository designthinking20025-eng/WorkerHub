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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFF7EA' }}>
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1
            className="text-5xl font-bold mb-4"
            style={{ color: '#3E3A37' }}
          >
            Welcome to WorkerHub
          </h1>
          <p
            className="text-2xl"
            style={{ color: '#2A9D8F', fontFamily: "'Playfair Display', serif", fontWeight: 600, letterSpacing: '0.5px' }}
          >
            Choose your role to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Job Seeker Card */}
          <button
            onClick={handleJobSeekerClick}
            className="p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 text-left group"
            style={{
              backgroundColor: 'white',
              borderColor: '#F4A261',
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#F4A261' }}
              >
                <Users className="w-12 h-12 text-white" />
              </div>
              <h2
                className="text-3xl font-bold mb-3"
                style={{ color: '#3E3A37' }}
              >
                Looking for Work
              </h2>
              <p
                className="text-lg"
                style={{ color: '#3E3A37' }}
              >
                Find job opportunities, build your profile, and showcase your skills to employers
              </p>
              <div
                className="mt-6 px-6 py-2 rounded-lg text-white font-semibold"
                style={{ backgroundColor: '#F4A261' }}
              >
                Job Seeker
              </div>
            </div>
          </button>

          {/* Employer Card */}
          <button
            onClick={handleEmployerClick}
            className="p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 text-left group"
            style={{
              backgroundColor: 'white',
              borderColor: '#2A9D8F',
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#2A9D8F' }}
              >
                <Briefcase className="w-12 h-12 text-white" />
              </div>
              <h2
                className="text-3xl font-bold mb-3"
                style={{ color: '#3E3A37' }}
              >
                Hire Workers
              </h2>
              <p
                className="text-lg"
                style={{ color: '#3E3A37' }}
              >
                Post job opportunities and find skilled blue-collar workers for your projects
              </p>
              <div
                className="mt-6 px-6 py-2 rounded-lg text-white font-semibold"
                style={{ backgroundColor: '#2A9D8F' }}
              >
                Employer
              </div>
            </div>
          </button>
        </div>

        <div
          className="text-center text-lg"
          style={{ color: '#3E3A37' }}
        >
          You can change your role anytime in your settings
        </div>
      </div>
    </div>
  );
}
