import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import socketService from '@/services/socket';
import { useAuth } from './AuthContext';

interface SocketContextType {
  connected: boolean;
  sendMessage: (receiverId: number, content: string) => void;
  startTyping: (receiverId: number) => void;
  stopTyping: (receiverId: number) => void;
  markAsRead: (conversationId: string) => void;
  on: (event: string, callback: Function) => void;
  off: (event: string, callback: Function) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      try {
        // Connect socket when user is authenticated
        socketService.connect();

        const handleConnect = () => setConnected(true);
        const handleDisconnect = () => setConnected(false);

        socketService.on('connect', handleConnect);
        socketService.on('disconnect', handleDisconnect);

        // Check initial connection state
        setConnected(socketService.isConnected());

        return () => {
          socketService.off('connect', handleConnect);
          socketService.off('disconnect', handleDisconnect);
        };
      } catch (error) {
        console.error('Failed to setup socket:', error);
      }
    } else {
      // Disconnect socket when user logs out
      try {
        socketService.disconnect();
      } catch (error) {
        console.error('Failed to disconnect socket:', error);
      }
      setConnected(false);
    }
  }, [user]);

  const sendMessage = (receiverId: number, content: string) => {
    socketService.sendMessage(receiverId, content);
  };

  const startTyping = (receiverId: number) => {
    socketService.startTyping(receiverId);
  };

  const stopTyping = (receiverId: number) => {
    socketService.stopTyping(receiverId);
  };

  const markAsRead = (conversationId: string) => {
    socketService.markAsRead(conversationId);
  };

  const on = (event: string, callback: Function) => {
    socketService.on(event, callback);
  };

  const off = (event: string, callback: Function) => {
    socketService.off(event, callback);
  };

  return (
    <SocketContext.Provider
      value={{
        connected,
        sendMessage,
        startTyping,
        stopTyping,
        markAsRead,
        on,
        off,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

