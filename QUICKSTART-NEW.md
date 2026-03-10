# 🚀 Gharpay CRM - Quick Start Guide

## Starting the Application

### Option 1: Automated (Recommended for Windows)

```powershell
.\run.ps1
```

This will:

- Start MongoDB (if installed locally)
- Launch backend server on port 5000
- Launch frontend on port 3000

### Option 2: Manual Start

**Terminal 1 - Backend:**

```powershell
cd backend
npm start
```

**Terminal 2 - Frontend:**

```powershell
cd frontend
npm start
```

## First Time Setup

### 1. Install Dependencies

**Backend:**

```powershell
cd backend
npm install
```

**Frontend:**

```powershell
cd frontend
npm install
```

### 2. Configure Environment

Create `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/gharpay-crm
PORT=5000
JWT_SECRET=gharpay-secret-key-2026
CORS_ORIGIN=http://localhost:3000
```

### 3. Start MongoDB

**Windows:**

```powershell
# If MongoDB installed as service
net start MongoDB

# Or run manually
mongod
```

**Mac:**

```bash
brew services start mongodb-community
```

**Linux:**

```bash
sudo systemctl start mongod
```

### 4. Create First Admin User

After starting the application:

1. Open http://localhost:3000
2. Click "Staff Login"
3. Click "Don't have an account? Sign up"
4. Fill in details (this will create an agent account)

**To create admin via MongoDB:**

```javascript
// Connect to MongoDB
mongosh

use gharpay-crm

// Create admin user (password: admin123)
db.users.insertOne({
  name: "Admin User",
  email: "admin@gharpay.com",
  password: "$2a$10$rHXVQqJZz0.MvECPfx7vH.bCZLgYN3nK5/ZVJKqVHZRKj8vYVqLqK",
  role: "admin",
  status: "active",
  phone: "1234567890",
  assignedLeadsCount: 0,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 🎯 Quick Test Workflow

### 1. Submit a Test Lead

- Go to http://localhost:3000
- Click "Submit Your Requirements"
- Fill the form:
  - Name: Test User
  - Phone: 9876543210
  - Source: Website
  - Location: Koramangala
  - Budget: 10000
- Click Submit

### 2. Login as Agent/Admin

- Go to http://localhost:3000/login
- Login with your credentials
- You'll see the dashboard with the test lead

### 3. Manage the Lead

- Go to "Leads" page
- Click "View" on the test lead
- Update status to "Contacted"
- Add a note: "Called the customer, discussing requirements"

### 4. Schedule a Visit

- Go to "Visits" page
- Select the test lead
- Fill visit details:
  - Property: Rainbow PG
  - Date: Tomorrow
  - Time: 2:00 PM
- Click "Schedule Visit"

### 5. View Pipeline

- Go to "Pipeline" page
- See your lead moving through stages
- Drag or click to update status

## 📱 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🔧 Troubleshooting

### Port Already in Use

```powershell
# Check ports
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill processes (use PID from above)
taskkill /PID <process_id> /F
```

### MongoDB Connection Error

- Ensure MongoDB is running
- Check MONGO_URI in .env
- Verify MongoDB service: `net start | findstr MongoDB`

### CORS Errors

- Ensure backend CORS_ORIGIN matches frontend URL
- Check both servers are running
- Clear browser cache

### Authentication Issues

- Check JWT_SECRET is set in .env
- Clear localStorage: `localStorage.clear()` in browser console
- Login again

## 📊 Test Data Creation

Run this in MongoDB shell to create sample data:

```javascript
use gharpay-crm

// Create test agents
db.users.insertMany([
  {
    name: "Agent 1",
    email: "agent1@gharpay.com",
    password: "$2a$10$rHXVQqJZz0.MvECPfx7vH.bCZLgYN3nK5/ZVJKqVHZRKj8vYVqLqK",
    role: "agent",
    status: "active",
    phone: "9999999991",
    assignedLeadsCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Agent 2",
    email: "agent2@gharpay.com",
    password: "$2a$10$rHXVQqJZz0.MvECPfx7vH.bCZLgYN3nK5/ZVJKqVHZRKj8vYVqLqK",
    role: "agent",
    status: "active",
    phone: "9999999992",
    assignedLeadsCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

Default password for all test accounts: `admin123`

## 🎨 Key Features to Test

1. **Lead Capture** - Submit form as public user
2. **Auto Assignment** - Leads automatically assigned to agents
3. **Status Updates** - Move leads through pipeline stages
4. **Visit Scheduling** - Book property visits
5. **Dashboard Analytics** - View charts and statistics
6. **Reminders** - Wait 24 hours or trigger manually
7. **Search & Filter** - Test lead search functionality
8. **Role-Based Access** - Test admin vs agent views

## 📞 Support

For issues:

1. Check logs in terminal windows
2. Verify MongoDB connection
3. Check browser console for frontend errors
4. Review README.md for detailed documentation

---

**Happy Testing! 🎉**
