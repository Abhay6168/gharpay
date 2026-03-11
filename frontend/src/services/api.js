import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://gharpay.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to headers
api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData)
};

// Lead API calls
export const leadAPI = {
  createLead: (leadData) => api.post('/leads', leadData),
  getAllLeads: (params) => api.get('/leads', { params }),
  getLeadById: (id) => api.get(`/leads/${id}`),
  updateLeadStatus: (id, status) => api.put(`/leads/${id}/status`, { status }),
  addNote: (id, note) => api.post(`/leads/${id}/notes`, { note }),
  updateLead: (id, leadData) => api.patch(`/leads/${id}`, leadData),
  reassignLead: (id, newAgentId) => api.patch(`/leads/${id}/reassign`, { newAgentId }),
  getLeadActivities: (id) => api.get(`/leads/${id}/activities`)
};

// Agent API calls
export const agentAPI = {
  register: (agentData) => api.post('/agents/register', agentData),
  login: (credentials) => api.post('/agents/login', credentials),
  getAllAgents: () => api.get('/agents'),
  getAgent: (id) => api.get(`/agents/${id}`),
  createAgent: (agentData) => api.post('/agents', agentData),
  updateAgent: (id, agentData) => api.put(`/agents/${id}`, agentData),
  getCurrentUser: () => api.get('/agents/profile/me')
};

// Visit API calls
export const visitAPI = {
  scheduleVisit: (visitData) => api.post('/visits', visitData),
  getAllVisits: () => api.get('/visits'),
  getLeadVisits: (leadId) => api.get(`/visits/lead/${leadId}`),
  updateVisit: (id, visitData) => api.patch(`/visits/${id}`, visitData),
  deleteVisit: (id) => api.delete(`/visits/${id}`)
};

// Dashboard API calls
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getPipeline: () => api.get('/dashboard/pipeline'),
  getSources: () => api.get('/dashboard/sources'),
  getRecentLeads: (limit = 5) => api.get(`/dashboard/recent-leads?limit=${limit}`),
  getAnalytics: () => api.get('/dashboard/analytics'),
  getPerformance: () => api.get('/dashboard/performance'),
  getPipelineFunnel: () => api.get('/dashboard/funnel'),
  getReminders: () => api.get('/dashboard/reminders'),
  markReminderAsRead: (id) => api.patch(`/dashboard/reminders/${id}/read`, {})
};

export default api;
