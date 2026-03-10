const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const { protect } = require('../middleware/auth');

// @route   GET /api/reminders
// @desc    Get reminders for current agent
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { dismissed } = req.query;
    
    let query = { agent: req.user.id };

    // Filter by dismissed status
    if (dismissed !== undefined) {
      query.dismissed = dismissed === 'true';
    }

    const reminders = await Reminder.find(query)
      .populate('lead', 'name phone status')
      .sort({ createdAt: -1 });

    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/reminders/:id/dismiss
// @desc    Dismiss a reminder
// @access  Private
router.put('/:id/dismiss', protect, async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    // Check if user owns this reminder
    if (reminder.agent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to dismiss this reminder' });
    }

    reminder.dismissed = true;
    reminder.dismissedAt = Date.now();
    await reminder.save();

    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/reminders/:id
// @desc    Delete a reminder
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    // Check if user owns this reminder or is admin
    if (reminder.agent.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this reminder' });
    }

    await reminder.deleteOne();
    res.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/reminders/count
// @desc    Get count of active reminders
// @access  Private
router.get('/count', protect, async (req, res) => {
  try {
    const count = await Reminder.countDocuments({
      agent: req.user.id,
      dismissed: false
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
