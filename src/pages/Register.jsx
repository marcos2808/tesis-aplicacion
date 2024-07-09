import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PrincipalButton from "../components/PrincipalButton";
import './Register.css';
import registerImage from '../../img/Register.svg'; // Asegúrate de tener el SVG en la ubicación correcta

function Register () {
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
    <div className="register-container">
      <img src={registerImage} alt="Register" className="register-image" />
      <h3 className="register-title">Registro</h3>
      <div className="register-input-group">
        <label className="register-input-label">Nombre del fundo</label>
        <input
          type="text"
          placeholder="ej: la esperanza"
          value={fundoName}
          onChange={(e) => setFundoName(e.target.value)}
          className="register-input"
        />
      </div>
      <div className="register-input-group">
        <label className="register-input-label">Propietario</label>
        <input
          type="text"
          placeholder="ej: jubert perez"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="register-input"
        />
      </div>
      <div className="register-input-group">
        <label className="register-input-label">Contraseña</label>
        <input
          type="password"
          placeholder="ej: pedrito123.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
      </div>
      <div className="register-input-group">
        <label className="register-input-label">Confirmar contraseña</label>
        <input
          type="password"
          placeholder="ej: pedrito123.."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
        />
      </div>
      <PrincipalButton text="Registrarse" onClick={handleRegister} />
      <p className="login-link">Ya tienes cuenta? <span className="bold" onClick={handleLoginNavigation}>Inicia sesion</span></p>
    </div>
  );
};

export default Register;
