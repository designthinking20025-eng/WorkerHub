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
      className="rounded-2xl shadow-lg hover:shadow-2xl card-hover cursor-pointer overflow-hidden animate-slide-up bg-white backdrop-blur-sm border-2"
      onClick={onClick}
      style={{ borderColor: '#F5E6D3' }}
    >
      <div
        className="h-36 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #D4A574 0%, #C17A47 50%, #E8C89F 100%)',
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
              backgroundColor: '#8B6F47',
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
            style={{ color: '#2C2416' }}
          >
            {profile.full_name}
          </h3>
          <p
            className="text-lg font-semibold mb-2"
            style={{ color: '#D4A574' }}
          >
            {profile.occupation}
          </p>
          <div className="flex items-center gap-2 text-sm mb-1" style={{ color: '#4A4237' }}>
            <MapPin className="w-4 h-4" style={{ color: '#B8874B' }} />
            <span>{profile.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: '#FFF8F0', color: '#4A4237' }}
            >
              {skill.skill_name}
            </span>
          ))}
          {skills.length > 3 && (
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: '#FFF8F0', color: '#4A4237' }}
            >
              +{skills.length - 3}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" style={{ color: '#B8874B' }} />
            <div>
              <div className="text-xs" style={{ color: '#6B5D4F' }}>
                {t.experience}
              </div>
              <div className="font-semibold" style={{ color: '#2C2416' }}>
                {profile.years_of_experience} {t.years}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4" style={{ color: '#B8874B' }} />
            <div>
              <div className="text-xs" style={{ color: '#6B5D4F' }}>
                {t.hourlyRate}
              </div>
              <div className="font-semibold" style={{ color: '#2C2416' }}>
                {profile.hourly_rate ? `₹${profile.hourly_rate}` : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#F5E6D3' }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: profile.availability === 'Available' ? '#E8F5E8' : '#FFF3E0' }}>
            <Clock className="w-4 h-4" style={{ color: profile.availability === 'Available' ? '#4A7C59' : '#C17A47' }} />
            <span
              className="text-sm font-semibold"
              style={{ color: profile.availability === 'Available' ? '#4A7C59' : '#C17A47' }}
            >
              {profile.availability === 'Available' ? t.available : t.busy}
            </span>
          </div>
          <button
            className="px-5 py-2.5 rounded-lg font-semibold text-white btn-primary shadow-md hover:scale-105 transition-transform"
            style={{ backgroundColor: '#D4A574' }}
          >
            {t.viewProfile}
          </button>
        </div>
      </div>
    </div>
  );
}
