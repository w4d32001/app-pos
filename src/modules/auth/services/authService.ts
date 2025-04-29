import { LoginRequest, LoginResponse } from "../types/auth";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error recibido de la API:", data);
      return data; }

    localStorage.setItem("token", data.data.token);
    return data;
    
  } catch (error: any) {
    console.error("Error de red o error general:", error);
    throw error; 
  }
};
