import { useEffect, useState } from 'react';
import { IFullCountry } from '../../types.ts';
import { BASE_URL } from '../../constants.ts';
import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
  shortName: string;
}

const CountryInfo = ({ shortName }: Props) => {
  const [countryInfo, setCountryInfo] = useState<IFullCountry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountry = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/alpha/${shortName}`);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const data: IFullCountry = await response.json();

        // Загружаем названия стран-соседей
        const borderNames = await Promise.all(
          (data.borders || []).map(async (border) => {
            const response = await fetch(`${BASE_URL}/alpha/${border}`);
            if (!response.ok) {
              return border; // Если запрос не удался, оставляем код страны
            }
            const borderData: IFullCountry = await response.json();
            return borderData.name;
          })
        );

        setCountryInfo({ ...data, borders: borderNames });
      } catch (error) {
        setError('Ошибка загрузки данных о стране');
      } finally {
        setLoading(false);
      }
    };

    getCountry();
  }, [shortName]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4">{countryInfo?.name}</Typography>
      <Typography variant="body1">Регион: {countryInfo?.region}</Typography>
      <Typography variant="body1">Население: {countryInfo?.population?.toLocaleString()} человек</Typography>
      <img src={countryInfo?.flags.svg} alt={countryInfo?.name} style={{ width: '150px', marginTop: '10px' }} />
      <Box mt={2}>
        <Typography variant="h6">Граничит с:</Typography>
        {countryInfo?.borders.length ? (
          countryInfo.borders.map((border) => (
            <Typography key={border} variant="body1">
              {border}
            </Typography>
          ))
        ) : (
          <Typography variant="body1">Нет граничащих стран</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CountryInfo;
