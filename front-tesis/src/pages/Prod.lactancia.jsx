import React, { useState } from "react";
import AddButton from "../components/AddButton";
import PrincipalButton from "../components/PrincipalButton";
import { useParams, useNavigate } from "react-router-dom";

function Lactancia() {
  const [inputs, setInputs] = useState([]);
  const [produccionA305Dias, setProduccionA305Dias] = useState('');
  const [produccionTotalA305Dias, setProduccionTotalA305Dias] = useState('');
  const [lactancia1, setLactancia1] = useState('');
  const [duracionLactancia1, setDuracionLactancia1] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddInputs = (newInputs) => {
    setInputs(newInputs);
  };

  const handleSubmit = async () => {
    const data = {
      id,
      produccionA305Dias,
      produccionTotalA305Dias,
      lactancia1,
      duracionLactancia1,
      lactancia2: undefined,
      duracionLactancia2: undefined,
      lactancia3: undefined,
      duracionLactancia3: undefined,
      lactancia4: undefined,
      duracionLactancia4: undefined,
      lactancia5: undefined,
      duracionLactancia5: undefined,
      lactancia1A305: undefined,
      lactancia2A305: undefined,
      lactancia3A305: undefined,
      lactancia4A305: undefined,
      lactancia5A305: undefined // otros datos de inputs agregados dinámicamente
    };
    if(inputs[0]){
      data.lactancia2 = inputs[0]
    };

    if(inputs[1]){
      data.duracionLactancia2 = inputs[1]
    };

    if(inputs[2]){
      data.lactancia3 = inputs[2]
    };

    if(inputs[3]){
      data.duracionLactancia3 = inputs[3]
    };

    if(inputs[4]){
      data.lactancia4 = inputs[4]
    };

    if(inputs[5]){
      data.duracionLactancia4 = inputs[5]
    };

    if(inputs[6]){
      data.lactancia5 = inputs[6]
    };

    if(inputs[7]){
      data.duracionLactancia5 = inputs[7]
    };

    if(inputs[8]){
      data.lactancia1A305 = inputs[8]
    };

    if(inputs[9]){
      data.lactancia2A305 = inputs[9]
    };

    if(inputs[10]){
      data.lactancia3A305 = inputs[10]
    };

    if(inputs[11]){
      data.lactancia4A305 = inputs[11]
    };

    if(inputs[12]){
      data.lactancia5A305 = inputs[12]
    };

    console.log(data);

    try {
      const response = await fetch("https://tesis-aplicacion.onrender.com/leche/updateLeche", {
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
              value={produccionA305Dias}
              onChange={(e) => setProduccionA305Dias(e.target.value)} // Captura el valor del input
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2">Producción total del animal al año en días</label>
            <input
              type="text"
              placeholder="ej: 365 días"
              className="p-2 rounded border border-gray-300 bg-white text-black"
              value={produccionTotalA305Dias}
              onChange={(e) => setProduccionTotalA305Dias(e.target.value)} // Captura el valor del input
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
              value={lactancia1}
              onChange={(e) => setLactancia1(e.target.value)} // Captura el valor del input
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2">Duración de la lactancia</label>
            <input
              type="text"
              placeholder="ej: 60 días"
              className="p-2 rounded border border-gray-300 bg-white text-black"
              value={duracionLactancia1}
              onChange={(e) => setDuracionLactancia1(e.target.value)} // Captura el valor del input
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
