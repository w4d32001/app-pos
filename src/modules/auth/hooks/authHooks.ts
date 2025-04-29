import { useState } from "react";
import { login } from "../services/authService";
import { LoginRequest } from "../types/auth";
import { useNavigate } from "react-router-dom";

export const authHooks = () => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);
  const navigate = useNavigate(); 
  const[message,setMessage]=useState("");

  const handleLogin = async (userName: string, password: string) => {
    try {
      setLoading(true);
      const respuesta = await login({ userName, password } as LoginRequest);
      if (respuesta?.data?.token) {
          setType("success");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);        
          setMessage(respuesta.message)
          console.log("con token",respuesta)
          return respuesta
      }
      console.log("sin token",respuesta)
      setType("error");
      setMessage(respuesta.details?.[0] || respuesta.message);
      return respuesta
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, type,message };
};
