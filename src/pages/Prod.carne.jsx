import React, { useState } from 'react';
import AddButton from '../components/AddButton';
import PrincipalButton from '../components/PrincipalButton';
import { useNavigate } from 'react-router-dom';
import ModalCarne from '../components/ModalCarne'; // Importa tu modal de carne aquí
import './Carne.css';

function Carne() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleConfirmData = () => {
        // Aquí puedes agregar lógica adicional si es necesario
        setShowModal(true); // Muestra el modal de carne
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="carne-container">
            <h4>Rellene aquí los datos para la producción de carne de su animal.</h4>
            <form>
                <div className="inputs-row">
                    <div className="input-group">
                        <label># del animal</label>
                        <input type="text" placeholder="ej: # del animal" />
                    </div>
                    <div className="input-group">
                        <label># del padre</label>
                        <input type="text" placeholder="ej: # del padre" />
                    </div>
                    <div className="input-group">
                        <label># de la madre</label>
                        <input type="text" placeholder="ej: # de la madre" />
                    </div>
                    <div className="input-group">
                        <label>sexo</label>
                        <input type="text" placeholder="ej: sexo" />
                    </div>
                    <div className="input-group">
                        <label>época</label>
                        <input type="text" placeholder="ej: época" />
                    </div>
                    <div className="input-group">
                        <label>raza</label>
                        <input type="text" placeholder="ej: raza" />
                    </div>
                    <div className="input-group">
                        <label>peso al nacer</label>
                        <input type="text" placeholder="ej: peso al nacer" />
                    </div>
                </div>
                <div className="additional-inputs">
                    <div className="input-group">
                        <label>fecha de nacimiento</label>
                        <input type="date" />
                    </div>
                    <div className="add-button-container">
                        <AddButton />
                        <p>Si su animal ya tiene un peso de destete haga click en el botón de más, sino por favor vuelva al home y termine su sesión hasta que lo tenga.</p>
                    </div>
                </div>
                <div className="button-group">
                    <PrincipalButton text="Confirmar datos" onClick={handleConfirmData} />
                    <PrincipalButton text="Volver al home" onClick={() => navigate('/Home')} />
                    <PrincipalButton text="Reporte por animal" />
                </div>
            </form>
            {showModal && <ModalCarne onClose={handleCloseModal} />} {/* Renderiza el modal si showModal es true */}
        </div>
    );
}

export default Carne;

