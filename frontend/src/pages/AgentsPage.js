// Agents Management Page (Admin Only)
import React, { useState, useEffect, useContext } from 'react';
import { agentAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function AgentsPage() {
    const { token, user } = useContext(AuthContext);
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchAgents();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const fetchAgents = async () => {
        try {
            const response = await agentAPI.getAllAgents();
            setAgents(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching agents:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await agentAPI.createAgent(formData);
            setSuccess('Agent created successfully!');
            setFormData({ name: '', email: '', password: '', phone: '' });
            setShowCreateModal(false);
            fetchAgents();

            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create agent');
        }
    };

    const handleToggleStatus = async (agentId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await agentAPI.updateAgent(agentId, { status: newStatus });
            fetchAgents();
        } catch (error) {
            console.error('Error updating agent status:', error);
        }
    };

    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
                    <p className="text-gray-600">This page is only accessible to administrators.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
                <div className="text-xl text-green-600 font-semibold">Loading agents...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-20 sm:pt-24 lg:pt-28 pb-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
                            Agents Management
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">Create and manage agent accounts</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
                    >
                        + Create New Agent
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl">
                        {success}
                    </div>
                )}

                {/* Agents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent) => (
                        <div key={agent._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-full shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${agent.status === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {agent.status}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-2">{agent.name}</h3>
                            <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {agent.email}
                            </p>
                            <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {agent.phone || 'N/A'}
                            </p>

                            <div className="flex items-center justify-between text-sm mb-4">
                                <div>
                                    <span className="text-gray-500">Leads Assigned:</span>
                                    <span className="ml-2 font-bold text-green-600">{agent.assignedLeadsCount || 0}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleToggleStatus(agent._id, agent.status)}
                                className={`w-full py-2 rounded-lg font-semibold transition-all ${agent.status === 'active'
                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                    }`}
                            >
                                {agent.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                        </div>
                    ))}

                    {agents.length === 0 && (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">No agents found. Create your first agent!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Agent Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Create New Agent</h2>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setError('');
                                    setFormData({ name: '', email: '', password: '', phone: '' });
                                }}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Agent's full name"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="agent@gharpay.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Password *</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength="6"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Minimum 6 characters"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Contact number"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateModal(false);
                                        setError('');
                                        setFormData({ name: '', email: '', password: '', phone: '' });
                                    }}
                                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg"
                                >
                                    Create Agent
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AgentsPage;
