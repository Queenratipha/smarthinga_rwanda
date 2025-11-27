import React from 'react';
import type { FormData } from '../types';
import { LOCATIONS, CROP_TYPES, SOIL_TYPES } from '../constants';
import { LocationIcon, CropIcon, SoilIcon } from './icons';
import type { TFunction } from '../hooks/useLocalization';

interface RecommendationFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
  isLoading: boolean;
  t: TFunction;
}

const SelectInput: React.FC<{id: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[], children: React.ReactNode, label: string}> = ({ id, name, value, onChange, options, children, label }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {children}
          </div>
          <select 
              id={id} 
              name={name} 
              value={value}
              onChange={onChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5A8F7B] focus:border-[#5A8F7B] transition appearance-none"
          >
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
      </div>
    </div>
);


export const RecommendationForm: React.FC<RecommendationFormProps> = ({ formData, setFormData, onSubmit, isLoading, t }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectInput
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          options={LOCATIONS}
          label={t('form_location')}
        >
            <LocationIcon className="h-5 w-5 text-gray-400" />
        </SelectInput>

        <SelectInput
          id="cropType"
          name="cropType"
          value={formData.cropType}
          onChange={handleChange}
          options={CROP_TYPES}
          label={t('form_crop')}
        >
            <CropIcon className="h-5 w-5 text-gray-400" />
        </SelectInput>
        
        <SelectInput
          id="soilType"
          name="soilType"
          value={formData.soilType}
          onChange={handleChange}
          options={SOIL_TYPES}
          label={t('form_soil')}
        >
            <SoilIcon className="h-5 w-5 text-gray-400" />
        </SelectInput>
      </div>
      <div className="mt-8">
        <button 
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full bg-[#2C5234] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#1e3a24] focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('button_loading')}
            </>
          ) : t('button_get_recommendations')}
        </button>
      </div>
    </div>
  );
};