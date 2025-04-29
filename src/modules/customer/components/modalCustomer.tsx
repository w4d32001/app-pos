import { useState } from 'react';
import { Pen,Plus } from 'lucide-react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Fade, Button, TextField, MenuItem } from '@mui/material';
import { PostCustomer, Customer } from "../types/customer";
import { responseAPI } from "../../../core/types/typeGlobal";

interface ModalProps {
  id: string;
  data: Customer;
  triggerAlert: () => void;
  fetchCustomers: () => void;
  EditCategoria: (formData: PostCustomer, id: string) => Promise<responseAPI>;
}

export function ModalCustomerEdit({ id, data, triggerAlert, fetchCustomers, EditCategoria }: ModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nameValue = formData.get('name')?.toString().trim();
    const documentTypeValue = formData.get('documentType')?.toString();
    const documentNumberValue = formData.get('documentNumber')?.toString().trim();
    const phoneValue = formData.get('phone')?.toString().trim();
    if (!nameValue || !documentTypeValue || !documentNumberValue || !phoneValue) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    const postData: PostCustomer = {
      name: nameValue,
      documentType: documentTypeValue,
      documentNumber: documentNumberValue,
      phone: phoneValue,
    };
    const response = await EditCategoria(postData, id);
    if (response?.details) {
      triggerAlert();
    } else {
      handleClose();
      triggerAlert();
      fetchCustomers();
    }
  };

  return (
    <>
      <label
        htmlFor={`edit-${id}`}
        className="w-12 h-12 hover:text-blue-600 flex items-center justify-center"
        aria-label="Modal Edit"
        onClick={handleOpen}
      >
        <Pen size={16} />
      </label>

      <Dialog open={open} onClose={handleClose} TransitionComponent={Fade} transitionDuration={500}>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Nombre"
              defaultValue={data.name}
              fullWidth
              margin="normal"
              variant="outlined"
            />

            <TextField
              name="documentType"
              label="Tipo de Documento"
              select
              defaultValue={data.documentType || "DNI"}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              <MenuItem value="DNI">DNI</MenuItem>
              <MenuItem value="Tarjeta BCP">Tarjeta BCP</MenuItem>
              <MenuItem value="Yape">Yape</MenuItem>
            </TextField>

            <TextField
              name="documentNumber"
              label="Número de Documento"
              defaultValue={data.documentNumber}
              fullWidth
              margin="normal"
              variant="outlined"
            />

            <TextField
              name="phone"
              label="Teléfono"
              defaultValue={data.phone}
              fullWidth
              margin="normal"
              variant="outlined"
            />

            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Guardar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}


interface FormCustomerProps {
    submitCustomers: (formData: PostCustomer) => Promise<responseAPI>;
    triggerAlert: () => void;
    fetchCustomers: () => void;
  }
  
  export const FormCustomer = ({ submitCustomers, triggerAlert, fetchCustomers }: FormCustomerProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<PostCustomer>({
      name: "",
      documentType: "DNI",
      documentNumber: "",
      phone: "",
    });
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
      const { name, value } = e.target;
      if (name) {
        setFormData((prev) => ({
          ...prev,
          [name]: value as string,
        }));
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      const response = await submitCustomers(formData);
      if (response?.details) {
        triggerAlert();
      } else {
        triggerAlert();
        fetchCustomers();
        handleClose();
      }
      setLoading(false);
    };
  
    return (
      <>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Plus size={18} />} 
          onClick={handleOpen}disableElevation
        >
          Nuevo Cliente
        </Button>
       
        <Dialog open={open} onClose={handleClose} TransitionComponent={Fade} transitionDuration={500}>
          <DialogTitle>Crear Nuevo Cliente</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Nombre"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
  
              <TextField
                name="documentType"
                label="Tipo de Documento"
                select
                value={formData.documentType}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              >
                <MenuItem value="DNI">DNI</MenuItem>
                <MenuItem value="Tarjeta BCP">Tarjeta BCP</MenuItem>
                <MenuItem value="Yape">Yape</MenuItem>
              </TextField>
  
              <TextField
                name="documentNumber"
                label="Número de Documento"
                value={formData.documentNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
  
              <TextField
                name="phone"
                label="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
  
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary" disabled={loading}>
                  {loading ? "Guardando..." : "Crear"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  };