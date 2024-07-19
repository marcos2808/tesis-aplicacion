import React from "react";
import AddButton from "../components/AddButton";
import PrincipalButton from "../components/PrincipalButton";

function Peso() {
  return (
    <div className="flex flex-col items-center p-4 bg-[#0F250E] text-white">
      <h1 className="text-center text-xl mb-6">
        Si ya posee usted el peso del animal de 1 a 2 años introduzca esos datos acá
      </h1>
      <div className="flex flex-col w-full max-w-4xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex flex-col w-full max-w-xs">
            <label className="text-lg mb-2">Peso del animal al año</label>
            <input
              type="text"
              placeholder="ej: 300 kg"
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="text-lg mb-2">Fecha del peso al año</label>
            <input
              type="date"
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex items-center">
            <AddButton />
            <p className="text-center ml-4">
              Si su animal ya tiene de 18 meses a 2 años, haga click en el botón de más. Sino, por favor vuelva al home y termine su sesión hasta que lo tenga.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <PrincipalButton text="Confirmar datos" />
        </div>
      </div>
    </div>
  );
}

export default Peso;
