/**
 * Custom Admin Panel Configuration
 * 
 * To enable this:
 * 1. Rename this file to app.tsx
 * 2. Run: pnpm build
 * 3. Restart the backend
 */

export default {
  config: {
    // Replace the Strapi logo in the admin panel
    auth: {
      logo: '/logo.png', // Add your logo to public folder
    },
    head: {
      favicon: '/favicon.ico',
    },
    // Customize the theme
    theme: {
      light: {
        colors: {
          primary100: '#f0e6ff',
          primary200: '#d9bfff',
          primary500: '#6200EE',
          primary600: '#5600CC',
          primary700: '#4A00AA',
          buttonPrimary500: '#6200EE',
          buttonPrimary600: '#5600CC',
        },
      },
    },
    // Add custom translations
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'Chefly Dashboard',
        'app.components.LeftMenu.navbrand.workplace': 'Chef Marketplace',
      },
    },
    // Customize menu
    menu: {
      logo: '/logo.png',
    },
    // Tutorial settings
    tutorials: false,
    // Disable notifications
    notifications: {
      releases: false,
    },
  },
  bootstrap() {},
};

