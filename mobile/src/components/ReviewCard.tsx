import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <MaterialCommunityIcons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color={star <= rating ? '#FFB300' : '#ccc'}
          />
        ))}
      </View>
    );
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Avatar.Text
              size={40}
              label={review.client.username[0].toUpperCase()}
              style={styles.avatar}
            />
            <View>
              <Text variant="titleMedium" style={styles.username}>
                {review.client.username}
              </Text>
              <Text variant="bodySmall" style={styles.date}>
                {format(new Date(review.createdAt), 'MMM dd, yyyy')}
              </Text>
            </View>
          </View>
          {renderStars(review.rating)}
        </View>
        {review.comment && (
          <Text variant="bodyMedium" style={styles.comment}>
            {review.comment}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginRight: 12,
  },
  username: {
    fontWeight: '600',
  },
  date: {
    color: '#666',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  comment: {
    color: '#333',
    lineHeight: 22,
  },
});

