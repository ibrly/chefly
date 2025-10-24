import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { Platform } from 'react-native';
import { notificationService } from '@/services/notifications';
import { useAuth } from './AuthContext';
import { useRouter } from 'expo-router';

interface NotificationContextType {
  // Context can be expanded later with notification state
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only setup notifications on native platforms
    if (user && Platform.OS !== 'web') {
      setupNotifications();
    }
  }, [user]);

  const setupNotifications = async () => {
    try {
      // Register for push notifications
      const token = await notificationService.registerForPushNotifications();

      if (token) {
        // Save token to backend
        await notificationService.savePushToken(token);
      }

      // Handle notifications received while app is open
      const notificationListener = notificationService.addNotificationReceivedListener(
        (notification) => {
          console.log('Notification received:', notification);
          // You can update local state or show an in-app notification here
        }
      );

      // Handle notification taps
      const responseListener = notificationService.addNotificationResponseReceivedListener(
        (response) => {
          const data = response.notification.request.content.data;

          // Navigate based on notification type
          if (data.type === 'message') {
            router.push(`/chat/${data.userId}`);
          } else if (data.type === 'booking') {
            router.push(`/booking/${data.bookingId}`);
          }
        }
      );

      // Cleanup
      return () => {
        notificationListener.remove();
        responseListener.remove();
      };
    } catch (error) {
      console.error('Failed to setup notifications:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

