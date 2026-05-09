export interface CityService {
  id: number;
  name: string;
  category: 'emergency' | 'health' | 'welfare' | 'employment' | 'transport' | 'government' | 'utilities';
  address: string;
  phone: string;
  alternativePhone?: string;
  email?: string;
  website?: string;
  description: string;
  hours: string;
  isOpen: boolean;
}