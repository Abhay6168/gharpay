// Modern Premium Dashboard with SaaS-style UI
import React, { useState, useEffect, useContext } from 'react';
import { dashboardAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DashboardPage() {
  const { token, user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [pipeline, setPipeline] = useState([]);
  const [sources, setSources] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, pipelineRes, sourcesRes, leadsRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getPipeline(),
        dashboardAPI.getSources(),
        dashboardAPI.getRecentLeads(5)
      ]);

      setStats(statsRes.data);
      setPipeline(pipelineRes.data);
      setSources(sourcesRes.data);
      setRecentLeads(leadsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const AnimatedNumber = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 1000;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [value]);

    return <span>{displayValue}</span>;
  };

  const pipelineChartData = {
    labels: pipeline.map(p => p._id),
    datasets: [{
      data: pipeline.map(p => p.count),
      backgroundColor: ['#10B981', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#6B7280'],
      borderWidth: 0,
      borderRadius: 8,
    }]
  };

  const sourcesChartData = {
    labels: sources.map(s => s._id),
    datasets: [{
      label: 'Leads by Source',
      data: sources.map(s => s.count),
      backgroundColor: '#16A34A',
      borderRadius: 8,
      hoverBackgroundColor: '#15803D'
    }]
  };

  const filteredLeads = recentLeads.filter(lead =>
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone?.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    const colors = {
      'New Lead': 'bg-blue-100 text-blue-800 border-blue-200',
      'Contacted': 'bg-green-100 text-green-800 border-green-200',
      'Interested': 'bg-purple-100 text-purple-800 border-purple-200',
      'Visit Scheduled': 'bg-orange-100 text-orange-800 border-orange-200',
      'Booked': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Lost': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-700 font-semibold">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto pt-20 sm:pt-24 lg:pt-28 pb-10 px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2 flex items-center gap-2 sm:gap-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              <span className="hidden sm:inline">Welcome back, {user?.name}!</span>
              <span className="sm:hidden">Hi, {user?.name}!</span>
              <svg className="w-6 h-6 sm:w-10 sm:h-10 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 4a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 -2.5 -2.5z" />
              </svg>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {user?.role === 'admin' ? 'Admin Dashboard' : 'Agent Dashboard'} • <span className="hidden sm:inline">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span><span className="sm:hidden">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Leads Card */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100 hover:border-green-300 transform hover:-translate-y-1 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="text-gray-500 text-sm font-semibold mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Total Leads</div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <AnimatedNumber value={stats?.totalLeads || 0} />
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
            </div>
          </div>

          {/* Today's Leads Card */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
              <div className="text-gray-500 text-sm font-semibold mb-1">Today's Leads</div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <AnimatedNumber value={stats?.todaysLeads || 0} />
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
          </div>

          {/* Bookings Card */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 hover:border-emerald-300 transform hover:-translate-y-1 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-gray-500 text-sm font-semibold mb-1">Bookings</div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <AnimatedNumber value={stats?.bookedLeads || 0} />
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
            </div>
          </div>

          {/* Visits Scheduled Card */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300 transform hover:-translate-y-1 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-gray-500 text-sm font-semibold mb-1">Visits Scheduled</div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <AnimatedNumber value={stats?.upcomingVisits || 0} />
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Pipeline Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="relative bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-200 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 overflow-hidden">
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 w-0 group-hover:w-full transition-all duration-500"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-800 font-bold text-sm">New Leads</span>
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-blue-700">
              <AnimatedNumber value={stats?.newLeads || 0} />
            </div>
            <div className="mt-3 h-1.5 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-5 border border-green-200 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 overflow-hidden">
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 w-0 group-hover:w-full transition-all duration-500"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-800 font-bold text-sm">Contacted</span>
              <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-green-700">
              <AnimatedNumber value={stats?.contactedLeads || 0} />
            </div>
            <div className="mt-3 h-1.5 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-5 border border-orange-200 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 overflow-hidden">
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 w-0 group-hover:w-full transition-all duration-500"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-orange-800 font-bold text-sm">Visit Scheduled</span>
              <svg className="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-orange-700">
              <AnimatedNumber value={stats?.visitScheduledLeads || 0} />
            </div>
            <div className="mt-3 h-1.5 bg-orange-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-5 border border-purple-200 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 overflow-hidden">
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600 w-0 group-hover:w-full transition-all duration-500"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-800 font-bold text-sm">Visit Completed</span>
              <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-purple-700">
              <AnimatedNumber value={stats?.visitCompletedLeads || 0} />
            </div>
            <div className="mt-3 h-1.5 bg-purple-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-pulse" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pipeline Distribution Chart */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-7 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Sora, sans-serif' }}>Pipeline Distribution</h2>
            </div>
            {pipeline.length > 0 ? (
              <div className="relative h-72">
                <Pie data={pipelineChartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-72 text-gray-400">
                <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div className="text-lg font-semibold">No data available</div>
              </div>
            )}
          </div>

          {/* Leads by Source Chart */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-7 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Sora, sans-serif' }}>Leads by Source</h2>
            </div>
            {sources.length > 0 ? (
              <div className="relative h-72">
                <Bar data={sourcesChartData} options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } } }} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-72 text-gray-400">
                <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <div className="text-lg font-semibold">No data available</div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="p-7 border-b border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Sora, sans-serif' }}>Recent Leads</h2>
              </div>
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all w-64 bg-gray-50"
                />
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          {filteredLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wider">Phone</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wider">Source</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, index) => (
                    <tr key={lead._id} className="border-b border-gray-100 hover:bg-green-50/50 transition-all duration-200" style={{ animationDelay: `${index * 50}ms` }}>
                      <td className="py-4 px-6 font-semibold text-gray-800">{lead.name}</td>
                      <td className="py-4 px-6 text-gray-600">{lead.phone}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                          {lead.source}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div className="text-lg font-semibold">No recent leads found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
