export interface Country {
  name: { common: string };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  area: number;
  flags: { png: string; svg: string };
  currencies: any;
  languages: any;
}