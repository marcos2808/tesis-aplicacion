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

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fundo: fundoName, propietario: owner, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Register successful: ${data.message}`);
        setFundoName("");
        setOwner("");
        setPassword("");
        setConfirmPassword("");
        navigate('/Login');
      } else {
        console.error(`Register failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
