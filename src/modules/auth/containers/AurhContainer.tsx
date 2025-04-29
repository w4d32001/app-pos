import { LoginForm } from "../components/FormAuth";
import { authHooks } from "../hooks/authHooks";
import { useState } from "react";
import { AlertMessage } from "../../../core/components/AlertMessage";

const LoginContainer = () => {
  const { handleLogin, loading, type, message } = authHooks();
  const [alert, setAlert] = useState(false); 

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#c3e2ee]">
      {alert && (
        <AlertMessage
          open={alert}
          onClose={() => setAlert(false)} 
          title={`¡Mensaje!`}
          message={message} 
          severity={type} 
        />
      )}

      <div className="max-w-lg mx-auto">
        <div className="rounded-2xl py-10 px-10 bg-white">
          <h2 className="flex justify-center font-light mb-4 text-3xl">Iniciar sesión</h2>
          <LoginForm onSubmit={handleLogin} loading={loading}  triggerAlert={() => setAlert(true)} />
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
