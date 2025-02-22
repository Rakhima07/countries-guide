import './App.css';
import { useEffect, useState } from 'react';
import { IShortCountry } from './types.ts';
import { BASE_URL } from './constants.ts';
import CountriesList from './components/CountriesList/ContriesList.tsx';
import CountryInfo from './components/CountryInfo/CountryInfo.tsx';
import { Button } from '@mui/material';

function App() {
  const [countries, setCountries] = useState<IShortCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/all?fields=alpha3Code,name`);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const data: IShortCountry[] = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Ошибка запроса:', error);
      }
    };

    getCountries();
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={() => setIsDrawerOpen(true)}>
        Выбрать страну
      </Button>

      <CountriesList
        countries={countries}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectCountry={(code) => {
          setSelectedCountry(code);
          setIsDrawerOpen(false); 
        }}
      />

      {selectedCountry ? (
        <CountryInfo shortName={selectedCountry} />
      ) : (
        <p>Выберите страну</p>
      )}
    </div>
  );
}

export default App;
