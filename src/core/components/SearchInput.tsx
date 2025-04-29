import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Search } from 'lucide-react'; // Importa el icono de Lucide

interface SearchInputProps {
  options: string[];
  onSearchChange: (newValue: string) => void;
}

export default function SearchInput({ options, onSearchChange }: SearchInputProps) {
  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options}
      value={""}
      onInputChange={(_, newInputValue) => onSearchChange(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscar..."
          InputProps={{
            ...params.InputProps,
            type: 'search',
            startAdornment: (
              <div style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>
                <Search size={20} />
              </div>
            ),
          }}
          size="small"
        />
      )}
    />
  );
}
