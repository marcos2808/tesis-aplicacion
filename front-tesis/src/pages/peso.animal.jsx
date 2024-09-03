import React from "react";
import PrincipalButton from "../components/PrincipalButton";

function Peso() {
  return (
    <div className="flex flex-col items-center p-4 bg-[#0F250E] text-white min-h-screen">
      {/* Título con mayor margen desde el borde superior */}
      <h1 className="text-center text-xl mt-12 mb-12">
        Si ya posee usted el peso del animal de 1 a 2 años introduzca esos datos acá
      </h1>

      {/* Contenedor principal centrado */}
      <div className="flex flex-col w-full max-w-4xl items-center">
        {/* Peso y fecha al año */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8 w-full">
          <div className="flex flex-col w-full sm:w-1/2 max-w-xs">
            <label className="text-lg mb-2">Peso del animal al año</label>
            <input
              type="text"
              placeholder="ej: 300 kg"
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 max-w-xs">
            <label className="text-lg mb-2">Fecha del peso al año</label>
            <input
              type="date"
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
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 max-w-xs">
            <label className="text-lg mb-2">Fecha del peso a los 18 meses</label>
            <input
              type="date"
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
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 max-w-xs">
            <label className="text-lg mb-2">Fecha del peso a los 24 meses</label>
            <input
              type="date"
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
        </div>

        {/* Botones de Confirmar y Volver alineados horizontalmente */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-6">
          <PrincipalButton text="Confirmar datos" />
          <PrincipalButton text="Volver" />
        </div>
      </div>
    </div>
  );
}

export default Peso;
