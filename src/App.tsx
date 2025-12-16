import { useState } from 'react';
import { useLanguage } from './contexts/LanguageContext';
import { useAuth, UserType } from './contexts/AuthContext';
import { LanguageSelection } from './components/LanguageSelection';
import { UserChoice } from './components/UserChoice';
import { AuthPage } from './components/AuthPage';
import { Header } from './components/Header';
import { ProfileFeed } from './components/ProfileFeed';

function App() {
  const { isLanguageSelected } = useLanguage();
  const { session, loading: authLoading, user } = useAuth();
  const [currentStep, setCurrentStep] = useState<'choice' | 'auth'>('choice');
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);

  if (!isLanguageSelected) {
    return <LanguageSelection />;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF8F0' }}>
        <div className="text-center animate-fade-in">
          <div
            className="w-20 h-20 rounded-full animate-spin border-4 mx-auto mb-6"
            style={{
              borderColor: '#E8C89F',
              borderTopColor: '#D4A574',
              borderWidth: '4px',
            }}
          ></div>
          <p className="text-xl font-semibold" style={{ color: '#2C2416' }}>Loading...</p>
        </div>
      </div>
    );
  }

  console.log('App state:', { session: !!session, user: !!user, currentStep });

  if (!session) {
    if (currentStep === 'choice') {
      return (
        <UserChoice
          onChoice={(type) => {
            setSelectedUserType(type);
            setCurrentStep('auth');
          }}
        />
      );
    }

    return (
      <AuthPage
        userType={selectedUserType}
        onBack={() => {
          setCurrentStep('choice');
          setSelectedUserType(null);
        }}
        onSuccess={() => {
          setCurrentStep('choice');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF8F0' }}>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <ProfileFeed />
      </main>
    </div>
  );
}

export default App;
