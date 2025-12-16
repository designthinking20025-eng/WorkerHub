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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'white' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="h-48 relative"
          style={{
            background: 'linear-gradient(135deg, #F4A261 0%, #E9C46A 100%)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="absolute -bottom-16 left-8">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg ring-4"
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

        <div className="pt-20 pb-8 px-8">
          <div className="mb-6">
            <h2
              className="text-4xl font-bold mb-2"
              style={{ color: '#3E3A37' }}
            >
              {profile.full_name}
            </h2>
            <p
              className="text-2xl font-semibold mb-4"
              style={{ color: '#F4A261' }}
            >
              {profile.occupation}
            </p>
            <div className="flex items-center gap-2 text-lg mb-2" style={{ color: '#3E3A37' }}>
              <MapPin className="w-5 h-5" style={{ color: '#2A9D8F' }} />
              <span>{profile.location}</span>
            </div>
            {profile.bio && (
              <p className="text-lg mt-4" style={{ color: '#3E3A37' }}>
                {profile.bio}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: '#FFF7EA' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-6 h-6" style={{ color: '#2A9D8F' }} />
                <span className="font-semibold" style={{ color: '#3E3A37' }}>
                  {t.experience}
                </span>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#3E3A37' }}>
                {profile.years_of_experience} {t.years}
              </p>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: '#FFF7EA' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6" style={{ color: '#2A9D8F' }} />
                <span className="font-semibold" style={{ color: '#3E3A37' }}>
                  {t.availability}
                </span>
              </div>
              <p
                className="text-2xl font-bold"
                style={{ color: profile.availability === 'Available' ? '#2A9D8F' : '#F4A261' }}
              >
                {profile.availability === 'Available' ? t.available : t.busy}
              </p>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: '#FFF7EA' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <IndianRupee className="w-6 h-6" style={{ color: '#2A9D8F' }} />
                <span className="font-semibold" style={{ color: '#3E3A37' }}>
                  {t.hourlyRate}
                </span>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#3E3A37' }}>
                {profile.hourly_rate ? `₹${profile.hourly_rate}` : 'N/A'}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3
              className="text-2xl font-bold mb-4 flex items-center gap-2"
              style={{ color: '#3E3A37' }}
            >
              <Award className="w-6 h-6" style={{ color: '#F4A261' }} />
              {t.skills}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-4 py-2 rounded-xl text-base font-medium"
                  style={{ backgroundColor: '#FFF7EA', color: '#3E3A37' }}
                >
                  {skill.skill_name} - {skill.proficiency_level}
                </span>
              ))}
            </div>
          </div>

          {workExperience.length > 0 && (
            <div className="mb-8">
              <h3
                className="text-2xl font-bold mb-4 flex items-center gap-2"
                style={{ color: '#3E3A37' }}
              >
                <Briefcase className="w-6 h-6" style={{ color: '#F4A261' }} />
                {t.workExperience}
              </h3>
              <div className="space-y-4">
                {workExperience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: '#FFF7EA' }}
                  >
                    <h4 className="text-xl font-bold mb-1" style={{ color: '#3E3A37' }}>
                      {exp.role}
                    </h4>
                    <p className="text-lg font-semibold mb-2" style={{ color: '#2A9D8F' }}>
                      {exp.company_name}
                    </p>
                    <p className="text-sm mb-2" style={{ color: '#3E3A37' }}>
                      {exp.start_date} - {exp.end_date || 'Present'} ({exp.duration})
                    </p>
                    {exp.description && (
                      <p className="text-base" style={{ color: '#3E3A37' }}>
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
              className="text-2xl font-bold mb-4"
              style={{ color: '#3E3A37' }}
            >
              {t.contactInfo}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" style={{ color: '#2A9D8F' }} />
                <span className="text-lg" style={{ color: '#3E3A37' }}>
                  {profile.phone}
                </span>
              </div>
              {profile.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: '#2A9D8F' }} />
                  <span className="text-lg" style={{ color: '#3E3A37' }}>
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
