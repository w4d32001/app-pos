import { useEffect, useState } from "react";
import { CategoryTable } from "../components/tableCategory";
import { useCategory, CategoryDelete } from "../hooks/categoryHooks";
import { useCategoryEdit } from "../hooks/modalCategory";
import { useCategoryForm } from "../hooks/formCategoryHooks";
import { FormCategory } from "../components/formCategory";
import { Plus } from "lucide-react";
import { AlertMessage } from "../../../core/components/AlertMessage";

const CategoryContainer = () => {
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState(false);
  const { submitCategoria, loading, message, type ,resetMessage} = useCategoryForm();
  const { Deletecategory, messageDelete, typeDelete ,resetMessageDelete} = CategoryDelete();
  const { editCategoria, messageEdit, typeEdit ,resetMessageEdit} = useCategoryEdit();
  const currentMessage = messageDelete || message || messageEdit;
  const currentType = typeDelete || type ||typeEdit;
  const  [page, setPage] = useState(0);
  const  [size, setSize] = useState(10);
  const  [search, setsearch] = useState("");

  const { categories, fetchCustomers ,categoriesResponse} = useCategory(page,size,search);

  const resetAlert = () => {
    resetMessage();
    resetMessageDelete();
    resetMessageEdit();
    setAlert(false);
  };
  const triggerAlert = () => {
    setAlert(true);
    setTimeout(() => {
      resetAlert(); 
    }, 3000); 
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setAlert(false)
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, size,search]);

  return (
    <div className="p-4">
      {alert && (
        <AlertMessage
          open={alert}
          onClose={() => setAlert(false) }
          title="¡Categoría!"
          message={currentMessage}
          severity={currentType}
        />
      )}
      <div className="flex justify-between items-center mb-4 border-t-4 border-green-500">
          <button
            onClick={toggleForm}
            className="flex w-full items-center gap-2 bg-white border-r-amber-800 hover:bg-gray-200 text-black text-2xl px-4 py-2 rounded transition-all duration-300">
            <Plus size={20} />
            {showForm ? "Cerrar formulario" : "Crear categoría"}
          </button>
      </div>
      <div className={`${showForm ? "opacity-100 translate-y-[-20px] bg-white" : "opacity-0 translate-y-[-30px]"} transition-all duration-500 ease-in-out`}>
            {showForm && (
              <FormCategory submitCategoria={submitCategoria} loading={loading} onClose={toggleForm} triggerAlert={triggerAlert} fetchCustomers={fetchCustomers}/>
            )}
      </div>
      <CategoryTable 
      category={categories} onDelete={Deletecategory} onEdit={editCategoria} triggerAlert={triggerAlert} fetchCustomers={fetchCustomers} setPage={setPage} setSize={setSize} setSearch={setsearch} categoryResponse={categoriesResponse} />
    </div>
  );
};

export default CategoryContainer;
