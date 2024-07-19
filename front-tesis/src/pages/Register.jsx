import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PrincipalButton from "../components/PrincipalButton";
import registerImage from '../../img/Register.svg'; 

function Register() {
  const [fundoName, setFundoName] = useState("");
  const [owner, setOwner] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    console.log(`Nombre del fundo: ${fundoName}, Propietario: ${owner}, Contraseña: ${password}, Confirmar Contraseña: ${confirmPassword}`);
    setFundoName("");
    setOwner("");
    setPassword("");
    setConfirmPassword("");
    navigate('/Login');
  };

  const handleLoginNavigation = () => {
    navigate('/Login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F250E] p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-md">
        <img src={registerImage} alt="Register" className="mb-5 max-w-xs" />
        <h3 className="text-white text-4xl font-bold mb-2">Registro</h3>
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
          <label className="block text-white text-lg mb-2">Propietario</label>
          <input
            type="text"
            placeholder="ej: jubert perez"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="w-full p-2 text-lg border rounded"
          />
        </div>
        <div className="w-full mb-4">
          <label className="block text-white text-lg mb-2">Contraseña</label>
          <input
            type="password"
            placeholder="ej: pedrito123.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 text-lg border rounded"
          />
        </div>
        <div className="w-full mb-4">
          <label className="block text-white text-lg mb-2">Confirmar contraseña</label>
          <input
            type="password"
            placeholder="ej: pedrito123.."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 text-lg border rounded"
          />
        </div>
        <PrincipalButton text="Registrarse" onClick={handleRegister} />
        <p className="text-white text-lg mt-5">¿Ya tienes cuenta? <span onClick={handleLoginNavigation} className="font-bold cursor-pointer">Inicia sesión</span></p>
      </div>
    </div>
  );
};

export default Register;
