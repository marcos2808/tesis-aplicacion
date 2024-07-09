import React, { useState } from 'react';
import './AddButton.css';

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
    <div className="add-button-container">
      <button className="add-button" onClick={addInput}>
        <img src="/img/AddButton.svg" alt="Add" />
      </button>
      {inputs.map((input, index) => (
        <div key={index} className="input-container">
          <label>Title {index + 1}</label>
          <input
            type="text"
            value={input}
            onChange={(event) => handleInputChange(index, event)}
            className="dynamic-input"
          />
        </div>
      ))}
    </div>
  );
};

export default AddButton;
