import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ActivityIndicator, Text, Button } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { paymentService } from '@/services/payment';

export default function PaymentScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const webViewRef = useRef<WebView>(null);

  React.useEffect(() => {
    initializePayment();
  }, []);

  const initializePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const { iframeUrl: url } = await paymentService.createPaymentIntent(parseInt(bookingId));

      setIframeUrl(url);
    } catch (error: any) {
      console.error('Payment initialization error:', error);
      setError(error.response?.data?.error?.message || 'Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  const handleWebViewNavigationStateChange = (navState: any) => {
    const { url } = navState;

    // Check for success/failure callbacks
    if (url.includes('success=true') || url.includes('/success')) {
      handlePaymentSuccess();
    } else if (url.includes('success=false') || url.includes('/fail')) {
      handlePaymentFailure();
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentProcessing(true);

    // Give webhook time to process
    setTimeout(() => {
      Alert.alert(
        'Payment Successful!',
        'Your booking has been confirmed. The chef will be notified.',
        [
          {
            text: 'OK',
            onPress: () => {
              router.replace(`/booking/${bookingId}`);
            },
          },
        ]
      );
    }, 2000);
  };

  const handlePaymentFailure = () => {
    Alert.alert(
      'Payment Failed',
      'Your payment could not be processed. Please try again.',
      [
        {
          text: 'Retry',
          onPress: () => {
            setIframeUrl(null);
            initializePayment();
          },
        },
        {
          text: 'Cancel',
          onPress: () => router.back(),
          style: 'cancel',
        },
      ]
    );
  };

  const handleRetry = () => {
    setIframeUrl(null);
    setError(null);
    initializePayment();
  };

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Payment',
          }}
        />
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Initializing payment...</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Payment Error',
          }}
        />
        <SafeAreaView style={styles.container}>
          <View style={styles.errorContainer}>
            <Text variant="headlineSmall" style={styles.errorTitle}>
              Payment Error
            </Text>
            <Text style={styles.errorText}>{error}</Text>
            <Button mode="contained" onPress={handleRetry} style={styles.retryButton}>
              Try Again
            </Button>
            <Button mode="outlined" onPress={() => router.back()} style={styles.cancelButton}>
              Cancel
            </Button>
          </View>
        </SafeAreaView>
      </>
    );
  }

  if (paymentProcessing) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Processing Payment',
          }}
        />
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Processing your payment...</Text>
            <Text style={styles.loadingSubtext}>Please wait, this may take a moment</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Complete Payment',
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        {iframeUrl && (
          <WebView
            ref={webViewRef}
            source={{ uri: iframeUrl }}
            style={styles.webview}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error('WebView error:', nativeEvent);
              setError('Failed to load payment page');
            }}
            startInLoadingState
            renderLoading={() => (
              <View style={styles.webviewLoading}>
                <ActivityIndicator size="large" />
              </View>
            )}
            // Allow JavaScript
            javaScriptEnabled
            domStorageEnabled
            // For iOS
            {...(Platform.OS === 'ios' && {
              allowsInlineMediaPlayback: true,
              mediaPlaybackRequiresUserAction: false,
            })}
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
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  webviewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#d32f2f',
  },
  errorText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  retryButton: {
    width: '100%',
    marginBottom: 12,
  },
  cancelButton: {
    width: '100%',
  },
});

