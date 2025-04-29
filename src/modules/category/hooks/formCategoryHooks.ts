import { useState } from "react";
import { createCategory } from "../services/categoryServices";
import { PostCategory } from "../types/category";
import{responseAPI} from "../../../core/types/typeGlobal";

export const useCategoryForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);

  const submitCategoria = async (formData:PostCategory) : Promise<responseAPI> => {
    try {
      setLoading(true);
      const response =await createCategory(formData); 
      console.log("Respuesta del servidor:", response);
      if(response.details) {
        setMessage(response.details[0])
        console.log(response.details)
        setType("error")
      }
      else if(response.message){
        setMessage(response.message)
        console.log(response.message)
        setType("success")
      }else{
        setMessage("undifined")
        console.log("respues",response)
        setType("success")
      }
      return response.data ?? { message: "No response data", details: [] }; 
    }  finally {
      setLoading(false);
    }
  };
  const resetMessage = () => {
    setMessage("");
    setType(undefined);
  };
  return { submitCategoria, loading, message ,type,resetMessage};
};
