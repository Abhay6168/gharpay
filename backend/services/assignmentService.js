const Lead = require('../models/Lead');
const User = require('../models/User');
const Activity = require('../models/Activity');

// Round-robin counter for lead assignment
let lastAssignedIndex = -1;

/**
 * Assign lead to agent using round-robin with workload balancing
 * @param {String} leadId - Lead ID to assign
 * @returns {Promise<Lead>} - Assigned lead
 */
async function assignLeadToAgent(leadId) {
  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      throw new Error('Lead not found');
    }

    // Get all active agents sorted by assigned leads count (ascending)
    const agents = await User.find({ role: 'agent', status: 'active' }).sort({ assignedLeadsCount: 1 });

    if (agents.length === 0) {
      throw new Error('No active agents available');
    }

    // Smart Round-Robin with Workload Balancing:
    // Always assign to the agent with the LEAST number of leads
    // If multiple agents have the same least count, use round-robin among them
    const minLeadCount = agents[0].assignedLeadsCount;
    const agentsWithMinLeads = agents.filter(agent => agent.assignedLeadsCount === minLeadCount);

    let assignedAgent;
    if (agentsWithMinLeads.length === 1) {
      assignedAgent = agentsWithMinLeads[0];
    } else {
      // Multiple agents with same load, use round-robin
      lastAssignedIndex = (lastAssignedIndex + 1) % agentsWithMinLeads.length;
      assignedAgent = agentsWithMinLeads[lastAssignedIndex];
    }

    // Assign lead to agent
    lead.assignedAgent = assignedAgent._id;
    lead.lastActivityAt = Date.now();
    await lead.save();

    // Increment agent's lead count
    await assignedAgent.incrementLeadsCount();

    // Create activity
    await Activity.create({
      lead: lead._id,
      agent: assignedAgent._id,
      type: 'assigned',
      description: `Lead assigned to ${assignedAgent.name}`
    });

    console.log(`✅ Lead "${lead.name}" assigned to ${assignedAgent.name} (Total: ${assignedAgent.assignedLeadsCount + 1} leads)`);

    return await Lead.findById(leadId).populate('assignedAgent', 'name email');
  } catch (error) {
    console.error('Error assigning lead:', error);
    throw error;
  }
}

/**
 * Reassign lead from one agent to another
 * @param {String} leadId - Lead ID
 * @param {String} newAgentId - New agent ID
 * @returns {Promise<Lead>} - Reassigned lead
 */
async function reassignLead(leadId, newAgentId) {
  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      throw new Error('Lead not found');
    }

    const newAgent = await User.findById(newAgentId);
    if (!newAgent || newAgent.role !== 'agent') {
      throw new Error('Invalid agent');
    }

    // Update old agent's lead count
    if (lead.assignedAgent) {
      const oldAgent = await User.findById(lead.assignedAgent);
      if (oldAgent) {
        await oldAgent.decrementLeadsCount();
      }
    }

    // Assign to new agent
    lead.assignedAgent = newAgentId;
    lead.lastActivityAt = Date.now();
    await lead.save();

    // Increment new agent's lead count
    await newAgent.incrementLeadsCount();

    // Create activity
    await Activity.create({
      lead: lead._id,
      agent: newAgentId,
      type: 'assigned',
      description: `Lead reassigned to ${newAgent.name}`
    });

    return await Lead.findById(leadId).populate('assignedAgent', 'name email');
  } catch (error) {
    console.error('Error reassigning lead:', error);
    throw error;
  }
}

module.exports = {
  assignLeadToAgent,
  reassignLead
};
