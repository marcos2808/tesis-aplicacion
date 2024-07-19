import React, { useState } from 'react';
import AddButton from '../components/AddButton';
import PrincipalButton from '../components/PrincipalButton';
import { useNavigate } from 'react-router-dom';
import ModalCarne from '../components/ModalCarne';

function Carne() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleConfirmData = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
              <input type="text" placeholder="40 vaca roja" className="p-2 text-lg rounded border border-gray-300 text-black" />
            </div>
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white"># del padre</label>
              <input type="text" placeholder="sanson" className="p-2 text-lg rounded border border-gray-300 text-black" />
            </div>
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white"># de la madre</label>
              <input type="text" placeholder="medio cacho 2" className="p-2 text-lg rounded border border-gray-300 text-black" />
            </div>
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white">sexo</label>
              <input type="text" placeholder="hembra" className="p-2 text-lg rounded border border-gray-300 text-black" />
            </div>
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white">época</label>
              <input type="text" placeholder="invierno" className="p-2 text-lg rounded border border-gray-300 text-black" />
            </div>
          </div>
          
          {/* Segunda fila */}
          <div className="flex flex-wrap gap-8 mb-6 items-end">
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white">raza</label>
              <input type="text" placeholder="carora" className="p-2 text-lg rounded border border-gray-300 text-black" />
            </div>
            <div className="flex flex-col w-36 mb-4">
              <label className="text-lg mb-2 text-white">peso al nacer</label>
              <input type="text" placeholder="1.25 kg" className="p-2 text-lg rounded border border-gray-300 text-black" />
            </div>
            <div className="flex flex-col w-64 mb-4">
              <label className="text-lg mb-2 text-white">fecha de nacimiento</label>
              <input type="date" className="p-2 text-lg rounded border border-gray-300 text-black w-full" />
            </div>
            <div className="flex items-center mb-6">
              <AddButton />
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
