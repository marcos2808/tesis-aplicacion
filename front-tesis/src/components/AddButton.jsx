import React, { useState } from 'react';

const AddButton = ({ onAdd, maxInputs = 2 }) => {
  const [inputs, setInputs] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const addInput = () => {
    if (inputs.length < maxInputs) {
      const newInputs = [...inputs, ''];
      setInputs(newInputs);
      onAdd(newInputs); // Notificar a la vista principal que se han agregado inputs
    }

    if (inputs.length + 1 === maxInputs) {
      setIsButtonDisabled(true); // Deshabilitar el botón después de agregar el número máximo de inputs
    }
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
    onAdd(newInputs); // Actualizar en la vista principal cada vez que cambie un input
  };

  const removeInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
    onAdd(newInputs); // Notificar a la vista principal cuando se elimine un input
    setIsButtonDisabled(false); // Habilitar el botón si se elimina un input
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-2 mb-4">
        <button
          className={`w-[37.5px] h-[37.5px] bg-[#408237] rounded-full flex items-center justify-center hover:bg-[#2D5328] ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={addInput}
          disabled={isButtonDisabled}
        >
          <img src="/img/AddButton.svg" alt="Add" className="w-1/2 h-1/2" />
        </button>
        <div className="flex flex-wrap gap-2">
          {inputs.map((input, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => handleInputChange(index, event)}
                className="w-[150px] h-[50px] border border-gray-300 rounded-md px-2 text-black"
              />
              <button
                className="w-[37.5px] h-[37.5px] bg-red-500 rounded-full flex items-center justify-center text-white"
                onClick={() => removeInput(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddButton;
