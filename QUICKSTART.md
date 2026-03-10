# Quick Start Guide

## Installation & Running the Application

### Step 1: Setup MongoDB
Make sure MongoDB is installed and running on your machine.

For Windows:
```
mongod
```

For Mac/Linux:
```
brew services start mongodb-community
```

Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Step 2: Setup & Run Backend

```bash
# Navigate to backend directory
cd crm-system/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# Default values are fine for local development

# Start the server
npm start
```

Backend should be running on `http://localhost:5000`

### Step 3: Setup & Run Frontend

In a new terminal:

```bash
# Navigate to frontend directory
cd crm-system/frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the React development server
npm start
```

Frontend should open automatically at `http://localhost:3000`

## First Steps in the Application

### 1. Create a Lead (Public)
1. Navigate to `http://localhost:3000/form`
2. Fill in the lead form with sample data:
   - Name: John Doe
   - Phone: 9876543210
   - Location: Bangalore
   - Budget: 25000
3. Submit the form
4. A lead will be created and automatically assigned to an agent

### 2. Register an Agent Account
1. Click on "Login here" link on the form page
2. Click "Register" to switch to registration
3. Fill in the form:
   - Name: Agent One
   - Email: agent@example.com
   - Password: password123
   - Role: Agent or Admin
4. Click Register

### 3. Login & Access Dashboard
1. Login page should appear
2. Login with the credentials you just created
3. You'll be redirected to the Dashboard

## Accessing Different Pages

Once logged in, use the navigation bar at the top:

- **Dashboard**: View metrics and charts
- **Leads**: See all (admin) or assigned (agent) leads
- **Pipeline**: Kanban board view of leads by stage
- **Schedule Visit**: Create visit records for leads

## Test Scenarios

### Scenario 1: Lead Capture & Assignment
1. Submit multiple leads from the form
2. Create multiple agents
3. Observe round-robin assignment in the Leads list

### Scenario 2: Lead Pipeline Management
1. Go to Pipeline page
2. See leads grouped by status
3. Update a lead's status using the dropdown

### Scenario 3: Visit Scheduling
1. Go to Visit Scheduler
2. Select a lead
3. Fill in property details, date, and time
4. Schedule the visit
5. Visit appears in the scheduled list

### Scenario 4: Dashboard Analytics
1. Go to Dashboard
2. View metrics for total leads, bookings, visits
3. See pipeline distribution pie chart
4. View lead statistics bar chart

## Sample Data for Testing

### Sample Lead
- Name: Rajesh Kumar
- Phone: 9876543210
- Location: Whitefield, Bangalore
- Budget: 40000

### Sample Property
- Property Name: Green Valley Residency
- Date: 2024-03-15
- Time: 14:30

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:

**For Backend:**
```bash
# Change PORT in .env file
PORT=5001
```

**For Frontend:**
```bash
# Set port when starting
PORT=3001 npm start
```

### MongoDB Connection Error
```
# Check if MongoDB is running
# Windows: mongod
# Mac: brew services start mongodb-community
# Or use MongoDB Atlas cloud database
```

### Module Not Found Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### CORS Error
Make sure:
- Backend is running on http://localhost:5000
- CORS_ORIGIN in backend .env is http://localhost:3000
- Frontend API URL in .env.example matches backend URL

## API Testing with Curl

### Create a Lead
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "phone": "9876543210",
    "location": "Bangalore",
    "budget": 30000
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/agents/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "agent@example.com",
    "password": "password123"
  }'
```

### Get All Leads (requires token)
```bash
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Database & Collections

MongoDB database: `crm-system`

Collections created automatically:
- **leads** - Customer inquiries
- **agents** - User accounts (admin/agent)
- **visits** - Property visit records
- **activities** - Lead interaction history
- **reminders** - Follow-up reminders

## Important Notes

1. **JWT Secret**: Change `JWT_SECRET` in production
2. **Database**: Use MongoDB Atlas for production
3. **CORS**: Restrict to your domain in production
4. **Passwords**: Use strong passwords in production
5. **Environment Variables**: Keep sensitive data in .env files

## Next Development Steps

1. **Add Email Integration**: Send notifications via email
2. **SMS Reminders**: Integrate with Twilio for SMS
3. **Advanced Filtering**: Add more filter options on leads page
4. **Export Reports**: Generate PDF/Excel reports
5. **Bulk Actions**: Bulk update lead status
6. **User Permissions**: Fine-grained role-based access
7. **Activity Timeline**: Visual timeline of lead interactions
8. **Lead Source Analytics**: Track which sources convert best

## Support

If you encounter any issues:
1. Check MongoDB is running
2. Verify all ports are available
3. Check .env file values
4. Review console logs for error messages
5. Ensure Node.js version is 14+

---

**Happy CRM Building! 🚀**
