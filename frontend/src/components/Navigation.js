// Professional Deep Green Floating Navigation
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinkClass = (path) => {
    const active = isActive(path);
    return `relative px-5 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium group ${
      active
        ? 'text-white bg-white/10'
        : 'text-white/75 hover:text-white hover:bg-white/5'
    }`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-5 pb-3 pointer-events-none">
      <nav
        className={`max-w-[90%] mx-auto rounded-[40px] backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 pointer-events-auto ${
          scrolled
            ? 'backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(22,101,52,0.5)]'
            : 'shadow-[0_10px_40px_-10px_rgba(22,101,52,0.4)]'
        }`}
        style={{
          background: 'linear-gradient(135deg, #166534 0%, #16A34A 100%)',
          boxShadow: scrolled
            ? '0 20px 60px -15px rgba(22,101,52,0.5), inset 0 1px 0 0 rgba(255,255,255,0.15)'
            : '0 10px 40px -10px rgba(22,101,52,0.4), inset 0 1px 0 0 rgba(255,255,255,0.15)'
        }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link
              to="/dashboard"
              className="group flex items-center gap-3 transition-transform hover:scale-105 duration-300"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:rotate-6 transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <div className="text-white text-lg font-bold tracking-tight leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Gharpay CRM
                </div>
                <div className="text-white/70 text-[10px] font-semibold uppercase tracking-wider" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Lead Management
                </div>
              </div>
            </Link>

            {/* Center Nav Links - Clean direct placement */}
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                <span className="flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="hidden xl:inline">Dashboard</span>
                </span>
                {isActive('/dashboard') && (
                  <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
                )}
                <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link to="/leads" className={navLinkClass('/leads')}>
                <span className="flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="hidden xl:inline">Leads</span>
                </span>
                {isActive('/leads') && (
                  <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
                )}
                <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link to="/pipeline" className={navLinkClass('/pipeline')}>
                <span className="flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="hidden xl:inline">Pipeline</span>
                </span>
                {isActive('/pipeline') && (
                  <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
                )}
                <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link to="/schedule-visit" className={navLinkClass('/schedule-visit')}>
                <span className="flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden xl:inline">Visits</span>
                </span>
                {isActive('/schedule-visit') && (
                  <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
                )}
                <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              {user?.role === 'admin' && (
                <Link to="/agents" className={navLinkClass('/agents')}>
                  <span className="flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="hidden xl:inline">Agents</span>
                  </span>
                  {isActive('/agents') && (
                    <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
                  )}
                  <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              )}
            </div>

            {/* Right Section - Compact User Profile & Outline Logout */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden px-3 py-2 border-2 border-white/40 text-white rounded-xl hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Compact User Pill */}
              <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/25 hover:border-white/40 transition-all cursor-pointer group">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-700 font-bold text-sm shadow-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="text-white text-sm font-semibold leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
                    {user?.name}
                  </div>
                  <div className="text-white/70 text[10px] font-medium uppercase tracking-wide">
                    {user?.role}
                  </div>
                </div>
              </div>

              {/* Simple Outline Logout Button */}
              <button
                onClick={handleLogout}
                className="hidden sm:flex px-4 py-2 border-2 border-white/40 text-white rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 font-semibold text-sm group"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-white/20 space-y-2 animate-fadeIn">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive('/dashboard') ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </Link>

              <Link
                to="/leads"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive('/leads') ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Leads</span>
              </Link>

              <Link
                to="/pipeline"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive('/pipeline') ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Pipeline</span>
              </Link>

              <Link
                to="/schedule-visit"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive('/schedule-visit') ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Visits</span>
              </Link>

              {user?.role === 'admin' && (
                <Link
                  to="/agents"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive('/agents') ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Agents</span>
                </Link>
              )}

              {/* Mobile User Info & Logout */}
              <div className="pt-4 mt-4 border-t border-white/20">
                <div className="flex items-center justify-between px-4 py-3 bg-white/10 rounded-xl mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-700 font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        {user?.name}
                      </div>
                      <div className="text-white/70 text-xs uppercase">{user?.role}</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-white/40 text-white rounded-xl hover:bg-white/10 transition-all font-semibold"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
