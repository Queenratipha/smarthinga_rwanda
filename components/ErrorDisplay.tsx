import React from 'react';
import { RefreshIcon } from './icons';
import type { TFunction } from '../hooks/useLocalization';

interface ErrorDisplayProps {
    message: string;
    onRetry: () => void;
    t: TFunction;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry, t }) => {
    return (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-center animate-fade-in" role="alert">
            <p className="font-bold">{t('error_title')}</p>
            <p className="text-sm">{message}</p>
            <button 
                onClick={onRetry}
                className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 inline-flex items-center"
            >
                <RefreshIcon className="w-5 h-5 mr-2" />
                {t('button_retry')}
            </button>
        </div>
    );
};