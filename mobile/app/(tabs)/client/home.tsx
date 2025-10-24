import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Searchbar, Card, Button, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ClientHomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = ['Italian', 'Asian', 'BBQ', 'Pastry', 'Mediterranean', 'Fusion'];

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
            style={styles.searchBar}
          />
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {categories.map((category) => (
              <Chip key={category} style={styles.chip} onPress={() => {}}>
                {category}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Featured Chefs
          </Text>
          <Card style={styles.card}>
            <Card.Cover source={{ uri: 'https://via.placeholder.com/400x200' }} />
            <Card.Content>
              <Text variant="titleLarge" style={styles.chefName}>
                Chef Ahmed
              </Text>
              <Text variant="bodyMedium">Italian Cuisine Specialist</Text>
              <View style={styles.cardFooter}>
                <Text variant="bodySmall">⭐ 4.8 (120 reviews)</Text>
                <Text variant="titleMedium" style={styles.price}>
                  200 EGP/hr
                </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained">Book Now</Button>
            </Card.Actions>
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
    marginBottom: 16,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
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
});

