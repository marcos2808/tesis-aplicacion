import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PrincipalButton from "../components/PrincipalButton";
import './Login.css';
import loginImage from '../../img/Login.svg'; // Asegúrate de tener el SVG en la ubicación correcta

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
    <div className="login-container">
      <img src={loginImage} alt="Login" className="login-image" />
      <h3 className="login-title">Inicio de sesion</h3>
      <p className="login-subtitle">Rellene estos campos para iniciar su sesion en la aplicacion</p>
      <div className="login-input-group">
        <label className="login-input-label">Nombre del fundo</label>
        <input
          type="text"
          placeholder="ej: la esperanza"
          value={fundoName}
          onChange={(e) => setFundoName(e.target.value)}
          className="login-input"
        />
      </div>
      <div className="login-input-group">
        <label className="login-input-label">Contraseña</label>
        <input
          type="password"
          placeholder="ej: pepito123.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
      </div>
      <p className="forgot-password">Olvido su contraseña?</p>
      <PrincipalButton text="Iniciar sesion" onClick={handleLogin} />
      <p className="register-link">No tiene cuenta? <span onClick={handleRegisterNavigation}>Registrarse</span></p>
    </div>
  );
};

export default Login;
