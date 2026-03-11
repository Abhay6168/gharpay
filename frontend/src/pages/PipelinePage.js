// Modern SaaS-Style Pipeline Kanban Board
import React, { useState, useEffect, useContext } from 'react';
import { leadAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import StatusUpdateModal from '../components/StatusUpdateModal';

function PipelinePage() {
  const { token } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const statuses = [
    { name: 'New Lead', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50/80', border: 'border-blue-200', text: 'text-blue-700' },
    { name: 'Contacted', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, color: 'from-green-500 to-green-600', bg: 'bg-green-50/80', border: 'border-green-200', text: 'text-green-700' },
    { name: 'Requirement Collected', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>, color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50/80', border: 'border-yellow-200', text: 'text-yellow-700' },
    { name: 'Property Suggested', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50/80', border: 'border-purple-200', text: 'text-purple-700' },
    { name: 'Visit Scheduled', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50/80', border: 'border-orange-200', text: 'text-orange-700' },
    { name: 'Visit Completed', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-50/80', border: 'border-cyan-200', text: 'text-cyan-700' },
    { name: 'Booked', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50/80', border: 'border-emerald-200', text: 'text-emerald-700' },
    { name: 'Lost', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>, color: 'from-red-500 to-red-600', bg: 'bg-red-50/80', border: 'border-red-200', text: 'text-red-700' }
  ];

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await leadAPI.getAllLeads();
      setLeads(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLoading(false);
    }
  };

  const getLeadsByStatus = (statusName) => {
    return leads.filter(lead => lead.status === statusName);
  };

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex items-center justify-center pt-28">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-700 font-semibold">Loading pipeline...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 pt-20 sm:pt-24 lg:pt-28 pb-10 px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                Lead Pipeline
              </h1>
              <p className="text-gray-600 text-sm sm:text-base font-medium flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="hidden sm:inline">Drag and drop leads between stages</span>
                <span className="sm:hidden">Pipeline View</span>
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-xl px-4 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-lg border border-gray-200/50">
              <div className="text-xs sm:text-sm text-gray-600 font-medium">Total Leads</div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600">{leads.length}</div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-6">
          <div className="inline-flex gap-3 sm:gap-4 min-w-full px-2 sm:px-4">
            {statuses.map((status, columnIndex) => {
              const statusLeads = getLeadsByStatus(status.name);
              return (
                <div key={status.name} className="flex-shrink-0 w-72 sm:w-80">
                  {/* Column Header */}
                  <div className={`backdrop-blur-xl rounded-2xl border-2 ${status.border} ${status.bg} shadow-lg overflow-hidden mb-4 transition-all hover:shadow-xl`}>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 bg-gradient-to-br ${status.color} rounded-xl flex items-center justify-center text-white shadow-md`}>
                            {status.icon}
                          </div>
                          <h2 className={`font-bold text-sm ${status.text}`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                            {status.name}
                          </h2>
                        </div>
                        <span className={`px-3 py-1 bg-white/70 backdrop-blur-sm ${status.text} rounded-full text-xs font-bold shadow-sm`}>
                          {statusLeads.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lead Cards */}
                  <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {statusLeads.length > 0 ? (
                      statusLeads.map((lead, index) => (
                        <div
                          key={lead._id}
                          onClick={() => handleLeadClick(lead)}
                          className="group bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 border border-gray-200 hover:border-green-400 transform hover:-translate-y-1 hover:scale-[1.02]"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {/* Lead Header */}
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${status.color} rounded-xl flex items-center justify-center text-white font-bold shadow-md text-sm`}>
                              {lead.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-gray-900 truncate" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                                {lead.name}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {lead.phone}
                              </div>
                            </div>
                          </div>

                          {/* Lead Details */}
                          <div className="space-y-2 mb-3">
                            {lead.email && (
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="truncate">{lead.email}</span>
                              </div>
                            )}
                            {lead.preferredLocation && (
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="truncate">{lead.preferredLocation}</span>
                              </div>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              {lead.source}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>

                          {/* Hover View Button */}
                          <div className="mt-3 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-full py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Details
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white/50 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
                        <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <div className="text-sm text-gray-400 font-semibold">No leads yet</div>
                        <div className="text-xs text-gray-400 mt-1">Leads will appear here</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showModal && selectedLead && (
        <StatusUpdateModal
          lead={selectedLead}
          onClose={() => {
            setShowModal(false);
            setSelectedLead(null);
            fetchLeads();
          }}
        />
      )}

      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 10px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}

export default PipelinePage;
