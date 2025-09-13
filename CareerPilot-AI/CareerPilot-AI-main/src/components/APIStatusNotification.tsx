'use client';

import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import React, { useState } from 'react';

interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  fallbackUsed?: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const APIStatusNotification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  fallbackUsed = false,
  onClose,
  autoClose = true,
  duration = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, isVisible, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800 dark:text-green-200';
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'text-blue-800 dark:text-blue-200';
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div className={`border rounded-lg p-4 mb-4 ${getBackgroundColor()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${getTextColor()}`}>
            {title}
            {fallbackUsed && (
              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                Backup Model Used
              </span>
            )}
          </h3>
          <div className={`mt-2 text-sm ${getTextColor()}`}>
            <p>{message}</p>
            {fallbackUsed && (
              <p className="mt-1 text-xs opacity-75">
                Our backup system provided this response while the primary AI service recovers.
              </p>
            )}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto flex-shrink-0">
            <button
              onClick={handleClose}
              className={`inline-flex ${getTextColor()} hover:opacity-75`}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Hook for managing API status notifications
export const useAPINotifications = () => {
  const [notifications, setNotifications] = useState<Array<NotificationProps & { id: string }>>([]);

  const addNotification = (notification: Omit<NotificationProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = {
      ...notification,
      id,
      onClose: () => removeNotification(id)
    };

    setNotifications(prev => [...prev, newNotification]);

    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const showAPIError = (error: string, fallbackUsed = false) => {
    return addNotification({
      type: 'warning',
      title: 'AI Service Notice',
      message: fallbackUsed
        ? 'Using backup response while primary AI service recovers.'
        : 'The AI service is temporarily experiencing high demand. Please try again shortly.',
      fallbackUsed
    });
  };

  const showAPISuccess = (fallbackUsed = false) => {
    if (fallbackUsed) {
      return addNotification({
        type: 'info',
        title: 'Response Generated',
        message: 'Response provided using backup AI model.',
        fallbackUsed: true
      });
    }
    return addNotification({
      type: 'success',
      title: 'Success',
      message: 'AI response generated successfully.',
    });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    showAPIError,
    showAPISuccess
  };
};
