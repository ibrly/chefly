import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.content}>
        <Text variant="displayMedium" style={styles.title}>
          Welcome to Chefly
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Connect with talented chefs or offer your culinary services
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.push('/(auth)/register')}
          style={styles.button}
        >
          Get Started
        </Button>
        <Button mode="outlined" onPress={() => router.push('/(auth)/login')} style={styles.button}>
          Sign In
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 6,
  },
});

