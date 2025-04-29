import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface PaginationLinkProps {
  page: number;
  size: number;
  count: number; // Número total de páginas
  onPageChange: (newPage: number) => void;
  onSizeChange: (newSize: number) => void;
}

export default function PaginationLink({ page, size, count, onPageChange, onSizeChange }: PaginationLinkProps) {

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value - 1);
  };

  const handleSizeChange = (event: SelectChangeEvent<number>) => {
    const newSize = Number(event.target.value);
    onSizeChange(newSize);
    onPageChange(0)
  };
  const options = [5,6,8,10,12,15,18,20,25,30]; 
  return (
    <div className="flex justify-between items-center mt-4">
  <Select
  value={size}
  onChange={handleSizeChange}
  className="mr-4"
  size="small"
  MenuProps={{
    anchorOrigin: {
      vertical: "top",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
  }}
>
        {options.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
      </Select>

      <Pagination
        page={page}
        count={count}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            component="button"
            {...item}
          />
        )}
      />
    </div>
  );
}
