import React from 'react';
import './PrincipalButton.css'; // Asegúrate de crear este archivo para los estilos

 const PrincipalButton = ({ text, onClick }) => {
  return (
    <button className="principal-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default PrincipalButton;
