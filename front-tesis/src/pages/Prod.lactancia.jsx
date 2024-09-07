import React, { useState } from "react";
import AddButton from "../components/AddButton";
import PrincipalButton from "../components/PrincipalButton";

function Lactancia() {
  const [inputs, setInputs] = useState([]);

  const handleAddInputs = (newInputs) => {
    setInputs(newInputs);
  };

  const handleSubmit = async () => {
    const data = {
      produccionA305Dias: inputs[0],
      produccionTotalA305Dias: inputs[1],
      lactancia1: inputs[2],
      duracionLactancia1: inputs[3],
    };

    try {
      const response = await fetch("http://localhost:5000/api/leche/updateLeche", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Datos de lactancia actualizados exitosamente");
      } else {
        alert("Hubo un error al actualizar los datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-[#0F250E] text-white">
      <h1 className="text-center text-xl mb-6">
        Si usted posee los litros de cada una de las lactancias de su animal, introdúzcalas aquí
      </h1>
      <div className="w-full max-w-4xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-lg mb-2">Producción del animal al año</label>
            <input
              type="text"
              placeholder="ej: 305 litros"
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2">Producción total del animal al año en días</label>
            <input
              type="text"
              placeholder="ej: 365 días"
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col">
            <label className="text-lg mb-2">Primera lactancia del animal</label>
            <input
              type="text"
              placeholder="ej: 150 litros"
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2">Duración de la lactancia</label>
            <input
              type="text"
              placeholder="ej: 60 días"
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex items-center ml-4 col-span-2 sm:col-span-1">
            <AddButton onAdd={handleAddInputs} maxInputs={13} />
            <p className="text-center ml-4">
              Si su animal tiene más de una lactancia, haga click en el +.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <PrincipalButton text="Confirmar datos" onClick={handleSubmit} />
          <PrincipalButton text="Volver" onClick={() => navigate('/Leche')} />
        </div>
      </div>
    </div>
  );
}

export default Lactancia;
