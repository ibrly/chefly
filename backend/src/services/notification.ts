import { Expo, ExpoPushMessage } from 'expo-server-sdk';

const expo = new Expo();

export default {
  async sendPushNotification(
    pushToken: string,
    title: string,
    body: string,
    data?: any
  ): Promise<void> {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      return;
    }

    const message: ExpoPushMessage = {
      to: pushToken,
      sound: 'default',
      title,
      body,
      data,
    };

    try {
      const chunks = expo.chunkPushNotifications([message]);
      const tickets = [];

      for (const chunk of chunks) {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      }

      // Handle tickets and receipts if needed
      console.log('Push notification sent:', tickets);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  },

  async sendToUser(userId: number, title: string, body: string, data?: any): Promise<void> {
    try {
      const user = await strapi.entityService.findOne(
        'plugin::users-permissions.user',
        userId
      );

      if (user?.pushToken) {
        await this.sendPushNotification(user.pushToken, title, body, data);
      }
    } catch (error) {
      console.error('Error sending notification to user:', error);
    }
  },

  // Send notification when new booking is created
  async notifyNewBooking(booking: any): Promise<void> {
    const chef = await strapi.entityService.findOne(
      'api::chef-profile.chef-profile',
      booking.chef,
      {
        populate: { user: true },
      }
    );

    if (chef?.user) {
      await this.sendToUser(
        chef.user.id,
        'New Booking Request',
        'You have a new booking request',
        {
          type: 'booking',
          bookingId: booking.id,
        }
      );
    }
  },

  // Send notification when booking status changes
  async notifyBookingUpdate(booking: any, status: string): Promise<void> {
    const statusMessages = {
      confirmed: 'Your booking has been confirmed!',
      cancelled: 'Your booking has been cancelled',
      'in-progress': 'Your chef is on the way!',
      completed: 'Your booking is complete. Please leave a review!',
    };

    const message = statusMessages[status] || 'Your booking has been updated';

    await this.sendToUser(booking.client.id, 'Booking Update', message, {
      type: 'booking',
      bookingId: booking.id,
    });
  },

  // Send notification for new message
  async notifyNewMessage(message: any): Promise<void> {
    await this.sendToUser(
      message.receiver.id,
      `New message from ${message.sender.username}`,
      message.content.substring(0, 100),
      {
        type: 'message',
        userId: message.sender.id,
      }
    );
  },

  // Send notification for new review
  async notifyNewReview(review: any): Promise<void> {
    const chef = await strapi.entityService.findOne(
      'api::chef-profile.chef-profile',
      review.chef,
      {
        populate: { user: true },
      }
    );

    if (chef?.user) {
      await this.sendToUser(
        chef.user.id,
        'New Review',
        `You received a ${review.rating}-star review!`,
        {
          type: 'review',
          reviewId: review.id,
        }
      );
    }
  },
};

