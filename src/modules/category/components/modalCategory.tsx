import { useState } from 'react';
import { Pen } from 'lucide-react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Fade, Button, TextField } from '@mui/material';
import { PostCategory} from "../types/category";
import{responseAPI} from "../../../core/types/typeGlobal";

interface ModalProps {
  id: string;
  name: string;
  description: string;
  triggerAlert: () => void;
  fetchCustomers: () => void;
  EditCategoria: (formData: PostCategory,id:string) => Promise<responseAPI>;
}

export function ModalCategoryEdit({ id, name, description, triggerAlert, fetchCustomers, EditCategoria }: ModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nameValue = formData.get('name')?.toString().trim();
    const descriptionValue = formData.get('description')?.toString().trim();
    if (!nameValue) {
      alert("El nombre de la categoría es obligatorio.");
      return;
    }
    const data: PostCategory = {
      name: nameValue,
      description: descriptionValue || "",
    };

    const response = await EditCategoria(data,id);
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
      <input type="checkbox" id={`edit-${id}`} className="peer sr-only" />
      <label
        htmlFor={`edit-${id}`}
        className="w-12 h-12 hover:text-blue-600 flex items-center justify-center"
        aria-label="Modal Edit"
        onClick={handleOpen}
      >
        <Pen size={16} />
      </label>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Fade} transitionDuration={500}>
        <DialogTitle>Editar Categoría</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <input name="id" type="hidden" defaultValue={id} />
            <TextField
              name="name"
              label="Nombre de categoría"
              defaultValue={name}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="description"
              label="Descripción"
              defaultValue={description}
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
