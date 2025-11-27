export interface FormData {
  location: string;
  cropType: string;
  soilType: string;
}

export interface WeeklyRecommendation {
  week: string;
  advice: string;
}

export interface Recommendation {
  optimalPlantingWindow: string;
  weeklyRecommendations: WeeklyRecommendation[];
  soilManagementTips: string[];
  generalAdvice: string;
}
