// Script to create 5 dummy test leads with auto-assignment
const mongoose = require('mongoose');
const Lead = require('./models/Lead');
const User = require('./models/User');
const Activity = require('./models/Activity');
const { assignLeadToAgent } = require('./services/assignmentService');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gharpay-crm';

const dummyLeads = [
    {
        name: 'Rahul Sharma',
        phone: '9876543220',
        email: 'rahul.sharma@email.com',
        source: 'Website',
        preferredLocation: 'Koramangala',
        budget: 9000,
        moveInDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        message: 'Looking for a single occupancy room near Koramangala'
    },
    {
        name: 'Priya Nair',
        phone: '9876543221',
        email: 'priya.nair@email.com',
        source: 'WhatsApp',
        preferredLocation: 'HSR Layout',
        budget: 11000,
        moveInDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        message: 'Need PG with food facilities'
    },
    {
        name: 'Amit Kumar',
        phone: '9876543222',
        email: 'amit.kumar@email.com',
        source: 'Facebook',
        preferredLocation: 'Whitefield',
        budget: 8000,
        moveInDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
        message: 'Looking for PG near Whitefield office area'
    },
    {
        name: 'Sneha Reddy',
        phone: '9876543223',
        email: 'sneha.reddy@email.com',
        source: 'Instagram',
        preferredLocation: 'BTM Layout',
        budget: 10000,
        moveInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        message: 'Urgent requirement for PG'
    },
    {
        name: 'Vikram Singh',
        phone: '9876543224',
        email: 'vikram.singh@email.com',
        source: 'Referral',
        preferredLocation: 'Marathahalli',
        budget: 9500,
        moveInDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
        message: 'Looking for PG with parking facility'
    }
];

const createDummyLeads = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Check if agents exist
        const agentCount = await User.countDocuments({ role: 'agent', status: 'active' });
        if (agentCount === 0) {
            console.log('❌ No active agents found. Please run seedUsers.js first.\n');
            await mongoose.disconnect();
            return;
        }

        console.log(`👥 Found ${agentCount} active agent(s)\n`);
        console.log('📝 Creating 5 dummy test leads with auto-assignment...\n');

        let successCount = 0;
        let errorCount = 0;

        for (const leadData of dummyLeads) {
            try {
                // Check if lead with same phone already exists
                const existingLead = await Lead.findOne({ phone: leadData.phone });
                if (existingLead) {
                    console.log(`⚠️  Skipped "${leadData.name}" - phone already exists`);
                    errorCount++;
                    continue;
                }

                // Create lead
                const lead = await Lead.create({
                    ...leadData,
                    status: 'New Lead'
                });

                // Auto-assign to agent using round-robin
                const assignedLead = await assignLeadToAgent(lead._id);

                console.log(`✅ Created and assigned "${leadData.name}" to ${assignedLead.assignedAgent.name}`);
                successCount++;

            } catch (error) {
                console.log(`❌ Error creating "${leadData.name}": ${error.message}`);
                errorCount++;
            }
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`🎉 Successfully created ${successCount} lead(s)`);
        if (errorCount > 0) {
            console.log(`⚠️  Skipped/Failed: ${errorCount} lead(s)`);
        }
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Show final agent assignment distribution
        console.log('📊 Final Agent Assignment Distribution:');
        const agents = await User.find({ role: 'agent', status: 'active' }).sort({ name: 1 });

        for (const agent of agents) {
            const leadCount = await Lead.countDocuments({ assignedAgent: agent._id });
            console.log(`   ${agent.name}: ${leadCount} lead(s)`);
        }
        console.log();

        // Show total leads
        const totalLeads = await Lead.countDocuments();
        console.log(`📋 Total Leads in System: ${totalLeads}\n`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
};

createDummyLeads();
