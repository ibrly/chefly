import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function ClientProfileScreen() {
  const { user, logout } = useAuth();

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
            title="Edit Profile"
            left={(props) => <List.Icon {...props} icon="account-edit" />}
            onPress={() => {}}
          />
          <List.Item
            title="Favorite Chefs"
            left={(props) => <List.Icon {...props} icon="heart" />}
            onPress={() => {}}
          />
          <List.Item
            title="Payment Methods"
            left={(props) => <List.Icon {...props} icon="credit-card" />}
            onPress={() => {}}
          />
          <List.Item
            title="Notifications"
            left={(props) => <List.Icon {...props} icon="bell" />}
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

