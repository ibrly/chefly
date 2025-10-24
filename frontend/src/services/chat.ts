import axios from '@/lib/axios';
import { Message, Conversation } from '@/types';

export const chatService = {
  async getConversations(): Promise<Conversation[]> {
    const response = await axios.get('/chat/conversations');
    return response.data;
  },

  async getMessages(userId: string): Promise<Message[]> {
    const response = await axios.get(`/chat/messages/${userId}`);
    return response.data;
  },

  async sendMessage(receiverId: string, content: string): Promise<Message> {
    const response = await axios.post('/chat/messages', { receiverId, content });
    return response.data;
  },

  async markAsRead(senderId: string): Promise<void> {
    await axios.patch(`/chat/messages/${senderId}/read`);
  },
};

