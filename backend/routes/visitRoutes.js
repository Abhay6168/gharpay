const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const Lead = require('../models/Lead');
const Activity = require('../models/Activity');
const { protect } = require('../middleware/auth');

// @route   POST /api/visits
// @desc    Schedule a new visit
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { leadId, propertyName, propertyAddress, visitDate, visitTime, notes } = req.body;

    // Check if lead exists
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Check if agent is authorized
    if (req.user.role === 'agent' && lead.assignedAgent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to schedule visit for this lead' });
    }

    const visit = await Visit.create({
      lead: leadId,
      agent: req.user.id,
      propertyName,
      propertyAddress,
      visitDate,
      visitTime,
      notes,
      outcome: 'Scheduled'
    });

    // Update lead status if not already set
    if (lead.status === 'New Lead' || lead.status === 'Contacted') {
      lead.status = 'Visit Scheduled';
      lead.lastActivityAt = Date.now();
      await lead.save();
    }

    // Create activity
    await Activity.create({
      lead: leadId,
      agent: req.user.id,
      type: 'visit_scheduled',
      description: `Visit scheduled at ${propertyName} on ${new Date(visitDate).toLocaleDateString()}`
    });

    const populatedVisit = await Visit.findById(visit._id)
      .populate('lead', 'name phone')
      .populate('agent', 'name email');

    res.status(201).json(populatedVisit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/visits
// @desc    Get all visits (admin gets all, agent gets their own)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { outcome, leadId } = req.query;
    
    let query = {};

    // If user is agent, only show their visits
    if (req.user.role === 'agent') {
      query.agent = req.user.id;
    }

    // Filter by outcome
    if (outcome) {
      query.outcome = outcome;
    }

    // Filter by lead
    if (leadId) {
      query.lead = leadId;
    }

    const visits = await Visit.find(query)
      .populate('lead', 'name phone preferredLocation')
      .populate('agent', 'name email')
      .sort({ visitDate: -1 });

    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/visits/:id
// @desc    Get single visit
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id)
      .populate('lead', 'name phone email preferredLocation budget')
      .populate('agent', 'name email phone');

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    // Check if agent is authorized
    if (req.user.role === 'agent' && visit.agent._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this visit' });
    }

    res.json(visit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/visits/:id
// @desc    Update visit outcome
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { outcome, notes } = req.body;

    const visit = await Visit.findById(req.params.id);
    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    // Check if agent is authorized
    if (req.user.role === 'agent' && visit.agent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this visit' });
    }

    visit.outcome = outcome || visit.outcome;
    visit.notes = notes || visit.notes;
    await visit.save();

    // Update lead status if visit completed
    if (outcome === 'Completed' || outcome === 'Interested') {
      const lead = await Lead.findById(visit.lead);
      if (lead) {
        lead.status = 'Visit Completed';
        lead.lastActivityAt = Date.now();
        await lead.save();
      }

      // Create activity
      await Activity.create({
        lead: visit.lead,
        agent: req.user.id,
        type: 'visit_completed',
        description: `Visit completed at ${visit.propertyName} - Outcome: ${outcome}`
      });
    }

    if (outcome === 'Cancelled') {
      await Activity.create({
        lead: visit.lead,
        agent: req.user.id,
        type: 'visit_cancelled',
        description: `Visit cancelled at ${visit.propertyName}`
      });
    }

    const updatedVisit = await Visit.findById(visit._id)
      .populate('lead', 'name phone')
      .populate('agent', 'name email');

    res.json(updatedVisit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/visits/:id
// @desc    Delete visit
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);
    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    // Only admin or assigned agent can delete
    if (req.user.role !== 'admin' && visit.agent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this visit' });
    }

    await visit.deleteOne();
    res.json({ message: 'Visit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/visits/upcoming/:days
// @desc    Get upcoming visits in next X days
// @access  Private
router.get('/upcoming/:days', protect, async (req, res) => {
  try {
    const days = parseInt(req.params.days) || 7;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    let query = {
      visitDate: { $gte: startDate, $lte: endDate },
      outcome: 'Scheduled'
    };

    // If user is agent, only show their visits
    if (req.user.role === 'agent') {
      query.agent = req.user.id;
    }

    const visits = await Visit.find(query)
      .populate('lead', 'name phone')
      .populate('agent', 'name email')
      .sort({ visitDate: 1 });

    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
