const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['inactive_lead', 'visit_upcoming', 'follow_up'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  dismissed: {
    type: Boolean,
    default: false
  },
  dismissedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient querying
reminderSchema.index({ agent: 1, dismissed: 1 });
reminderSchema.index({ lead: 1 });
reminderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Reminder', reminderSchema);
