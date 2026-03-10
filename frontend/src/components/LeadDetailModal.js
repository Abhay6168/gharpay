// Lead detail modal with full information and actions
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function LeadDetailModal({ lead, onClose }) {
  const { token } = useContext(AuthContext);
  const [leadData, setLeadData] = useState(lead);
  const [activities, setActivities] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newStatus, setNewStatus] = useState(lead.status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeadDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLeadDetails = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`http://localhost:5000/api/leads/${lead._id}`, config);
      setLeadData(response.data.lead);
      setActivities(response.data.activities || []);
    } catch (error) {
      console.error('Error fetching lead details:', error);
    }
  };

  const handleStatusUpdate = async () => {
    if (newStatus === leadData.status) return;

    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:5000/api/leads/${lead._id}/status`,
        { status: newStatus },
        config
      );
      await fetchLeadDetails();
      alert('Status updated successfully!');
    } catch (error) {
      alert('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`http://localhost:5000/api/leads/${lead._id}/notes`,
        { note: newNote },
        config
      );
      setNewNote('');
      await fetchLeadDetails();
      alert('Note added successfully!');
    } catch (error) {
      alert('Failed to add note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-standard shadow-soft max-w-4xl w-full max-h-[90vh] overflow-y-auto card-hover">
        {/* Header */}
        <div className="navbar-animated text-white p-6 rounded-t-standard">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{leadData.name}</h2>
              <p className="text-white/90">{leadData.phone}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl font-bold transition-transform hover:scale-110"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Lead Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <div className="text-gray-900">{leadData.email || 'Not provided'}</div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Source</label>
              <div className="text-gray-900">{leadData.source}</div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Preferred Location</label>
              <div className="text-gray-900">{leadData.preferredLocation || 'Not specified'}</div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Budget</label>
              <div className="text-gray-900">
                {leadData.budget ? `₹${leadData.budget}` : 'Not specified'}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Move-in Date</label>
              <div className="text-gray-900">
                {leadData.moveInDate ? new Date(leadData.moveInDate).toLocaleDateString() : 'Flexible'}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Created</label>
              <div className="text-gray-900">
                {new Date(leadData.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          {leadData.message && (
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-600 block mb-1">Message</label>
              <div className="bg-gray-50 p-3 rounded-xl text-gray-900">{leadData.message}</div>
            </div>
          )}

          {/* Status Update */}
          <div className="mb-6 bg-green-50 p-4 rounded-standard">
            <label className="text-sm font-semibold text-gray-900 block mb-2">Update Status</label>
            <div className="flex items-center space-x-2">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              >
                <option value="New Lead">New Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Requirement Collected">Requirement Collected</option>
                <option value="Property Suggested">Property Suggested</option>
                <option value="Visit Scheduled">Visit Scheduled</option>
                <option value="Visit Completed">Visit Completed</option>
                <option value="Booked">Booked</option>
                <option value="Lost">Lost</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={loading || newStatus === leadData.status}
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 disabled:bg-gray-400"
              >
                Update
              </button>
            </div>
          </div>

          {/* Add Note */}
          <div className="mb-6 bg-green-50 p-4 rounded-xl">
            <label className="text-sm font-medium text-gray-900 block mb-2">Add Note</label>
            <div className="flex items-start space-x-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows="2"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Add a note about this lead..."
              ></textarea>
              <button
                onClick={handleAddNote}
                disabled={loading || !newNote.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 disabled:bg-gray-400"
              >
                Add
              </button>
            </div>
          </div>

          {/* Notes History */}
          {leadData.notes && leadData.notes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Notes</h3>
              <div className="space-y-2">
                {leadData.notes.map((note, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="text-gray-900">{note.note}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(note.createdAt).toLocaleString()} • {note.createdBy?.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Timeline */}
          {activities.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Activity Timeline</h3>
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <div key={activity._id} className="flex items-start space-x-3 border-l-2 border-green-200 pl-4 pb-2">
                    <div className="flex-1">
                      <div className="text-gray-900">{activity.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(activity.createdAt).toLocaleString()}
                        {activity.agent && ` • ${activity.agent.name}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-6 py-2 rounded-xl hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadDetailModal;
