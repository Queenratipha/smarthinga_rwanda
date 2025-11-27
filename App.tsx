import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { RecommendationForm } from './components/RecommendationForm';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { getFarmingRecommendation } from './services/geminiService';
import type { FormData, Recommendation } from './types';
import { LeafIcon, InfoIcon } from './components/icons';
import { useLocalization } from './hooks/useLocalization';
import { AboutModal } from './components/AboutModal';
import { ErrorDisplay } from './components/ErrorDisplay';

const App: React.FC = () => {
  const { t, setLanguage, language } = useLocalization();
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    location: 'Kigali',
    cropType: 'Maize',
    soilType: 'Loam',
  });
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await getFarmingRecommendation(formData, language);
      setRecommendation(result);
    } catch (err) {
      setError(t('error_message'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [formData, t, language]);

  return (
    <div className="min-h-screen text-gray-800 antialiased">
      <Header setLanguage={setLanguage} language={language} t={t} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2C5234] mb-2">{t('welcome_title')}</h1>
            <p className="text-lg text-gray-600">{t('welcome_subtitle')}</p>
          </div>

          <RecommendationForm 
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            t={t}
          />
          
          <div className="mt-8">
            {isLoading && <LoadingSpinner t={t} />}
            {error && <ErrorDisplay message={error} onRetry={handleSubmit} t={t} />}
            
            {!isLoading && !error && !recommendation && (
              <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-lg shadow-md border border-gray-200">
                <LeafIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700">{t('ready_title')}</h2>
                <p className="text-gray-500 mt-2">{t('ready_subtitle')}</p>
              </div>
            )}
            
            {recommendation && <ResultDisplay recommendation={recommendation} t={t} />}
          </div>
        </div>
      </main>
      <footer className="text-center py-6 mt-8">
        <button 
          onClick={() => setAboutModalOpen(true)} 
          className="text-sm text-gray-500 hover:text-green-700 hover:underline inline-flex items-center"
        >
          <InfoIcon className="w-4 h-4 mr-2" />
          {t('about_link')}
        </button>
        <p className="text-sm text-gray-500 mt-2">&copy; {new Date().getFullYear()} SmartHinga Rwanda. {t('footer_text')}</p>
      </footer>
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setAboutModalOpen(false)} t={t} />
    </div>
  );
};

export default App;