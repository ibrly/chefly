import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Card, Button, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { chefsService } from '@/services/chefs';
import { ChefProfile } from '@/types';

export default function ClientHomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [featuredChefs, setFeaturedChefs] = useState<ChefProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['Italian', 'Asian', 'BBQ', 'Pastry', 'Mediterranean', 'Fusion'];

  useEffect(() => {
    loadFeaturedChefs();
  }, []);

  const loadFeaturedChefs = async () => {
    try {
      setLoading(true);
      const chefs = await chefsService.getFeaturedChefs(5);
      setFeaturedChefs(chefs);
    } catch (error) {
      console.error('Error loading featured chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    router.push(`/search?query=${searchQuery}`);
  };

  const handleCategoryPress = (category: string) => {
    router.push(`/search?cuisine=${category}`);
  };

  const renderChefCard = (chef: ChefProfile) => (
    <Card key={chef.id} style={styles.card}>
      <TouchableOpacity onPress={() => router.push(`/chef/${chef.id}`)}>
        <Card.Cover
          source={{
            uri: chef.profilePhoto?.url || 'https://via.placeholder.com/400x200',
          }}
        />
        <Card.Content>
          <Text variant="titleLarge" style={styles.chefName}>
            {chef.user.username}
          </Text>
          <Text variant="bodyMedium">{chef.specialties?.join(', ') || 'Chef'}</Text>
          <Text variant="bodySmall" style={styles.location}>
            📍 {chef.location}
          </Text>
          <View style={styles.cardFooter}>
            <Text variant="bodySmall">
              ⭐ {chef.averageRating?.toFixed(1) || '0.0'} ({chef.totalBookings || 0} bookings)
            </Text>
            <Text variant="titleMedium" style={styles.price}>
              {chef.hourlyRate} EGP/hr
            </Text>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => router.push(`/chef/${chef.id}`)}>
            View Profile
          </Button>
        </Card.Actions>
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Find Your Perfect Chef
          </Text>
          <Searchbar
            placeholder="Search chefs, cuisines..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            onSubmitEditing={handleSearch}
            style={styles.searchBar}
          />
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {categories.map((category) => (
              <Chip
                key={category}
                style={styles.chip}
                onPress={() => handleCategoryPress(category)}
              >
                {category}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Featured Chefs
            </Text>
            <Button mode="text" onPress={() => router.push('/search')}>
              See All
            </Button>
          </View>
          {loading ? (
            <Text>Loading...</Text>
          ) : featuredChefs.length > 0 ? (
            featuredChefs.map(renderChefCard)
          ) : (
            <Text style={styles.emptyText}>No chefs available yet</Text>
          )}
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
    marginBottom: 16,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
  },
  chip: {
    marginRight: 8,
  },
  card: {
    marginBottom: 16,
  },
  chefName: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  location: {
    color: '#666',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

