// Seed script to create dummy users for testing
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gharpay-crm';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'agent'], default: 'agent' },
  phone: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  assignedLeadsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Test users data
// Password for all users: "test123"
const testUsers = [
  {
    name: 'Admin User',
    email: 'admin@gharpay.com',
    password: 'admin123',
    role: 'admin',
    phone: '9999999999',
    status: 'active',
    assignedLeadsCount: 0
  },
  {
    name: 'Agent Raj Kumar',
    email: 'raj@gharpay.com',
    password: 'test123',
    role: 'agent',
    phone: '9876543210',
    status: 'active',
    assignedLeadsCount: 0
  },
  {
    name: 'Agent Priya Sharma',
    email: 'priya@gharpay.com',
    password: 'test123',
    role: 'agent',
    phone: '9876543211',
    status: 'active',
    assignedLeadsCount: 0
  },
  {
    name: 'Agent Amit Patel',
    email: 'amit@gharpay.com',
    password: 'test123',
    role: 'agent',
    phone: '9876543212',
    status: 'active',
    assignedLeadsCount: 0
  },
  {
    name: 'Agent Sneha Reddy',
    email: 'sneha@gharpay.com',
    password: 'test123',
    role: 'agent',
    phone: '9876543213',
    status: 'active',
    assignedLeadsCount: 0
  },
  {
    name: 'Agent Vikram Singh',
    email: 'vikram@gharpay.com',
    password: 'test123',
    role: 'agent',
    phone: '9876543214',
    status: 'active',
    assignedLeadsCount: 0
  }
];

async function seedUsers() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing test users (optional - comment out if you want to keep existing users)
    const testEmails = testUsers.map(u => u.email);
    await User.deleteMany({ email: { $in: testEmails } });
    console.log('🗑️  Cleared existing test users');

    // Hash passwords and create users
    console.log('\n📝 Creating test users...\n');
    
    for (const userData of testUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      
      await user.save();
      console.log(`✅ Created ${userData.role}: ${userData.name}`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Password: ${userData.password}`);
      console.log('');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Successfully created all test users!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📋 TEST CREDENTIALS:\n');
    console.log('ADMIN LOGIN:');
    console.log('  Email: admin@gharpay.com');
    console.log('  Password: admin123\n');
    console.log('AGENT LOGINS (Password: test123 for all):');
    console.log('  1. raj@gharpay.com');
    console.log('  2. priya@gharpay.com');
    console.log('  3. amit@gharpay.com');
    console.log('  4. sneha@gharpay.com');
    console.log('  5. vikram@gharpay.com\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the seed function
seedUsers();
