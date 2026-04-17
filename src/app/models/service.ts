export interface CityService {
  id: number;
  name: string;
  category: 'emergency' | 'health' | 'welfare' | 'employment' | 'transport';
  address: string;
  phone: string;
  description: string;
  hours: string;
  isOpen: boolean;
}