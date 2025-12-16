import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { supabase, Profile, Skill, WorkExperience } from '../lib/supabase';
import { ProfileCard } from './ProfileCard';
import { ProfileDetail } from './ProfileDetail';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfileWithSkills {
  profile: Profile;
  skills: Skill[];
}

export function ProfileFeed() {
  const { t } = useLanguage();
  const [profiles, setProfiles] = useState<ProfileWithSkills[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<{
    profile: Profile;
    skills: Skill[];
    workExperience: WorkExperience[];
  } | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const profilesWithSkills: ProfileWithSkills[] = await Promise.all(
        (profilesData || []).map(async (profile) => {
          const { data: skillsData } = await supabase
            .from('skills')
            .select('*')
            .eq('profile_id', profile.id);

          return {
            profile,
            skills: skillsData || [],
          };
        })
      );

      setProfiles(profilesWithSkills);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleProfileClick(profile: Profile, skills: Skill[]) {
    const { data: workExpData } = await supabase
      .from('work_experience')
      .select('*')
      .eq('profile_id', profile.id);

    setSelectedProfile({
      profile,
      skills,
      workExperience: workExpData || [],
    });
  }

  const filteredProfiles = profiles.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.profile.full_name.toLowerCase().includes(query) ||
      item.profile.occupation.toLowerCase().includes(query) ||
      item.profile.location.toLowerCase().includes(query) ||
      item.skills.some((skill) => skill.skill_name.toLowerCase().includes(query))
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin" style={{ color: '#F4A261' }} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: '#3E3A37' }}
            />
            <input
              type="text"
              placeholder={t.searchProfiles}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 focus:outline-none focus:border-current text-lg"
              style={{
                backgroundColor: 'white',
                borderColor: '#E9C46A',
                color: '#3E3A37',
              }}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2
          className="text-3xl font-bold"
          style={{ color: '#3E3A37' }}
        >
          {t.availableWorkers}
        </h2>
        <p
          className="text-lg mt-1"
          style={{ color: '#2A9D8F' }}
        >
          {filteredProfiles.length} {t.profiles.toLowerCase()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((item) => (
          <ProfileCard
            key={item.profile.id}
            profile={item.profile}
            skills={item.skills}
            onClick={() => handleProfileClick(item.profile, item.skills)}
          />
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: '#3E3A37' }}>
            No profiles found
          </p>
        </div>
      )}

      {selectedProfile && (
        <ProfileDetail
          profile={selectedProfile.profile}
          skills={selectedProfile.skills}
          workExperience={selectedProfile.workExperience}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
}
