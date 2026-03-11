// Modern Premium SaaS-style Login Page
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [userType, setUserType] = useState('agent');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(true);
  const [focusedField, setFocusedField] = useState('');
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      const { token, ...userData } = response.data;
      login(userData, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = (type) => {
    if (type === 'admin') {
      setFormData({
        email: 'admin@gharpay.com',
        password: 'admin123'
      });
    } else {
      setFormData({
        email: 'raj@gharpay.com',
        password: 'test123'
      });
    }
  };

  const handleRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{
      background: 'radial-gradient(circle at top left, rgba(34, 197, 94, 0.08) 0%, transparent 50%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.06) 0%, transparent 50%), linear-gradient(to bottom right, #ffffff 0%, #f0fdf4 100%)'
    }}>
      {/* Animated background orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className={`max-w-md w-full transition-all duration-700 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Glass-morphism card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden relative">
          {/* Subtle top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600"></div>

          <div className="p-10">
            {/* Header with modern typography */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 bg-clip-text text-transparent" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Gharpay CRM
                </h1>
              </div>
              <p className="text-gray-600 text-base font-medium" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Welcome back! Please login to continue
              </p>
            </div>

            {/* Segmented Control with Sliding Animation */}
            <div className="relative bg-gray-100 rounded-2xl p-1.5 mb-8 shadow-inner">
              <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg transition-all duration-300 ease-out ${userType === 'agent' ? 'left-1.5' : 'left-[calc(50%+1.5px)]'
                }`}></div>
              <div className="relative flex gap-1">
                <button
                  type="button"
                  onClick={() => setUserType('agent')}
                  className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 relative z-10 ${userType === 'agent'
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-800'
                    }`}
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Agent Login</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('admin')}
                  className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 relative z-10 ${userType === 'admin'
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-800'
                    }`}
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Admin Login</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Collapsible Test Credentials Card */}
            <div className="mb-7">
              <button
                type="button"
                onClick={() => setShowCredentials(!showCredentials)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/60 rounded-2xl hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm font-bold text-blue-800" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Test Credentials
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${showCredentials ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${showCredentials ? 'max-h-48 mt-3' : 'max-h-0'}`}>
                {userType === 'admin' ? (
                  <button
                    type="button"
                    onClick={() => fillTestCredentials('admin')}
                    onMouseDown={handleRipple}
                    className="w-full text-left bg-white p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-blue-200/60 shadow-sm hover:shadow-md relative overflow-hidden group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                        A
                      </div>
                      <div>
                        <div className="font-bold text-blue-700 text-sm mb-0.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Admin Account</div>
                        <div className="text-gray-600 text-xs font-mono">admin@gharpay.com • admin123</div>
                      </div>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      Click to fill →
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => fillTestCredentials('agent')}
                    onMouseDown={handleRipple}
                    className="w-full text-left bg-white p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-blue-200/60 shadow-sm hover:shadow-md relative overflow-hidden group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                        R
                      </div>
                      <div>
                        <div className="font-bold text-blue-700 text-sm mb-0.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Agent Account</div>
                        <div className="text-gray-600 text-xs font-mono">raj@gharpay.com • test123</div>
                      </div>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      Click to fill →
                    </div>
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-5 py-4 rounded-2xl mb-6 shadow-sm animate-shake">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-sm font-semibold">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Floating Label Email Input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  required
                  className="w-full px-5 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 peer bg-white shadow-inner text-gray-800 font-medium"
                  placeholder=" "
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(34, 197, 94, 0.1), inset 0 2px 4px rgba(0,0,0,0.06)' : 'inset 0 2px 4px rgba(0,0,0,0.06)'
                  }}
                />
                <label className={`absolute left-5 transition-all duration-300 pointer-events-none font-semibold flex items-center gap-1.5 ${formData.email || focusedField === 'email'
                    ? 'top-2 text-xs text-green-600'
                    : 'top-4 text-base text-gray-500'
                  }`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
              </div>

              {/* Floating Label Password Input */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  required
                  className="w-full px-5 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 peer bg-white shadow-inner text-gray-800 font-medium"
                  placeholder=" "
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    boxShadow: focusedField === 'password' ? '0 0 0 4px rgba(34, 197, 94, 0.1), inset 0 2px 4px rgba(0,0,0,0.06)' : 'inset 0 2px 4px rgba(0,0,0,0.06)'
                  }}
                />
                <label className={`absolute left-5 transition-all duration-300 pointer-events-none font-semibold flex items-center gap-1.5 ${formData.password || focusedField === 'password'
                    ? 'top-2 text-xs text-green-600'
                    : 'top-4 text-base text-gray-500'
                  }`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password
                </label>
              </div>

              {/* Premium Gradient Login Button */}
              <button
                type="submit"
                disabled={loading}
                onMouseDown={handleRipple}
                className="relative w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group"
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: '0 10px 25px -5px rgba(22, 163, 74, 0.4), 0 8px 10px -6px rgba(22, 163, 74, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login as {userType === 'admin' ? 'Admin' : 'Agent'}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            {/* Info Note */}
            <div className="mt-7 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/60 rounded-2xl">
              <p className="text-sm text-amber-800 flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <svg className="w-5 h-5 flex-shrink-0 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span><span className="font-bold">Note:</span> Agent accounts are created by Admin only</span>
              </p>
            </div>

            {/* Back to Home Link */}
            <div className="text-center mt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 text-sm font-semibold transition-all duration-300 hover:gap-3 group"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ripple Effect Styles */}
      <style>{`
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
          animation: ripple-animation 0.6s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px white inset !important;
          -webkit-text-fill-color: #1f2937 !important;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
