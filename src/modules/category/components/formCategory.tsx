import { useState } from "react";
import { PostCategory } from "../types/category";
import{responseAPI} from "../../../core/types/typeGlobal";

interface FormCategoryProps {
    submitCategoria: (formData: PostCategory) => Promise<responseAPI>;
    onClose: () => void;
    loading: boolean;
    triggerAlert: () => void; 
    fetchCustomers: () => void;
  }

export const FormCategory = ({ submitCategoria, onClose, loading,triggerAlert,fetchCustomers}: FormCategoryProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const response = await submitCategoria(formData);
      if (response?.details) {
        triggerAlert();
      } else {
        onClose();
        triggerAlert();
        fetchCustomers();
      }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-10">
      <div>
        <label className="block mb-1 font-semibold text-gray-500">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded border-gray-400"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold text-gray-500">Descripción</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded border-gray-400"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-800 transition-all"
      >
        {loading ? "Guardando..." : "Crear Categoría"}
      </button>
    </form>
  );
};

