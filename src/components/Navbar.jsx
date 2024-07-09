import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate en lugar de useHistory
import './Navbar.css'; // Asegúrate de crear este archivo para los estilos
// import logo from '../assets/logo.png'; // Asegúrate de tener el logo en la ubicación correcta

const Navbar = () => {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/Login');
  };

  return (
    <nav className="navbar">
      {/* <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div> */}
      <div className="navbar-menu">
        <button className="dropdown-button">Menu</button>
        <div className="dropdown-content">
          <a href="#" onClick={() => handleMenuClick('/Carne')}>Produccion de Carne</a>
          <a href="#" onClick={() => handleMenuClick('/Leche')}>Produccion de Leche</a>
        </div>
      </div>
      <div className="navbar-logout">
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;

