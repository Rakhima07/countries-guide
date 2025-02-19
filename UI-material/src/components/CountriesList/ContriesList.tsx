import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { IShortCountry } from '../../types.ts';

interface Props {
  countries: IShortCountry[];
  open: boolean;
  onClose: () => void;
  onSelectCountry: (code: string) => void;
}

export default function CountriesList({ countries, open, onClose, onSelectCountry }: Props) {
  return (
    <Drawer open={open} onClose={onClose}>
      <Box sx={{ width: 350 }} role="presentation">
        <List>
          {countries.map((country) => (
            <ListItem key={country.alpha3Code} disablePadding>
              <ListItemButton
                onClick={() => {
                  onSelectCountry(country.alpha3Code);
                  onClose(); // Закрываем Drawer при выборе страны
                }}
              >
                <ListItemText primary={country.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
