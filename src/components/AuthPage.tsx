import { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth, UserType } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthPageProps {
  userType: UserType;
  onBack: () => void;
  onSuccess: () => void;
}

export function AuthPage({ userType, onBack, onSuccess }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signUpData, setSignUpData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [signInData, setSignInData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const { signUp, signIn } = useAuth();
  const { t } = useLanguage();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!signUpData.fullName.trim()) {
      setError('Full name is required');
      return;
    }

    if (!validatePhone(signUpData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    if (!validateEmail(signUpData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (signUpData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signUp(
        signUpData.email,
        signUpData.password,
        signUpData.fullName,
        signUpData.phone,
        userType
      );
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!signInData.emailOrPhone) {
      setError('Email or phone number is required');
      return;
    }

    if (!signInData.password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    try {
      await signIn(signInData.emailOrPhone, signInData.password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 font-semibold hover:opacity-75 transition-all hover:scale-105"
          style={{ color: '#D4A574' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div
          className="rounded-2xl shadow-2xl p-8 border-2"
          style={{ backgroundColor: 'white', borderColor: '#F5E6D3' }}
        >
          <h1
            className="text-4xl font-bold text-center mb-2"
            style={{ color: '#2C2416' }}
          >
            WorkerHub
          </h1>
          <p
            className="text-center mb-8 font-semibold"
            style={{ color: '#B8874B' }}
          >
            {userType === 'job_seeker' ? 'Job Seeker' : 'Employer'} Account
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => {
                setIsSignUp(true);
                setError('');
              }}
              className="flex-1 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: isSignUp ? '#D4A574' : '#FFF8F0',
                color: isSignUp ? 'white' : '#2C2416',
              }}
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                setIsSignUp(false);
                setError('');
              }}
              className="flex-1 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: !isSignUp ? '#D4A574' : '#FFF8F0',
                color: !isSignUp ? 'white' : '#2C2416',
              }}
            >
              Login
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mb-6 p-4 rounded-lg text-white font-medium"
              style={{ backgroundColor: '#C17A47' }}
            >
              {error}
            </div>
          )}

          {/* Sign Up Form */}
          {isSignUp ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#2C2416' }}>
                  Full Name
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border-2" style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}>
                  <User className="w-5 h-5" style={{ color: '#B8874B' }} />
                  <input
                    type="text"
                    value={signUpData.fullName}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, fullName: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className="flex-1 bg-transparent outline-none"
                    style={{ color: '#2C2416' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#2C2416' }}>
                  Phone Number
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border-2" style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}>
                  <Phone className="w-5 h-5" style={{ color: '#B8874B' }} />
                  <input
                    type="tel"
                    value={signUpData.phone}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, phone: e.target.value })
                    }
                    placeholder="10-digit phone number"
                    maxLength="10"
                    className="flex-1 bg-transparent outline-none"
                    style={{ color: '#2C2416' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#2C2416' }}>
                  Email
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border-2" style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}>
                  <Mail className="w-5 h-5" style={{ color: '#B8874B' }} />
                  <input
                    type="email"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent outline-none"
                    style={{ color: '#2C2416' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#2C2416' }}>
                  Password
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border-2" style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}>
                  <Lock className="w-5 h-5" style={{ color: '#B8874B' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    placeholder="At least 8 characters"
                    className="flex-1 bg-transparent outline-none"
                    style={{ color: '#2C2416' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" style={{ color: '#B8874B' }} />
                    ) : (
                      <Eye className="w-5 h-5" style={{ color: '#B8874B' }} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#2C2416' }}>
                  Confirm Password
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border-2" style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}>
                  <Lock className="w-5 h-5" style={{ color: '#B8874B' }} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={signUpData.confirmPassword}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, confirmPassword: e.target.value })
                    }
                    placeholder="Confirm your password"
                    className="flex-1 bg-transparent outline-none"
                    style={{ color: '#2C2416' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" style={{ color: '#B8874B' }} />
                    ) : (
                      <Eye className="w-5 h-5" style={{ color: '#B8874B' }} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 disabled:opacity-50 transition-all shadow-lg"
                style={{ backgroundColor: '#D4A574' }}
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          ) : (
            /* Sign In Form */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#2C2416' }}>
                  Email or Phone Number
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border-2" style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}>
                  <Mail className="w-5 h-5" style={{ color: '#B8874B' }} />
                  <input
                    type="text"
                    value={signInData.emailOrPhone}
                    onChange={(e) =>
                      setSignInData({ ...signInData, emailOrPhone: e.target.value })
                    }
                    placeholder="email@example.com or phone number"
                    className="flex-1 bg-transparent outline-none"
                    style={{ color: '#2C2416' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#2C2416' }}>
                  Password
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border-2" style={{ backgroundColor: '#FFF8F0', borderColor: '#F5E6D3' }}>
                  <Lock className="w-5 h-5" style={{ color: '#B8874B' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInData.password}
                    onChange={(e) =>
                      setSignInData({ ...signInData, password: e.target.value })
                    }
                    placeholder="Your password"
                    className="flex-1 bg-transparent outline-none"
                    style={{ color: '#2C2416' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" style={{ color: '#B8874B' }} />
                    ) : (
                      <Eye className="w-5 h-5" style={{ color: '#B8874B' }} />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-sm font-semibold hover:opacity-75 transition-opacity"
                  style={{ color: '#D4A574' }}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 disabled:opacity-50 transition-all shadow-lg"
                style={{ backgroundColor: '#D4A574' }}
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E8C89F' }}></div>
            <span style={{ color: '#6B5D4F' }}>OR</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E8C89F' }}></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              className="w-full py-3 rounded-lg font-semibold border-2 hover:opacity-75 hover:scale-105 transition-all"
              style={{ borderColor: '#E8C89F', color: '#2C2416' }}
            >
              Continue with Google
            </button>
            <button
              className="w-full py-3 rounded-lg font-semibold border-2 hover:opacity-75 hover:scale-105 transition-all"
              style={{ borderColor: '#E8C89F', color: '#2C2416' }}
            >
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
