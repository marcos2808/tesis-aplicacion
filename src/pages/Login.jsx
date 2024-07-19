import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PrincipalButton from "../components/PrincipalButton";
import loginImage from '../../img/Login.svg'; 

function Login(){
  const [fundoName, setFundoName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(`Nombre del fundo: ${fundoName}, Contraseña: ${password}`);
    setFundoName("");
    setPassword("");
    navigate('/Home');
  };

  const handleRegisterNavigation = () => {
    navigate('/Register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F250E] p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-md">
        <img src={loginImage} alt="Login" className="mb-5 max-w-xs" />
        <h3 className="text-white text-4xl font-bold mb-2">Inicio de sesión</h3>
        <div className="w-full mb-4">
          <label className="block text-white text-lg mb-2">Nombre del fundo</label>
          <input
            type="text"
            placeholder="ej: la esperanza"
            value={fundoName}
            onChange={(e) => setFundoName(e.target.value)}
            className="w-full p-2 text-lg border rounded"
          />
        </div>
        <div className="w-full mb-4">
          <label className="block text-white text-lg mb-2">Contraseña</label>
          <input
            type="password"
            placeholder="ej: pepito123.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 text-lg border rounded"
          />
        </div>
        <p className="text-white text-lg font-bold mb-5 cursor-pointer text-center">¿Olvidó su contraseña?</p>
        <PrincipalButton text="Iniciar sesión" onClick={handleLogin} />
        <p className="text-white text-lg mt-5">¿No tiene cuenta? <span onClick={handleRegisterNavigation} className="font-bold cursor-pointer">Registrarse</span></p>
      </div>
    </div>
  );
};

export default Login;
