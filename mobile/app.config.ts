import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Chefly',
  slug: 'chefly',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  scheme: 'chefly',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.chefly.app',
    buildNumber: '1',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.chefly.app',
    versionCode: 1,
    permissions: [
      'CAMERA',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'NOTIFICATIONS',
    ],
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
    // Web-specific config for better responsive support
    build: {
      babel: {
        include: ['react-native-web', '@react-navigation'],
      },
    },
    // Meta tags for better SEO and responsive design
    meta: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      themeColor: '#6200EE',
      description: 'Chefly - Find and book professional chefs for your events',
    },
  },
  plugins: [
    'expo-router',
    'expo-font',
    [
      'expo-notifications',
      {
        icon: './assets/notification-icon.png',
        color: '#ffffff',
        sounds: [],
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'Allow Chefly to access your photos to upload your profile picture.',
        cameraPermission: 'Allow Chefly to access your camera to take profile pictures.',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: 'your-project-id-here',
    },
  },
});
