import { MapPin, Clock, IndianRupee, Phone, Mail, Award } from 'lucide-react';
import { Profile, Skill } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfileCardProps {
  profile: Profile;
  skills: Skill[];
  onClick: () => void;
}

export function ProfileCard({ profile, skills, onClick }: ProfileCardProps) {
  const { t } = useLanguage();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 cursor-pointer overflow-hidden"
      style={{ backgroundColor: 'white' }}
      onClick={onClick}
    >
      <div
        className="h-32 relative"
        style={{
          background: 'linear-gradient(135deg, #F4A261 0%, #E9C46A 100%)',
        }}
      >
        <div className="absolute -bottom-12 left-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg ring-4"
            style={{
              backgroundColor: '#2A9D8F',
              color: 'white',
              ringColor: 'white',
            }}
          >
            {profile.profile_image ? (
              <img
                src={profile.profile_image}
                alt={profile.full_name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(profile.full_name)
            )}
          </div>
        </div>
      </div>

      <div className="pt-16 pb-6 px-6">
        <div className="mb-4">
          <h3
            className="text-2xl font-bold mb-1"
            style={{ color: '#3E3A37' }}
          >
            {profile.full_name}
          </h3>
          <p
            className="text-lg font-semibold mb-2"
            style={{ color: '#F4A261' }}
          >
            {profile.occupation}
          </p>
          <div className="flex items-center gap-2 text-sm mb-1" style={{ color: '#3E3A37' }}>
            <MapPin className="w-4 h-4" style={{ color: '#2A9D8F' }} />
            <span>{profile.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: '#FFF7EA', color: '#3E3A37' }}
            >
              {skill.skill_name}
            </span>
          ))}
          {skills.length > 3 && (
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: '#FFF7EA', color: '#3E3A37' }}
            >
              +{skills.length - 3}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" style={{ color: '#2A9D8F' }} />
            <div>
              <div className="text-xs" style={{ color: '#3E3A37' }}>
                {t.experience}
              </div>
              <div className="font-semibold" style={{ color: '#3E3A37' }}>
                {profile.years_of_experience} {t.years}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4" style={{ color: '#2A9D8F' }} />
            <div>
              <div className="text-xs" style={{ color: '#3E3A37' }}>
                {t.hourlyRate}
              </div>
              <div className="font-semibold" style={{ color: '#3E3A37' }}>
                {profile.hourly_rate ? `₹${profile.hourly_rate}` : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: '#2A9D8F' }} />
            <span
              className="text-sm font-medium"
              style={{ color: profile.availability === 'Available' ? '#2A9D8F' : '#F4A261' }}
            >
              {profile.availability === 'Available' ? t.available : t.busy}
            </span>
          </div>
          <button
            className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#F4A261' }}
          >
            {t.viewProfile}
          </button>
        </div>
      </div>
    </div>
  );
}
