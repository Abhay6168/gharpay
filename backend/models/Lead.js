const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  source: {
    type: String,
    enum: ['Website', 'WhatsApp', 'Instagram', 'Facebook', 'Phone Call', 'Referral'],
    required: true
  },
  preferredLocation: {
    type: String,
    trim: true
  },
  budget: {
    type: Number,
    min: 0
  },
  moveInDate: {
    type: Date
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['New Lead', 'Contacted', 'Requirement Collected', 'Property Suggested', 
           'Visit Scheduled', 'Visit Completed', 'Booked', 'Lost'],
    default: 'New Lead'
  },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  lastActivityAt: {
    type: Date,
    default: Date.now
  },
  notes: [{
    note: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for efficient querying
leadSchema.index({ phone: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ assignedAgent: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ lastActivityAt: 1 });

module.exports = mongoose.model('Lead', leadSchema);
