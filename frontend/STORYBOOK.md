# Storybook Documentation

## Overview

This project uses Storybook for component development, testing, and documentation. All UI components are built using the Atomic Design methodology and documented with comprehensive stories.

## Running Storybook

### Development Mode
```bash
npm run storybook
```
This will start Storybook on [http://localhost:6006](http://localhost:6006)

### Build for Production
```bash
npm run build-storybook
```
This creates a static build in the `storybook-static` directory.

## Project Structure

```
src/
├── components/           # Component library (Atomic Design)
│   ├── atoms/           # Basic building blocks
│   ├── molecules/       # Component combinations
│   ├── organisms/       # Complex components
│   └── templates/       # Page templates
├── pages-stories/       # Full page stories
│   ├── HomePage.stories.tsx
│   ├── LoginPage.stories.tsx
│   ├── RegisterPage.stories.tsx
│   └── ExplorePage.stories.tsx
└── app/                 # Next.js App Router pages

.storybook/              # Storybook configuration
├── main.ts             # Main config
└── preview.ts          # Global decorators and parameters
```

## Story Categories

### Atoms
Basic building blocks that cannot be broken down further:
- **Button** - Multiple variants, sizes, and states
- **Input** - Text inputs with labels, icons, and validation
- **Avatar** - User avatars with fallbacks
- **Badge** - Status indicators and tags
- **Card** - Container components

### Molecules
Combinations of atoms working together:
- **SearchBar** - Search input with clear button
- **ChefCard** - Chef profile display card
- **ReviewCard** - Customer review display
- **BookingCard** - Booking information card

### Organisms
Complex UI components:
- **Navbar** - Navigation with authentication states
- **ChefGrid** - Grid layout for chef listings
- **BookingForm** - Complete booking form with validation

### Pages
Full page components:
- **HomePage** - Landing page with hero and featured chefs
- **LoginPage** - User authentication
- **RegisterPage** - User registration
- **ExplorePage** - Chef discovery and search

## Writing Stories

### Component Story Example

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};
```

### Page Story Example

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import HomePage from '@/app/page';
import { AuthProvider } from '@/contexts/AuthContext';

const meta = {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

## Features

### Accessibility Testing
All components are tested with `@storybook/addon-a11y` for accessibility violations.

### Responsive Testing
Stories include mobile, tablet, and desktop viewports:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px+

### Interactive Testing
Use `@storybook/addon-vitest` for component testing:
```bash
npx vitest
```

### Auto-generated Documentation
Components with TypeScript interfaces automatically generate documentation with the `autodocs` tag.

## Best Practices

1. **Every component should have a story**
   - Create `.stories.tsx` file alongside component
   - Include multiple variants and states
   - Add mobile and desktop views

2. **Use descriptive story names**
   ```typescript
   export const PrimaryLarge: Story = { ... }
   export const DisabledState: Story = { ... }
   ```

3. **Provide realistic data**
   - Use mock data that represents real use cases
   - Include edge cases (empty states, long text, etc.)

4. **Add context providers**
   - Wrap stories that need auth, socket, or other contexts
   - Use decorators for consistent setup

5. **Test interactions**
   - Use `play` function for testing user interactions
   - Simulate clicks, form submissions, etc.

## Addons

### Installed Addons
- `@chromatic-com/storybook` - Visual regression testing
- `@storybook/addon-docs` - Documentation generation
- `@storybook/addon-a11y` - Accessibility testing
- `@storybook/addon-vitest` - Component testing integration

### Usage

**Controls**: Dynamically edit component props in the UI
**Actions**: Log component events and callbacks
**Docs**: Auto-generated documentation
**Accessibility**: Check WCAG compliance
**Viewport**: Test responsive designs

## Integration with Next.js

This Storybook setup is configured for Next.js 14 with:
- App Router support
- Server components compatibility
- Image optimization
- CSS imports
- TypeScript

## Mocking

For page stories that need API data:

```typescript
// Use MSW (Mock Service Worker) for API mocking
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/chefs', () => {
    return HttpResponse.json({ data: mockChefs });
  }),
];
```

## Deployment

Storybook can be deployed as a static site:

1. Build Storybook:
   ```bash
   npm run build-storybook
   ```

2. Deploy the `storybook-static` directory to:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Next.js Integration](https://storybook.js.org/docs/nextjs)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

