import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrincipalButton from "../components/PrincipalButton";
import AddButton from "../components/AddButton";
import ModalLeche from "../components/ModalLeche";
import "./Leche.css";

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
        // Aquí puedes hacer cualquier validación o lógica antes de limpiar los inputs
        setAnimalData({
            animalNumber: "",
            fatherNumber: "",
            motherNumber: "",
            milkAverage: "",
            daysProductionAverage: "",
        });
        setShowModal(true); // Mostrar el modal de leche
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="leche-container">
            <h4>Rellene aqui los datos para la produccion de leche de su animal.</h4>
            <form className="form">
                <div className="inputs-row">
                    <div className="input-group">
                        <label># del animal</label>
                        <input
                            type="text"
                            name="animalNumber"
                            value={animalData.animalNumber}
                            onChange={handleChange}
                            placeholder="ej: 001"
                        />
                    </div>
                    <div className="input-group">
                        <label># del padre</label>
                        <input
                            type="text"
                            name="fatherNumber"
                            value={animalData.fatherNumber}
                            onChange={handleChange}
                            placeholder="ej: 002"
                        />
                    </div>
                    <div className="input-group">
                        <label># de la madre</label>
                        <input
                            type="text"
                            name="motherNumber"
                            value={animalData.motherNumber}
                            onChange={handleChange}
                            placeholder="ej: 003"
                        />
                    </div>
                </div>
                <div className="inputs-row">
                    <div className="input-group">
                        <label>promedio total de leche</label>
                        <input
                            type="text"
                            name="milkAverage"
                            value={animalData.milkAverage}
                            onChange={handleChange}
                            placeholder="ej: 20 litros"
                        />
                    </div>
                    <div className="input-group">
                        <label>promedio de la prod. total en dias</label>
                        <input
                            type="text"
                            name="daysProductionAverage"
                            value={animalData.daysProductionAverage}
                            onChange={handleChange}
                            placeholder="ej: 300 dias"
                        />
                    </div>
                </div>
            </form>
            <div className="additional-inputs">
                <AddButton />
                <p>Cuando su animal tenga 305 días lactando haga click en el +.</p>
            </div>
            <div className="button-group">
                <PrincipalButton text="Confirmar datos" onClick={handleConfirmData} />
                <PrincipalButton text="Volver al home" onClick={() => navigate("/Home")} />
                <PrincipalButton text="Lactancia por animal" />
                <PrincipalButton text="Producción diaria" />
            </div>
            {showModal && <ModalLeche onClose={handleCloseModal} />}
        </div>
    );
}

export default Leche;
