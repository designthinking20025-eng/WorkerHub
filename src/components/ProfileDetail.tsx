import { X, MapPin, Phone, Mail, Award, Briefcase, Clock, IndianRupee } from 'lucide-react';
import { Profile, Skill, WorkExperience } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfileDetailProps {
  profile: Profile;
  skills: Skill[];
  workExperience: WorkExperience[];
  onClose: () => void;
}

export function ProfileDetail({ profile, skills, workExperience, onClose }: ProfileDetailProps) {
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
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="rounded-3xl shadow-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scale-in border-2"
        style={{ backgroundColor: 'white', borderColor: '#F5E6D3' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="h-56 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #D4A574 0%, #C17A47 50%, #E8C89F 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 15s ease infinite',
          }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-8 right-8 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-white bg-opacity-25 hover:bg-opacity-40 transition-all hover:scale-110 shadow-lg"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="absolute -bottom-20 left-10">
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center text-5xl font-bold shadow-2xl ring-4 transition-transform hover:scale-105"
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

        <div className="pt-24 pb-10 px-10">
          <div className="mb-8">
            <h2
              className="text-5xl font-bold mb-3 tracking-tight"
              style={{ color: '#2C2416' }}
            >
              {profile.full_name}
            </h2>
            <p
              className="text-3xl font-semibold mb-5"
              style={{ color: '#D4A574' }}
            >
              {profile.occupation}
            </p>
            <div className="flex items-center gap-2 text-xl mb-3" style={{ color: '#4A4237' }}>
              <MapPin className="w-6 h-6" style={{ color: '#B8874B' }} />
              <span>{profile.location}</span>
            </div>
            {profile.bio && (
              <p className="text-lg mt-5 leading-relaxed" style={{ color: '#4A4237', opacity: 0.95 }}>
                {profile.bio}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div
              className="p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl border-2"
              style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#E8C89F' }}>
                  <Award className="w-6 h-6" style={{ color: '#8B6F47' }} />
                </div>
                <span className="font-semibold text-lg" style={{ color: '#2C2416' }}>
                  {t.experience}
                </span>
              </div>
              <p className="text-3xl font-bold" style={{ color: '#2C2416' }}>
                {profile.years_of_experience} {t.years}
              </p>
            </div>

            <div
              className="p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl border-2"
              style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#E8C89F' }}>
                  <Clock className="w-6 h-6" style={{ color: '#8B6F47' }} />
                </div>
                <span className="font-semibold text-lg" style={{ color: '#2C2416' }}>
                  {t.availability}
                </span>
              </div>
              <p
                className="text-3xl font-bold"
                style={{ color: profile.availability === 'Available' ? '#4A7C59' : '#C17A47' }}
              >
                {profile.availability === 'Available' ? t.available : t.busy}
              </p>
            </div>

            <div
              className="p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl border-2"
              style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#E8C89F' }}>
                  <IndianRupee className="w-6 h-6" style={{ color: '#8B6F47' }} />
                </div>
                <span className="font-semibold text-lg" style={{ color: '#2C2416' }}>
                  {t.hourlyRate}
                </span>
              </div>
              <p className="text-3xl font-bold" style={{ color: '#2C2416' }}>
                {profile.hourly_rate ? `₹${profile.hourly_rate}` : 'N/A'}
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h3
              className="text-3xl font-bold mb-6 flex items-center gap-3"
              style={{ color: '#2C2416' }}
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#FFF8F0' }}>
                <Award className="w-7 h-7" style={{ color: '#D4A574' }} />
              </div>
              {t.skills}
            </h3>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-5 py-3 rounded-xl text-base font-semibold shadow-md transition-all hover:shadow-lg hover:-translate-y-1 border-2"
                  style={{ backgroundColor: '#FFF8F0', color: '#4A4237', borderColor: '#F5E6D3' }}
                >
                  {skill.skill_name} - {skill.proficiency_level}
                </span>
              ))}
            </div>
          </div>

          {workExperience.length > 0 && (
            <div className="mb-10">
              <h3
                className="text-3xl font-bold mb-6 flex items-center gap-3"
                style={{ color: '#2C2416' }}
              >
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#FFF8F0' }}>
                  <Briefcase className="w-7 h-7" style={{ color: '#D4A574' }} />
                </div>
                {t.workExperience}
              </h3>
              <div className="space-y-5">
                {workExperience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl border-2"
                    style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}
                  >
                    <h4 className="text-2xl font-bold mb-2" style={{ color: '#2C2416' }}>
                      {exp.role}
                    </h4>
                    <p className="text-xl font-semibold mb-3" style={{ color: '#B8874B' }}>
                      {exp.company_name}
                    </p>
                    <p className="text-base mb-3 font-medium" style={{ color: '#6B5D4F', opacity: 0.8 }}>
                      {exp.start_date} - {exp.end_date || 'Present'} ({exp.duration})
                    </p>
                    {exp.description && (
                      <p className="text-base leading-relaxed" style={{ color: '#4A4237' }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3
              className="text-3xl font-bold mb-6"
              style={{ color: '#2C2416' }}
            >
              {t.contactInfo}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl border-2" style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}>
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#E8C89F' }}>
                  <Phone className="w-6 h-6" style={{ color: '#8B6F47' }} />
                </div>
                <span className="text-xl font-medium" style={{ color: '#2C2416' }}>
                  {profile.phone}
                </span>
              </div>
              {profile.email && (
                <div className="flex items-center gap-4 p-4 rounded-xl border-2" style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#E8C89F' }}>
                    <Mail className="w-6 h-6" style={{ color: '#8B6F47' }} />
                  </div>
                  <span className="text-xl font-medium" style={{ color: '#2C2416' }}>
                    {profile.email}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
