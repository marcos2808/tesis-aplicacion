import Animal from "../models/animalModel.js";

class AnimalController {
    async createAnimal(req, res) {
        const { animal, padre, madre, raza } = req.body;
        const fundoId = req.user._id;

        if (!animal || !padre || !madre || !raza) {
            return res.status(400).json({ message: "All fields are required to create an animal." });
        }

        try {
            const existingAnimal = await Animal.findOne({ animal });
            if (existingAnimal) {
                return res.status(400).json({ message: "Animal already exists." });
            }

            const newAnimal = new Animal({
                fundo: fundoId,
                animal,
                padre,
                madre,
                raza
            });

            await newAnimal.save();
            res.status(201).json({ message: "Animal created successfully.", animal: newAnimal });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAnimalByNumber(req, res) {
        const { animalNumber } = req.params;

        try {
            const animal = await Animal.findOne({ animal: animalNumber }).populate('fundo');
            if (!animal) {
                return res.status(404).json({ message: "Animal not found." });
            }

            res.status(200).json({ animal });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default AnimalController;
