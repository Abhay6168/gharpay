# Demo Login Credentials

Use these credentials to test different user roles in the LeadFlow CRM application.

## 🔑 Test Accounts

### Admin Account
- **Email:** admin@leadflow.com
- **Password:** admin123
- **Role:** Admin
- **Access:** Full system access, can manage all leads, agents, configure settings

---

### Agent Accounts

#### Agent 1
- **Email:** agent1@leadflow.com
- **Password:** agent123
- **Name:** Sarah Johnson
- **Role:** Agent
- **Access:** View assigned leads, update lead status, schedule visits, track activities

#### Agent 2
- **Email:** agent2@leadflow.com
- **Password:** agent123
- **Name:** Mike Roberts
- **Role:** Agent
- **Access:** View assigned leads, update lead status, schedule visits, track activities

#### Agent 3
- **Email:** agent3@leadflow.com
- **Password:** agent123
- **Name:** Emily Chen
- **Role:** Agent
- **Access:** View assigned leads, update lead status, schedule visits, track activities

---

### Customer Account
- **Email:** customer@example.com
- **Password:** customer123
- **Name:** John Doe
- **Role:** Customer
- **Access:** Limited portal access (for future customer portal features)

---

## 📝 How to Use

1. **Start the application:**
   ```powershell
   .\run.ps1
   ```

2. **Navigate to:** `http://localhost:3000`

3. **On the landing page:**
   - Click on the role card (Customer, Agent, or Admin)
   - You'll be redirected to the login page

4. **On the login page:**
   - Click "▶ Demo Credentials" to see available test accounts
   - Click on any test account to auto-fill the login form
   - Or manually enter the email and password
   - Click "Sign In"

5. **For new customer accounts:**
   - Click "Sign Up" on the landing page or login page
   - Fill in the registration form
   - After successful signup, you'll be redirected to login

---

## 🎨 Features to Test

### As Admin (`admin@leadflow.com`)
- ✅ View comprehensive dashboard with analytics
- ✅ See all leads across all agents
- ✅ Reassign leads between agents
- ✅ Monitor agent performance
- ✅ Track pipeline conversion rates
- ✅ Schedule and manage visits

### As Agent (`agent1@leadflow.com`, `agent2@leadflow.com`, `agent3@leadflow.com`)
- ✅ View assigned leads only
- ✅ Update lead status through pipeline stages
- ✅ Add notes and activities to leads
- ✅ Schedule follow-up visits
- ✅ View personal performance metrics
- ✅ Receive reminder notifications

### As Customer (`customer@example.com`)
- ✅ Access to customer portal (future feature)
- ✅ View inquiry status
- ✅ Track scheduled visits

---

## 🔐 Security Note

**⚠️ These are DEMO credentials for DEVELOPMENT purposes only!**

- Never use these credentials in a production environment
- Change all default passwords before deploying to production
- Implement proper user registration and authentication flows
- Use environment variables for sensitive configuration
- Enable rate limiting and security headers

---

## 🚀 Quick Login

**For quick testing, use the "Demo Credentials" button on the login page:**
1. Select your role (Customer, Agent, or Admin)
2. Click "▶ Demo Credentials"
3. Click on any pre-made account to auto-fill
4. Click "Sign In"

---

## 📞 Support

For issues or questions, refer to:
- [README.md](./README.md) - Full documentation
- [QUICKSTART.md](./QUICKSTART.md) - Quick setup guide

---

## 🎯 Testing Scenarios

### Scenario 1: Lead Assignment Flow
1. Login as `admin@leadflow.com`
2. Go to Dashboard → View analytics
3. Go to Leads → See all leads
4. Create a new lead or visit `/form` to submit a lead
5. Verify round-robin assignment to agents

### Scenario 2: Agent Lead Management
1. Login as `agent1@leadflow.com`
2. Go to Leads → View only assigned leads
3. Click on a lead → Update status
4. Go to Pipeline → Drag leads between stages
5. Go to Schedule Visit → Create a visit

### Scenario 3: Multi-Agent Testing
1. Open multiple browser windows (use incognito for separate sessions)
2. Login as different agents in each window
3. Watch how leads are distributed
4. Test concurrent updates
5. Verify data synchronization

---

**Built with ❤️ using Node.js, React, MongoDB, and Tailwind CSS**
