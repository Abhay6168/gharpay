# 🔐 Test Login Credentials

## Admin Account

**Email:** `admin@gharpay.com`  
**Password:** `admin123`  
**Role:** Admin  
**Permissions:**

- View all leads
- Assign/reassign leads to agents
- View agent performance
- Full system access

---

## Agent Accounts (Password: `test123` for all)

### 1. Agent Raj Kumar

**Email:** `raj@gharpay.com`  
**Password:** `test123`  
**Phone:** 9876543210

### 2. Agent Priya Sharma

**Email:** `priya@gharpay.com`  
**Password:** `test123`  
**Phone:** 9876543211

### 3. Agent Amit Patel

**Email:** `amit@gharpay.com`  
**Password:** `test123`  
**Phone:** 9876543212

### 4. Agent Sneha Reddy

**Email:** `sneha@gharpay.com`  
**Password:** `test123`  
**Phone:** 9876543213

### 5. Agent Vikram Singh

**Email:** `vikram@gharpay.com`  
**Password:** `test123`  
**Phone:** 9876543214

---

## 🧪 Testing Lead Allocation

### How to Test:

1. **Create Test Leads:**
   - Go to http://localhost:3000/form
   - Submit 5-10 test leads with different details
   - Leads will be automatically assigned to agents

2. **Verify Workload Balancing:**
   - Login as `admin@gharpay.com`
   - Go to Dashboard
   - Check that leads are distributed evenly among agents
   - Each agent should get approximately equal number of leads

3. **Test Agent View:**
   - Login as any agent (e.g., `raj@gharpay.com`)
   - You should only see leads assigned to that specific agent
   - Test updating lead status
   - Add notes to leads
   - Schedule visits

4. **Test Admin Features:**
   - Login as `admin@gharpay.com`
   - View all leads (not filtered by agent)
   - Reassign leads from one agent to another
   - View agent performance metrics

5. **Test Lead Assignment Logic:**
   - Submit multiple leads quickly
   - Check that they're distributed to the agent with the lowest current lead count
   - This demonstrates the workload balancing algorithm

---

## 🚀 Setup Instructions

### Create Test Users:

```bash
# Make sure MongoDB is running
# Then run the seed script:

cd backend
node seedUsers.js
```

Expected output:

```
Connecting to MongoDB...
✅ Connected to MongoDB
🗑️  Cleared existing test users

📝 Creating test users...

✅ Created admin: Admin User
   Email: admin@gharpay.com
   Password: admin123

✅ Created agent: Agent Raj Kumar
   Email: raj@gharpay.com
   Password: test123

[... more agents ...]

🎉 Successfully created all test users!
```

### Using MongoDB Shell (Alternative):

If you prefer to add users manually via MongoDB shell:

```javascript
use gharpay-crm

// Insert all test users at once
db.users.insertMany([
  {
    name: "Admin User",
    email: "admin@gharpay.com",
    password: "$2a$10$rHXVQqJZz0.MvECPfx7vH.bCZLgYN3nK5/ZVJKqVHZRKj8vYVqLqK",
    role: "admin",
    phone: "9999999999",
    status: "active",
    assignedLeadsCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ... more users
])
```

---

## 📊 Expected Behavior

### Lead Assignment Algorithm:

- **Type:** Workload Balancing
- **Logic:** New leads are assigned to the agent with the lowest `assignedLeadsCount`
- **Updates:** Count automatically increments/decrements as leads are assigned/reassigned

### Example Scenario:

```
Initial State:
- Raj: 0 leads
- Priya: 0 leads
- Amit: 0 leads
- Sneha: 0 leads
- Vikram: 0 leads

After 5 leads submitted:
- Raj: 1 lead
- Priya: 1 lead
- Amit: 1 lead
- Sneha: 1 lead
- Vikram: 1 lead

After 7 leads submitted:
- Raj: 2 leads
- Priya: 2 leads
- Amit: 1 lead
- Sneha: 1 lead
- Vikram: 1 lead
```

---

## 🔍 Verification Queries

### Check all users:

```javascript
db.users
  .find({}, { name: 1, email: 1, role: 1, assignedLeadsCount: 1 })
  .pretty();
```

### Check agent distribution:

```javascript
db.users.aggregate([
  { $match: { role: "agent", status: "active" } },
  { $project: { name: 1, email: 1, assignedLeadsCount: 1 } },
  { $sort: { assignedLeadsCount: 1 } },
]);
```

### Check leads by agent:

```javascript
db.leads.aggregate([
  { $group: { _id: "$assignedAgent", count: { $sum: 1 } } },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "agent",
    },
  },
  { $project: { agent: { $arrayElemAt: ["$agent.name", 0] }, count: 1 } },
]);
```

---

## 🛠️ Troubleshooting

### "User already exists" error:

```bash
# Clear existing test users first
node seedUsers.js
# Script automatically clears existing test users before creating new ones
```

### Can't login:

- Verify MongoDB is running
- Check backend server is running on port 5000
- Verify email is correct (case-sensitive)
- Try password exactly as shown (test123 or admin123)

### Leads not showing:

- Agents only see their assigned leads
- Admin sees all leads
- Check if any leads exist in the database

---

**Created:** March 10, 2026  
**Status:** ✅ Ready to Use
