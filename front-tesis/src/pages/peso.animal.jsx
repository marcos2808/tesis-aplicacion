import React, { useState } from "react";
import PrincipalButton from "../components/PrincipalButton";
import { useNavigate, useParams } from 'react-router-dom';

function Peso({ carneId }) {
  const navigate = useNavigate();
  
  // Estado para los inputs del formulario
  const [pesoAnio, setPesoAnio] = useState("");
  const [fechaAnio, setFechaAnio] = useState("");
  const [peso18Meses, setPeso18Meses] = useState("");
  const [fecha18Meses, setFecha18Meses] = useState("");
  const [peso24Meses, setPeso24Meses] = useState("");
  const [fecha24Meses, setFecha24Meses] = useState("");
  const {id} = useParams()


  const handleConfirmData = async () => {

    // Validar que se hayan llenado los campos necesarios
    if (!pesoAnio || !fechaAnio || !peso18Meses || !fecha18Meses || !peso24Meses || !fecha24Meses) {
      alert("Por favor, complete todos los campos antes de confirmar.");
      return;
    }
    console.log(pesoAnio, fechaAnio, peso18Meses, fecha18Meses, peso24Meses, fecha24Meses);
    try {
      // Realizar la solicitud al método updateCarne
      const response = await fetch('http://localhost:5000/api/carne/updateCarne', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          id,  // ID del registro de carne
          pesoAnio,
          fechaAnio,
          peso18Meses,
          fecha18Meses,
          peso24Meses,
          fecha24Meses,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Datos actualizados exitosamente");
        navigate('/Carne'); // Redirigir a la página principal o a otra vista
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-[#0F250E] text-white min-h-screen">
      <h1 className="text-center text-xl mt-12 mb-12">
        Si ya posee usted el peso del animal de 1 a 2 años introduzca esos datos acá
      </h1>

      <div className="flex flex-col w-full max-w-4xl items-center">
        {/* Peso y fecha al año */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8 w-full">
          <div className="flex flex-col w-full sm:w-1/2 max-w-xs">
            <label className="text-lg mb-2">Peso del animal al año</label>
            <input
              type="text"
              placeholder="ej: 300 kg"
              value={pesoAnio}
              onChange={(e) => setPesoAnio(e.target.value)}
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 max-w-xs">
            <label className="text-lg mb-2">Fecha del peso al año</label>
            <input
              type="date"
              value={fechaAnio}
              onChange={(e) => setFechaAnio(e.target.value)}
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
        </div>

        {/* Peso y fecha a los 18 meses */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8 w-full">
          <div className="flex flex-col w-full sm:w-1/2 max-w-xs">
            <label className="text-lg mb-2">Peso del animal a los 18 meses</label>
            <input
              type="text"
              placeholder="ej: 400 kg"
              value={peso18Meses}
              onChange={(e) => setPeso18Meses(e.target.value)}
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 max-w-xs">
            <label className="text-lg mb-2">Fecha del peso a los 18 meses</label>
            <input
              type="date"
              value={fecha18Meses}
              onChange={(e) => setFecha18Meses(e.target.value)}
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
        </div>

        {/* Peso y fecha a los 24 meses */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8 w-full">
          <div className="flex flex-col w-full sm:w-1/2 max-w-xs">
            <label className="text-lg mb-2">Peso del animal a los 24 meses</label>
            <input
              type="text"
              placeholder="ej: 500 kg"
              value={peso24Meses}
              onChange={(e) => setPeso24Meses(e.target.value)}
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 max-w-xs">
            <label className="text-lg mb-2">Fecha del peso a los 24 meses</label>
            <input
              type="date"
              value={fecha24Meses}
              onChange={(e) => setFecha24Meses(e.target.value)}
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
        </div>

        {/* Botones de Confirmar y Volver */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-6">
          <PrincipalButton text="Confirmar datos" onClick={handleConfirmData} />
          <PrincipalButton text="Volver" onClick={() => navigate('/Carne')} />
        </div>
      </div>
    </div>
  );
}

export default Peso;
