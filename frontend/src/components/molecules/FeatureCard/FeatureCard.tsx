import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-100',
  className,
}) => {
  return (
    <div className={cn('text-center', className)}>
      <div
        className={cn(
          'inline-flex items-center justify-center w-16 h-16 rounded-full mb-4',
          iconBgColor
        )}
      >
        <Icon className={cn(iconColor)} size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

