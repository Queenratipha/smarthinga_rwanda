import React from 'react';
import type { TFunction } from '../hooks/useLocalization';

interface LoadingSpinnerProps {
    t: TFunction;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ t }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 font-semibold">{t('loading_title')}</p>
      <p className="mt-2 text-sm text-gray-500">{t('loading_subtitle')}</p>
    </div>
  );
};