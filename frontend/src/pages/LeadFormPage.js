// Modern SaaS-Style Public Lead Capture Form
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LeadFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    source: 'Website',
    preferredLocation: '',
    budget: '',
    moveInDate: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState('');

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
      await axios.post('http://localhost:5000/api/leads', formData);
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        source: 'Website',
        preferredLocation: '',
        budget: '',
        moveInDate: '',
        message: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{
        background: 'radial-gradient(circle at top left, rgba(34, 197, 94, 0.08) 0%, transparent 50%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.06) 0%, transparent 50%), linear-gradient(to bottom right, #ffffff 0%, #f0fdf4 100%)'
      }}>
        {/* Animated background orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 text-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-6 shadow-2xl animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Thank You!
          </h2>
          <p className="text-gray-600 mb-8 text-base leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Your request has been submitted successfully. Our team will contact you shortly.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden" style={{
      background: 'radial-gradient(circle at top left, rgba(34, 197, 94, 0.08) 0%, transparent 50%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.06) 0%, transparent 50%), linear-gradient(to bottom right, #ffffff 0%, #f0fdf4 100%)'
    }}>
      {/* Animated background orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 overflow-hidden">
          {/* Subtle top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600"></div>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 bg-clip-text text-transparent" style={{ fontFamily: 'Sora, sans-serif' }}>
                Find Your PG
              </h1>
            </div>
            <p className="text-gray-600 text-base font-medium" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Fill in your requirements and we'll help you find the perfect accommodation
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-5 py-4 rounded-2xl mb-6 shadow-sm animate-shake">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
                required
                className="w-full px-5 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 bg-white shadow-inner text-gray-800 font-medium"
                placeholder=" "
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: focusedField === 'name' ? '0 0 0 4px rgba(34, 197, 94, 0.1), inset 0 2px 4px rgba(0,0,0,0.06)' : 'inset 0 2px 4px rgba(0,0,0,0.06)'
                }}
              />
              <label className={`absolute left-5 transition-all duration-300 pointer-events-none font-semibold flex items-center gap-1.5 ${formData.name || focusedField === 'name'
                  ? 'top-2 text-xs text-green-600'
                  : 'top-4 text-base text-gray-500'
                }`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Full Name <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Phone Input */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField('')}
                required
                pattern="[0-9]{10}"
                className="w-full px-5 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 bg-white shadow-inner text-gray-800 font-medium"
                placeholder=" "
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: focusedField === 'phone' ? '0 0 0 4px rgba(34, 197, 94, 0.1), inset 0 2px 4px rgba(0,0,0,0.06)' : 'inset 0 2px 4px rgba(0,0,0,0.06)'
                }}
              />
              <label className={`absolute left-5 transition-all duration-300 pointer-events-none font-semibold flex items-center gap-1.5 ${formData.phone || focusedField === 'phone'
                  ? 'top-2 text-xs text-green-600'
                  : 'top-4 text-base text-gray-500'
                }`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone Number <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                className="w-full px-5 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 bg-white shadow-inner text-gray-800 font-medium"
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
                Email (Optional)
              </label>
            </div>

            {/* Source Select */}
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all appearance-none bg-white shadow-inner text-gray-800 font-medium"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                <option value="Website">Website</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Referral">Referral</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Location Input */}
            <div className="relative">
              <input
                type="text"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                onFocus={() => setFocusedField('location')}
                onBlur={() => setFocusedField('')}
                className="w-full px-5 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 bg-white shadow-inner text-gray-800 font-medium"
                placeholder=" "
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: focusedField === 'location' ? '0 0 0 4px rgba(34, 197, 94, 0.1), inset 0 2px 4px rgba(0,0,0,0.06)' : 'inset 0 2px 4px rgba(0,0,0,0.06)'
                }}
              />
              <label className={`absolute left-5 transition-all duration-300 pointer-events-none font-semibold flex items-center gap-1.5 ${formData.preferredLocation || focusedField === 'location'
                  ? 'top-2 text-xs text-green-600'
                  : 'top-4 text-base text-gray-500'
                }`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Preferred Location
              </label>
            </div>

            {/* Budget & Move-in Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('budget')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-5 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 bg-white shadow-inner text-gray-800 font-medium"
                  placeholder=" "
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    boxShadow: focusedField === 'budget' ? '0 0 0 4px rgba(34, 197, 94, 0.1), inset 0 2px 4px rgba(0,0,0,0.06)' : 'inset 0 2px 4px rgba(0,0,0,0.06)'
                  }}
                />
                <label className={`absolute left-5 transition-all duration-300 pointer-events-none font-semibold flex items-center gap-1.5 ${formData.budget || focusedField === 'budget'
                    ? 'top-2 text-xs text-green-600'
                    : 'top-4 text-base text-gray-500'
                  }`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Budget (₹)
                </label>
              </div>

              <div className="relative">
                <input
                  type="date"
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('date')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-5 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 bg-white shadow-inner text-gray-800 font-medium"
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    boxShadow: focusedField === 'date' ? '0 0 0 4px rgba(34, 197, 94, 0.1), inset 0 2px 4px rgba(0,0,0,0.06)' : 'inset 0 2px 4px rgba(0,0,0,0.06)'
                  }}
                />
                <label className={`absolute left-5 transition-all duration-300 pointer-events-none font-semibold flex items-center gap-1.5 ${formData.moveInDate || focusedField === 'date'
                    ? 'top-2 text-xs text-green-600'
                    : 'top-4 text-base text-gray-500'
                  }`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Move-in Date
                </label>
              </div>
            </div>

            {/* Message Textarea */}
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField('')}
                rows="4"
                className="w-full px-5 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 bg-white shadow-inner text-gray-800 font-medium resize-none"
                placeholder=" "
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: focusedField === 'message' ? '0 0 0 4px rgba(34, 197, 94, 0.1), inset 0 2px 4px rgba(0,0,0,0.06)' : 'inset 0 2px 4px rgba(0,0,0,0.06)'
                }}
              ></textarea>
              <label className={`absolute left-5 transition-all duration-300 pointer-events-none font-semibold flex items-center gap-1.5 ${formData.message || focusedField === 'message'
                  ? 'top-2 text-xs text-green-600'
                  : 'top-4 text-base text-gray-500'
                }`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Additional Message
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
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
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Submit Request</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Back to Home Link */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 text-sm font-bold transition-all duration-300 hover:gap-3 group"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        select:-webkit-autofill,
        textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px white inset !important;
          -webkit-text-fill-color: #1f2937 !important;
        }
      `}</style>
    </div>
  );
}

export default LeadFormPage;
