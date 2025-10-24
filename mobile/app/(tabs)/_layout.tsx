import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';

export default function TabsLayout() {
  const { user } = useAuth();
  const isChef = user?.role?.type === 'chef';

  if (isChef) {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#6200EE',
        }}
      >
        <Tabs.Screen
          name="chef/dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chef/bookings"
          options={{
            title: 'Bookings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-check" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chef/messages"
          options={{
            title: 'Messages',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chef/profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen name="client/home" options={{ href: null }} />
        <Tabs.Screen name="client/explore" options={{ href: null }} />
        <Tabs.Screen name="client/mybookings" options={{ href: null }} />
        <Tabs.Screen name="client/messages" options={{ href: null }} />
        <Tabs.Screen name="client/profile" options={{ href: null }} />
      </Tabs>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6200EE',
      }}
    >
      <Tabs.Screen
        name="client/home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="client/explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="client/mybookings"
        options={{
          title: 'My Bookings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="client/messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="client/profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="chef/dashboard" options={{ href: null }} />
      <Tabs.Screen name="chef/bookings" options={{ href: null }} />
      <Tabs.Screen name="chef/messages" options={{ href: null }} />
      <Tabs.Screen name="chef/profile" options={{ href: null }} />
    </Tabs>
  );
}

