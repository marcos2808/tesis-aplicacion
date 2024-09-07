import React, { useState } from "react";
import PrincipalButton from "../components/PrincipalButton";
import { useNavigate } from "react-router-dom";

function Diaria() {
    const [animalNumber, setAnimalNumber] = useState("");
    const [produccionDiaria, setProduccionDiaria] = useState("");
    const navigate = useNavigate();
    const handleConfirmarDatos = async () => {

        try {
            const response = await fetch("https://tesis-aplicacion.onrender.com/api/leche/updateProduccionDiaria", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    animal: animalNumber,
                    produccionDiaria: parseFloat(produccionDiaria),
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Producción diaria actualizada exitosamente");
                // Limpiar inputs si se actualizó correctamente
                setAnimalNumber("");
                setProduccionDiaria("");
                navigate("/Leche")
                
            } else {
                alert(data.message || "Error al actualizar la producción diaria.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al actualizar los datos.");
        }
    };

    

    return (
        <div className="flex flex-col items-center p-4 bg-[#0F250E] text-white min-h-screen">
            <h1 className="text-xl mb-6 text-center">
                Introduzca los litros que su animal produce diariamente
            </h1>
            <div className="flex flex-col gap-6 w-full max-w-4xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex flex-col w-1/2">
                        <label className="text-lg mb-1"># del animal</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="# del animal"
                                value={animalNumber}
                                onChange={(e) => setAnimalNumber(e.target.value)}
                                className="w-full h-12 px-4 rounded-md border border-gray-300 text-black"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-lg mb-1">Producción diaria</label>
                        <input
                            type="text"
                            placeholder="Producción diaria"
                            value={produccionDiaria}
                            onChange={(e) => setProduccionDiaria(e.target.value)}
                            className="w-full h-12 px-4 rounded-md border border-gray-300 text-black"
                        />
                    </div>
                </div>
            </div>
            <PrincipalButton text="Confirmar Datos" onClick={handleConfirmarDatos} />
        </div>
    );
}

export default Diaria;
