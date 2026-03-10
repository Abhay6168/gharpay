// Status update modal for pipeline board
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function StatusUpdateModal({ lead, onClose }) {
  const { token } = useContext(AuthContext);
  const [newStatus, setNewStatus] = useState(lead.status);
  const [loading, setLoading] = useState(false);

  const statuses = [
    'New Lead',
    'Contacted',
    'Requirement Collected',
    'Property Suggested',
    'Visit Scheduled',
    'Visit Completed',
    'Booked',
    'Lost'
  ];

  const handleUpdate = async () => {
    if (newStatus === lead.status) {
      onClose();
      return;
    }

    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        `http://localhost:5000/api/leads/${lead._id}/status`,
        { status: newStatus },
        config
      );
      alert('Status updated successfully!');
      onClose();
    } catch (error) {
      alert('Failed to update status: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-standard shadow-soft max-w-md w-full card-hover">
        <div className="p-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4">Update Lead Status</h2>
          
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">Lead: <span className="font-semibold text-gray-900">{lead.name}</span></div>
            <div className="text-sm text-gray-600 mb-4">Phone: {lead.phone}</div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Status
              </label>
              <div className="px-3 py-2 bg-green-50 rounded-xl text-gray-900 font-medium">
                {lead.status}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 btn-hover-scale font-semibold"
            >
              {loading ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusUpdateModal;
