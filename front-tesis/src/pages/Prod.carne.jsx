import React, { useState } from "react";
import AddButton from "../components/AddButton";
import PrincipalButton from "../components/PrincipalButton";
import { useNavigate } from 'react-router-dom';
import ModalCarne from "../components/ModalCarne";

function Carne() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);

  // Estado para los inputs de la primera fila
  const [animal, setAnimal] = useState("");
  const [padre, setPadre] = useState("");
  const [madre, setMadre] = useState("");
  const [raza, setRaza] = useState("");

  // Estado para los inputs de la segunda fila
  const [sexo, setSexo] = useState("");
  const [epoca, setEpoca] = useState("");
  const [pesoAlNacer, setPesoAlNacer] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [pesoDestete, setPesoDestete] = useState("");
  const [pesoDesteteInputs, setPesoDesteteInputs] = useState([]);

  const handleConfirmData = async () => {
    // Validar que todos los campos de la primera fila estén completos
    if (!animal || !padre || !madre || !raza) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }
  
    try {
      // Crear el animal
      const responseAnimal = await fetch('http://localhost:5000/api/animal/createAnimal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          animal,
          padre,
          madre,
          raza
        }),
      });
  
      const dataAnimal = await responseAnimal.json();
  
      if (responseAnimal.ok) {
        console.log("Animal creado:", dataAnimal);
  
        // Crear el registro de carne usando el ID del animal
        const responseCarne = await fetch('http://localhost:5000/api/carne/createCarne', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            animalId: dataAnimal._id, // Usar el ID del animal creado
            sexo,
            pesoNacer: pesoAlNacer,
            fechaNacimiento,
            pesoDestete: pesoDesteteInputs,
            temporada: epoca
          }),
        });
  
        const dataCarne = await responseCarne.json();
  
        if (responseCarne.ok) {
          console.log("Registro de carne creado:", dataCarne);
          setShowModal(true);
        } else {
          alert(`Error al crear el registro de carne: ${dataCarne.message}`);
        }
      } else {
        alert(`Error al crear el animal: ${dataAnimal.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al intentar crear el animal y/o el registro de carne. Por favor, intente de nuevo.');
    }
  };
  
  const handleAddDestete = () => {
    if (pesoDestete) {
      setPesoDesteteInputs([...pesoDesteteInputs, pesoDestete]);
      setPesoDestete("");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDisableAddButton = () => {
    setIsAddButtonDisabled(true);
  };

  const handleGenerateReport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/carne/reporteCarne', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Agrega el token para la autenticación
        },
      });

      if (response.ok) {
        // Crear un enlace para descargar el archivo Excel
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reporte_carne.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        const data = await response.json();
        alert(`Error al generar el reporte: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al intentar generar el reporte. Por favor, intente de nuevo.');
    }
  };

  const handleGoHome = () => {
    navigate('/'); // Cambia la ruta según sea necesario para la vista principal
  };

  return (
    <div className="min-h-screen bg-[#0F250E] flex flex-col items-center p-6 text-white">
      <h4 className="text-4xl font-bold text-center mb-6">Rellene aquí los datos para la producción de carne de su animal.</h4>
      <form className="w-full max-w-4xl">
        <div className="flex flex-col mb-6 gap-8">
          {/* Primera fila */}
          <div className="flex flex-wrap gap-8 mb-6">
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white"># del animal</label>
              <input
                type="text"
                placeholder="40 vaca roja"
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
                className="p-2 text-lg rounded border border-gray-300 text-black"
              />
            </div>
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white"># del padre</label>
              <input
                type="text"
                placeholder="sanson"
                value={padre}
                onChange={(e) => setPadre(e.target.value)}
                className="p-2 text-lg rounded border border-gray-300 text-black"
              />
            </div>
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white"># de la madre</label>
              <input
                type="text"
                placeholder="medio cacho 2"
                value={madre}
                onChange={(e) => setMadre(e.target.value)}
                className="p-2 text-lg rounded border border-gray-300 text-black"
              />
            </div>
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white">raza</label>
              <input
                type="text"
                placeholder="carora"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                className="p-2 text-lg rounded border border-gray-300 text-black"
              />
            </div>
          </div>
          
          {/* Segunda fila */}
          <div className="flex flex-wrap gap-8 mb-6 items-end">
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white">sexo</label>
              <input
                type="text"
                placeholder="hembra"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                className="p-2 text-lg rounded border border-gray-300 text-black"
              />
            </div>
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white">peso al nacer</label>
              <input
                type="text"
                placeholder="1.25 kg"
                value={pesoAlNacer}
                onChange={(e) => setPesoAlNacer(e.target.value)}
                className="p-2 text-lg rounded border border-gray-300 text-black"
              />
            </div>

            <div className="flex flex-col w-64 mb-4">
              <label className="text-lg mb-2 text-white">fecha de nacimiento</label>
              <input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="p-2 text-lg rounded border border-gray-300 text-black w-full"
              />
            </div>

            
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white">peso de destete</label>
              <div className="flex">
                <AddButton
                  onClick={handleAddDestete}
                  disabled={isAddButtonDisabled}
                  className="ml-4"
                />
              </div>
              <p className="mt-2 text-sm text-white">¿El animal posee un peso de destete?</p>
            </div>
          </div>

            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white">época</label>
              <input
                type="text"
                placeholder="invierno"
                value={epoca}
                onChange={(e) => setEpoca(e.target.value)}
                className="p-2 text-lg rounded border border-gray-300 text-black"
              />
            </div>

          <div className="flex flex-col w-full mb-6">
            <div className="flex flex-wrap gap-8 mb-6">
              {pesoDesteteInputs.map((input, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={input}
                    readOnly
                    className="p-2 text-lg rounded border border-gray-300 text-black w-36"
                  />
                  <button
                    type="button"
                    onClick={() => setPesoDesteteInputs(pesoDesteteInputs.filter((_, i) => i !== index))}
                    className="ml-4 text-red-500"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <PrincipalButton onClick={handleConfirmData} className="w-36" text="Confirmar datos"/>
              <PrincipalButton onClick={handleGenerateReport} className= "w-36" text="Reporte por animal"/>
              <PrincipalButton onClick={handleGoHome} className= "w-36" text="Volver al Home"/>
            </div>
          </div>
        </div>
      </form>
      {showModal && <ModalCarne onClose={handleCloseModal} />}
    </div>
  );
}

export default Carne;
