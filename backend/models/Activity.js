const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  type: {
    type: String,
    enum: ['created', 'assigned', 'contacted', 'status_changed', 'note_added', 
           'visit_scheduled', 'visit_completed', 'visit_cancelled', 'reminder'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index for efficient querying
activitySchema.index({ lead: 1, createdAt: -1 });
activitySchema.index({ agent: 1, createdAt: -1 });
activitySchema.index({ type: 1 });

module.exports = mongoose.model('Activity', activitySchema);
