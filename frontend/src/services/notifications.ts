import axios from '@/lib/axios';
import { Notification } from '@/types';

export const notificationsService = {
  async getNotifications(): Promise<Notification[]> {
    const response = await axios.get('/notifications');
    return response.data;
  },

  async markAsRead(id: string): Promise<void> {
    await axios.patch(`/notifications/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await axios.patch('/notifications/read-all');
  },

  async deleteNotification(id: string): Promise<void> {
    await axios.delete(`/notifications/${id}`);
  },
};

