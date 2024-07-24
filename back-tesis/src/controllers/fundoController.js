import Fundo from "../models/fundoModel.js";

class FundoController {
    async createFundo(req, res) {
        const { fundo, propietario, password } = req.body;

        if (!fundo || !password) {
            return res.status(400).json({ message: 'Fundo and password are required to create a fundo.' });
        }

        try {
            const existingFundo = await Fundo.findOne({ fundo });
            if (existingFundo) {
                return res.status(400).json({ message: 'Fundo already exists.' });
            }

            const newFundo = new Fundo({ fundo, propietario, password });
            await newFundo.save();

            res.status(201).json({ message: 'Fundo created successfully.', fundo: { fundo: newFundo.fundo, propietario: newFundo.propietario } });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteFundo(req, res) {
        const id = req.user._id; 

        try {
            const fundo = await Fundo.findById(id);
            if (!fundo) return res.status(404).json({ message: 'Fundo not found.' });

            fundo.deleted = true;
            await fundo.save();
            res.status(200).json({ message: `${fundo.fundo} was deleted successfully.` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updatePassword(req, res) {
        const { fundoName, newPassword } = req.body;

        if (!fundoName || !newPassword) {
            return res.status(400).json({ message: "Fundo name and new password are required to update a fundo's password." });
        }

        try {
            const fundo = await Fundo.findOne({ fundo: fundoName });
            if (!fundo) {
                return res.status(404).json({ message: 'Fundo not found.' });
            }

            // Comparar nueva contraseña con la actual
            const passwordMatch = await bcrypt.compare(newPassword, fundo.password);
            if (passwordMatch) {
                return res.status(400).json({ message: 'New password cannot be the same as the old password.' });
            }

            // Hashificar la nueva contraseña
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            fundo.password = hashedPassword;
            await fundo.save();

            res.status(200).json({ message: `${fundo.fundo}'s password updated successfully.` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateFundo(req, res) {
        const {newFundoName } = req.body;
        const id = req.user._id;

        if (!newFundoName) return res.status(400).json({ message: "New fundo name is required to update a fundo's name." });

        try {
            const fundo = await Fundo.findById(id);
            if (!fundo) return res.status(404).json({ message: 'Fundo not found.' });

            if (newFundoName === fundo.fundo) {
                return res.status(400).json({ message: 'New fundo name is the same as the old name. No changes made.' });
            }

            fundo.fundo = newFundoName;
            await fundo.save();

            res.status(200).json({ message: `Fundo ${fundo.fundo}'s name updated successfully.` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new FundoController();
