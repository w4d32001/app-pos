import { useState } from "react";
import { Category } from "../types/category";
import { Trash, ChartColumnStacked } from "lucide-react";
import { AlertDialog } from "../../../core/components/AlertDialog";
import{ModalCategoryEdit}from "./modalCategory";
import { PostCategory,ResponseCategoryList ,responseCategory} from "../types/category";
import PaginationLink from "../../../core/components/Pagination";
import SearchInput from "../../../core/components/SearchInput"; 

interface CustomerTableProps {
  category: Category[];
  onDelete: (id: string) => void;
  onEdit: (formData: PostCategory,id:string) => Promise<responseCategory>;
  triggerAlert: () => void;
  fetchCustomers: () => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  setSearch:(seacrh:string)=> void;
  categoryResponse: ResponseCategoryList ;
}

export const CategoryTable = ({ category, onDelete,onEdit, triggerAlert, fetchCustomers,setPage ,setSize,setSearch,categoryResponse}: CustomerTableProps) => {
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

  if (!Array.isArray(category)) {
    return <div>No hay categorías disponibles.</div>;
  }

  return (
    <div className="min-w-full bg-white rounded shadow p-4">
      <div className="mb-4  w-full">
        <div className="w-1/2"> {/* Aquí se ajusta el ancho */}
          <SearchInput
            options={category.map((c) => c.name)}
            onSearchChange={setSearch}
          />
        </div>
      </div>
      {category.map((item) => (
        <div key={item.id} className="flex items-center border-b border-gray-400 py-3 px-4 transition-all duration-500 hover:bg-gray-200">
          <div className="mr-4">
            <ChartColumnStacked size={20} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium mb-2">{item.name}</div>
            <div className="text-xs text-gray-600">ID : {item.id}</div>
          </div>
          <div className="flex-2">{item.description}</div>
          <div className="text-xs text-gray-500">
            <div>Última modificación</div>
            {item.updatedAt}
          </div>
          <div className="flex ml-4">
          <ModalCategoryEdit id={item.id} name={item.name} description={item.description} triggerAlert={triggerAlert} fetchCustomers={fetchCustomers} EditCategoria={onEdit}/>
            <button className="w-12 h-12 hover:text-red-600 flex items-center justify-center" onClick={() => handleOpenDialog(item.id)}>
              <Trash size={16} />
            </button>
          </div>
         
        </div>
      ))}
        <div className="flex justify-center mt-4 mb-4">
          <PaginationLink page={categoryResponse?.number+1} size={categoryResponse?.size} count={categoryResponse?.totalPages} onPageChange={setPage} onSizeChange={setSize} />     
        </div>
      <AlertDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="¿Eliminar categoría?"
        description="¿Estás seguro que deseas eliminar esta categoría? Esta acción no se puede deshacer."
      />
    </div>
  );
};
