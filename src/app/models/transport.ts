export interface TransportRoute {
  id: number;
  routeNumber: string;
  name: string;
  from: string;
  to: string;
  fare: number;
  type: 'jeepney' | 'taxi' | 'bus';
  schedule: string;
  landmarks: string[];
}
