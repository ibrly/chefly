import { Dimensions, Platform } from 'react-native';

// Get screen dimensions
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

// Breakpoints (following web standards)
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
};

// Check device type
export const isWeb = Platform.OS === 'web';
export const isMobile = screenWidth < breakpoints.tablet;
export const isTablet = screenWidth >= breakpoints.tablet && screenWidth < breakpoints.desktop;
export const isDesktop = screenWidth >= breakpoints.desktop;
export const isLargeDesktop = screenWidth >= breakpoints.largeDesktop;

// Responsive value selector
export function responsive<T>(config: {
  mobile: T;
  tablet?: T;
  desktop?: T;
  largeDesktop?: T;
}): T {
  if (isLargeDesktop && config.largeDesktop !== undefined) {
    return config.largeDesktop;
  }
  if (isDesktop && config.desktop !== undefined) {
    return config.desktop;
  }
  if (isTablet && config.tablet !== undefined) {
    return config.tablet;
  }
  return config.mobile;
}

// Responsive spacing
export const spacing = {
  xs: responsive({ mobile: 4, tablet: 6, desktop: 8 }),
  sm: responsive({ mobile: 8, tablet: 12, desktop: 16 }),
  md: responsive({ mobile: 16, tablet: 20, desktop: 24 }),
  lg: responsive({ mobile: 24, tablet: 32, desktop: 40 }),
  xl: responsive({ mobile: 32, tablet: 48, desktop: 64 }),
  xxl: responsive({ mobile: 48, tablet: 64, desktop: 96 }),
};

// Responsive font sizes
export const fontSize = {
  xs: responsive({ mobile: 10, tablet: 11, desktop: 12 }),
  sm: responsive({ mobile: 12, tablet: 13, desktop: 14 }),
  base: responsive({ mobile: 14, tablet: 15, desktop: 16 }),
  md: responsive({ mobile: 16, tablet: 17, desktop: 18 }),
  lg: responsive({ mobile: 18, tablet: 20, desktop: 22 }),
  xl: responsive({ mobile: 20, tablet: 24, desktop: 28 }),
  xxl: responsive({ mobile: 24, tablet: 30, desktop: 36 }),
  xxxl: responsive({ mobile: 30, tablet: 36, desktop: 48 }),
};

// Container max widths
export const containerWidth = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

// Get container width based on screen size
export function getContainerWidth(): number {
  if (isLargeDesktop) return containerWidth.xl;
  if (isDesktop) return containerWidth.lg;
  if (isTablet) return containerWidth.md;
  return screenWidth;
}

// Responsive grid columns
export function getGridColumns(defaultMobile: number = 1): number {
  return responsive({
    mobile: defaultMobile,
    tablet: Math.min(defaultMobile * 2, 3),
    desktop: Math.min(defaultMobile * 3, 4),
    largeDesktop: Math.min(defaultMobile * 4, 6),
  });
}

// Safe area for web (add padding on large screens)
export function getHorizontalPadding(): number {
  if (!isWeb) return spacing.md;
  if (screenWidth > containerWidth.xl) {
    return (screenWidth - containerWidth.xl) / 2;
  }
  return spacing.lg;
}

// Responsive card width
export function getCardWidth(columns: number = 2): number {
  const cols = responsive({
    mobile: 1,
    tablet: Math.min(columns, 2),
    desktop: Math.min(columns, 3),
    largeDesktop: Math.min(columns, 4),
  });

  const containerW = getContainerWidth();
  const totalSpacing = spacing.md * (cols + 1);
  return (containerW - totalSpacing) / cols;
}

// Check if keyboard should be avoided (disable on web/tablet)
export const shouldAvoidKeyboard = !isWeb && isMobile;

// Touchable opacity (less feedback on web)
export const touchableOpacity = isWeb ? 0.8 : 0.6;

