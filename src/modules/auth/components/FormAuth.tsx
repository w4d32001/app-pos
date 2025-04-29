import { FormEvent, useState } from "react";

interface Props {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  triggerAlert: () => void; 

}

export const LoginForm = ({ onSubmit, loading,triggerAlert }: Props) => {
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado con:", userName, password);
    const response = await onSubmit(userName, password);
    console.log("Respuesta de la API:", response); 
    triggerAlert(); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 items-center" >
      <input
        type="userName"
        placeholder="userName"
        value={userName}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full border-gray-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full border-gray-400"
      />
      <button type="submit" disabled={loading} className="bg-[#15a0b3] text-white py-2 w-full px-4">
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};
