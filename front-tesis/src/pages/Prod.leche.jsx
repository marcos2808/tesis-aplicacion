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
        milkAverage: "",
        daysProductionAverage: "",
    });
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnimalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleConfirmData = () => {
        setAnimalData({
            animalNumber: "",
            fatherNumber: "",
            motherNumber: "",
            milkAverage: "",
            daysProductionAverage: "",
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

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
            </form>
            <div className="flex items-center gap-6 mt-5">
                <AddButton />
                <p className="text-lg max-w-[400px] text-center">Cuando su animal tenga 305 días lactando haga click en el +.</p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full mt-5">
                <PrincipalButton text="Confirmar datos" onClick={handleConfirmData} />
                <PrincipalButton text="Volver al home" onClick={() => navigate("/Home")} />
                <PrincipalButton text="Lactancia por animal"/>
                <PrincipalButton text="Producción diaria" onClick={() => navigate("/Produccion")} />
            </div>
            {showModal && <ModalLeche onClose={handleCloseModal} />}
        </div>
    );
}

export default Leche;
