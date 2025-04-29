import {Customer,PostCustomer } from "../types/customer";
import{responseAPI,responseList} from "../../../core/types/typeGlobal";
import axios from "axios";

const getToken = () => {
    return localStorage.getItem("token");  
  };

export const getCustomer = async (page:number, size:number,search:String):  Promise<{ customers: Customer[]; response: responseList }> => {
  const token = getToken();
  const searchParam = search ? `&search=${search}` : "";
  const url = `http://localhost:8080/api/customers?size=${size}&page=${page}${searchParam}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener clientes"); }
    
  const data = await response.json();
  console.log(data);
  return {
    customers: data.data.content,
    response: data.data,          
  };
};

export const createCustomer = async (categoryData: PostCustomer) : Promise<responseAPI> => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error("Token no encontrado"); }

        const config = {
            headers: {
            Authorization: `Bearer ${token}`, 
            },
        };
        const response = await axios.post("http://localhost:8080/api/customers", categoryData, config);
        console.log("respuesta de la API 1 ",response)
        return {
          status: response.data.status,
          message: response.data.message,
          data: response.data, 
        };

    } catch (error:any) {
            console.error("Error en la creación de la categoría:", error.response);
            return {
              message: error.response?.data?.message || "Error desconocido",
              details: error.response?.data?.details || [],
            }
    }
  };

  export const editCustomer = async (categoryData: PostCustomer,id:string) : Promise<responseAPI> => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error("Token no encontrado"); }

        const config = {
            headers: {
            Authorization: `Bearer ${token}`, 
            },
        };
        const response = await axios.put(`http://localhost:8080/api/customers/${id}`, categoryData, config);
        console.log("respuesta de la API 1 ",response)
        return {
          status: response.data.status,
          message: response.data.message,
          data: response.data, // Asumimos que `response.data` contiene la información de la categoría creada
        };

    } catch (error:any) {
            console.error("Error en la creación de la categoría:", error.response);
            return {
              message: error.response?.data?.message || "Error desconocido",
              details: error.response?.data?.details || [],
            }
    }
  };

  export const deleteCustomer = async (id: string) => {
    try {
      const token = getToken();
      if (!token) {
          throw new Error("Token no encontrado"); }

      const config = {
          headers: {
          Authorization: `Bearer ${token}`, 
          },
      };
      const response = await axios.delete(`http://localhost:8080/api/customers/${id}`,config);
      return response.data;
    } catch (error:any) {
      console.error("Error al eliminar categoría:", error);
      throw error.response.data;
    }
  };
