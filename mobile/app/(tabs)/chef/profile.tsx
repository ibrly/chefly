import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Button, Divider, Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function ChefProfileScreen() {
  const { user, logout } = useAuth();
  const [isAvailable, setIsAvailable] = React.useState(true);

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.name}>
            {user?.username}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {user?.email}
          </Text>
        </View>

        <Divider />

        <List.Section>
          <List.Item
            title="Available for Bookings"
            left={(props) => <List.Icon {...props} icon="clock-check" />}
            right={() => (
              <Switch value={isAvailable} onValueChange={setIsAvailable} />
            )}
          />
          <List.Item
            title="Edit Profile"
            left={(props) => <List.Icon {...props} icon="account-edit" />}
            onPress={() => {}}
          />
          <List.Item
            title="Manage Portfolio"
            left={(props) => <List.Icon {...props} icon="image-multiple" />}
            onPress={() => {}}
          />
          <List.Item
            title="Certifications"
            left={(props) => <List.Icon {...props} icon="certificate" />}
            onPress={() => {}}
          />
          <List.Item
            title="Availability Calendar"
            left={(props) => <List.Icon {...props} icon="calendar" />}
            onPress={() => {}}
          />
          <List.Item
            title="Pricing"
            left={(props) => <List.Icon {...props} icon="currency-usd" />}
            onPress={() => {}}
          />
          <List.Item
            title="Reviews"
            left={(props) => <List.Icon {...props} icon="star" />}
            onPress={() => {}}
          />
          <List.Item
            title="Earnings"
            left={(props) => <List.Icon {...props} icon="cash" />}
            onPress={() => {}}
          />
          <List.Item
            title="Settings"
            left={(props) => <List.Icon {...props} icon="cog" />}
            onPress={() => {}}
          />
          <List.Item
            title="Help & Support"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            onPress={() => {}}
          />
        </List.Section>

        <View style={styles.logoutContainer}>
          <Button mode="outlined" onPress={handleLogout} icon="logout">
            Logout
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#666',
  },
  logoutContainer: {
    padding: 16,
    marginTop: 16,
  },
});

