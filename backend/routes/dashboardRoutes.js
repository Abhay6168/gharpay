const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const Visit = require('../models/Visit');
const User = require('../models/User');
const Activity = require('../models/Activity');
const { protect } = require('../middleware/auth');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let leadQuery = {};
    let visitQuery = {};

    // If agent, filter by their assigned leads/visits
    if (req.user.role === 'agent') {
      leadQuery.assignedAgent = req.user.id;
      visitQuery.agent = req.user.id;
    }

    // Total leads
    const totalLeads = await Lead.countDocuments(leadQuery);

    // Today's leads
    const todaysLeads = await Lead.countDocuments({
      ...leadQuery,
      createdAt: { $gte: today }
    });

    // Leads by status
    const newLeads = await Lead.countDocuments({ ...leadQuery, status: 'New Lead' });
    const contactedLeads = await Lead.countDocuments({ ...leadQuery, status: 'Contacted' });
    const visitScheduledLeads = await Lead.countDocuments({ ...leadQuery, status: 'Visit Scheduled' });
    const visitCompletedLeads = await Lead.countDocuments({ ...leadQuery, status: 'Visit Completed' });
    const bookedLeads = await Lead.countDocuments({ ...leadQuery, status: 'Booked' });
    const lostLeads = await Lead.countDocuments({ ...leadQuery, status: 'Lost' });

    // Total visits
    const totalVisits = await Visit.countDocuments(visitQuery);

    // Upcoming visits
    const upcomingVisits = await Visit.countDocuments({
      ...visitQuery,
      visitDate: { $gte: today },
      outcome: 'Scheduled'
    });

    // Completed visits
    const completedVisits = await Visit.countDocuments({
      ...visitQuery,
      outcome: { $in: ['Completed', 'Interested'] }
    });

    res.json({
      totalLeads,
      todaysLeads,
      newLeads,
      contactedLeads,
      visitScheduledLeads,
      visitCompletedLeads,
      bookedLeads,
      lostLeads,
      totalVisits,
      upcomingVisits,
      completedVisits
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/dashboard/pipeline
// @desc    Get pipeline distribution
// @access  Private
router.get('/pipeline', protect, async (req, res) => {
  try {
    let query = {};

    // If agent, filter by their assigned leads
    if (req.user.role === 'agent') {
      query.assignedAgent = req.user.id;
    }

    const pipeline = await Lead.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(pipeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET/api/dashboard/sources
// @desc    Get lead distribution by source
// @access  Private
router.get('/sources', protect, async (req, res) => {
  try {
    let query = {};

    // If agent, filter by their assigned leads
    if (req.user.role === 'agent') {
      query.assignedAgent = req.user.id;
    }

    const sources = await Lead.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(sources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/dashboard/recent-leads
// @desc    Get recent leads
// @access  Private
router.get('/recent-leads', protect, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    let query = {};

    // If agent, filter by their assigned leads
    if (req.user.role === 'agent') {
      query.assignedAgent = req.user.id;
    }

    const recentLeads = await Lead.find(query)
      .populate('assignedAgent', 'name')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(recentLeads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/dashboard/recent-activities
// @desc    Get recent activities
// @access  Private
router.get('/recent-activities', protect, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    let query = {};

    // If agent, filter by their activities
    if (req.user.role === 'agent') {
      query.agent = req.user.id;
    }

    const activities = await Activity.find(query)
      .populate('lead', 'name phone')
      .populate('agent', 'name')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/dashboard/agent-performance
// @desc    Get agent performance metrics (admin only)
// @access  Private (admin)
router.get('/agent-performance', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const agents = await User.find({ role: 'agent', status: 'active' });
    
    const performance = await Promise.all(
      agents.map(async (agent) => {
        const totalLeads = await Lead.countDocuments({ assignedAgent: agent._id });
        const bookedLeads = await Lead.countDocuments({ 
          assignedAgent: agent._id, 
          status: 'Booked' 
        });
        const activeLeads = await Lead.countDocuments({ 
          assignedAgent: agent._id,
          status: { $nin: ['Booked', 'Lost'] }
        });
        const visits = await Visit.countDocuments({ agent: agent._id });
        const completedVisits = await Visit.countDocuments({ 
          agent: agent._id,
          outcome: { $in: ['Completed', 'Interested'] }
        });

        return {
          agentId: agent._id,
          agentName: agent.name,
          agentEmail: agent.email,
          totalLeads,
          activeLeads,
          bookedLeads,
          conversionRate: totalLeads > 0 ? ((bookedLeads / totalLeads) * 100).toFixed(2) : 0,
          totalVisits: visits,
          completedVisits
        };
      })
    );

    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
