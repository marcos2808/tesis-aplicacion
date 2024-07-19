import React from "react";
import AddButton from "../components/AddButton";
import PrincipalButton from "../components/PrincipalButton";

function Lactansia() {
  return (
    <div className="flex flex-col items-center p-4 bg-[#0F250E] text-white">
      <h1 className="text-center text-xl mb-6">
        Si usted posee los litros de cada una de las lactancias de su animal, introdúzcalas aquí
      </h1>
      <div className="flex flex-col w-full max-w-4xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex flex-col w-full max-w-xs">
            <label className="text-lg mb-2">Primera lactancia del animal</label>
            <input
              type="text"
              placeholder="ej: 150 litros"
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="text-lg mb-2">Duración de la lactancia</label>
            <input
              type="text"
              placeholder="ej: 60 días"
              className="p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>
          <div className="flex items-center ml-4">
            <AddButton />
            <p className="text-center ml-4">
              Si su animal tiene más de una lactancia, haga click en el +.
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

export default Lactansia;
