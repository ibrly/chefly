import React from 'react';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Notification } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Check, Clock, MessageSquare, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  className?: string;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'booking':
      return <Clock className="w-5 h-5" />;
    case 'message':
      return <MessageSquare className="w-5 h-5" />;
    case 'review':
      return <Star className="w-5 h-5" />;
    default:
      return <Bell className="w-5 h-5" />;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'booking':
      return 'text-blue-600 bg-blue-50';
    case 'message':
      return 'text-green-600 bg-green-50';
    case 'review':
      return 'text-yellow-600 bg-yellow-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  className,
}) => {
  return (
    <Card
      className={cn(
        'p-4 transition-colors',
        !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white',
        className
      )}
    >
      <div className="flex gap-4">
        <div
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
            getNotificationColor(notification.type)
          )}
        >
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{notification.title}</p>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
            {!notification.read && onMarkAsRead && (
              <div className="flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkAsRead(notification.id)}
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
            </span>
            {notification.read && (
              <Badge variant="secondary" size="sm">
                Read
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

