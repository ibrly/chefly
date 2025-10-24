import { Expo, ExpoPushMessage } from 'expo-server-sdk';

const expo = new Expo();

class NotificationService {
  async sendPushNotification(
    pushToken: string,
    title: string,
    body: string,
    data: any = {}
  ): Promise<void> {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      return;
    }

    const messages: ExpoPushMessage[] = [
      {
        to: pushToken,
        sound: 'default',
        title,
        body,
        data,
      },
    ];

    try {
      const chunks = expo.chunkPushNotifications(messages);
      const tickets = [];

      for (const chunk of chunks) {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      }

      console.log('Push notification sent:', tickets);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  async notifyBookingUpdate(booking: any, status: string): Promise<void> {
    // Get chef and client push tokens from users
    // This is a placeholder - you'll need to extend user model with pushToken field
    const chefPushToken = booking.chef?.user?.pushToken;
    const clientPushToken = booking.client?.pushToken;

    if (status === 'confirmed' && chefPushToken) {
      await this.sendPushNotification(
        chefPushToken,
        'New Booking Confirmed',
        `You have a new booking on ${new Date(booking.eventDate).toLocaleDateString()}`,
        { bookingId: booking.id }
      );
    }

    if (status === 'completed' && clientPushToken) {
      await this.sendPushNotification(
        clientPushToken,
        'Booking Completed',
        'How was your experience? Leave a review!',
        { bookingId: booking.id }
      );
    }
  }
}

export default new NotificationService();

