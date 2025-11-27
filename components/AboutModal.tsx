import React from 'react';
import { XMarkIcon, LeafIcon } from './icons';
import type { TFunction } from '../hooks/useLocalization';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
    t: TFunction;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, t }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    aria-label="Close modal"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <LeafIcon className="w-12 h-12 text-[#2C5234]" />
                    <h2 className="text-3xl font-bold text-[#2C5234] mt-4">{t('about_title')}</h2>
                    <p className="text-gray-600 mt-2">{t('about_subtitle')}</p>
                </div>
                
                <div className="mt-8 text-left space-y-4 text-gray-700">
                    <p>{t('about_p1')}</p>
                    <p>{t('about_p2')}</p>
                    <p>{t('about_p3')}</p>
                </div>
            </div>
        </div>
    );
};