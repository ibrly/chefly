# Web Optimization Guide

This document explains the web-responsive features implemented in the Chefly mobile app.

## Overview

The Chefly app is built with React Native and Expo, which supports web deployment out of the box. We've added responsive design utilities to ensure the app looks great on desktop and tablet screens in addition to mobile.

## Responsive System

### Breakpoints

We use standard web breakpoints:

```typescript
mobile: 0px        // < 768px
tablet: 768px      // 768px - 1024px
desktop: 1024px    // 1024px - 1440px
largeDesktop: 1440px // > 1440px
```

### Responsive Utilities

#### 1. `responsive.ts` - Core Responsive Logic

Located at: `mobile/src/styles/responsive.ts`

**Features:**
- Screen dimension detection
- Breakpoint checks (`isMobile`, `isTablet`, `isDesktop`, etc.)
- Responsive value selector
- Container width calculations
- Grid column calculations
- Responsive spacing and font sizes

**Usage:**
```typescript
import { responsive, spacing, fontSize, isDesktop } from '@/styles/responsive';

// Get responsive value
const padding = responsive({
  mobile: 16,
  tablet: 24,
  desktop: 32,
});

// Use predefined responsive spacing
const containerPadding = spacing.lg; // Automatically responsive

// Conditional rendering based on screen size
if (isDesktop) {
  // Render desktop layout
}
```

#### 2. `ResponsiveContainer` Component

Located at: `mobile/src/components/ResponsiveContainer.tsx`

**Features:**
- Auto-centers content on large screens
- Applies max-width constraints
- Adds appropriate horizontal padding
- Responsive grid layout component

**Usage:**
```tsx
import { ResponsiveContainer, ResponsiveGrid } from '@/components/ResponsiveContainer';

// Basic container
<ResponsiveContainer>
  <Text>Content is centered on desktop!</Text>
</ResponsiveContainer>

// Grid layout
<ResponsiveGrid columns={3} gap={16}>
  {items.map(item => <Card key={item.id} {...item} />)}
</ResponsiveGrid>
```

#### 3. `useResponsive` Hook

Located at: `mobile/src/hooks/useResponsive.ts`

**Features:**
- Real-time dimension tracking
- Responsive breakpoint checks
- Orientation detection
- Dynamic value selection

**Usage:**
```tsx
import { useResponsive, useResponsiveValue } from '@/hooks/useResponsive';

function MyComponent() {
  const { isMobile, isDesktop, width } = useResponsive();

  const columns = useResponsiveValue({
    mobile: 1,
    tablet: 2,
    desktop: 3,
  });

  return (
    <View>
      <Text>Screen width: {width}</Text>
      <Text>Layout: {isMobile ? 'Mobile' : 'Desktop'}</Text>
    </View>
  );
}
```

## Web-Specific Configurations

### 1. App Configuration (`app.config.ts`)

**Web Meta Tags:**
```typescript
web: {
  favicon: './assets/favicon.png',
  meta: {
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    themeColor: '#6200EE',
    description: 'Chefly - Find and book professional chefs',
  },
}
```

### 2. Metro Config

The Metro bundler is configured for web support with proper module resolution.

## Best Practices

### 1. Layout Containers

Always wrap your main content in `ResponsiveContainer` for large screen support:

```tsx
// ❌ Bad: No responsive container
<View style={{ padding: 16 }}>
  <Content />
</View>

// ✅ Good: With responsive container
<ResponsiveContainer>
  <Content />
</ResponsiveContainer>
```

### 2. Grid Layouts

Use `ResponsiveGrid` for lists that should adapt to screen size:

```tsx
// ✅ Responsive grid
<ResponsiveGrid columns={2}>
  {chefs.map(chef => (
    <ChefCard key={chef.id} chef={chef} />
  ))}
</ResponsiveGrid>
```

### 3. Responsive Values

Use the responsive utilities for spacing, fonts, and conditional values:

```tsx
import { spacing, fontSize, responsive } from '@/styles/responsive';

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg, // Auto-responsive
  },
  title: {
    fontSize: fontSize.xl, // Auto-responsive
  },
  card: {
    width: responsive({
      mobile: '100%',
      tablet: '48%',
      desktop: '30%',
    }),
  },
});
```

### 4. Conditional Rendering

Show/hide elements based on screen size:

```tsx
import { useResponsive } from '@/hooks/useResponsive';

function Header() {
  const { isMobile, isDesktop } = useResponsive();

  return (
    <View>
      {isMobile && <MobileMenu />}
      {isDesktop && <DesktopNavigation />}
    </View>
  );
}
```

## Testing Web Responsive Design

### Local Development

```bash
# Start web version
pnpm dev:mobile

# The app will open in browser at http://localhost:8081
# Press 'w' in terminal to open web version
```

### Testing Different Screen Sizes

1. **Chrome DevTools:**
   - Open DevTools (F12)
   - Click device toolbar icon (Ctrl+Shift+M)
   - Test various device sizes

2. **Responsive Testing:**
   - Mobile: 375px width (iPhone)
   - Tablet: 768px width (iPad)
   - Desktop: 1440px width (MacBook)
   - Large Desktop: 1920px width (iMac)

### Browser Compatibility

Tested and supported:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## Common Responsive Patterns

### 1. Two-Column Layout on Desktop

```tsx
const { isDesktop } = useResponsive();

<View style={{ flexDirection: isDesktop ? 'row' : 'column' }}>
  <View style={{ flex: isDesktop ? 1 : undefined }}>
    <Sidebar />
  </View>
  <View style={{ flex: isDesktop ? 2 : undefined }}>
    <MainContent />
  </View>
</View>
```

### 2. Responsive Card Grid

```tsx
<ResponsiveGrid columns={2} gap={spacing.md}>
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</ResponsiveGrid>
```

### 3. Hide on Mobile, Show on Desktop

```tsx
const { isMobile } = useResponsive();

{!isMobile && <DesktopOnlyFeature />}
```

### 4. Responsive Modal/Dialog

```tsx
const { width } = useResponsive();
const modalWidth = Math.min(width * 0.9, 600); // Max 600px, 90% on mobile

<Modal>
  <View style={{ width: modalWidth }}>
    <Content />
  </View>
</Modal>
```

## Performance Considerations

### 1. Memoization

Use `useMemo` for expensive responsive calculations:

```tsx
const layout = useMemo(() => {
  return calculateComplexLayout(width, height);
}, [width, height]);
```

### 2. Conditional Imports

For web-only heavy components, use dynamic imports:

```tsx
const DesktopChart = isWeb ? lazy(() => import('./DesktopChart')) : null;
```

### 3. Image Optimization

Use responsive images:

```tsx
const imageSize = responsive({
  mobile: { width: 300, height: 200 },
  desktop: { width: 600, height: 400 },
});

<Image source={uri} style={imageSize} />
```

## Accessibility

The responsive system maintains accessibility:
- Touch targets remain >= 44px on all devices
- Text remains readable (min 14px)
- Color contrast maintained
- Keyboard navigation works on web
- Screen reader compatible

## Future Enhancements

Potential improvements:
- [ ] Server-side rendering (SSR) with Next.js
- [ ] Progressive Web App (PWA) features
- [ ] Advanced desktop features (drag & drop, hover states)
- [ ] Keyboard shortcuts for desktop
- [ ] Print stylesheets
- [ ] Dark mode optimization for desktop

## Troubleshooting

### Issue: Layout breaks on specific screen size

**Solution:** Check the breakpoint values and adjust the responsive logic in `responsive.ts`.

### Issue: Content too narrow on large screens

**Solution:** Increase the `maxWidth` in `ResponsiveContainer` or adjust `containerWidth` values.

### Issue: Grid items not wrapping properly

**Solution:** Use `ResponsiveGrid` component or ensure `flexWrap: 'wrap'` is set.

### Issue: Font sizes too small/large

**Solution:** Adjust the `fontSize` values in `responsive.ts` or use `useResponsiveValue` for custom font sizes.

## Resources

- [React Native Web Docs](https://necolas.github.io/react-native-web/)
- [Expo Web Support](https://docs.expo.dev/guides/web/)
- [Responsive Design Principles](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

---

**Last Updated:** October 24, 2025

