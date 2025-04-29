// src/components/AlertMessage.tsx
import { Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface AlertMessageProps {
  title: string;
  message: string;
  severity?: "error" | "warning" | "info" | "success"; 
  open: boolean;  
  onClose: () => void;  
}

export const AlertMessage = ({
  title,
  message,
  severity = "success",
  open,
  onClose,
}: AlertMessageProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }} 
      onClose={onClose}
    >
      <Alert severity={severity} className="w-full">
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};
