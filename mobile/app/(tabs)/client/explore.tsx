import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Chip, ActivityIndicator, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { chefsService } from '@/services/chefs';
import { ChefProfile } from '@/types';

export default function ExploreScreen() {
  const router = useRouter();
  const [chefs, setChefs] = useState<ChefProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const cuisineTypes = ['All', 'Italian', 'Asian', 'BBQ', 'Pastry', 'Mediterranean', 'Fusion'];

  useEffect(() => {
    loadChefs();
  }, [selectedCuisine]);

  const loadChefs = async () => {
    try {
      setLoading(true);
      if (selectedCuisine && selectedCuisine !== 'All') {
        const results = await chefsService.searchChefs({
          cuisineTypes: [selectedCuisine],
        });
        setChefs(results);
      } else {
        const results = await chefsService.getAllChefs();
        setChefs(results);
      }
    } catch (error) {
      console.error('Error loading chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadChefs();
      return;
    }

    try {
      setLoading(true);
      const results = await chefsService.searchChefs({ query: searchQuery });
      setChefs(results);
    } catch (error) {
      console.error('Error searching chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderChef = ({ item }: { item: ChefProfile }) => (
    <TouchableOpacity onPress={() => router.push(`/chef/${item.id}`)}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Card.Cover
            source={{
              uri: item.profilePhoto?.url || 'https://via.placeholder.com/100x100',
            }}
            style={styles.chefImage}
          />
          <View style={styles.chefInfo}>
            <Text variant="titleMedium" style={styles.chefName}>
              {item.user.username}
            </Text>
            <Text variant="bodySmall">{item.specialties?.join(', ') || 'Chef'}</Text>
            <Text variant="bodySmall" style={styles.location}>
              📍 {item.location}
            </Text>
            <View style={styles.footer}>
              <Text variant="bodySmall">
                ⭐ {item.averageRating?.toFixed(1) || '0.0'}
              </Text>
              <Text variant="titleSmall" style={styles.price}>
                {item.hourlyRate} EGP/hr
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Explore Chefs
        </Text>
        <Searchbar
          placeholder="Search by name or cuisine..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchBar}
        />
      </View>

      <View style={styles.filters}>
        <FlatList
          horizontal
          data={cuisineTypes}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Chip
              selected={selectedCuisine === item || (item === 'All' && !selectedCuisine)}
              onPress={() => setSelectedCuisine(item === 'All' ? null : item)}
              style={styles.chip}
            >
              {item}
            </Chip>
          )}
        />
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={chefs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderChef}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text variant="bodyLarge">No chefs found</Text>
              <Text variant="bodyMedium" style={styles.emptySubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          }
        />
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#f5f5f5',
  },
  filters: {
    padding: 16,
    paddingTop: 12,
  },
  chip: {
    marginRight: 8,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  chefImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  chefInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chefName: {
    fontWeight: '600',
  },
  location: {
    color: '#666',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    color: '#6200EE',
    fontWeight: '600',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptySubtext: {
    color: '#666',
    marginTop: 8,
  },
});

