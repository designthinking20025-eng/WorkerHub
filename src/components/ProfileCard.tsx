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
      className="rounded-2xl shadow-lg hover:shadow-2xl card-hover cursor-pointer overflow-hidden animate-slide-up bg-white backdrop-blur-sm"
      onClick={onClick}
    >
      <div
        className="h-36 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #F4A261 0%, #E76F51 50%, #E9C46A 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 15s ease infinite',
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>
        <div className="absolute -bottom-14 left-6">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold shadow-xl ring-4 transition-transform hover:scale-105"
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

      <div className="pt-20 pb-6 px-6">
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

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#FFF7EA' }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: profile.availability === 'Available' ? '#E8F5F3' : '#FFF3E0' }}>
            <Clock className="w-4 h-4" style={{ color: profile.availability === 'Available' ? '#2A9D8F' : '#F4A261' }} />
            <span
              className="text-sm font-semibold"
              style={{ color: profile.availability === 'Available' ? '#2A9D8F' : '#F4A261' }}
            >
              {profile.availability === 'Available' ? t.available : t.busy}
            </span>
          </div>
          <button
            className="px-5 py-2.5 rounded-lg font-semibold text-white btn-primary shadow-md"
            style={{ backgroundColor: '#F4A261' }}
          >
            {t.viewProfile}
          </button>
        </div>
      </div>
    </div>
  );
}
