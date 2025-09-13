// @ts-nocheck
"use client";

import React from 'react';

interface SpeechErrorHandlerProps {
  error: string | null;
  isSupported: boolean;
  onRetry?: () => void;
  onClearError?: () => void;
}

export const SpeechErrorHandler: React.FC<SpeechErrorHandlerProps> = ({
  error,
  isSupported,
  onRetry,
  onClearError
}) => {
  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-md">
        <div className="flex items-center">
          <div className="text-yellow-800">
            <h3 className="text-sm font-medium">Speech Recognition Not Supported</h3>
            <p className="text-sm mt-1">
              Your browser doesn't support speech recognition. Please try using Chrome, Edge, or Safari.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!error) {
    return null;
  }

  return (
    <div className="p-4 bg-red-100 border border-red-400 rounded-md">
      <div className="flex items-center justify-between">
        <div className="text-red-800">
          <h3 className="text-sm font-medium">Speech Recognition Error</h3>
          <p className="text-sm mt-1">{error}</p>
        </div>
        <div className="flex space-x-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          )}
          {onClearError && (
            <button
              onClick={onClearError}
              className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeechErrorHandler;
