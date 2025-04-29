import { useState } from "react";
import { Customer, PostCustomer } from "../types/customer";
import { Trash, UserRound } from "lucide-react";
import { AlertDialog } from "../../../core/components/AlertDialog";
import { ModalCustomerEdit } from "./modalCustomer";
import PaginationLink from "../../../core/components/Pagination";
import SearchInput from "../../../core/components/SearchInput";
import { responseAPI, responseList } from "../../../core/types/typeGlobal";
import {Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, IconButton} from '@mui/material';
import {FormCustomer } from "../components/modalCustomer";

interface CustomerTableProps {
  customer: Customer[];
  submitCustomers: (formData: PostCustomer) => Promise<responseAPI>;
  onDelete: (id: string) => void;
  onEdit: (formData: PostCustomer, id: string) => Promise<responseAPI>;
  triggerAlert: () => void;
  fetchCustomers: () => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  setSearch: (search: string) => void;
  customerResponse: responseList;
}

export const CustomerTable = ({customer,submitCustomers, onDelete, onEdit, triggerAlert, fetchCustomers,setPage, setSize, setSearch, customerResponse
}: CustomerTableProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (selectedId) {
      await onDelete(selectedId);
      triggerAlert();
      fetchCustomers();
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const handleOpenDialog = (id: string) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  if (!Array.isArray(customer)) return <div>No hay clientes disponibles.</div>;

  return (
    <div className="min-w-full bg-white rounded shadow p-4">
      <div className="mb-4 w-full">
            <div className="flex justify-between items-center">
                <div className="w-1/2">
                <SearchInput options={customer.map(c => c.name)} onSearchChange={setSearch} />
                </div>
                <div>
                <FormCustomer submitCustomers={submitCustomers} triggerAlert={triggerAlert} fetchCustomers={fetchCustomers} />
                </div>
            </div>
        </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Tabla de clientes">
          <TableHead>
            <TableRow>
              <TableCell>Icono</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo de documento</TableCell>
              <TableCell>N° documento</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell>Última modificación</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.map((item) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell><UserRound size={20} /></TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.documentType}</TableCell>
                <TableCell>{item.documentNumber}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "-"}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center items-center gap-2">
                    <ModalCustomerEdit
                      id={item.id}
                      data={item}
                      triggerAlert={triggerAlert}
                      fetchCustomers={fetchCustomers}
                      EditCategoria={onEdit}
                    />
                    <IconButton onClick={() => handleOpenDialog(item.id)}>
                      <Trash size={16} className="text-red-500" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-center mt-4 mb-4">
        <PaginationLink
          page={customerResponse?.number + 1}
          size={customerResponse?.size}
          count={customerResponse?.totalPages}
          onPageChange={setPage}
          onSizeChange={setSize}
        />
      </div>

      <AlertDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="¿Eliminar cliente?"
        description="¿Estás seguro que deseas eliminar a este cliente? Esta acción no se puede deshacer."
      />
    </div>
  );
};
