import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Cierra el menú al seleccionar una opción
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/Login');   
  };

  return (
    <nav className="bg-[#0F250E] fixed top-0 left-0 w-full h-[151px] flex items-center justify-between px-4 z-50">
      
      <div className="relative flex-1 flex justify-center">
        <button 
          className="bg-[#35672E] text-white w-[220px] h-[151px] flex items-center justify-center rounded-md hover:bg-[#2D5328]" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Menu
        </button>
        {isMenuOpen && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#35672E] w-[220px] min-w-[160px] rounded-md shadow-lg">
            <a 
              href="#" 
              className="block px-4 py-2 text-white hover:bg-[#2D5328]" 
              onClick={() => handleMenuClick('/Carne')}
            >
              Producción de Carne
            </a>
            <a 
              href="#" 
              className="block px-4 py-2 text-white hover:bg-[#2D5328]" 
              onClick={() => handleMenuClick('/Leche')}
            >
              Producción de Leche
            </a>
          </div>
        )}
      </div>
      
      <div className="mr-4">
        <button 
          className="bg-[#35672E] text-white w-[220px] h-[151px] flex items-center justify-center rounded-md hover:bg-[#2D5328]" 
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
