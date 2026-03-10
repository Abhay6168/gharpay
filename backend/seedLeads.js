// Seed script to create dummy leads for testing
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gharpay-crm';

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    currentLocation: { type: String },
    preferredLocation: { type: String },
    budgetRange: { type: String },
    occupancy: { type: String, enum: ['Single', 'Double', 'Triple'] },
    moveInDate: { type: Date },
    amenitiesRequired: [String],
    source: { type: String, enum: ['Website Form', 'Phone Call', 'Walk-in', 'Referral', 'Social Media'] },
    status: {
        type: String,
        enum: ['New Lead', 'Contacted', 'Interested', 'Visit Scheduled', 'Booked', 'Lost'],
        default: 'New Lead'
    },
    notes: [{ type: String }],
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lastActivityAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    assignedLeadsCount: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

const activitySchema = new mongoose.Schema({
    lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});

const Activity = mongoose.model('Activity', activitySchema);

// Test leads data
const testLeads = [
    {
        name: 'Rahul Verma',
        email: 'rahul.verma@gmail.com',
        phone: '9876543210',
        currentLocation: 'Delhi',
        preferredLocation: 'Koramangala',
        budgetRange: '8000-12000',
        occupancy: 'Single',
        moveInDate: new Date('2026-04-01'),
        amenitiesRequired: ['WiFi', 'Meals', 'Laundry'],
        source: 'Website Form',
        status: 'New Lead',
        notes: []
    },
    {
        name: 'Priya Krishnan',
        email: 'priya.k@yahoo.com',
        phone: '9845612378',
        currentLocation: 'Chennai',
        preferredLocation: 'HSR Layout',
        budgetRange: '10000-15000',
        occupancy: 'Double',
        moveInDate: new Date('2026-03-25'),
        amenitiesRequired: ['WiFi', 'Meals', 'Gym', 'AC'],
        source: 'Social Media',
        status: 'New Lead',
        notes: []
    },
    {
        name: 'Amit Shah',
        email: 'amit.shah91@outlook.com',
        phone: '9988776655',
        currentLocation: 'Mumbai',
        preferredLocation: 'Whitefield',
        budgetRange: '12000-18000',
        occupancy: 'Single',
        moveInDate: new Date('2026-04-15'),
        amenitiesRequired: ['WiFi', 'Meals', 'Parking', 'Power Backup'],
        source: 'Referral',
        status: 'New Lead',
        notes: []
    },
    {
        name: 'Sneha Patel',
        email: 'sneha.patel@gmail.com',
        phone: '9123456789',
        currentLocation: 'Pune',
        preferredLocation: 'BTM Layout',
        budgetRange: '6000-9000',
        occupancy: 'Triple',
        moveInDate: new Date('2026-03-20'),
        amenitiesRequired: ['WiFi', 'Meals'],
        source: 'Website Form',
        status: 'New Lead',
        notes: []
    },
    {
        name: 'Vikram Singh',
        email: 'vikram.s@rediffmail.com',
        phone: '9876501234',
        currentLocation: 'Hyderabad',
        preferredLocation: 'Electronic City',
        budgetRange: '15000-20000',
        occupancy: 'Single',
        moveInDate: new Date('2026-04-10'),
        amenitiesRequired: ['WiFi', 'Meals', 'AC', 'Housekeeping', 'Security'],
        source: 'Phone Call',
        status: 'New Lead',
        notes: []
    }
];

async function seedLeads() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB\n');

        // Get all active agents
        const agents = await User.find({ role: 'agent', status: 'active' }).sort({ assignedLeadsCount: 1 });

        if (agents.length === 0) {
            console.log('❌ No active agents found. Please run seedUsers.js first.');
            process.exit(1);
        }

        console.log(`📋 Found ${agents.length} active agents\n`);
        console.log('📝 Creating test leads...\n');

        let createdLeads = [];

        for (let i = 0; i < testLeads.length; i++) {
            const leadData = testLeads[i];

            // Create lead
            const lead = await Lead.create(leadData);

            // Assign to agent with least leads (workload balancing)
            const agentsSorted = await User.find({ role: 'agent', status: 'active' }).sort({ assignedLeadsCount: 1 });
            const assignedAgent = agentsSorted[0];

            lead.assignedAgent = assignedAgent._id;
            await lead.save();

            // Increment agent's lead count
            assignedAgent.assignedLeadsCount += 1;
            await assignedAgent.save();

            // Create activity
            await Activity.create({
                lead: lead._id,
                agent: assignedAgent._id,
                type: 'assigned',
                description: `Lead assigned to ${assignedAgent.name}`
            });

            createdLeads.push({
                lead: lead.name,
                assignedTo: assignedAgent.name
            });

            console.log(`✅ Created lead: ${lead.name}`);
            console.log(`   📧 Email: ${lead.email}`);
            console.log(`   📱 Phone: ${lead.phone}`);
            console.log(`   🏠 Preferred Location: ${lead.preferredLocation}`);
            console.log(`   👤 Assigned to: ${assignedAgent.name}`);
            console.log('');
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 Successfully created all test leads!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Show final agent assignments
        console.log('📊 Final Agent Lead Distribution:');
        const finalAgents = await User.find({ role: 'agent', status: 'active' }).sort({ assignedLeadsCount: -1 });
        finalAgents.forEach((agent, index) => {
            console.log(`   ${index + 1}. ${agent.name}: ${agent.assignedLeadsCount} leads`);
        });
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('🔌 Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding leads:', error);
        process.exit(1);
    }
}

seedLeads();
