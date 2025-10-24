import { useAuth } from '@/contexts/AuthContext';
import { Redirect, useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log('Index page loaded:', { user, loading, platform: Platform.OS });

  // If user is logged in, redirect to their dashboard
  if (user && !loading) {
    return <Redirect href="/(tabs)" />;
  }

  // On mobile, redirect to welcome screen
  if (Platform.OS !== 'web' && !loading) {
    return <Redirect href="/(auth)/welcome" />;
  }

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Landing page for web
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🍳 Chefly</Text>
        <View style={styles.headerButtons}>
          <Button mode="text" onPress={() => router.push('/(auth)/login')}>
            Login
          </Button>
          <Button mode="contained" onPress={() => router.push('/(auth)/register')}>
            Sign Up
          </Button>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Find Your Perfect Chef,{'\n'}Anytime, Anywhere</Text>
        <Text style={styles.heroSubtitle}>
          Connect with professional chefs for your special events.{'\n'}
          From intimate dinners to large celebrations.
        </Text>
        <View style={styles.heroButtons}>
          <Button
            mode="contained"
            style={styles.primaryButton}
            labelStyle={styles.primaryButtonText}
            onPress={() => router.push('/(auth)/register')}
          >
            Get Started
          </Button>
          <Button
            mode="outlined"
            style={styles.secondaryButton}
            onPress={() => router.push('/(auth)/register')}
          >
            I'm a Chef
          </Button>
        </View>
      </View>

      {/* How It Works - For Clients */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works for Clients</Text>
        <View style={styles.features}>
          <FeatureCard
            icon="🔍"
            title="1. Browse Chefs"
            description="Explore profiles, menus, and reviews of professional chefs in your area"
          />
          <FeatureCard
            icon="📅"
            title="2. Book & Customize"
            description="Select your date, guest count, and share your preferences"
          />
          <FeatureCard
            icon="🎉"
            title="3. Enjoy Your Event"
            description="Sit back and let your chef create an unforgettable culinary experience"
          />
        </View>
      </View>

      {/* How It Works - For Chefs */}
      <View style={[styles.section, styles.sectionAlt]}>
        <Text style={styles.sectionTitle}>How It Works for Chefs</Text>
        <View style={styles.features}>
          <FeatureCard
            icon="📝"
            title="1. Create Your Profile"
            description="Showcase your skills, specialties, and portfolio"
          />
          <FeatureCard
            icon="📲"
            title="2. Get Bookings"
            description="Receive requests from clients looking for your expertise"
          />
          <FeatureCard
            icon="💰"
            title="3. Grow Your Business"
            description="Build your reputation and earn on your own terms"
          />
        </View>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose Chefly?</Text>
        <View style={styles.features}>
          <FeatureCard
            icon="✅"
            title="Verified Chefs"
            description="All chefs are reviewed and approved by our team"
          />
          <FeatureCard
            icon="💬"
            title="Real-time Chat"
            description="Message chefs directly to discuss your event details"
          />
          <FeatureCard
            icon="🔒"
            title="Secure Payments"
            description="Safe and encrypted payment processing with Paymob"
          />
          <FeatureCard
            icon="⭐"
            title="Ratings & Reviews"
            description="Make informed decisions based on real client experiences"
          />
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
        <Text style={styles.ctaSubtitle}>
          Join thousands of clients and chefs creating amazing experiences
        </Text>
        <Button
          mode="contained"
          style={styles.ctaButton}
          labelStyle={styles.ctaButtonText}
          onPress={() => router.push('/(auth)/register')}
        >
          Sign Up Now
        </Button>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Chefly. All rights reserved.</Text>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Terms</Text>
          <Text style={styles.footerDivider}>•</Text>
          <Text style={styles.footerLink}>Privacy</Text>
          <Text style={styles.footerDivider}>•</Text>
          <Text style={styles.footerLink}>Contact</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 80,
    backgroundColor: '#FFF5F2',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 16,
    lineHeight: 56,
  },
  heroSubtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    lineHeight: 28,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: '#FF6B35',
    paddingHorizontal: 16,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 64,
  },
  sectionAlt: {
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 48,
    color: '#1a1a1a',
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 80,
    backgroundColor: '#FF6B35',
  },
  ctaTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 32,
  },
  ctaButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  footerLink: {
    fontSize: 14,
    color: '#666',
  },
  footerDivider: {
    fontSize: 14,
    color: '#ccc',
  },
});
