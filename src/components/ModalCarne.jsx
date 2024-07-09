import React from "react";
import PrincipalButton from "./PrincipalButton";
import "./Modal.css";

function ModalCarne({ onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h6>¿Su animal tiene más de un año?</h6>
                <div className="button-group">
                    <PrincipalButton text="Sí"  />
                    <PrincipalButton text="No"  onClick={onClose} />
                </div>
            </div>
        </div>
    );
}

export default ModalCarne;
