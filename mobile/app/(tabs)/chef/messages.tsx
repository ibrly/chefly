import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Avatar, Badge } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { chatService } from '@/services/chat';
import { useSocket } from '@/contexts/SocketContext';
import { format } from 'date-fns';

export default function ChefMessagesScreen() {
  const router = useRouter();
  const { on, off } = useSocket();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();

    const handleNewMessage = () => {
      loadConversations();
    };

    on('new_message', handleNewMessage);

    return () => {
      off('new_message', handleNewMessage);
    };
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await chatService.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderConversation = ({ item }: { item: any }) => {
    const { otherUser, lastMessage, unreadCount } = item;

    return (
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={() => router.push(`/chat/${otherUser.id}`)}
      >
        <Avatar.Text size={50} label={otherUser.username[0].toUpperCase()} />
        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text variant="titleMedium" style={styles.username}>
              {otherUser.username}
            </Text>
            <Text variant="bodySmall" style={styles.time}>
              {format(new Date(lastMessage.createdAt), 'HH:mm')}
            </Text>
          </View>
          <View style={styles.messagePreview}>
            <Text variant="bodyMedium" numberOfLines={1} style={styles.lastMessage}>
              {lastMessage.content}
            </Text>
            {unreadCount > 0 && (
              <Badge size={20} style={styles.badge}>
                {unreadCount}
              </Badge>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Messages
        </Text>
      </View>

      {conversations.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <Text variant="bodyLarge" style={styles.emptyText}>
            No conversations yet
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtext}>
            Start chatting with clients to see your messages here
          </Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.conversationId}
          renderItem={renderConversation}
          refreshing={loading}
          onRefresh={loadConversations}
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
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontWeight: 'bold',
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  conversationContent: {
    flex: 1,
    marginLeft: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  username: {
    fontWeight: '600',
  },
  time: {
    color: '#666',
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    color: '#666',
  },
  badge: {
    backgroundColor: '#6200EE',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginBottom: 8,
    fontWeight: '600',
  },
  emptySubtext: {
    color: '#666',
    textAlign: 'center',
  },
});

