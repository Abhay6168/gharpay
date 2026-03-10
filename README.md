# 🏠 Gharpay CRM - Lead Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-61dafb.svg)
![MongoDB](https://img.shields.io/badge/mongodb-6.0+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**A modern, full-featured CRM system for managing PG accommodation leads in Bangalore**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Documentation](#-documentation) • [Demo](#-demo-credentials)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Demo Credentials](#-demo-credentials)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Gharpay** is a comprehensive Lead Management CRM designed specifically for PG accommodation services in Bangalore. It streamlines the entire lead-to-booking workflow, replacing manual WhatsApp-based processes with a centralized, automated system.

### The Problem
- Manual lead tracking through WhatsApp leads to lost opportunities
- No clear accountability for lead follow-ups
- Difficulty in tracking conversation history
- Limited visibility into sales pipeline and performance

### The Solution
Gharpay CRM provides:
- ✅ **Automated Lead Capture** from multiple sources
- ✅ **Smart Lead Assignment** with automatic distribution
- ✅ **Activity Timeline** tracking every interaction
- ✅ **Visit Scheduling** with reminders and notifications
- ✅ **Visual Pipeline** with drag-and-drop Kanban board
- ✅ **Real-time Analytics** for data-driven decisions
- ✅ **Mobile Responsive** design for on-the-go access

---

## ✨ Features

### 🎪 **Lead Management**
- Multi-channel lead capture (Website, WhatsApp, Instagram, Facebook, Phone, Referrals)
- Automatic lead assignment to agents using round-robin distribution
- Bulk lead import/export
- Advanced filtering and search
- Lead status tracking through 8 stages
- Lead prioritization and tagging

### 👥 **Agent Management** (Admin Only)
- Create and manage agent accounts
- Activate/deactivate agents
- View agent performance metrics
- Manual lead reassignment
- Agent workload balancing

### 📊 **Analytics Dashboard**
- Total leads, bookings, and conversion rates
- Today's leads and activity summary
- Pipeline distribution (Pie chart)
- Lead source analysis (Bar chart)
- Recent lead table with quick actions
- Real-time statistics with animated counters

### 📅 **Visit Scheduler**
- Schedule property visits with leads
- Calendar view with visit timeline
- Automated reminders before visits
- Visit outcome tracking (Interested/Not Interested/Rescheduled)
- Notes and follow-up management

### 🎨 **Sales Pipeline**
- Visual Kanban board with 8 stages:
  - New Lead → Contacted → Requirement Collected → Property Suggested
  - Visit Scheduled → Visit Completed → Booked → Lost
- Drag-and-drop functionality (coming soon)
- Color-coded status indicators
- Lead count per stage
- Quick view lead details

### 🔔 **Activity Tracking**
- Comprehensive activity timeline for each lead
- Track calls, messages, updates, and notes
- Timestamp and user attribution
- Full conversation history

### 🎨 **Modern UI/UX**
- Professional deep green color scheme
- Glass-morphism design elements
- Smooth animations and transitions
- Responsive mobile-first design
- Premium typography (Sora + Plus Jakarta Sans)
- Hover micro-interactions

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication & authorization |
| **bcryptjs** | Password hashing |
| **node-cron** | Scheduled tasks & reminders |
| **cors** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client |
| **Context API** | State management |
| **Chart.js** | Data visualization |
| **React-Chartjs-2** | React wrapper for Chart.js |
| **Tailwind CSS** | Utility-first CSS framework |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

To verify installations:
```bash
node --version    # Should be v16+
npm --version     # Should be v8+
mongod --version  # Should be v6.0+
```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/gharpay-crm.git
cd gharpay-crm
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Set Up Environment Variables

Create `.env` file in the `backend` folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/gharpay-crm

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2024
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

**⚠️ Important:** Change `JWT_SECRET` to a secure random string in production!

### 4. Seed Database (Optional)

Create initial admin and agent users:

```bash
cd backend
node seedUsers.js
```

This creates:
- **Admin:** admin@leadflow.com / admin123
- **Agent 1:** agent1@leadflow.com / agent123
- **Agent 2:** agent2@leadflow.com / agent123

### 5. Create Sample Leads (Optional)

```bash
node createDummyLeads.js
```

This generates 50+ sample leads across different statuses.

---

## 🎮 Running the Application

### Development Mode

#### Option 1: Manual Start (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend runs on: `http://localhost:3000`

#### Option 2: Quick Start Scripts (Windows)

```powershell
# Run setup (first time only)
.\setup.ps1

# Run both frontend and backend
.\run.ps1
```

### Production Build

```bash
# Build frontend for production
cd frontend
npm run build

# Serve production build
npm install -g serve
serve -s build -p 3000
```

---

## 🔑 Demo Credentials

### Admin Account
| Field | Value |
|-------|-------|
| **Email** | admin@leadflow.com |
| **Password** | admin123 |
| **Access** | Full system access, manage agents, view all leads |

### Agent Accounts
| Name | Email | Password | Access |
|------|-------|----------|--------|
| Sarah Johnson | agent1@leadflow.com | agent123 | View assigned leads only |
| Mike Roberts | agent2@leadflow.com | agent123 | View assigned leads only |

**⚠️ Security Note:** Change these credentials immediately in production!

---

## 📁 Project Structure

```
gharpay-crm/
├── backend/
│   ├── config/
│   │   ├── database.js           # MongoDB connection
│   │   └── jwt.js                # JWT configuration
│   ├── middleware/
│   │   ├── auth.js               # Authentication middleware
│   │   └── errorHandler.js       # Error handling
│   ├── models/
│   │   ├── User.js               # User/Agent schema
│   │   ├── Lead.js               # Lead schema
│   │   ├── Activity.js           # Activity log schema
│   │   ├── Visit.js              # Visit schedule schema
│   │   └── Reminder.js           # Reminder schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── leadRoutes.js         # Lead CRUD
│   │   ├── agentRoutes.js        # Agent management
│   │   ├── visitRoutes.js        # Visit scheduling
│   │   ├── reminderRoutes.js     # Reminders
│   │   └── dashboardRoutes.js    # Analytics
│   ├── services/
│   │   ├── assignmentService.js  # Lead auto-assignment
│   │   └── reminderService.js    # Cron jobs
│   ├── seedUsers.js              # Database seeder
│   ├── createDummyLeads.js       # Sample data
│   ├── server.js                 # App entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.js     # Navbar with mobile menu
│   │   │   ├── LeadDetailModal.js # Lead details popup
│   │   │   └── StatusUpdateModal.js # Status change modal
│   │   ├── context/
│   │   │   └── AuthContext.js    # Global auth state
│   │   ├── pages/
│   │   │   ├── LandingPage.js    # Public homepage
│   │   │   ├── LoginPage.js      # Login form
│   │   │   ├── SignupPage.js     # Registration
│   │   │   ├── DashboardPage.js  # Analytics dashboard
│   │   │   ├── LeadsPage.js      # Lead list with filters
│   │   │   ├── LeadFormPage.js   # Public lead capture
│   │   │   ├── PipelinePage.js   # Kanban board
│   │   │   ├── VisitSchedulerPage.js # Visit management
│   │   │   └── AgentsPage.js     # Agent management (admin)
│   │   ├── services/
│   │   │   └── api.js            # API client
│   │   ├── App.js                # Main app component
│   │   ├── index.js              # React entry point
│   │   └── index.css             # Global styles
│   └── package.json
│
├── README.md                      # This file
├── CREDENTIALS.md                 # Demo credentials
├── QUICKSTART.md                  # Quick start guide
└── .gitignore
```

---

## 🌐 API Documentation

### Authentication Endpoints

#### POST `/api/auth/login`
Login with email and password
```json
{
  "email": "admin@leadflow.com",
  "password": "admin123"
}
```
**Response:** `{ token, user: { id, name, email, role } }`

#### POST `/api/auth/signup`
Register new user (agents)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

---

### Lead Endpoints

#### GET `/api/leads`
Get all leads (admin) or assigned leads (agent)
- Query params: `?status=Contacted&source=Website&search=John`

#### POST `/api/leads`
Create new lead
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "source": "Website",
  "preferredLocation": "Koramangala",
  "budget": "10000-15000",
  "message": "Looking for 2BHK"
}
```

#### PUT `/api/leads/:id`
Update lead details

#### PUT `/api/leads/:id/status`
Update lead status
```json
{
  "status": "Contacted",
  "notes": "Called and discussed requirements"
}
```

---

### Agent Management (Admin Only)

#### GET `/api/agents`
Get all agents

#### POST `/api/agents`
Create new agent
```json
{
  "name": "Agent Name",
  "email": "agent@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

#### PATCH `/api/agents/:id/toggle-status`
Activate/deactivate agent

---

### Visit Endpoints

#### GET `/api/visits`
Get all visits for current user

#### POST `/api/visits`
Schedule new visit
```json
{
  "leadId": "lead_id_here",
  "propertyName": "Paradise PG",
  "propertyAddress": "Koramangala, Bangalore",
  "visitDate": "2024-03-15",
  "visitTime": "10:00",
  "notes": "First visit"
}
```

#### PUT `/api/visits/:id`
Update visit outcome
```json
{
  "outcome": "Interested",
  "notes": "Lead liked the property"
}
```

---

### Dashboard Endpoints

#### GET `/api/dashboard/stats`
Get dashboard statistics
**Response:**
```json
{
  "totalLeads": 150,
  "todaysLeads": 5,
  "bookedLeads": 12,
  "upcomingVisits": 3,
  "newLeads": 20,
  "contactedLeads": 45
}
```

#### GET `/api/dashboard/pipeline`
Get lead distribution by status

#### GET `/api/dashboard/sources`
Get lead distribution by source

#### GET `/api/dashboard/recent-leads?limit=10`
Get recent leads

---

## 🔧 Troubleshooting

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution (Windows PowerShell):**
```powershell
# Kill process on port 5000
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

# Kill process on port 3000
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### MongoDB Connection Failed

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
1. Ensure MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Or manually start mongod
   mongod --dbpath="C:\data\db"
   ```

2. Check MongoDB URI in `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/gharpay-crm
   ```

### CORS Errors

**Error:** `Access to fetch blocked by CORS policy`

**Solution:**
1. Check backend `.env`:
   ```env
   CORS_ORIGIN=http://localhost:3000
   ```

2. Ensure frontend is running on port 3000

### JWT Token Errors

**Error:** `JsonWebTokenError: invalid signature`

**Solution:**
1. Clear browser localStorage
2. Login again with valid credentials
3. Check `JWT_SECRET` matches in `.env`

### React Build Warnings

**Warning:** `npm audit` shows vulnerabilities

**Solution:**
```bash
# Most React vulnerabilities are in dev dependencies
npm audit fix

# For force fix (use with caution)
npm audit fix --force
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and structure
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting PR
- Update documentation if needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Gharpay Team**
- Website: [gharpay.com](https://gharpay.com)
- Email: support@gharpay.com

---

## 🙏 Acknowledgments

- Design inspiration from modern SaaS platforms
- Icons from [Heroicons](https://heroicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Charts powered by [Chart.js](https://www.chartjs.org/)

---

## 📊 Project Status

- ✅ **Phase 1:** Core CRM functionality (Complete)
- ✅ **Phase 2:** UI/UX enhancement (Complete)
- ✅ **Phase 3:** Mobile responsive design (Complete)
- 🚧 **Phase 4:** Advanced features (In Progress)
  - Drag-and-drop pipeline
  - Email notifications
  - WhatsApp integration
  - Reports & exports
- ⏳ **Phase 5:** Production deployment (Planned)

---

## 📞 Support

For issues, questions, or suggestions:
- 📧 Email: support@gharpay.com
- 🐛 GitHub Issues: [Create an issue](https://github.com/yourusername/gharpay-crm/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/gharpay-crm/discussions)

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

Made with ❤️ by the Gharpay Team

[Back to Top](#-gharpay-crm---lead-management-system)

</div>
- Update lead status
- Add notes and track conversations
- Schedule property visits
- Receive automated reminders

### 3. Lead Pipeline (8 Stages)
1. **New Lead** - Just captured
2. **Contacted** - Initial contact made
3. **Requirement Collected** - Understood customer needs
4. **Property Suggested** - Proposed PG options
5. **Visit Scheduled** - Property visit arranged
6. **Visit Completed** - Visit done, collecting feedback
7. **Booked** - Customer confirmed booking ✅
8. **Lost** - Lead didn't convert ❌

### 4. Lead Assignment System

**Workload Balancing (Default)**
- New leads assigned to agent with fewest active leads
- Ensures fair distribution

**Round-Robin (Alternative)**
- Cyclic assignment: Lead 1 → Agent A, Lead 2 → Agent B, etc.
- Can be enabled in `assignmentService.js`

**Manual Override**
- Admin can reassign any lead at any time

### 5. Automated Reminder System

**Inactive Lead Reminders**
- Triggers if no activity on a lead for 24 hours
- Runs hourly via cron job
- Notifies assigned agent

**Visit Reminders**
- Alerts agent 30 minutes before scheduled visits
- Checks every 30 minutes
- Helps ensure agents don't miss appointments

## 🗂️ Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: 'admin' | 'agent',
  status: 'active' | 'inactive',
  assignedLeadsCount: Number,
  timestamps
}
```

### Leads Collection
```javascript
{
  name: String,
  phone: String (10 digits),
  email: String,
  source: 'Website' | 'WhatsApp' | 'Instagram' | 'Facebook' | 'Phone Call' | 'Referral',
  preferredLocation: String,
  budget: Number,
  moveInDate: Date,
  message: String,
  status: [Pipeline Stage],
  assignedAgent: ObjectId (ref: User),
  lastActivityAt: Date,
  notes: [{ note, createdBy, createdAt }],
  timestamps
}
```

### Visits Collection
```javascript
{
  lead: ObjectId (ref: Lead),
  agent: ObjectId (ref: User),
  propertyName: String,
  propertyAddress: String,
  visitDate: Date,
  visitTime: String,
  outcome: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled' | 'Interested' | 'Not Interested',
  notes: String,
  reminderSent: Boolean,
  timestamps
}
```

### Activities Collection
```javascript
{
  lead: ObjectId (ref: Lead),
  agent: ObjectId (ref: User),
  type: 'created' | 'assigned' | 'contacted' | 'status_changed' | 'note_added' | 'visit_scheduled' | 'visit_completed' | 'visit_cancelled' | 'reminder',
  description: String,
  metadata: Mixed,
  timestamps
}
```

### Reminders Collection
```javascript
{
  lead: ObjectId (ref: Lead),
  agent: ObjectId (ref: User),
  type: 'inactive_lead' | 'visit_upcoming' | 'follow_up',
  message: String,
  dismissed: Boolean,
  dismissedAt: Date,
  timestamps
}
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/me` - Get current user

### Leads
- `POST /api/leads` - Create lead (public)
- `GET /api/leads` - Get all leads (filtered by role)
- `GET /api/leads/:id` - Get single lead with activities
- `PUT /api/leads/:id/status` - Update lead status
- `PUT /api/leads/:id/assign` - Reassign lead (admin only)
- `POST /api/leads/:id/notes` - Add note to lead
- `DELETE /api/leads/:id` - Delete lead (admin only)

### Visits
- `POST /api/visits` - Schedule new visit
- `GET /api/visits` - Get all visits
- `GET /api/visits/:id` - Get single visit
- `PUT /api/visits/:id` - Update visit outcome
- `DELETE /api/visits/:id` - Delete visit
- `GET /api/visits/upcoming/:days` - Get upcoming visits

### Agents
- `GET /api/agents` - Get all agents (admin only)
- `GET /api/agents/:id` - Get single agent
- `POST /api/agents` - Create agent (admin only)
- `PUT /api/agents/:id` - Update agent (admin only)
- `DELETE /api/agents/:id` - Delete agent (admin only)
- `PUT /api/agents/:id/toggle-status` - Toggle active/inactive

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/pipeline` - Get pipeline distribution
- `GET /api/dashboard/sources` - Get lead sources breakdown
- `GET /api/dashboard/recent-leads` - Get recent leads
- `GET /api/dashboard/recent-activities` - Get recent activities
- `GET /api/dashboard/agent-performance` - Get agent metrics (admin only)

### Reminders
- `GET /api/reminders` - Get reminders for current agent
- `PUT /api/reminders/:id/dismiss` - Dismiss a reminder
- `DELETE /api/reminders/:id` - Delete reminder
- `GET /api/reminders/count` - Get active reminder count

## 💻 Website Pages

### Public Pages
1. **Landing Page** (`/`) - Marketing page with lead form CTA
2. **Lead Form Page** (`/form`) - Public lead capture form
3. **Login Page** (`/login`) - Staff authentication
4. **Signup Page** (`/signup`) - Agent registration

### Protected Pages (Requires Authentication)
5. **Dashboard** (`/dashboard`) - Analytics and statistics
6. **Leads Management** (`/leads`) - Searchable lead list with filters
7. **Pipeline Board** (`/pipeline`) - Kanban view of lead stages
8. **Visit Scheduler** (`/schedule-visit`) - Schedule and manage property visits

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone and navigate to project**
```bash
cd d:\Project\gharpay\crm-system
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
echo MONGO_URI=mongodb://localhost:27017/gharpay-crm > .env
echo PORT=5000 >> .env
echo JWT_SECRET=your-secret-key-here >> .env
echo CORS_ORIGIN=http://localhost:3000 >> .env

# Start backend
npm start
```

3. **Frontend Setup** (new terminal)
```bash
cd frontend
npm install

# Start frontend
npm start
```

4. **MongoDB**
- Ensure MongoDB is running on `localhost:27017`
- Or update `MONGO_URI` in `.env` with your connection string

## 🎯 Quick Start (Windows)

```powershell
# Run both frontend and backend
.\run.ps1
```

## 📊 Default Accounts

Create your first admin user via signup page or using MongoDB:

```javascript
// Via Node.js/MongoDB Shell
use gharpay-crm

db.users.insertOne({
  name: "Admin User",
  email: "admin@gharpay.com",
  password: "$2a$10$encrypted-password-here", // Use bcrypt to hash "admin123"
  role: "admin",
  status: "active",
  phone: "9999999999",
  assignedLeadsCount: 0,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API routes
- Input validation
- CORS configuration

## 📈 Scalability Considerations

For production deployment, consider:

1. **Load Balancing** - Multiple backend instances
2. **Caching** - Redis for frequently accessed data
3. **Message Queues** - For WhatsApp integration
4. **Cloud Database** - MongoDB Atlas
5. **CDN** - For static assets
6. **Microservices** - Split services (leads, visits, notifications)
7. **Monitoring** - Application performance monitoring

## 🔮 Future Enhancements

- WhatsApp API integration for automated messaging
- Email notifications
- SMS reminders
- Mobile app (React Native)
- Advanced analytics and reporting
- Lead scoring system
- Automated follow-up sequences
- Integration with payment gateways
- Multi-language support
- Property management module

## 📝 License

Proprietary - Gharpay Platform

## 👥 Support

For issues or questions, contact the development team.

---

**Built with ❤️ for Gharpay Team**
