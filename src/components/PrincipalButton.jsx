import React from 'react';
import './PrincipalButton.css'; 

 function PrincipalButton ({ text, onClick }) {
  return (
    <button className="principal-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default PrincipalButton;
