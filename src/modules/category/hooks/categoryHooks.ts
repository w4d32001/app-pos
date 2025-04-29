import { useState } from "react";
import { Category,ResponseCategoryList } from "../types/category";
import { getCategory } from "../services/categoryServices";
import { deleteCategory } from "../services/categoryServices";

export const useCategory = (page:number, size:number,search:string) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesResponse, setCategoriesResponse] = useState<ResponseCategoryList>({totalElements: 2,totalPages: 2,size: 10,number: 0,});   
     const fetchCustomers = async () => {
        try {
          const data = await getCategory(page,size,search);
          console.log("response",data.response)
          console.log("categories",data.categories)
          setCategoriesResponse(data.response)
          setCategories(data.categories);
        } catch (error) {
          console.error("Error al obtener categorias:", error);
        }};
    return { categories, fetchCustomers ,categoriesResponse};
};

export const CategoryDelete = () => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [messageDelete, setMessageDelete] = useState("");
  const [typeDelete, setTypeDelete] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);
   
    const Deletecategory = async (id:string) => {
        try {
          const response = await deleteCategory(id);
          console.log("Respuesta del servidor:", response);
          if(response.details) {
            setMessageDelete(response.details)
            console.log(response.details)
            setTypeDelete("error")
          }
          else if(response.message){
            setMessageDelete(response.message)
            console.log(response.message)
            setTypeDelete("success")
          }else{
            setMessageDelete("undifined")
            console.log("respues",response)
            setTypeDelete("success")
          }
          return response.data;
        }  finally {
          setLoadingDelete(false);
        }
    };
    const resetMessageDelete = () => {
      setMessageDelete("");
      setTypeDelete(undefined);
    };
    return { Deletecategory, loadingDelete, messageDelete ,typeDelete,resetMessageDelete};
  };

  