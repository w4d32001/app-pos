import { useState } from "react";
import { Customer } from "../types/customer";
import { getCustomer,deleteCustomer } from "../services/customerServices";
import{responseList} from "../../../core/types/typeGlobal";

export const useCustomer = (page:number, size:number,search:string) => {
    const [customers, setCategories] = useState<Customer[]>([]);
    const [customersResponse, setCategoriesResponse] = useState<responseList>({totalElements: 2,totalPages: 2,size: 10,number: 0,});   
     const fetchCustomers = async () => {
        try {
          const data = await getCustomer(page,size,search);
          console.log("response",data.response)
          console.log("customers",data.customers)
          setCategoriesResponse(data.response)
          setCategories(data.customers);
        } catch (error) {
          console.error("Error al obtener categorias:", error);
        }};
    return { customers, fetchCustomers ,customersResponse};
};

export const CustomerDelete = () => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [messageDelete, setMessageDelete] = useState("");
  const [typeDelete, setTypeDelete] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);
   
    const Deletecustomer = async (id:string) => {
        try {
          const response = await deleteCustomer(id);
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
    return { Deletecustomer, loadingDelete, messageDelete ,typeDelete,resetMessageDelete};
  };

  