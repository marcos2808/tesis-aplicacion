import Carne from "../models/carneModel.js";

class CarneController {
    async createCarne(req, res) {
        const { animalId, sexo, pesoNacer, fechaNacimiento, pesoDestete, temporada } = req.body;
        const fundoId = req.user._id;

        // Establece el valor de epoca en función de la temporada
        const epoca = temporada ? temporada.toLowerCase() === "invierno" : false;

        // Validar los campos requeridos
        if (!animalId || !sexo || pesoNacer === undefined || !fechaNacimiento || pesoDestete === undefined) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        try {
            const carne = new Carne({
                animal: animalId,
                fundo: fundoId,
                sexo,
                epoca,
                pesoNacer,
                fechaNacimiento,
                pesoDestete
            });

            await carne.save();
            res.status(201).json({ message: "Registro de carne creado exitosamente", carne });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateCarne(req, res) {
        const { id, animalId, pesoAnio, fechaAnio, peso18Meses, fecha18Meses, peso24Meses, fecha24Meses } = req.body;
        const fundoId = req.user._id;

        // Validar los campos requeridos
        if (!id || !animalId) return res.status(400).json({ message: "El ID del registro y el ID del animal son obligatorios para actualizar el registro de carne" });

        try {
            const carne = await Carne.findOne({ _id: id, animal: animalId, fundo: fundoId });
            if (!carne) return res.status(404).json({ message: "Registro de carne no encontrado" });

            // Actualizar los campos si se proporcionan
            if (pesoAnio !== undefined) carne.pesoAnio = pesoAnio;
            if (fechaAnio !== undefined) carne.fechaAnio = fechaAnio;
            if (peso18Meses !== undefined) carne.peso18Meses = peso18Meses;
            if (fecha18Meses !== undefined) carne.fecha18Meses = fecha18Meses;
            if (peso24Meses !== undefined) carne.peso24Meses = peso24Meses;
            if (fecha24Meses !== undefined) carne.fecha24Meses = fecha24Meses;

            await carne.save();
            res.status(200).json({ message: "Registro de carne actualizado exitosamente", carne });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default CarneController;
