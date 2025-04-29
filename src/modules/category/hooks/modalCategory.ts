import { useState } from "react";
import { editCategory } from "../services/categoryServices";
import { PostCategory } from "../types/category";
import{responseAPI} from "../../../core/types/typeGlobal";

export const useCategoryEdit= () => {
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [messageEdit, setMessageEdit] = useState("");
  const [typeEdit, setTypeEdit] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);

  const editCategoria = async (formData:PostCategory, id:string) : Promise<responseAPI> => {
    try {
      setLoadingEdit(true);
      const response =await editCategory(formData,id); 
      console.log("Respuesta del servidor:", response);
      if(response.details) {
        setMessageEdit(response.details[0])
        console.log(response.details)
        setTypeEdit("error")
      }
      else if(response.message){
        setMessageEdit(response.message)
        console.log(response.message)
        setTypeEdit("success")
      }else{
        setMessageEdit("undifined")
        console.log("respues",response)
        setTypeEdit("success")
      }
      return response.data ?? { message: "No response data", details: [] }; 
    }  finally {
        setLoadingEdit(false);
    }
  };
  const resetMessageEdit = () => {
    setMessageEdit("");
    setTypeEdit(undefined);
  };
  return { editCategoria, loadingEdit, messageEdit ,typeEdit,resetMessageEdit};
};
