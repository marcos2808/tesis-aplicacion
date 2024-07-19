import React from "react";
import PrincipalButton from "../components/PrincipalButton";
import buscarIcon from "../../img/Buscar.svg"; // Ajusta la ruta si es necesario

function Diaria() {
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
                                className="w-full h-12 px-4 rounded-md border border-gray-300 text-black"
                            />
                            <img src={buscarIcon} alt="Buscar" className="w-10 h-10 ml-2" />
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-lg mb-1">Producción diaria</label>
                        <input
                            type="text"
                            placeholder="Producción diaria"
                            className="w-full h-12 px-4 rounded-md border border-gray-300 text-black"
                        />
                    </div>
                </div>
            </div>
            <PrincipalButton text="Confirmar Datos" />
        </div>
    );
}

export default Diaria;
