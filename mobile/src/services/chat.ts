import { apiClient } from './api';
import { Message } from '@/types';

export const chatService = {
  // Get conversation with a specific user
  async getConversation(userId: number): Promise<Message[]> {
    const response = await apiClient.get(`/messages/conversation/${userId}`);
    return response.data.data;
  },

  // Get all conversations
  async getConversations(): Promise<any[]> {
    const response = await apiClient.get('/messages/conversations');
    return response.data.data;
  },

  // Send a message (fallback if socket fails)
  async sendMessage(receiverId: number, content: string): Promise<Message> {
    const conversationId = [receiverId].sort((a, b) => a - b).join('-');
    const response = await apiClient.post('/messages', {
      data: {
        receiver: receiverId,
        content,
        conversationId,
        isRead: false,
      },
    });
    return response.data.data;
  },

  // Mark conversation as read
  async markAsRead(conversationId: string): Promise<void> {
    await apiClient.put(`/messages/conversation/${conversationId}/read`);
  },
};

