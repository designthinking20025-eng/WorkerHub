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
  const { session, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState<'choice' | 'auth'>('choice');
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);

  if (!isLanguageSelected) {
    return <LanguageSelection />;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF7EA' }}>
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full animate-spin border-4 mx-auto mb-4"
            style={{ borderColor: '#E9C46A', borderTopColor: '#F4A261' }}
          ></div>
          <p style={{ color: '#3E3A37' }}>Loading...</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen" style={{ backgroundColor: '#FFF7EA' }}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProfileFeed />
      </main>
    </div>
  );
}

export default App;
