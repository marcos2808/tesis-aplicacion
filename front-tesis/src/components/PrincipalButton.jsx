import React from 'react';

function PrincipalButton({ text, onClick }) {
  return (
    <button
      className="w-[241px] h-[62px] bg-[#408237] text-white rounded-full flex items-center justify-center text-lg hover:bg-[#4E9744]"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default PrincipalButton;
