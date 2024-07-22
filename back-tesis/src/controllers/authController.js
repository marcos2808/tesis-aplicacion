import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Fundo from '../models/fundoModel.js';

class AuthController {
    static async register(req, res) {
        const { fundo, propietario, password } = req.body;

        try {
            let fundoExists = await Fundo.findOne({ fundo });
            if (fundoExists) return res.status(400).json({ message: 'Fundo already exists.' });

            const newFundo = new Fundo({ fundo, propietario, password });
            await newFundo.save();

            console.log(`New fundo created: ${newFundo}.`);
            res.status(201).json({ message: "Fundo created successfully." });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async login(req, res) {
        const { fundo, password } = req.body;

        try {
            const existingFundo = await Fundo.findOne({ fundo, deleted: false });
            if (!existingFundo) return res.status(404).json({ message: 'Fundo not found.' });

            const passwordMatch = await bcrypt.compare(password, existingFundo.password);
            if (!passwordMatch) return res.status(401).json({ message: 'Incorrect password.' });

            const token = jwt.sign({ fundoId: existingFundo._id }, process.env.JWT_SECRET);

            console.log(`${existingFundo.fundo} has logged in.`);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default AuthController;
