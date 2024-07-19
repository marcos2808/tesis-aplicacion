import React, { useState } from 'react';

const AddButton = () => {
  const [inputs, setInputs] = useState([]);

  const addInput = () => {
    setInputs([...inputs, '']);
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        className="w-[37.5px] h-[37.5px] bg-[#408237] rounded-full flex items-center justify-center mb-4 hover:bg-[#2D5328]"
        onClick={addInput}
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
              className="w-[150px] h-[50px] border border-gray-300 rounded-md px-2"
            />
            <button
              className="w-[37.5px] h-[37.5px] bg-red-500 rounded-full flex items-center justify-center text-white"
              onClick={() => setInputs(inputs.filter((_, i) => i !== index))}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddButton;
