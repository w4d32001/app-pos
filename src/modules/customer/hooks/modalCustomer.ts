import { useState } from "react";
import { editCustomer,createCustomer } from "../services/customerServices";
import { PostCustomer } from "../types/customer";
import{responseAPI} from "../../../core/types/typeGlobal";

export const useCustomerEdit= () => {
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [messageEdit, setMessageEdit] = useState("");
  const [typeEdit, setTypeEdit] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);

  const editCustomers = async (formData:PostCustomer, id:string) : Promise<responseAPI> => {
    try {
      setLoadingEdit(true);
      const response =await editCustomer(formData,id); 
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
  return { editCustomers, loadingEdit, messageEdit ,typeEdit,resetMessageEdit};
};


export const useCustomerCreate = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);
  
    const submitCustomers = async (formData:PostCustomer) : Promise<responseAPI> => {
      try {
        setLoading(true);
        const response =await createCustomer(formData); 
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
    return { submitCustomers, loading, message ,type,resetMessage};
  };
  