const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const User = require('../models/User');
const Activity = require('../models/Activity');
const { protect } = require('../middleware/auth');
const { assignLeadToAgent } = require('../services/assignmentService');

// @route   POST /api/leads
// @desc    Create new lead (public lead capture form)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, source, preferredLocation, budget, moveInDate, message } = req.body;

    // Check if lead with same phone already exists
    const existingLead = await Lead.findOne({ phone });
    if (existingLead) {
      return res.status(400).json({ message: 'Lead with this phone number already exists' });
    }

    // Create lead
    const lead = await Lead.create({
      name,
      phone,
      email,
      source,
      preferredLocation,
      budget,
      moveInDate,
      message,
      status: 'New Lead'
    });

    // Assign lead to agent using round-robin or workload balancing
    const assignedLead = await assignLeadToAgent(lead._id);

    // Create activity
    await Activity.create({
      lead: lead._id,
      agent: assignedLead.assignedAgent,
      type: 'created',
      description: `Lead created from ${source}`
    });

    res.status(201).json(assignedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/leads
// @desc    Get all leads (admin gets all, agent gets assigned)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status, source, search } = req.query;
    
    let query = {};

    // If user is agent, only show their assigned leads
    if (req.user.role === 'agent') {
      query.assignedAgent = req.user.id;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by source
    if (source) {
      query.source = source;
    }

    // Search by name or phone
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const leads = await Lead.find(query)
      .populate('assignedAgent', 'name email')
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/leads/:id
// @desc    Get single lead by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedAgent', 'name email phone')
      .populate('notes.createdBy', 'name');

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Check if agent is authorized to view this lead
    if (req.user.role === 'agent' && lead.assignedAgent._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this lead' });
    }

    // Get activities for this lead
    const activities = await Activity.find({ lead: req.params.id })
      .populate('agent', 'name')
      .sort({ createdAt: -1 });

    res.json({ lead, activities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/leads/:id/status
// @desc    Update lead status
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Check if agent is authorized
    if (req.user.role === 'agent' && lead.assignedAgent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this lead' });
    }

    const oldStatus = lead.status;
    lead.status = status;
    lead.lastActivityAt = Date.now();
    await lead.save();

    // Create activity
    await Activity.create({
      lead: lead._id,
      agent: req.user.id,
      type: 'status_changed',
      description: `Status changed from ${oldStatus} to ${status}`
    });

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/leads/:id/assign
// @desc    Reassign lead to different agent (admin only)
// @access  Private (admin)
router.put('/:id/assign', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can reassign leads' });
    }

    const { agentId } = req.body;

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    const agent = await User.findById(agentId);
    if (!agent || agent.role !== 'agent') {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Update lead counts
    if (lead.assignedAgent) {
      const oldAgent = await User.findById(lead.assignedAgent);
      if (oldAgent) {
        await oldAgent.decrementLeadsCount();
      }
    }

    lead.assignedAgent = agentId;
    lead.lastActivityAt = Date.now();
    await lead.save();

    await agent.incrementLeadsCount();

    // Create activity
    await Activity.create({
      lead: lead._id,
      agent: agentId,
      type: 'assigned',
      description: `Lead reassigned to ${agent.name}`
    });

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/leads/:id/notes
// @desc    Add note to  lead
// @access  Private
router.post('/:id/notes', protect, async (req, res) => {
  try {
    const { note } = req.body;

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Check if agent is authorized
    if (req.user.role === 'agent' && lead.assignedAgent.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add notes to this lead' });
    }

    lead.notes.push({
      note,
      createdBy: req.user.id,
      createdAt: Date.now()
    });
    lead.lastActivityAt = Date.now();
    await lead.save();

    // Create activity
    await Activity.create({
      lead: lead._id,
      agent: req.user.id,
      type: 'note_added',
      description: `Note added: ${note.substring(0, 50)}...`
    });

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/leads/:id
// @desc    Delete lead (admin only)
// @access  Private (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can delete leads' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Update agent lead count
    if (lead.assignedAgent) {
      const agent = await User.findById(lead.assignedAgent);
      if (agent) {
        await agent.decrementLeadsCount();
      }
    }

    await lead.deleteOne();
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
