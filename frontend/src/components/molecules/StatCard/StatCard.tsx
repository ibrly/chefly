import React from 'react';
import { Card } from '@/components/atoms/Card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  valueColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon: Icon,
  valueColor = 'text-gray-900',
  trend,
  className,
}) => {
  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className={cn('text-2xl font-bold', valueColor)}>{value}</div>
          <div className="text-sm text-gray-600 mt-1">{label}</div>
          {trend && (
            <div
              className={cn(
                'text-xs mt-2 flex items-center gap-1',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="flex-shrink-0 ml-4">
            <Icon className={cn('w-8 h-8 opacity-50', valueColor)} />
          </div>
        )}
      </div>
    </Card>
  );
};

