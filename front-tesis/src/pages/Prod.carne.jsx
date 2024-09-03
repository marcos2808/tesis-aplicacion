import React, { useState } from "react";
import AddButton from "../components/AddButton";
import PrincipalButton from "../components/PrincipalButton";
import { useNavigate } from 'react-router-dom';
import ModalCarne from "../components/ModalCarne";

function Carne() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);

  // Estado para los inputs de la primera y segunda fila
  const [animal, setAnimal] = useState("");
  const [padre, setPadre] = useState("");
  const [madre, setMadre] = useState("");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("");
  const [epoca, setEpoca] = useState("");
  const [pesoAlNacer, setPesoAlNacer] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const handleConfirmData = async () => {
    // Validar que todos los campos obligatorios estén completos
    if (!animal || !padre || !madre || !raza) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Aquí se enviarán los datos a la base de datos
    try {
      const response = await fetch('http://localhost:5000/api/animal/createAnimal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Agrega el token para la autenticación
        },
        body: JSON.stringify({
          animal,
          padre,
          madre,
          raza
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Animal creado:", data);
        setShowModal(true);
      } else {
        alert(`Error al crear el animal: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al intentar crear el animal. Por favor, intente de nuevo.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDisableAddButton = () => {
    setIsAddButtonDisabled(true);
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
              <label className="text-lg mb-2 text-white">época</label>
              <input
                type="text"
                placeholder="invierno"
                value={epoca}
                onChange={(e) => setEpoca(e.target.value)}
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
            <div className="flex items-center mb-6">
              <AddButton onDisable={handleDisableAddButton} isDisabled={isAddButtonDisabled} />
              <p className="ml-6 text-lg">Si su animal ya tiene un peso de destete haga click en el botón de más, sino por favor vuelva al home y termine su sesión hasta que lo tenga.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full">
          <PrincipalButton text="Confirmar datos" onClick={handleConfirmData} />
          <PrincipalButton text="Volver al home" onClick={() => navigate('/Home')} />
          <PrincipalButton text="Reporte por animal" />
        </div>
      </form>
      {showModal && <ModalCarne onClose={handleCloseModal} />}
    </div>
  );
}

export default Carne;
