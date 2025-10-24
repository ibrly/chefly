export default () => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      grant: {
        email: {
          enabled: true,
          icon: 'envelope',
        },
        discord: {
          enabled: false,
          icon: 'discord',
        },
        facebook: {
          enabled: true,
          icon: 'facebook-square',
          key: process.env.FACEBOOK_APP_ID || '',
          secret: process.env.FACEBOOK_APP_SECRET || '',
          callback: `${process.env.SERVER_URL || 'http://localhost:1337'}/api/auth/facebook/callback`,
          scope: ['email', 'public_profile'],
        },
        google: {
          enabled: true,
          icon: 'google',
          key: process.env.GOOGLE_CLIENT_ID || '',
          secret: process.env.GOOGLE_CLIENT_SECRET || '',
          callback: `${process.env.SERVER_URL || 'http://localhost:1337'}/api/auth/google/callback`,
          scope: ['email', 'profile'],
        },
        github: {
          enabled: false,
          icon: 'github',
        },
        microsoft: {
          enabled: false,
          icon: 'windows',
        },
        twitter: {
          enabled: false,
          icon: 'twitter',
        },
        instagram: {
          enabled: false,
          icon: 'instagram',
        },
        vk: {
          enabled: false,
          icon: 'vk',
        },
        twitch: {
          enabled: false,
          icon: 'twitch',
        },
        linkedin: {
          enabled: false,
          icon: 'linkedin',
        },
        cognito: {
          enabled: false,
          icon: 'aws',
        },
        reddit: {
          enabled: false,
          icon: 'reddit',
        },
        auth0: {
          enabled: false,
          icon: 'auth0',
        },
        cas: {
          enabled: false,
          icon: 'book',
        },
        patreon: {
          enabled: false,
          icon: 'patreon',
        },
        keycloak: {
          enabled: false,
          icon: 'key',
        },
      },
    },
  },
});
