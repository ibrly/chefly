import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

class NotificationService {
  private expo: Expo;

  constructor() {
    this.expo = new Expo();
  }

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
        priority: 'high',
      },
    ];

    try {
      const chunks = this.expo.chunkPushNotifications(messages);
      const tickets: ExpoPushTicket[] = [];

      for (const chunk of chunks) {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      }

      console.log('[Notification] Sent:', tickets);
    } catch (error) {
      console.error('[Notification] Error sending:', error);
      throw error;
    }
  }

  async sendBulkNotifications(
    pushTokens: string[],
    title: string,
    body: string,
    data: any = {}
  ): Promise<ExpoPushTicket[]> {
    // Filter valid push tokens
    const validTokens = pushTokens.filter((token) =>
      Expo.isExpoPushToken(token)
    );

    if (validTokens.length === 0) {
      console.warn('[Notification] No valid push tokens provided');
      return [];
    }

    const messages: ExpoPushMessage[] = validTokens.map((token) => ({
      to: token,
      sound: 'default',
      title,
      body,
      data,
      priority: 'high',
    }));

    try {
      const chunks = this.expo.chunkPushNotifications(messages);
      const tickets: ExpoPushTicket[] = [];

      for (const chunk of chunks) {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      }

      console.log(`[Notification] Sent bulk notifications to ${validTokens.length} users`);
      return tickets;
    } catch (error) {
      console.error('[Notification] Bulk send error:', error);
      throw error;
    }
  }

  // Helper methods for common notifications
  async notifyNewBooking(userId: string, bookingDetails: any): Promise<void> {
    // This will be called by other services
    console.log(`[Notification] New booking notification to user ${userId}`, bookingDetails);
  }

  async notifyBookingConfirmed(userId: string, bookingDetails: any): Promise<void> {
    console.log(`[Notification] Booking confirmed to user ${userId}`, bookingDetails);
  }

  async notifyNewMessage(userId: string, senderName: string): Promise<void> {
    console.log(`[Notification] New message from ${senderName} to user ${userId}`);
  }
}

export default NotificationService;

