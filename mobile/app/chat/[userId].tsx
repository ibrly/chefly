import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
} from 'react-native';
import { Text, TextInput, IconButton, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useSocket } from '@/contexts/SocketContext';
import { useAuth } from '@/contexts/AuthContext';
import { chatService } from '@/services/chat';
import { Message } from '@/types';
import { format } from 'date-fns';

export default function ChatScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { sendMessage, startTyping, stopTyping, markAsRead, on, off, connected } = useSocket();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [otherUser, setOtherUser] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);

  const flatListRef = useRef<FlatList>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const conversationId = [user?.id, parseInt(userId)]
    .sort((a, b) => a - b)
    .join('-');

  // Load conversation
  useEffect(() => {
    loadConversation();
  }, [userId]);

  // Socket listeners
  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      if (message.conversationId === conversationId) {
        setMessages((prev) => [...prev, message]);
        markAsRead(conversationId);
        scrollToBottom();
      }
    };

    const handleMessageSent = (message: Message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    };

    const handleUserTyping = (data: any) => {
      if (data.userId === parseInt(userId)) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    };

    const handleUserStoppedTyping = (data: any) => {
      if (data.userId === parseInt(userId)) {
        setIsTyping(false);
      }
    };

    on('new_message', handleNewMessage);
    on('message_sent', handleMessageSent);
    on('user_typing', handleUserTyping);
    on('user_stopped_typing', handleUserStoppedTyping);

    return () => {
      off('new_message', handleNewMessage);
      off('message_sent', handleMessageSent);
      off('user_typing', handleUserTyping);
      off('user_stopped_typing', handleUserStoppedTyping);
    };
  }, [conversationId, userId]);

  const loadConversation = async () => {
    try {
      setLoading(true);
      const data = await chatService.getConversation(parseInt(userId));
      setMessages(data);

      if (data.length > 0) {
        const other = data[0].sender.id === user?.id ? data[0].receiver : data[0].sender;
        setOtherUser(other);
      }

      markAsRead(conversationId);
    } catch (error) {
      console.error('Error loading conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSend = () => {
    if (inputText.trim() && connected) {
      sendMessage(parseInt(userId), inputText.trim());
      setInputText('');
      stopTyping(parseInt(userId));
    }
  };

  const handleTyping = (text: string) => {
    setInputText(text);

    if (text.length > 0) {
      startTyping(parseInt(userId));

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        stopTyping(parseInt(userId));
      }, 2000);
    } else {
      stopTyping(parseInt(userId));
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender.id === user?.id;

    return (
      <View style={[styles.messageContainer, isMe && styles.myMessageContainer]}>
        {!isMe && (
          <Avatar.Text size={32} label={item.sender.username[0].toUpperCase()} />
        )}
        <View style={[styles.messageBubble, isMe ? styles.myMessage : styles.theirMessage]}>
          <Text style={isMe ? styles.myMessageText : styles.theirMessageText}>
            {item.content}
          </Text>
          <Text style={styles.timeText}>
            {format(new Date(item.createdAt), 'HH:mm')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: otherUser?.username || 'Chat',
          headerLeft: () => (
            <IconButton icon="arrow-left" onPress={() => router.back()} />
          ),
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesList}
            onContentSizeChange={scrollToBottom}
          />

          {isTyping && (
            <View style={styles.typingIndicator}>
              <Text variant="bodySmall" style={styles.typingText}>
                {otherUser?.username} is typing...
              </Text>
            </View>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              value={inputText}
              onChangeText={handleTyping}
              placeholder="Type a message..."
              style={styles.input}
              mode="outlined"
              multiline
              maxLength={1000}
            />
            <IconButton
              icon="send"
              onPress={handleSend}
              disabled={!inputText.trim() || !connected}
              iconColor={inputText.trim() && connected ? '#6200EE' : '#999'}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  myMessage: {
    backgroundColor: '#6200EE',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4,
  },
  myMessageText: {
    color: '#fff',
  },
  theirMessageText: {
    color: '#000',
  },
  timeText: {
    fontSize: 10,
    opacity: 0.6,
    marginTop: 4,
  },
  typingIndicator: {
    padding: 8,
    paddingHorizontal: 16,
  },
  typingText: {
    fontStyle: 'italic',
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: '#fff',
  },
});

