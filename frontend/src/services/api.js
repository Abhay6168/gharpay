import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Lead API calls
export const leadAPI = {
  createLead: (leadData) => api.post('/leads', leadData),
  getAllLeads: () => api.get('/leads'),
  getLeadById: (id) => api.get(`/leads/${id}`),
  updateLeadStatus: (id, status) => api.patch(`/leads/${id}/status`, { status }),
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
  getCurrentUser: () => api.get('/agents/profile/me'),
  updateAgent: (id, agentData) => api.patch(`/agents/${id}`, agentData)
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
  getAnalytics: () => api.get('/dashboard/analytics'),
  getPerformance: () => api.get('/dashboard/performance'),
  getPipelineFunnel: () => api.get('/dashboard/funnel'),
  getReminders: () => api.get('/dashboard/reminders'),
  markReminderAsRead: (id) => api.patch(`/dashboard/reminders/${id}/read`, {})
};

export default api;
