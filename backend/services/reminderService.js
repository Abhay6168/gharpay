const cron = require('node-cron');
const Lead = require('../models/Lead');
const Visit = require('../models/Visit');
const Reminder = require('../models/Reminder');
const Activity = require('../models/Activity');

class ReminderService {
  constructor() {
    this.inactiveLeadJob = null;
    this.visitReminderJob = null;
  }

  /**
   * Start the reminder service
   */
  start() {
    console.log('Starting Reminder Service...');

    // Check for inactive leads every hour
    this.inactiveLeadJob = cron.schedule('0 * * * *', async () => {
      await this.checkInactiveLeads();
    });

    // Check for upcoming visits every 30 minutes
    this.visitReminderJob = cron.schedule('*/30 * * * *', async () => {
      await this.checkUpcomingVisits();
    });

    console.log('Reminder Service started successfully');
  }

  /**
   * Stop the reminder service
   */
  stop() {
    if (this.inactiveLeadJob) {
      this.inactiveLeadJob.stop();
    }
    if (this.visitReminderJob) {
      this.visitReminderJob.stop();
    }
    console.log('Reminder Service stopped');
  }

  /**
   * Check for leads with no activity in last 24 hours
   */
  async checkInactiveLeads() {
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const inactiveLeads = await Lead.find({
        lastActivityAt: { $lt: twentyFourHoursAgo },
        status: { $nin: ['Booked', 'Lost'] },
        assignedAgent: { $exists: true }
      }).populate('assignedAgent', 'name');

      for (const lead of inactiveLeads) {
        // Check if reminder already exists
        const existingReminder = await Reminder.findOne({
          lead: lead._id,
          agent: lead.assignedAgent._id,
          type: 'inactive_lead',
          dismissed: false,
          createdAt: { $gte: twentyFourHoursAgo }
        });

        if (!existingReminder) {
          // Create reminder
          await Reminder.create({
            lead: lead._id,
            agent: lead.assignedAgent._id,
            type: 'inactive_lead',
            message: `Lead ${lead.name} has been inactive for 24 hours. Status: ${lead.status}`
          });

          // Create activity
          await Activity.create({
            lead: lead._id,
            agent: lead.assignedAgent._id,
            type: 'reminder',
            description: 'Reminder created for inactive lead'
          });

          console.log(`Reminder created for inactive lead: ${lead.name}`);
        }
      }
    } catch (error) {
      console.error('Error checking inactive leads:', error);
    }
  }

  /**
   * Check for visits scheduled in next 30 minutes
   */
  async checkUpcomingVisits() {
    try {
      const now = new Date();
      const thirtyMinutesLater = new Date(now.getTime() + 30 * 60 * 1000);

      const upcomingVisits = await Visit.find({
        visitDate: {
          $gte: now,
          $lte: thirtyMinutesLater
        },
        outcome: 'Scheduled',
        reminderSent: false
      }).populate('lead', 'name phone')
        .populate('agent', 'name');

      for (const visit of upcomingVisits) {
        // Create reminder
        await Reminder.create({
          lead: visit.lead._id,
          agent: visit.agent._id,
          type: 'visit_upcoming',
          message: `Upcoming visit at ${visit.propertyName} with ${visit.lead.name} at ${visit.visitTime}`
        });

        // Mark reminder as sent
        visit.reminderSent = true;
        await visit.save();

        // Create activity
        await Activity.create({
          lead: visit.lead._id,
          agent: visit.agent._id,
          type: 'reminder',
          description: `Visit reminder sent for ${visit.propertyName}`
        });

        console.log(`Visit reminder created for: ${visit.lead.name} at ${visit.propertyName}`);
      }
    } catch (error) {
      console.error('Error checking upcoming visits:', error);
    }
  }

  /**
   * Manually trigger inactive lead check (for testing)
   */
  async triggerInactiveLeadCheck() {
    await this.checkInactiveLeads();
  }

  /**
   * Manually trigger visit reminder check (for testing)
   */
  async triggerVisitReminderCheck() {
    await this.checkUpcomingVisits();
  }
}

// Create singleton instance
const reminderService = new ReminderService();

module.exports = reminderService;
