# Page Stories

This directory contains Storybook stories for full pages in the application.

## Purpose

Page stories allow you to:
- Preview entire pages in isolation
- Test page layouts at different viewport sizes
- Document page-level components and their interactions
- Test with different authentication states

## Structure

Each page story includes:
- Default desktop view
- Mobile responsive view
- Tablet responsive view
- Various interaction states

## Mocking

All pages are wrapped with necessary providers:
- `AuthProvider` - Authentication context
- `SocketProvider` - Socket.IO connection
- `NotificationProvider` - Notifications

For more advanced scenarios, you may need to mock API responses or use MSW (Mock Service Worker).

## Usage

View these stories in Storybook under the "Pages" section:

```bash
npm run storybook
```

Then navigate to Pages > [PageName] in the sidebar.

