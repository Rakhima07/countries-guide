export interface IShortCountry {
    alpha3Code: string;
    name: string;
  }
  
  export interface IFullCountry {
    name: string;
    region: string;
    population: number;
    flags: { svg: string };
    borders: string[];
  }
  