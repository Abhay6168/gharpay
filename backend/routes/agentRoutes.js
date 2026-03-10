const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Lead = require('../models/Lead');
const { protect } = require('../middleware/auth');

// @route   GET /api/agents
// @desc    Get all agents (admin only)
// @access  Private (admin)
router.get('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const agents = await User.find({ role: 'agent' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/agents/:id
// @desc    Get single agent
// @access  Private (admin)
router.get('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const agent = await User.findById(req.params.id).select('-password');
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Get agent's leads count
    const totalLeads = await Lead.countDocuments({ assignedAgent: agent._id });
    const activeLeads = await Lead.countDocuments({ 
      assignedAgent: agent._id,
      status: { $nin: ['Booked', 'Lost'] }
    });

    res.json({
      ...agent.toObject(),
      totalLeads,
      activeLeads
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/agents
// @desc    Create new agent (admin only)
// @access  Private (admin)
router.post('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { name, email, password, phone } = req.body;

    // Check if agent exists
    const agentExists = await User.findOne({ email });
    if (agentExists) {
      return res.status(400).json({ message: 'Agent with this email already exists' });
    }

    const agent = await User.create({
      name,
      email,
      password,
      phone,
      role: 'agent'
    });

    res.status(201).json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      role: agent.role,
      status: agent.status
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/agents/:id
// @desc    Update agent
// @access  Private (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { name, email, phone, status } = req.body;

    const agent = await User.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    agent.name = name || agent.name;
    agent.email = email || agent.email;
    agent.phone = phone || agent.phone;
    agent.status = status || agent.status;

    await agent.save();

    res.json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      role: agent.role,
      status: agent.status
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/agents/:id
// @desc    Delete agent (admin only)
// @access  Private (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const agent = await User.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    if (agent.role !== 'agent') {
      return res.status(400).json({ message: 'Cannot delete admin user' });
    }

    // Check if agent has active leads
    const activeLeads = await Lead.countDocuments({ 
      assignedAgent: agent._id,
      status: { $nin: ['Booked', 'Lost'] }
    });

    if (activeLeads > 0) {
      return res.status(400).json({ 
        message: `Cannot delete agent with ${activeLeads} active leads. Please reassign leads first.` 
      });
    }

    await agent.deleteOne();
    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/agents/:id/toggle-status
// @desc    Toggle agent status (active/inactive)
// @access  Private (admin)
router.put('/:id/toggle-status', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const agent = await User.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    agent.status = agent.status === 'active' ? 'inactive' : 'active';
    await agent.save();

    res.json({
      _id: agent._id,
      name: agent.name,
      status: agent.status
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
