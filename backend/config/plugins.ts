export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      grant: {
        google: {
          enabled: true,
          key: env('GOOGLE_CLIENT_ID'),
          secret: env('GOOGLE_CLIENT_SECRET'),
          callback: `${env('CLIENT_URL')}/connect/google/redirect`,
          scope: ['email', 'profile'],
        },
        apple: {
          enabled: true,
          key: env('APPLE_CLIENT_ID'),
          secret: {
            teamId: env('APPLE_TEAM_ID'),
            keyId: env('APPLE_KEY_ID'),
            privateKey: env('APPLE_PRIVATE_KEY'),
          },
          callback: `${env('CLIENT_URL')}/connect/apple/redirect`,
          scope: ['name', 'email'],
        },
        facebook: {
          enabled: true,
          key: env('FACEBOOK_CLIENT_ID'),
          secret: env('FACEBOOK_CLIENT_SECRET'),
          callback: `${env('CLIENT_URL')}/connect/facebook/redirect`,
          scope: ['email', 'public_profile'],
        },
      },
    },
  },
});

