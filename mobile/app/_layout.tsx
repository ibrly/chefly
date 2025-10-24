import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '@/contexts/AuthContext';
import { SocketProvider } from '@/contexts/SocketContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text } from 'react-native';

const queryClient = new QueryClient();

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Something went wrong</Text>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>
            {this.state.error?.message || 'Unknown error'}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default function RootLayout() {
  console.log('========== RootLayout loaded ==========');
  
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <AuthProvider>
              <NotificationProvider>
                <SocketProvider>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="test" />
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="chat/[userId]" />
                    <Stack.Screen name="favorites" />
                    <Stack.Screen name="payment/[bookingId]" />
                    <Stack.Screen name="review/[bookingId]" />
                  </Stack>
                </SocketProvider>
              </NotificationProvider>
            </AuthProvider>
          </PaperProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

