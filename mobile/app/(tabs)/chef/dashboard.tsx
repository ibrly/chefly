import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChefDashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Chef Dashboard
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statNumber}>
                12
              </Text>
              <Text variant="bodyMedium">Pending Requests</Text>
            </Card.Content>
          </Card>

          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statNumber}>
                45
              </Text>
              <Text variant="bodyMedium">Total Bookings</Text>
            </Card.Content>
          </Card>

          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statNumber}>
                4.8
              </Text>
              <Text variant="bodyMedium">Average Rating</Text>
            </Card.Content>
          </Card>

          <Card style={styles.statCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statNumber}>
                15,000
              </Text>
              <Text variant="bodyMedium">Earnings (EGP)</Text>
            </Card.Content>
          </Card>
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
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
  },
  statsContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 4,
  },
});

