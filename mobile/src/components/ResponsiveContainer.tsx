import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { getContainerWidth, getHorizontalPadding, isWeb } from '@/styles/responsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  maxWidth?: number;
  centered?: boolean;
}

/**
 * Responsive container that centers content on large screens
 * and adds appropriate padding
 */
export function ResponsiveContainer({
  children,
  style,
  maxWidth,
  centered = true,
}: ResponsiveContainerProps) {
  const containerMaxWidth = maxWidth || getContainerWidth();
  const horizontalPadding = getHorizontalPadding();

  return (
    <View
      style={[
        styles.container,
        {
          maxWidth: containerMaxWidth,
          paddingHorizontal: horizontalPadding,
          alignSelf: centered ? 'center' : 'flex-start',
          width: '100%',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Responsive grid container
 */
interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  style?: ViewStyle;
}

export function ResponsiveGrid({ children, columns = 2, gap = 16, style }: ResponsiveGridProps) {
  return (
    <View
      style={[
        styles.grid,
        {
          gap,
        },
        isWeb && {
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${300}px, 1fr))`,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

