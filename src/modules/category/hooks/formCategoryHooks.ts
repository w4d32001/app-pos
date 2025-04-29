import { useState } from "react";
import { createCategory } from "../services/categoryServices";
import { PostCategory ,responseCategory} from "../types/category";

export const useCategoriaForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);

  const submitCategoria = async (formData:PostCategory) : Promise<responseCategory> => {
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
