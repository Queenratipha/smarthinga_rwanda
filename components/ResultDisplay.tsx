import React, { useState } from 'react';
import type { Recommendation } from '../types';
import { CalendarIcon, SunIcon, SparklesIcon, BookOpenIcon, PrintIcon, ChevronDownIcon } from './icons';
import type { TFunction } from '../hooks/useLocalization';


interface ResultDisplayProps {
  recommendation: Recommendation;
  t: TFunction;
}

const InfoCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode, className?: string }> = ({ title, icon, children, className }) => (
  <div className={`bg-white/80 p-6 rounded-lg shadow-md border border-gray-200 h-full ${className}`}>
    <div className="flex items-center mb-4">
      <div className="bg-green-100 p-2 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <div>{children}</div>
  </div>
);

const AccordionItem: React.FC<{ title: string, content: string, isOpen: boolean, onClick: () => void }> = ({ title, content, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200">
            <button onClick={onClick} className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-green-50/50 focus:outline-none">
                <p className="font-semibold text-green-800">{title}</p>
                <ChevronDownIcon className={`w-5 h-5 text-green-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 bg-green-50/30">
                    <p className="text-gray-600 text-sm">{content}</p>
                </div>
            )}
        </div>
    )
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ recommendation, t }) => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);

    const handlePrint = () => {
        window.print();
    }

  return (
    <div className="animate-fade-in" id="print-area">
      <div className="flex justify-between items-center mb-4 no-print">
        <h2 className="text-2xl font-bold text-[#2C5234]">{t('results_title')}</h2>
        <button 
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
        >
            <PrintIcon className="w-5 h-5" />
            <span>{t('button_print_save')}</span>
        </button>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard title={t('results_planting_window')} icon={<CalendarIcon className="w-6 h-6 text-green-600" />}>
            <p className="text-2xl font-bold text-green-700">{recommendation.optimalPlantingWindow}</p>
            <p className="text-gray-500 mt-1">{t('results_planting_window_desc')}</p>
          </InfoCard>
          <InfoCard title={t('results_general_advice')} icon={<SparklesIcon className="w-6 h-6 text-green-600" />}>
            <p className="text-gray-600">{recommendation.generalAdvice}</p>
          </InfoCard>
        </div>

        <div>
          <InfoCard title={t('results_4_week_plan')} icon={<SunIcon className="w-6 h-6 text-green-600" />}>
            <div className="space-y-1">
              {recommendation.weeklyRecommendations.map((weekRec, index) => (
                <AccordionItem 
                    key={index}
                    title={weekRec.week}
                    content={weekRec.advice}
                    isOpen={openAccordion === index}
                    onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                />
              ))}
            </div>
          </InfoCard>
        </div>

        <div>
          <InfoCard title={t('results_soil_tips')} icon={<BookOpenIcon className="w-6 h-6 text-green-600" />}>
            <ul className="space-y-2 list-disc list-inside text-gray-600">
              {recommendation.soilManagementTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};