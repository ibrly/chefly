import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { favoritesService } from '@/services/favorites';
import { TouchableOpacity } from 'react-native';

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await favoritesService.getMyFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (chefId: number) => {
    try {
      await favoritesService.removeFavorite(chefId);
      setFavorites((prev) => prev.filter((fav) => fav.chef.id !== chefId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const renderFavorite = ({ item }: { item: any }) => {
    const chef = item.chef;

    return (
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => router.push(`/chef/${chef.id}`)}>
          <Card.Cover
            source={{ uri: chef.profilePhoto?.url || 'https://via.placeholder.com/400x200' }}
          />
          <Card.Content>
            <View style={styles.cardHeader}>
              <View style={styles.chefInfo}>
                <Text variant="titleLarge" style={styles.chefName}>
                  {chef.user.username}
                </Text>
                <Text variant="bodyMedium">{chef.location}</Text>
                <View style={styles.cardFooter}>
                  <Text variant="bodySmall">⭐ {chef.averageRating.toFixed(1)}</Text>
                  <Text variant="titleMedium" style={styles.price}>
                    {chef.hourlyRate} EGP/hr
                  </Text>
                </View>
              </View>
              <IconButton
                icon="heart"
                iconColor="#E91E63"
                size={24}
                onPress={() => handleRemoveFavorite(chef.id)}
              />
            </View>
          </Card.Content>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Favorite Chefs',
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        {favorites.length === 0 && !loading ? (
          <View style={styles.emptyState}>
            <Text variant="headlineSmall" style={styles.emptyTitle}>
              No favorites yet
            </Text>
            <Text variant="bodyMedium" style={styles.emptyText}>
              Start adding chefs to your favorites to see them here
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderFavorite}
            contentContainerStyle={styles.list}
            refreshing={loading}
            onRefresh={loadFavorites}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  chefInfo: {
    flex: 1,
  },
  chefName: {
    fontWeight: 'bold',
    marginTop: 8,
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
  },
});

