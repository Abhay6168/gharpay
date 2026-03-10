const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: [true, 'Lead is required']
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Agent is required']
  },
  propertyName: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true
  },
  propertyAddress: {
    type: String,
    trim: true
  },
  visitDate: {
    type: Date,
    required: [true, 'Visit date is required']
  },
  visitTime: {
    type: String,
    required: [true, 'Visit time is required']
  },
  outcome: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled', 'Interested', 'Not Interested'],
    default: 'Scheduled'
  },
  notes: {
    type: String,
    trim: true
  },
  reminderSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient querying
visitSchema.index({ lead: 1 });
visitSchema.index({ agent: 1 });
visitSchema.index({ visitDate: 1 });
visitSchema.index({ outcome: 1 });

module.exports = mongoose.model('Visit', visitSchema);
