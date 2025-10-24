import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import {
  breakpoints,
  isWeb,
  responsive,
  getContainerWidth,
  getGridColumns,
  getCardWidth,
} from '@/styles/responsive';

/**
 * Hook to track screen dimensions and responsive breakpoints
 */
export function useResponsive() {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });

    return () => subscription?.remove();
  }, []);

  const width = dimensions.window.width;
  const height = dimensions.window.height;

  return {
    // Dimensions
    width,
    height,
    isWeb,

    // Breakpoint checks
    isMobile: width < breakpoints.tablet,
    isTablet: width >= breakpoints.tablet && width < breakpoints.desktop,
    isDesktop: width >= breakpoints.desktop,
    isLargeDesktop: width >= breakpoints.largeDesktop,

    // Orientation
    isLandscape: width > height,
    isPortrait: height > width,

    // Helpers
    responsive,
    getContainerWidth,
    getGridColumns,
    getCardWidth,
  };
}

/**
 * Hook for responsive values that update on dimension change
 */
export function useResponsiveValue<T>(config: {
  mobile: T;
  tablet?: T;
  desktop?: T;
  largeDesktop?: T;
}): T {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsive();

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

