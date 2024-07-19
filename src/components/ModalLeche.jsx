    import React from "react";
    import { useNavigate } from "react-router-dom";
    import PrincipalButton from "./PrincipalButton";

    function ModalLeche({ onClose }) {

        const navigate = useNavigate();

        const handleYesClick = () => {
            navigate('/Lactansia'); // Redirige a la vista Lactansia
        };


        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[#0F250E] p-4 rounded-lg w-[300px] text-center">
                    <h6 className="text-lg mb-4">¿Su animal tiene más de una lactancia?</h6>
                    <div className="flex justify-around mt-4">
                        <PrincipalButton text="Sí" onClick={handleYesClick} />
                        <PrincipalButton text="No" onClick={onClose} />
                    </div>
                </div>
            </div>
        );
    }

    export default ModalLeche;
