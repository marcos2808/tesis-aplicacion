import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrincipalButton from "../components/PrincipalButton";
import AddButton from "../components/AddButton";
import ModalLeche from "../components/ModalLeche";

function Leche() {
  const navigate = useNavigate();
  const [animalData, setAnimalData] = useState({
    animalNumber: "",
    fatherNumber: "",
    motherNumber: "",
    raza: "",
    milkAverage: "",
    daysProductionAverage: "",
  });
  const [extraFields, setExtraFields] = useState([]); // No mostramos los inputs adicionales hasta hacer clic en el botón
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddFields = () => {
    if (extraFields.length < 2) {
      setExtraFields((prevFields) => [
        ...prevFields,
        { produccionA305Dias: "", produccionTotalA305Dias: "" },
      ]);
    }
  };

  const handleExtraFieldChange = (index, field, value) => {
    const updatedFields = [...extraFields];
    updatedFields[index][field] = value;
    setExtraFields(updatedFields);
  };

  const handleConfirmData = async () => {
    const { animalNumber, fatherNumber, motherNumber, raza, milkAverage, daysProductionAverage } = animalData;

    // Validación de campos obligatorios
    if (!animalNumber || !fatherNumber || !motherNumber || !raza) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      // Crear el animal
      const responseAnimal = await fetch("http://localhost:5000/api/animal/createAnimal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ animal: animalNumber, padre: fatherNumber, madre: motherNumber, raza }),
      });

      const dataAnimal = await responseAnimal.json();
      if (responseAnimal.ok) {
        console.log("Animal creado:", dataAnimal);

        // Crear el registro de leche
        const responseLeche = await fetch("http://localhost:5000/api/leche/createLeche", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            animal: dataAnimal.animal._id,
            produccionTotal: milkAverage,
            produccionTotalDias: daysProductionAverage,
            produccionA305Dias: extraFields[0]?.produccionA305Dias || "",
            produccionTotalA305Dias: extraFields[0]?.produccionTotalA305Dias || "",
          }),
        });

        const dataLeche = await responseLeche.json();
        if (responseLeche.ok) {
          console.log("Registro de leche creado:", dataLeche);
          setShowModal(true);
        } else {
          alert(`Error al crear el registro de leche: ${dataLeche.message}`);
        }
      } else {
        alert(`Error al crear el animal: ${dataAnimal.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al intentar crear el animal y/o el registro de leche.");
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/leche/reporteLeche', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reporte_leche.xlsx');
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

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex flex-col items-center p-6 bg-[#0F250E] text-white">
      <h4 className="text-4xl font-bold text-center mb-5">Rellene aquí los datos para la producción de leche de su animal.</h4>
      <form className="w-full max-w-4xl">
        <div className="flex flex-wrap justify-center gap-12 mb-5">
          {/* Primera fila */}
          <div className="flex flex-col w-36 mb-4">
            <label className="text-lg mb-1"># del animal</label>
            <input
              type="text"
              name="animalNumber"
              value={animalData.animalNumber}
              onChange={handleChange}
              placeholder="ej: 001"
              className="p-2 text-lg rounded border border-gray-300 text-black w-full"
            />
          </div>
          <div className="flex flex-col w-36 mb-4">
            <label className="text-lg mb-1"># del padre</label>
            <input
              type="text"
              name="fatherNumber"
              value={animalData.fatherNumber}
              onChange={handleChange}
              placeholder="ej: 002"
              className="p-2 text-lg rounded border border-gray-300 text-black w-full"
            />
          </div>
          <div className="flex flex-col w-36 mb-4">
            <label className="text-lg mb-1"># de la madre</label>
            <input
              type="text"
              name="motherNumber"
              value={animalData.motherNumber}
              onChange={handleChange}
              placeholder="ej: 003"
              className="p-2 text-lg rounded border border-gray-300 text-black w-full"
            />
          </div>
          <div className="flex flex-col w-36 mb-4">
            <label className="text-lg mb-1">Raza</label>
            <input
              type="text"
              name="raza"
              value={animalData.raza}
              onChange={handleChange}
              placeholder="ej: Holstein"
              className="p-2 text-lg rounded border border-gray-300 text-black w-full"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-12 mb-5">
          {/* Segunda fila */}
          <div className="flex flex-col w-80 mb-4">
            <label className="text-lg mb-1">Promedio total de leche</label>
            <input
              type="text"
              name="milkAverage"
              value={animalData.milkAverage}
              onChange={handleChange}
              placeholder="ej: 20 litros"
              className="p-2 text-lg rounded border border-gray-300 text-black w-full"
            />
          </div>
          <div className="flex flex-col w-80 mb-4">
            <label className="text-lg mb-1">Promedio de la prod. total en días</label>
            <input
              type="text"
              name="daysProductionAverage"
              value={animalData.daysProductionAverage}
              onChange={handleChange}
              placeholder="ej: 300 días"
              className="p-2 text-lg rounded border border-gray-300 text-black w-full"
            />
          </div>
        </div>
        {extraFields.map((field, index) => (
          <div key={index} className="flex flex-col w-80 mb-4">
            <label className="text-lg mb-1">Producción a 305 días</label>
            <input
              type="text"
              value={field.produccionA305Dias}
              onChange={(e) => handleExtraFieldChange(index, "produccionA305Dias", e.target.value)}
              placeholder="ej: 100 litros"
              className="p-2 text-lg rounded border border-gray-300 text-black w-full"
            />
            <label className="text-lg mb-1 mt-2">Producción total a 305 días</label>
            <input
              type="text"
              value={field.produccionTotalA305Dias}
              onChange={(e) => handleExtraFieldChange(index, "produccionTotalA305Dias", e.target.value)}
              placeholder="ej: 200 litros"
              className="p-2 text-lg rounded border border-gray-300 text-black w-full"
            />
          </div>
        ))}
        <AddButton onClick={handleAddFields} disabled={extraFields.length >= 2} />
      </form>
      <div className="mt-8 flex gap-5">
        <PrincipalButton text="Confirmar datos" onClick={handleConfirmData} />
        <PrincipalButton text="Volver al home" onClick={() => navigate("/Home")} />
        <PrincipalButton text="Lactancia por animal"  onClick={handleGenerateReport} />
        <PrincipalButton text="Producción diaria" onClick={() => navigate("/Diaria")} />
      </div>
        {showModal && <ModalLeche onClose={handleCloseModal} />}  
    </div>
  );
}

export default Leche;
