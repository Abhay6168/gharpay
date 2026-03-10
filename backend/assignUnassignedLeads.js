// Script to assign all unassigned leads to agents
const mongoose = require('mongoose');
const Lead = require('./models/Lead');
const User = require('./models/User');
const Activity = require('./models/Activity');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gharpay-crm';

const assignUnassignedLeads = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Find all unassigned leads
        const unassignedLeads = await Lead.find({
            $or: [
                { assignedAgent: null },
                { assignedAgent: { $exists: false } }
            ]
        });

        if (unassignedLeads.length === 0) {
            console.log('✅ No unassigned leads found. All leads are already assigned!\n');
            await mongoose.disconnect();
            return;
        }

        console.log(`📋 Found ${unassignedLeads.length} unassigned lead(s)\n`);

        // Get all active agents sorted by assigned leads count (ascending)
        const agents = await User.find({
            role: 'agent',
            status: 'active'
        }).sort({ assignedLeadsCount: 1 });

        if (agents.length === 0) {
            console.log('❌ No active agents available for assignment\n');
            await mongoose.disconnect();
            return;
        }

        console.log(`👥 Found ${agents.length} active agent(s)\n`);

        let assignedCount = 0;
        let agentIndex = 0;

        // Assign each unassigned lead using round-robin
        for (const lead of unassignedLeads) {
            // Get the agent with the least leads (round-robin)
            const agent = agents[agentIndex % agents.length];

            // Assign the lead
            lead.assignedAgent = agent._id;
            await lead.save();

            // Update agent's lead count
            agent.assignedLeadsCount += 1;
            await agent.save();

            // Create activity for this assignment
            await Activity.create({
                lead: lead._id,
                agent: agent._id,
                type: 'assigned',
                description: `Lead auto-assigned to ${agent.name}`
            });

            console.log(`✅ Assigned "${lead.name}" (${lead.phone}) to ${agent.name}`);
            console.log(`   Agent now has ${agent.assignedLeadsCount} lead(s)\n`);

            assignedCount++;
            agentIndex++; // Move to next agent for round-robin
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`🎉 Successfully assigned ${assignedCount} lead(s)!`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Show final agent assignment counts
        console.log('📊 Final Agent Assignment Status:');
        const updatedAgents = await User.find({ role: 'agent', status: 'active' })
            .sort({ name: 1 });

        for (const agent of updatedAgents) {
            const actualCount = await Lead.countDocuments({ assignedAgent: agent._id });
            console.log(`   ${agent.name}: ${actualCount} lead(s)`);
        }
        console.log();

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
};

assignUnassignedLeads();
