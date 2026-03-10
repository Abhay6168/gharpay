# Lead Management CRM System

A comprehensive web-based CRM application designed to help businesses capture, manage, and convert customer inquiries into bookings. Built with React, Node.js, and MongoDB.

## Features

### Lead Management
- **Public Lead Capture Form**: Customers can submit inquiries with name, phone, location, and budget
- **Automatic Lead Assignment**: Round-robin assignment logic automatically assigns leads to agents
- **Lead Pipeline**: Track leads through 8 stages: New Lead → Contacted → Requirement Collected → Property Suggested → Visit Scheduled → Visit Completed → Booked/Lost

### Dashboard & Analytics
- **Real-time Metrics**: View total leads, today's leads, bookings, and visit statistics
- **Pipeline Distribution Chart**: Pie chart showing lead distribution across pipeline stages
- **Lead Statistics Chart**: Bar chart displaying key metrics
- **Recent Leads**: Display of latest lead submissions

### Visit Scheduling
- **Schedule Property Visits**: Agents can schedule visits with property details, date, and time
- **Visit Outcomes**: Track visit status (Scheduled, Completed, Cancelled, Rescheduled)
- **Visit Reminders**: Automatic reminders 30 minutes before scheduled visits

### Follow-up Management
- **Inactive Lead Reminders**: Automatic reminders for leads with no activity in 24 hours
- **Reminder Dashboard**: View and manage all pending reminders
- **Activity Tracking**: Complete history of all lead interactions

### User Roles
- **Admin**: Full system access - manage agents, view all leads, reassign leads, monitor analytics
- **Sales Agent**: View assigned leads, update status, schedule visits, receive reminders

## Technology Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **bcryptjs**: Password encryption
- **jsonwebtoken**: JWT authentication
- **node-cron**: Background job scheduling
- **cors**: Cross-origin resource sharing

### Frontend
- **React.js**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Chart.js**: Chart library for analytics
- **React Chart.js 2**: React wrapper for Chart.js
- **Tailwind CSS**: Utility-first CSS framework

## Project Structure

```
crm-system/
├── backend/
│   ├── models/
│   │   ├── Lead.js
│   │   ├── Agent.js
│   │   ├── Visit.js
│   │   ├── Activity.js
│   │   └── Reminder.js
│   ├── routes/
│   │   ├── leadRoutes.js
│   │   ├── agentRoutes.js
│   │   ├── visitRoutes.js
│   │   └── dashboardRoutes.js
│   ├── services/
│   │   ├── assignmentService.js
│   │   ├── reminderService.js
│   │   └── dashboardService.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── config/
│   │   ├── database.js
│   │   └── jwt.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LeadFormPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── LeadsPage.js
│   │   │   ├── PipelinePage.js
│   │   │   └── VisitSchedulerPage.js
│   │   ├── components/
│   │   │   ├── Navigation.js
│   │   │   ├── LeadTable.js
│   │   │   ├── LeadDetailModal.js
│   │   │   ├── StatusUpdateModal.js
│   │   │   ├── VisitForm.js
│   │   │   └── PipelineBoard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── hooks/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd crm-system/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/crm-system
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000
```

5. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd crm-system/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## API Endpoints

### Lead APIs
- `POST /api/leads` - Create a new lead
- `GET /api/leads` - Get all leads (filtered by role)
- `GET /api/leads/:id` - Get lead details
- `PATCH /api/leads/:id` - Update lead information
- `PATCH /api/leads/:id/status` - Update lead status
- `PATCH /api/leads/:id/reassign` - Reassign lead (admin only)
- `GET /api/leads/:id/activities` - Get lead activity history

### Agent APIs
- `POST /api/agents/register` - Register a new agent
- `POST /api/agents/login` - Agent login
- `GET /api/agents` - Get all agents (admin only)
- `GET /api/agents/:id` - Get agent details
- `GET /api/agents/profile/me` - Get current user profile
- `PATCH /api/agents/:id` - Update agent (admin only)

### Visit APIs
- `POST /api/visits` - Schedule a visit
- `GET /api/visits` - Get all visits
- `GET /api/visits/lead/:leadId` - Get visits for a lead
- `PATCH /api/visits/:id` - Update visit outcome
- `DELETE /api/visits/:id` - Delete a visit

### Dashboard APIs
- `GET /api/dashboard/analytics` - Get dashboard analytics
- `GET /api/dashboard/performance` - Get agent performance metrics
- `GET /api/dashboard/funnel` - Get pipeline funnel data
- `GET /api/dashboard/reminders` - Get agent reminders
- `PATCH /api/dashboard/reminders/:id/read` - Mark reminder as read

## Usage

### For Customers (Lead Capture)
1. Navigate to the lead capture form at `/form`
2. Fill in your details (Name, Phone, Location, Budget)
3. Submit the form
4. You'll receive confirmation

### For Agents/Admins
1. Login at `/login` with credentials
2. **Dashboard**: View key metrics and recent leads
3. **Leads**: View assigned leads (agents) or all leads (admins)
4. **Pipeline**: Drag leads through pipeline stages using Kanban board
5. **Visit Scheduler**: Schedule property visits and track outcomes
6. Follow-up reminders appear automatically for inactive leads

## Database Schema

### Leads Collection
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String,
  location: String,
  budget: Number,
  source: String, // Website, Phone, Email, Referral
  status: String, // Pipeline stage
  assignedAgentId: ObjectId (ref: Agent),
  lastActivityAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Agents Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String, // Admin or Agent
  activeLeadCount: Number,
  totalLeadsAssigned: Number,
  bookingsCompleted: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Visits Collection
```javascript
{
  _id: ObjectId,
  leadId: ObjectId (ref: Lead),
  agentId: ObjectId (ref: Agent),
  propertyName: String,
  visitDate: Date,
  visitTime: String,
  outcome: String, // Scheduled, Completed, Cancelled, Rescheduled
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Activities Collection
```javascript
{
  _id: ObjectId,
  leadId: ObjectId (ref: Lead),
  agentId: ObjectId (ref: Agent),
  action: String,
  details: String,
  previousValue: String,
  newValue: String,
  timestamp: Date
}
```

### Reminders Collection
```javascript
{
  _id: ObjectId,
  leadId: ObjectId (ref: Lead),
  agentId: ObjectId (ref: Agent),
  reminderType: String,
  reminderText: String,
  isRead: Boolean,
  dueDate: Date,
  createdAt: Date
}
```

## Key Features Implementation

### Automatic Lead Assignment
The system uses round-robin assignment to distribute leads evenly among active agents. Each new lead is automatically assigned to the next agent in sequence.

### Background Jobs
Node-cron runs every hour to check for inactive leads (no activity for 24 hours in "New Lead" status) and creates follow-up reminders automatically.

### Authentication & Authorization
- JWT-based authentication for secure API access
- Role-based access control (Admin/Agent)
- Agents can only view their assigned leads
- Sensitive data is encrypted using bcryptjs

### Real-time Analytics
- Dashboard shows live metrics
- Charts update automatically when data changes
- Performance metrics for individual agents

## Future Enhancements

- **Microservices Architecture**: Scale to multiple services
- **Caching**: Implement Redis for better performance
- **Message Queues**: Use RabbitMQ/Kafka for event streaming
- **Cloud Deployment**: Deploy to AWS/Azure/GCP
- **Mobile App**: React Native mobile application
- **Email Notifications**: Send reminders via email
- **SMS Integration**: SMS notifications for leads
- **Advanced Analytics**: Predictive analytics and reporting
- **Integrations**: CRM integrations with external tools
- **Multi-language Support**: i18n implementation

## Error Handling

The application includes comprehensive error handling:
- Input validation on both frontend and backend
- Error messages displayed to users
- API error responses with proper HTTP status codes
- Server-side error logging

## Security Considerations

- Passwords hashed using bcryptjs
- JWT tokens for authentication
- CORS configuration for API security
- Input validation and sanitization
- Environment variables for sensitive data
- Protected routes based on user roles

## Development Notes

### Adding New Features
1. Create database schema in models folder
2. Create API routes in routes folder
3. Implement business logic in services folder
4. Create React components for UI
5. Add API calls to frontend services

### Code Style
- Follow ESLint standards
- Use meaningful variable names
- Add comments for complex logic
- Keep components modular

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MongoDB URI in .env file
- Verify database name is correct

### Frontend API Connection Issues
- Ensure backend server is running
- Check CORS configuration
- Verify API URL in .env file

### Authentication Issues
- Clear browser localStorage
- Re-login with valid credentials
- Check JWT_SECRET is configured

## Support & Contact

For issues, questions, or suggestions, please reach out to the development team.

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

**Built with ❤️ for better CRM management**
