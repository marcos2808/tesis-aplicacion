import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import Fundo from '../models/fundoModel.js';

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const tokenValue = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);

        const fundo = await Fundo.findById(decodedToken.fundoId);
        if (!fundo) {
            return res.status(404).json({ message: 'Fundo not found' });
        }
        req.user = fundo;
        console.log(`Token verified for fundo ${fundo.fundo}.`);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authenticate;
