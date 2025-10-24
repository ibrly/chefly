import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', className, fallback }) => {
  const [imageError, setImageError] = React.useState(false);

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const iconSizes = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  const showFallback = !src || imageError;

  return (
    <div
      className={cn(
        'rounded-full bg-gray-200 flex items-center justify-center overflow-hidden',
        sizes[size],
        className
      )}
    >
      {showFallback ? (
        fallback ? (
          <span className="font-medium text-gray-600 uppercase">{fallback}</span>
        ) : (
          <User size={iconSizes[size]} className="text-gray-400" />
        )
      ) : (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};
